import { DoctorEntity, DoctorEntityDTO } from '../types';
import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';
import { pool } from '../utils/db';
import { FieldPacket, RowDataPacket } from 'mysql2';
import * as dayjs from 'dayjs';
dayjs().format();

type DoctorRecordResult = [DoctorRecord[], FieldPacket[]];

export interface resultElement {
  //   term_id: number;
  godzina_wizyty: string;
  data: string;
  id: string;
  id_terminu: string;
}

export interface searchForm {
  role: string;
  city: string;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
}

// export type DoctorRecordToEdit = Omit<DoctorRecord, 'id'|'login'|'password'|'role'>;
//
// type DoctorRecordResults = [DoctorRecordToEdit[], RowDataPacket[]];

export class DoctorRecord implements DoctorRecord {
  public id: string;
  public login: string;
  public password: string;
  public role: string;
  public name: string;
  public surname: string;
  public speciality: string;
  public city: string;

  constructor(obj: DoctorEntity) {
    // if(!obj.name || obj.name.length < 3 || obj.name.length > 25) {
    //     throw new ValidationError('Imie musi mieć od 3 do 25 znaków')
    // }

    this.id = obj.id;
    this.login = obj.login;
    this.password = obj.password;
    this.role = obj.role;
    this.name = obj.name;
    this.surname = obj.surname;
    this.speciality = obj.speciality;
    this.city = obj.city;
  }

  static async listAll(): Promise<DoctorEntityDTO[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `lekarze` LEFT JOIN `dane_logowania` ON lekarze.id_lekarza = dane_logowania.user_id ORDER BY `surname`;'
    )) as DoctorRecordResult;
    return results.map((el) => ({
      ...el,
      speciality: el.speciality.split(', '),
    }));
  }

  async insert(): Promise<string> {
    console.log('dodawanie');

    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute(
      'INSERT INTO `dane_logowania`(`user_id`,`login`,`password`,`role`,`name`,`surname`) VALUES(:id, :login, :password, :role, :name, :surname)',
      {
        id: this.id,
        login: this.login,
        password: this.password,
        role: this.role,
        name: this.name,
        surname: this.surname,
      }
    );
    if (this.role == 'lekarz') {
      await pool.execute(
        'INSERT INTO `lekarze`(`id_lekarza`, `speciality`, `city`) VALUES (:id, :speciality, :city)',
        {
          id: this.id,
          speciality: this.speciality,
          city: this.city,
        }
      );
    }

    return this.id;
  }

  static async getOne(login: string): Promise<Object | null> {
    // console.log("login", login);
    const [user_idJson] = await pool.execute<RowDataPacket[]>(
      'SELECT `user_id` FROM `dane_logowania` WHERE `login` = :login',
      {
        login,
      }
    );
    // console.log(user_idJson[0]);
    const { user_id } = user_idJson[0];
    // console.log(user_id);

    const [daneLekarzaDB] = await pool.execute<RowDataPacket[]>(
      'SELECT `dane_logowania`.`name`, `dane_logowania`.`surname`,`lekarze`.`id_lekarza`, `lekarze`.`speciality`,`lekarze`.`city` FROM `lekarze` LEFT JOIN `dane_logowania` ON `lekarze`.`id_lekarza` = `dane_logowania`.`user_id` WHERE `dane_logowania`.`user_id` = :user_id;',
      {
        user_id,
      }
    );

    // console.log("daneLekarzaDB", daneLekarzaDB);
    const { id_lekarza, name, surname, speciality, city } = daneLekarzaDB[0];
    const foundDoctor = { id_lekarza, name, surname, speciality, city };
    // console.log("foundDoctor", foundDoctor);

    return foundDoctor;
  }

  static async getSchedule(login: string): Promise<Object | null> {
    const [user_idJson] = await pool.execute<RowDataPacket[]>(
      'SELECT `user_id` FROM `dane_logowania` WHERE `login` = :login',
      {
        login,
      }
    );
    const { user_id } = user_idJson[0];
    const [daneZGrafiku] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM `grafik` WHERE `id_lekarza` = :user_id',
      {
        user_id,
      }
    );
    // console.log("dane z grafku", daneZGrafiku);

    return daneZGrafiku;
  }

  static async getFormSchedule(
    login: string,
    query: searchForm
  ): Promise<Object | null> {
    // TODO: stworzyc zaptania zawęrzające wizyty na podstawie danych z formularza
    const search = {
      role: query.role,
      city: query.city,
      dateFrom: query.dateFrom + 'T00:00:00.000Z',
      dateTo: query.dateTo,
      timeFrom: query.timeFrom,
    };
    console.log(search);

    const [user_idJson] = await pool.execute<RowDataPacket[]>(
      'SELECT `user_id` FROM `dane_logowania` WHERE `login` = :login',
      {
        login,
      }
    );
    const { user_id } = user_idJson[0];
    const [daneZGrafiku] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM `grafik` WHERE `id_lekarza` = :user_id',
      {
        user_id,
      }
    );

    const [daneLekarza] = await pool.execute<RowDataPacket[]>(
      'SELECT `name`, `surname` FROM `dane_logowania` WHERE `user_id` = :user_id',
      {
        user_id,
      }
    );

    const [daneLekarzaSpec] = await pool.execute<RowDataPacket[]>(
      'SELECT `speciality`, `city` FROM `lekarze` WHERE `id_lekarza` = :user_id',
      {
        user_id,
      }
    );
    // console.log('dane z grafku', daneZGrafiku);
    // console.log('dane leakrza', daneLekarza);
    // console.log('dane leakrza spec', daneLekarzaSpec);
    const name = daneLekarza[0].name;
    const surname = daneLekarza[0].surname;
    const spec = daneLekarzaSpec[0].speciality;
    const city = daneLekarzaSpec[0].city;

    const dane = {
      name,
      surname,
      spec,
      city,
      daneZGrafiku,
    };
    console.log(dane);
    //filtrowanie danych

    if (search.role !== '') {
      if (!dane.spec.includes(search.role)) {
        return {};
      }
    }
    if (search.city !== '') {
      if (!search.city.includes(dane.city)) {
        return {};
      }
    }

    //TODO: filtrowanie daty
    // dane.daneZGrafiku.forEach(el => {
    //     if (new Date(search.dateFrom) >= el.data){

    //     }
    // })

    return dane;
  }

  static async getHourSchedule(
    id_terminu: string,
    id_lekarza: string,
    visitTime: string
  ) {
    const [daneZGrafiku] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM `grafik` WHERE `id_lekarza` = :id_lekarza',
      {
        id_lekarza,
      }
    );

    // TODO: juz prawie jest lista godzin, trzeba będzie odejmować wizyty zajęte oraz filtrowanie z formularza.
    const wolneTerminy: any = [];
    let visitCountInHour = 0;
    if (Number(visitTime) === 15) {
      visitCountInHour = 4;
    } else if (Number(visitTime) === 30) {
      visitCountInHour = 2;
    } else if (Number(visitTime) === 60) {
      visitCountInHour = 1;
    }
    // console.log(daneZGrafiku);
    daneZGrafiku.forEach((elem) => {
      if (elem.id_terminu === id_terminu) {
        const fromHour = Number(elem.od_godziny.split(':')[0]);
        const toHour = Number(elem.do_godziny.split(':')[0]);
        const iloscGodzin = toHour - fromHour;
        const data = elem.data;
        let minuty = Number(elem.od_godziny.split(':')[1]);
        let godziny = fromHour;
        for (let i = 0; i < visitCountInHour * iloscGodzin; i++) {
          let godzina;
          if (minuty === 0) {
            godzina = String(godziny + ':' + minuty + '0' + ':00');
          } else {
            godzina = String(godziny + ':' + minuty + ':00');
          }
          const wolnyTermin = {
            id_terminu,
            id_lekarza,
            data,
            godzina,
          };

          wolneTerminy.push(wolnyTermin);
          minuty += Number(visitTime);

          if (minuty === 60) {
            minuty = 0;
            godziny++;
          }
        }
      }
    });

    return wolneTerminy;
  }

  static async getTerm(
    fromHour: string,
    toHour: string,
    date: string,
    id: string,
    id_terminu: string
  ): Promise<Array<Object>> {
    const [termList] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM `godziny_wizyt` WHERE `godzina_wizyty` >= :fromHour AND `godzina_wizyty` < :toHour ;',
      {
        fromHour,
        toHour,
      }
    );

    termList.forEach((element) => {
      element.data = date;
      element.id = id;
      element.id_terminu = id_terminu;
    });
    const result: Array<resultElement> = Object.values(
      JSON.parse(JSON.stringify(termList))
    );

    const [bookedTerms] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM `wizyty` WHERE id_lekarza = :id',
      {
        id,
      }
    );

    let resultWithoutBooked = result;
    //usuwanie zajętych
    // for (let i = 0; i < result.length; i++) {
    //   for (let j = 0; j < bookedTerms.length; j++) {
    //     if (result[i].id_terminu == bookedTerms[j].id_terminu) {
    //       if (result[i].id == bookedTerms[j].id_lekarza) {
    //         if (result[i].term_id == bookedTerms[j].term_id) {
    //           resultWithoutBooked.splice(i, 1);
    //         }
    //       }
    //     }
    //   }
    // }
    return result;
  }

  static async update(
    id: string,
    name: string,
    surname: string,
    speciality: string,
    city: string
  ) {
    // console.log("dziala", id, name, surname, speciality, city);

    await pool.execute(
      'UPDATE `dane_logowania` SET `name` = :name , `surname` = :surname WHERE `user_id` = :id',
      {
        id,
        name,
        surname,
      }
    );

    await pool.execute(
      'UPDATE `lekarze` SET `speciality` = :speciality, `city` = :city WHERE `id_lekarza` = :id',
      {
        id,
        speciality,
        city,
      }
    );
  }

  static async updateTerm(id_terminu: string, timeF: number, timeT: number) {
    console.log('update wizyty ', id_terminu);
    // console.log(id_terminu, timeF, timeT);
    let timeFrom;
    let timeTo;
    if (timeF <= 9) {
      timeFrom = '0' + timeF + ':00';
    } else {
      timeFrom = timeF + ':00';
    }
    if (timeT <= 9) {
      timeTo = '0' + timeT + ':00';
    } else {
      timeTo = timeT + ':00';
    }

    await pool.execute(
      'UPDATE `grafik` SET `od_godziny` = :timeFrom, `do_godziny` = :timeTo WHERE `id_terminu` = :id_terminu',
      {
        timeFrom,
        timeTo,
        id_terminu,
      }
    );
  }

  static async delete(id: string) {
    await pool.execute('DELETE FROM `wizyty` WHERE `id_lekarza` = :id', {
      id,
    });

    await pool.execute('DELETE FROM `grafik` WHERE `id_lekarza` = :id', {
      id,
    });

    await pool.execute('DELETE FROM `lekarze` WHERE `id_lekarza` = :id', {
      id,
    });

    await pool.execute('DELETE FROM `dane_logowania` WHERE `user_id` = :id', {
      id,
    });
  }

  static async addTerm(
    id: string,
    date: string,
    timeFrom: string,
    timeTo: string
  ) {
    let id_terminu = uuid();

    await pool.execute(
      'INSERT INTO `grafik` (`id_terminu`,`id_lekarza`,`data`,`od_godziny`,`do_godziny`) VALUES(:id_terminu, :id, :date, :timeFrom, :timeTo)',
      {
        id_terminu,
        id,
        date,
        timeFrom,
        timeTo,
      }
    );
  }

  static async getBookedTerms(id_lek: string) {
    const [bookedTerms] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM `wizyty` WHERE `id_lekarza` = :id_lek',
      {
        id_lek,
      }
    );
    // console.log(bookedTerms);

    return bookedTerms;
  }

  //   static async getTermHour(term_id: string) {
  //     const [term_ID] = await pool.execute<RowDataPacket[]>(
  //       'SELECT `godzina_wizyty` FROM `godziny_wizyt` WHERE `term_id` = :term_id',
  //       {
  //         term_id,
  //       }
  //     );
  //     return term_ID[0];
  //   }

  static async getOnePacient(id_pacjenta: string) {
    const [user] = await pool.execute<RowDataPacket[]>(
      'SELECT `name`,`surname` FROM `dane_logowania` WHERE `user_id` = :id_pacjenta',
      {
        id_pacjenta,
      }
    );
    return user[0];
  }

  static async getDateFromTerm(id_terminu: string) {
    const [date] = await pool.execute<RowDataPacket[]>(
      'SELECT `data` FROM `grafik` WHERE `id_terminu` = :id_terminu',
      {
        id_terminu,
      }
    );
    return date[0];
  }

  static async cancelVisit(id_wizyty: string) {
    await pool.execute('DELETE FROM `wizyty` WHERE `id_wizyty` = :id_wizyty', {
      id_wizyty,
    });
  }

  static async deleteTerm(id_terminu: string) {
    await pool.execute('SET FOREIGN_KEY_CHECKS=0');
    await pool.query('DELETE FROM `wizyty` WHERE `id_terminu` = :id_terminu', {
      id_terminu,
    });
    await pool.query('DELETE FROM `grafik` WHERE `id_terminu` = :id_terminu', {
      id_terminu,
    });
    await pool.query('SET FOREIGN_KEY_CHECKS=1');
  }
}

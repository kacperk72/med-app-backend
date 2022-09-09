import { VisitEntity } from '../types/visit';
import { pool } from '../utils/db';
import { v4 as uuid } from 'uuid';
import { RowDataPacket } from 'mysql2';

export class VisitRecord implements VisitRecord {
  constructor(obj: VisitEntity) {}

  async insert(termData: VisitEntity): Promise<string> {
    console.log('rezerwowanie wizyty');
    // console.log(termData);

    const [id_pacjentaJSON] = await pool.execute<RowDataPacket[]>(
      'SELECT `user_id` FROM `dane_logowania` WHERE `login` = :login',
      {
        login: termData.login,
      }
    );
    const { user_id } = id_pacjentaJSON[0];

    if (!termData.id_wizyty) {
      termData.id_wizyty = uuid();
    }

    await pool.execute(
      'INSERT INTO `wizyty` (`id_wizyty`,`id_lekarza`,`id_pacjenta`,`id_terminu`,`reason_of_visit`,`visit_hour`,`visit_time`) VALUES(:id_wizyty, :id_lekarza, :id_pacjenta, :id_terminu, :reason_of_visit, :visit_hour, :visit_time)',
      {
        id_wizyty: termData.id_wizyty,
        id_lekarza: termData.id_lekarza,
        id_pacjenta: user_id,
        id_terminu: termData.id_terminu,
        reason_of_visit: termData.reason,
        visit_hour: termData.visit_hour,
        visit_time: termData.visit_time,
      }
    );

    return 'dodano rezerwację';
  }

  static async checkVisit(data: string, godzina: string, id_lek: string) {
    const [result] = await pool.execute<RowDataPacket[]>(
      "SELECT CASE WHEN EXISTS (SELECT * FROM `wizyty` WHERE `id_lekarza` = :id_lek AND `term_id` = :godzina )THEN 'TRUE' ELSE 'FALSE' END AS `wynik`",
      {
        id_lek,
        godzina,
      }
    );
    const { wynik } = result[0];
    const wynikBool = { wynik };

    return wynikBool;
  }
}

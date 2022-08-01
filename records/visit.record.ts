import { VisitEntity } from "../types/visit";
import { pool } from "../utils/db";
import {v4 as uuid} from "uuid";
import { RowDataPacket } from "mysql2";


export class VisitRecord implements VisitRecord {

    constructor(obj: VisitEntity){

    }

    async insert(termData: VisitEntity): Promise<string> {
        console.log("rezerwowanie wizyty");
        // console.log(termData);

        const [id_pacjentaJSON] = await pool.execute<RowDataPacket[]>("SELECT `user_id` FROM `dane_logowania` WHERE `login` = :login",{
            login: termData.login
        })
        const {user_id} = id_pacjentaJSON[0];
        // console.log("id_pacjenta", user_id);

        const [id_terminuJSON] = await pool.execute<RowDataPacket[]>("SELECT `id_terminu` FROM `grafik` WHERE `data` = :data AND `id_lekarza` = :id_lekarza",{
            data: termData.data + ' 02:00:00',
            id_lekarza: termData.id
        })
        const {id_terminu} = id_terminuJSON[0];
        // console.log("id_terminu", id_terminu);

        //1 - id_wizyty - uuid()
        //2 - id_lekarza - termData.id
        //3 - id_pacjenta - zapytanie z bazy za pomocą loginu
        //4 - id_terminu - można tez wyciagnac z bazy przez date i id lekarza
        //5 - term_id - termData.term_id
        //6 - reason_of_visit - termData.reason

        if(!termData.id_wizyty) {
            termData.id_wizyty = uuid();
        }

        await pool.execute("INSERT INTO `wizyty` (`id_wizyty`,`id_lekarza`,`id_pacjenta`,`id_terminu`,`term_id`,`reason_of_visit`) VALUES(:id_wizyty, :id_lekarza, :id_pacjenta, :id_terminu, :term_id, :reason_of_visit)", {
            id_wizyty: termData.id_wizyty,
            id_lekarza: termData.id,
            id_pacjenta: user_id,
            id_terminu: id_terminu,
            term_id: termData.term_id,
            reason_of_visit: termData.reason
        })
        
        return "dodano rezerwację";
    }
}
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
        console.log("id_pacjenta", user_id);

        const [id_terminuJSON] = await pool.execute<RowDataPacket[]>("SELECT `id_terminu` FROM `grafik` WHERE `data` = :data AND `id_lekarza` = :id_lekarza",{
            data: termData.data + ' 02:00:00',
            id_lekarza: termData.id
        })
        const {id_terminu} = id_terminuJSON[0];

        if(!termData.id_wizyty) {
            termData.id_wizyty = uuid();
        }

        console.log(termData);
        

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

    static async checkVisit(data: string, godzina: string, id_lek: string) {
        const [result] = await pool.execute<RowDataPacket[]>("SELECT CASE WHEN EXISTS (SELECT * FROM `wizyty` WHERE `id_lekarza` = :id_lek AND `term_id` = :godzina )THEN 'TRUE' ELSE 'FALSE' END AS `wynik`", {
            id_lek,
            godzina
        })
        const {wynik} = result[0];
        const wynikBool = {wynik};

        return wynikBool;
    }
}
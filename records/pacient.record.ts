import { PacientEntity } from "../types/pacient";
import { ValidationError } from "../utils/errors";
import {v4 as uuid} from "uuid";
import { pool } from "../utils/db";
import { FieldPacket, RowDataPacket } from "mysql2";

type PacientRecordResult = [PacientRecord[], FieldPacket[]];

export class PacientRecord implements PacientEntity {
    public id: string;
    public login: string;
    public password: string;
    public role: string;
    public name: string;
    public surname: string;
    public age: number;

    constructor(obj: PacientEntity) {
        // if(!obj.name || obj.name.length < 3 || obj.name.length > 25) {
        //     throw new ValidationError('Imie musi mieć od 3 do 25 znaków')
        // }

        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
        this.role = obj.role;
        this.name = obj.name;
        this.surname = obj.surname;
        this.age = obj.age;
    }

    async insert(): Promise<string> {
        if(!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `dane_logowania`(`user_id`,`login`,`haslo`,`rola`,`imie`,`nazwisko`) VALUES(:id, :login, :haslo, :rola, :imie, :nazwisko)",{
            id: this.id,
            login: this.login,
            haslo: this.password,
            rola: this.role,
            imie: this.name,
            nazwisko: this.surname
        })
        if(this.role == "pacjent"){
            await pool.execute("INSERT INTO `pacjenci`(`id_pacjenta`, `wiek`) VALUES (:id, :wiek)", {
                id: this.id,
                wiek: this.age
            })
        }
        
        return this.id;
    }

    static async listAll(): Promise<PacientRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `pacjenci` LEFT JOIN `dane_logowania` ON pacjenci.id_pacjenta = dane_logowania.user_id;")) as PacientRecordResult;

        // return results.map(obj => new PacientRecord(obj));
        return results;
    }

    static async getUser(login: string): Promise<Object | null>  {
        // console.log("szukam");
        const [result] = await pool.execute<RowDataPacket[]>("SELECT `user_id`,`name`,`surname` FROM `dane_logowania` WHERE login = :login", {
            login
        })
        // console.log(result);
        const{user_id, name, surname} = result[0];
        const user = {user_id, name, surname}

        return user;
    }

    static async getVisits(user_id: string): Promise<Object | null> {
        const [result] = await pool.execute<RowDataPacket[]>("SELECT * FROM `wizyty` WHERE `id_pacjenta` = :user_id", {
            user_id
        })

        return result;
    }

    static async getName(id_lekarza: string){
        const [result] = await pool.execute<RowDataPacket[]>("SELECT `name`,`surname` FROM `dane_logowania` WHERE `user_id` = :id_lekarza",{
            id_lekarza
        })

        const {name, surname} = result[0];
        const userName = {name, surname};

        return userName;
    }

    static async getSpec(id_lekarza: string){
        const [result] = await pool.execute<RowDataPacket[]>("SELECT `speciality` FROM `lekarze` WHERE `id_lekarza` = :id_lekarza", {
            id_lekarza
        })

        const {speciality} = result[0];
        const spec = {speciality};

        return spec;
    }

    static async getDate(id_terminu: string) {
        const [result] = await pool.execute<RowDataPacket[]>("SELECT `data` FROM `grafik` WHERE `id_terminu` = :id_terminu", {
            id_terminu
        })

        const {data} = result[0];
        const date = {data};

        return date;
    }

    static async getHour(term_id: string) {
        const [result] = await pool.execute<RowDataPacket[]>("SELECT `godzina_wizyty` FROM `godziny_wizyt` WHERE `term_id` = :term_id", {
            term_id
        })

        const {godzina_wizyty} = result[0];
        const hour = {godzina_wizyty};

        return hour;
    }

    static async getCities() {
        const [result] = await pool.execute("SELECT DISTINCT `city` FROM `lekarze`")

        return result;        
    }

    static async getSpecialities() {
        const [result] = await pool.execute("SELECT DISTINCT `speciality` FROM `lekarze`")

        return result;
    }

    static async cancelVisit(hour: string, user_id: string) {
        const [term] = await pool.execute<RowDataPacket[]>("SELECT `term_id` FROM `godziny_wizyt` WHERE `godzina_wizyty` = :hour", {
            hour
        })
        const {term_id} = term[0];
        const term_ID = {term_id}

        await pool.execute("DELETE FROM `wizyty` WHERE `id_pacjenta` = :user_id AND `term_id` = :term_ID",{ 
            user_id,
            term_ID: term_ID.term_id
        })
    }
}
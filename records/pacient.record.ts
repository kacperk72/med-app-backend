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

    // static getOne(id: string): Promise<PacientRecord | null> {

    // }

    // async update(): Promise<void> {

    // }

}
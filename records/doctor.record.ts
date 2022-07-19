import { DoctorEntity } from "../types";
import { ValidationError } from "../utils/errors";
import {v4 as uuid} from "uuid";
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

type DoctorRecordResult = [DoctorRecord[], FieldPacket[]];


export class DoctorRecord implements DoctorRecord {
    public id: string;
    public login: string;
    public password: string;
    public role: string;
    public name: string;
    public surname: string;
    public specialty: string;
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
        this.specialty = obj.specialty;
        this.city = obj.city;
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
        if(this.role == "lekarz"){
            await pool.execute("INSERT INTO `lekarze`(`id_pacjenta`, `specjalnosc`, `miasto`) VALUES (:id, :specialty, :city)", {
                id: this.id,
                specjalty: this.specialty,
                city: this.city
            })
        }
        
        return this.id;
    }

    static async listAll(): Promise<DoctorRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `lekarze` LEFT JOIN `dane_logowania` ON lekarze.id_lekarza = dane_logowania.user_id;")) as DoctorRecordResult;

        return results;
    }

    // static getOne(id: string): Promise<PacientRecord | null> {

    // }

    // async update(): Promise<void> {

    // }
}
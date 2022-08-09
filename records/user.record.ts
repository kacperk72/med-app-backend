import { UserEntity } from "../types/user";
import { pool } from "../utils/db";
import {v4 as uuid} from "uuid";
import { ValidationError } from "../utils/errors";
import { FieldPacket } from "mysql2";

type UserRecordResults = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
    id: string;
    name: string;
    surname: string;
    login: string;
    password: string;
    role: string;
    
    constructor(obj: UserEntity) {
        // if(!obj.name || obj.name.length < 3 || obj.name.length > 25) {
        //     throw new ValidationError('Imie musi mieć od 3 do 25 znaków')
        // }
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.login = obj.login;
        this.password = obj.password;
        this.role = obj.role;
    }

    async checkIfExsists(): Promise<Array<string>> {
        console.log("sprawdzanie");
        // //sprawdzenie czy taki login juz istnieje        
        const [result] = await pool.execute('SELECT * FROM `dane_logowania` WHERE `login`= :login',{
            login: this.login,
        }) as any;
        // console.log(result);
        return result; 
    }

    async save(): Promise<string> {
        console.log("dodawanie");
        
        if(!this.id) {
            this.id = uuid();
        }
        console.log(this.id, this.name, this.surname, this.login, this.password, this.role);
        
        await pool.execute("INSERT INTO `dane_logowania`(`user_id`, `name`,`surname`,`login`,`password`,`role`) VALUES (:id, :name, :surname, :login, :password, :role);",{
            id: this.id,
            name: this.name,
            surname: this.surname,
            login: this.login,
            password: this.password,
            role: this.role
        })

        await pool.execute("INSERT INTO `pacjenci`(`id_pacjenta`,`age`) VALUES (:id, 18)",{
            id: this.id,
        })
        return this.id;
    }

    async loginUser(loginQuery: string, passwordQuery: string): Promise<UserRecord | null> {
        console.log("logowanie użytkownika", loginQuery, passwordQuery);
        
        const [result] = await pool.execute("SELECT * FROM `dane_logowania` WHERE `login` = :loginQuery AND `password` = :passwordQuery", {
            loginQuery,
            passwordQuery
        }) as any;
        // console.log(result);
        return result[0];  
    }
}
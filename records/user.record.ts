import { UserEntity } from "../types/user";
import { pool } from "../utils/db";
import {v4 as uuid} from "uuid";
import { ValidationError } from "../utils/errors";



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

    async save(): Promise<string> {
        console.log("dodawanie");
        
        if(!this.id) {
            this.id = uuid();
        }
        console.log(this.id, this.name, this.surname, this.login, this.password, this.role);
        
        await pool.execute("INSERT INTO `dane_logowania`(`user_id`, `imie`,`nazwisko`,`login`,`haslo`,`rola`) VALUES (:id, :name, :surname, :login, :password, :role);",{
            id: this.id,
            name: this.name,
            surname: this.surname,
            login: this.login,
            password: this.password,
            role: this.role
        })
        return this.id;
    }

    async loginUser(): Promise<void> {
        console.log("logowanie");
        console.log(this.login, this.password);
              
        await pool.execute('SELECT `imie`,`nazwisko` FROM `dane_logowania` WHERE login=":login" && haslo=":password"', {
            login: this.login,
            password: this.password
        });              
        
    }
}
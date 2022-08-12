import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'bc2714eca589c8',
    password: '424fe55d',
    database: 'med_app',
    namedPlaceholders: true,
    decimalNumbers: true,
});

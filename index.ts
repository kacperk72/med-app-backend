import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import './utils/db';
import { pacientRouter } from "./routers/pacient";
import { doctorRouter } from "./routers/doctor";

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
}));
app.use(express.json()); // Content-type: application/json

app.use('/pacient', pacientRouter);
app.use('/doctor', doctorRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import './utils/db';

import { handleError } from "./utils/errors";
import { pacientRouter } from "./routers/pacient";
import { doctorRouter } from "./routers/doctor";
import { userRouter } from "./routers/user";
import { visitRouter } from "./routers/visit";

const app = express();

// app.use(cors({
//     origin: 'http://localhost:4200',
// }));
app.use(cors({
    origin: 'https://med-app-frontend-angular.herokuapp.com',
}));
app.use(express.json()); // Content-type: application/json

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/pacient', pacientRouter);
app.use('/doctor', doctorRouter);
app.use('/user', userRouter);
app.use('/visit', visitRouter);

app.use(handleError);

app.listen(process.env.PORT || 3001, () => {
    console.log('Listening on http://localhost:3001');
});

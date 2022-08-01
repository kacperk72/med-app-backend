import { Router } from "express";
import { PacientRecord } from "../records/pacient.record";
import { PacientEntity } from "../types/pacient";

export const pacientRouter = Router();

pacientRouter
    .get('/', async(req, res) => {
        const pacientList = await PacientRecord.listAll();

        res.json(pacientList);
    })

    .post('/', async (req, res) => {
        const newPacient = new PacientRecord(req.body as PacientEntity);
        await newPacient.insert();

        res.send(newPacient);
    })
    
    .get('/getUser/:login', async (req, res) => {
        const login = req.params.login;

        const user = await PacientRecord.getUser(login);

        res.json(user);
    })

    .get('/getVisits/:user_id', async (req, res) => {
        const user_id = req.params.user_id;

        const visits = await PacientRecord.getVisits(user_id);

        res.json(visits);
    })


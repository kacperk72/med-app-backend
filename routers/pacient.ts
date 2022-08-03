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

    .get('/getVisitData/:id_lekarza/:id_terminu/:term_id', async (req,res) => {
        const id_lekarza = req.params.id_lekarza;
        const id_terminu = req.params.id_terminu;
        const term_id = req.params.term_id;

        const name = await PacientRecord.getName(id_lekarza);

        const spec = await PacientRecord.getSpec(id_lekarza);

        const date = await PacientRecord.getDate(id_terminu);

        const hour = await PacientRecord.getHour(term_id);

        // console.log(name, spec, date, hour);

        const userData = {...name, ...spec, ...date, ...hour}

        // console.log((userData));

        res.json(userData)
    })

    .get('/getCities', async(req, res) => {
        const cities = await PacientRecord.getCities();

        res.json(cities);
    })

    .get('/getSpec', async(req, res) => {
        const specialities = await PacientRecord.getSpecialities();

        res.json(specialities);
    })

    .delete('/cancelVisit/:hour/:user_id', async(req,res) => {
        const hour = req.params.hour;
        const user_id = req.params.user_id;
        await PacientRecord.cancelVisit(hour,user_id);
    })


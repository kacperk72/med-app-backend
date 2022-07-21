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

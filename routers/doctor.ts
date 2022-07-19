import { Router } from "express";
import { DoctorRecord } from "../records/doctor.record";
import { DoctorEntity } from "../types";

export const doctorRouter = Router();

doctorRouter
    .get('/', async(req, res) => {
        const doctorList = await DoctorRecord.listAll();

        res.send(doctorList);
    })

    .post('/', async(req, res) => {
        const newDoctor = new DoctorRecord(req.body as DoctorEntity);
        await newDoctor.insert();

        res.send(newDoctor);
    })
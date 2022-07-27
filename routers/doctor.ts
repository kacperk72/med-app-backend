import { Router } from "express";
import { resolve } from "path";
import { DoctorRecord } from "../records/doctor.record";
import { DoctorEntity } from "../types";

export const doctorRouter = Router();

doctorRouter
    .get('/', async(req, res) => {
        const doctorList = await DoctorRecord.listAll();
        // console.log(doctorList);
        res.send(doctorList);
    })

    .get('/getOne/:login', async(req, res) => {
        // console.log("req body", req.body);
        const {body}: {
            body: DoctorRecord
        } = req;

        const doctorData = await DoctorRecord.getOne(req.params.login);

        // console.log("doctorData", doctorData)

        res.json(doctorData);
    })

    .get('/getSchedule/:login', async(req, res) => {
        console.log("req body", req.body);
        const {body}: {
            body: DoctorRecord
        } = req;

        const scheduleData = await DoctorRecord.getSchedule(req.params.login);

        res.json(scheduleData);
    })

    .post('/register', async(req, res) => {        
        const newDoctor = new DoctorRecord(req.body as DoctorEntity);
        console.log(newDoctor);
        
        await newDoctor.insert();

        res.send(newDoctor);
    })

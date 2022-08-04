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
        // console.log("req body", req.body);
        const {body}: {
            body: DoctorRecord
        } = req;

        const scheduleData = await DoctorRecord.getSchedule(req.params.login);

        res.json(scheduleData);
    })

    .get('/getHourList/:fromHour/:ToHour/:Date/:id', async(req, res) => {
        // console.log(req.params.id);
        
        const termData = await DoctorRecord.getTerm(req.params.fromHour, req.params.ToHour, req.params.Date, req.params.id)

        res.json(termData);
    })

    .post('/register', async(req, res) => {        
        const newDoctor = new DoctorRecord(req.body as DoctorEntity);
        // console.log(newDoctor);
        
        await newDoctor.insert();

        res.send(newDoctor);
    })

    .post('/addTerm', async(req, res) => {
        await DoctorRecord.addTerm(req.body.id, req.body.date, req.body.timeFrom, req.body.timeTo);

        res.send("dodano termin");
    })

    .patch('/update', async(req,res) => {
        console.log("update");
        // console.log(req.body.name);
        
        const updateDoctor = await DoctorRecord.update(req.body.id, req.body.name, req.body.surname, req.body.speciality, req.body.city )

        res.json(updateDoctor);
    })

    .delete('/delete/:doctorId', async(req,res) => {
        const doctorId = req.params.doctorId;
        console.log("usuwanie", doctorId);

        await DoctorRecord.delete(doctorId);
    })

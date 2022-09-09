import { Router } from 'express';
import { resolve } from 'path';
import { DoctorRecord } from '../records/doctor.record';
import { DoctorEntity } from '../types';

export const doctorRouter = Router();

doctorRouter
  .get('/', async (req, res) => {
    const doctorList = await DoctorRecord.listAll();
    res.send(doctorList);
  })

  .get('/getOne/:login', async (req, res) => {
    // console.log("req body", req.body);
    const {
      body,
    }: {
      body: DoctorRecord;
    } = req;

    const doctorData = await DoctorRecord.getOne(req.params.login);

    console.log(doctorData);

    res.json(doctorData);
  })

  .get('/getSchedule/:login', async (req, res) => {
    const scheduleData = await DoctorRecord.getSchedule(req.params.login);
    res.json(scheduleData);
  })

  .get('/getFormSchedule/:login', async (req, res) => {
    // console.log(req.query);
    const url = require('url');
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    // console.log(query);

    const searchForm = {
      role: query.role,
      city: query.city,
      dateFrom: query.dateFrom,
      dateTo: query.dateTo,
      timeFrom: query.timeFrom,
    };

    // console.log(searchForm);

    const scheduleData = await DoctorRecord.getFormSchedule(
      req.params.login,
      searchForm
    );
    // console.log(scheduleData);
    res.json(scheduleData);
  })

  .get(
    '/getHourSchedule/:id_terminu/:id_lekarza/:visitTime',
    async (req, res) => {
      const scheduleData = await DoctorRecord.getHourSchedule(
        req.params.id_terminu,
        req.params.id_lekarza,
        req.params.visitTime
      );
      res.json(scheduleData);
    }
  )

  .get(
    '/getHourList/:fromHour/:ToHour/:Date/:id/:id_terminu',
    async (req, res) => {
      // console.log(req.params.id);

      const termData = await DoctorRecord.getTerm(
        req.params.fromHour,
        req.params.ToHour,
        req.params.Date,
        req.params.id,
        req.params.id_terminu
      );

      res.json(termData);
    }
  )

  .get('/getBookedTerms/:id_lek', async (req, res) => {
    const bookedTermsData = await DoctorRecord.getBookedTerms(
      req.params.id_lek
    );

    res.json(bookedTermsData);
  })

  //   .get('/getHourFromTerm/:term_id', async (req, res) => {
  //     const term_id = await DoctorRecord.getTermHour(req.params.term_id);
  //     res.json(term_id);
  //   })

  .get('/getOnePacient/:id_pacjenta', async (req, res) => {
    const user = await DoctorRecord.getOnePacient(req.params.id_pacjenta);
    res.json(user);
  })

  .get('/getDateFromTerm/:id_terminu', async (req, res) => {
    const date = await DoctorRecord.getDateFromTerm(req.params.id_terminu);
    res.json(date);
  })

  .post('/register', async (req, res) => {
    const newDoctor = new DoctorRecord(req.body as DoctorEntity);
    // console.log(newDoctor);

    await newDoctor.insert();

    // res.send(newDoctor);
  })

  .post('/addTerm', async (req, res) => {
    await DoctorRecord.addTerm(
      req.body.id,
      req.body.date,
      req.body.timeFrom,
      req.body.timeTo
    );
  })

  .patch('/update', async (req, res) => {
    await DoctorRecord.update(
      req.body.id,
      req.body.name,
      req.body.surname,
      req.body.speciality,
      req.body.city
    );
  })

  .patch('/updateTerm', async (req, res) => {
    await DoctorRecord.updateTerm(
      req.body.id_terminu,
      req.body.timeF,
      req.body.timeT
    );
  })

  .delete('/delete/:doctorId', async (req, res) => {
    await DoctorRecord.delete(req.params.doctorId);
  })

  .delete('/cancelVisit/:id_wizyty', async (req, res) => {
    await DoctorRecord.cancelVisit(req.params.id_wizyty);
  })

  .delete('/deleteTerm/:id_terminu', async (req, res) => {
    await DoctorRecord.deleteTerm(req.params.id_terminu);
  });

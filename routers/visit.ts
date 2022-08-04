import { VisitEntity } from "../types/visit";
import { Router } from "express";
import { VisitRecord } from "../records/visit.record";

export const visitRouter = Router();

visitRouter
    .post('/', async (req, res) => {
        const newVisit = new VisitRecord(req.body as VisitEntity)
        // console.log(req.body);
        await newVisit.insert(req.body);
        
        res.send(newVisit);
    })
    .get('/check/:data/:godzina/:id_lek', async (req, res) => {
        const data = req.params.data;
        const godzina = req.params.godzina;
        const id_lek = req.params.id_lek;

        const visit = await VisitRecord.checkVisit(data, godzina, id_lek);

        res.send(visit);
    })
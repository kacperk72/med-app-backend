import { VisitEntity } from "../types/visit";
import { Router } from "express";
import { VisitRecord } from "../records/visit.record";

export const visitRouter = Router();

visitRouter
    .post('/', async (req, res) => {
        const newVisit = new VisitRecord(req.body as VisitEntity)
        // console.log(req.body);
        await newVisit.insert(req.body);
        res.send("dodano rezerwację");
    })
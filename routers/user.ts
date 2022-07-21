const express = require("express");
import { Router } from "express";
import { UserRecord } from "../records/user.record";
import { UserEntity } from "../types/user";
const jwt = require('jsonwebtoken');

export const userRouter = Router();

userRouter
    .post('/login',async (req, res) => {
        const user = new UserRecord(req.body as UserEntity)
        await user.loginUser()
            .then(result => {
                console.log(req.body.login);
                
                const token = jwt.sign({login: req.body.login, password: req.body.password}, 'secret_key_for_json_token',
                {
                    expiresIn: "1h"
                });
                res.status(200).json({
                    token,
                    result
                })
            })
            .catch(e => {
                res.status(500).json({
                    error: e
                })
            })
        
    })
    .post('/register', async (req, res) => {     
        const newUser = new UserRecord(req.body as UserEntity);
        await newUser.save()
        .then(result => {
            res.status(201).json({
                message: "User created",
                result
            })
        })
        .catch(e => {
            res.status(500).json({
                error: e
            })
        })
    })

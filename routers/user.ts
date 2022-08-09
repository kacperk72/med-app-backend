const express = require("express");
import { Router } from "express";
import { UserRecord } from "../records/user.record";
import { UserEntity } from "../types/user";
const jwt = require('jsonwebtoken');

export const userRouter = Router();


userRouter
    .post('/login',async (req, res) => {
        const user = new UserRecord(req.body as UserEntity)
                // console.log("req body", req.body);
        
        await user.loginUser(req.body.login, req.body.password)
            .then(result => {
                // console.log(result);
                const token = jwt.sign({login: result.login, password: result.password, role: result.role}, 'secret_key_for_json_token',
                {
                    expiresIn: "1h"
                });
                // console.log(token);
                
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
        const userAlreadyExsist = await newUser.checkIfExsists();
        // console.log(userAlreadyExsist.length);
        
        if(userAlreadyExsist.length != 0){
            console.log("User already exsist, can not create");
            res.status(409).json({
                message: "User with that login already exists"
            })
        } else {
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
        }
        
    })

import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function cadastro(req, res) {
    const {name, email, password, adress} = req.body;
    try {
        const userOk = await db.collection('user').findOne({email});
        if (userOk) return res.sendStatus(409);
        const hash = bcrypt.hashSync(password, 10);
        await db.collection('user').insertOne({name, email, password: hash, adress, carrinho: []});
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function login(req, res) {
    const {email, password} = req.body;
    try {
        const emailOk = await db.collection('user').findOne({email});
        if (!emailOk) return res.sendStatus(404);
        const passOk = bcrypt.compareSync(password, emailOk.password);
        if (!passOk) return res.sendStatus(401);
        const token = uuid();
        await db.collection("section").insertOne({idUser: emailOk._id, token});
        res.status(200).send({name: emailOk.name, token});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function logout(req, res){
    const { tokenOk } = res.locals;
    try {
        const deleted = await db.collection('section').deleteOne({token: tokenOk.token});
        if (deleted.deletedCount > 0){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
import { db } from "../database/database.connection.js";

export async function postProduct(req, res) {
    const {name, image, value, category, description} = req.body;
    
    try {
        const productOk = await db.collection('products').findOne({name});
        if (productOk) return res.sendStatus(409);

        await db.collection('products').insertOne({name, image, value, category, description});
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb"

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

export async function getProducts(req, res) {
    try {
        const products = await db.collection("products").find().toArray()
        res.send(products)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getProductById(req, res) {
    const { id } = req.params
    
    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) })
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getProductByCategory(req, res){
    const { category } = req.params;
    try {
        const products = await db.collection("products").find({category: category}).toArray();
        res.send(products);
    } catch (err) {
        res.status(500).send(err.message)
    }
}
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
        const products = await db.collection("products").find({category: category.replace('-',' ')}).toArray();
        res.send(products);
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function postProductMany(req, res) {
    const {list} = req.body;
    
    try {
        await db.collection('products').insertMany(list);
        await db.collection('products').find().toArray();
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function addCarrinho(req, res) {
    const {idProduct} = req.body;
    const {idUser} = res.locals.tokenOk;
    try {
        const info = await db.collection('user').findOne({_id: idUser});
        await db.collection('user').updateOne(
            {_id: idUser},
            {$set: {carrinho: [... info.carrinho, idProduct]}}
        )
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
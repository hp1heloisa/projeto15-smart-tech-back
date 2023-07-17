import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb"
import dayjs from "dayjs";

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
        const infoUser = await db.collection('user').findOne({_id: idUser});
        const infoProduct = await db.collection('products').findOne({_id: new ObjectId(idProduct)});
        await db.collection('user').updateOne(
            {_id: idUser},
            {$set: {carrinho: [... infoUser.carrinho, infoProduct]}}
        )
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function searchProduct(req, res) {
    const {world} = req.query;
    try {
        const listName = await db.collection('products').find({name: {$regex: world, $options: 'i'}}).toArray();
        const listCategory = await db.collection('products').find({category: {$regex: world, $options: 'i'}}).toArray();
        const list = [...listName, ...listCategory];
        res.send(list);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getCarrinho(req, res){
    const { tokenOk } = res.locals;
    try {
        const carrinho = [];
        const user = await db.collection('user').findOne({_id: new ObjectId(tokenOk.idUser)});
        user.carrinho.forEach(produto => {
            let tem = false;
            let index = 0;
            for (let i = 0; i<carrinho.length; i++){
                if (carrinho[i][0].name == produto.name){
                    tem = true;
                    index = i;
                    break
                }
            }
            if (tem){
                carrinho[index][1]++;
            } else{
                carrinho.push([produto,1]);
            }
        })
        res.send(carrinho);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function limpaCarrinho(req,res){
    const { tokenOk } = res.locals;
    try {
        const user = await db.collection('user').updateOne(
            {_id: new ObjectId(tokenOk.idUser)},
            {$set: {carrinho: []}}
            );
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function sendOrder(req, res){
    const {value, method} = req.body;
    const { tokenOk } = res.locals;
    const dataAtual = dayjs();

    try {
        const user = await db.collection('user').findOne({_id: new ObjectId(tokenOk.idUser)});

        const order = {
            idUser: user._id,
            value: value,
            method: method,
            products: user.carrinho,
            time: dataAtual.format('DD-MM-YYYY')
        }

        await db.collection('orders').insertOne(order);

        res.status(201).send(order);

    } catch (error) {
        res.status(500).send(error.message);
    }
}
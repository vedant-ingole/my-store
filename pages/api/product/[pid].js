/* eslint-disable import/no-anonymous-default-export */

import Product from '../../../models/Product';
import initDB from '../../../helpers/initDB';

initDB();

export  default async (req, res) => {

    switch (req.method) {
        case "GET":
            getProduct(req, res);       
            break;
        case "DELETE":
            deleteProduct(req, res);       
            break;
    
        default:
            break;
    }
}


// DB CRUD op functions

const getProduct = async (req, res) => {
    try{
        const { pid } = req.query;    // console.log(req.query)
        const product = await Product.findOne({ _id: pid}); 
        res.status(200).json(product);
    } catch(err) {
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    try{
        const { pid } = req.query;
        const product = await Product.findByIdAndDelete({ _id: pid})
        res.status(200).json(product);
    } catch(err) {
        console.log(err);
    } 
}
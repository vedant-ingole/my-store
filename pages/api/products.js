// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import initDB from "../../helpers/initDB";
import Product from '../../models/Product';

initDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async  (req, res) => {
        switch (req.method) {
            case "GET":
                await getAllProducts(req, res);
                break;
            case "POST":
                await addProduct(req, res);
                break;
        
            default:
                break;
        }
}


const getAllProducts = async (req, res) => {
    try{
       const products = await Product.find();
       res.status(200).json(products);
    } catch(err) {
        console.log(err);
    }
}

const addProduct = async (req, res) => {
    const { name, price, mediaUrl, description} =  req.body;
    
    try{

        if(!name || !price || !description || !mediaUrl ){
           return  res.status(422).json({ error: "Please add all the fields" })
        }
        const product = await new Product ({
            name,
            price,
            description,
            mediaUrl
        }).save();
        res.status(201).json(product);
    } catch(err) {
        console.log(err);
    }
}
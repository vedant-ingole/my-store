/* eslint-disable import/no-anonymous-default-export */
import initDB from '../../helpers/initDB' ; 
import User from '../../models/User';
import bcrypt from 'bcryptjs';

initDB();


export default async (req, res) => {
    const { name, email, password } = req.body;

    try{
        if(!name || !email || !password ){
          return  res.status(422).json({error: "Add all the fields"})
        }
        const user = await User.findOne({email});
        if(user){
            res.status(422).json({error: "User with this email already exists"})
        }
        const hashPassword = await bcrypt.hash( password , 12 );
        const newUser = await new User ({
            name,
            email,
            password:hashPassword
        }).save();
        console.log(newUser);
        res.status(201).json({message:"Signed up successfully"})
    } catch(err) {
        // return res.status(500).json({error: "Internal server error"});
        console.log(err);
    }
}
/* eslint-disable import/no-anonymous-default-export */

import initDB from '../../helpers/initDB'
import baseUrl from '../../helpers/baseUrl'
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// initDB();

const Main =  async (req, res) => {

    const { email, password } = req.body;

    try{
        if( !email || !password ) {
            res.status(422).json({ errror: "Enter all details"})
        } 
        const user = await User.findOne({ email });
        if(!user) {
            res.status(422).json({error: "User does not exists"})
        }
        const doMatch  = await bcrypt.compare(password, user.password);
        if(doMatch) {
          const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
               expiresIn: "7d"
          })
          res.status(201).json({token});
        } else{
            res.status(401).json({error:"Invalid credentinals"})
        }
        // res.status(200).json({message: "Login successful"})
    } catch(err){
        console.log(err);
    }
}


export default Main;
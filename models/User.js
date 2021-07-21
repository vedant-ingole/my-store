import mongoose, { Mongoose } from 'mongoose';
// var Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum:[ "user", "root", "admin" ]
    }
},{
    timestamps:true
})

export default mongoose.models.User || mongoose.model("User", userSchema);


// mongoose.models = {};

// var User = mongoose.model("User", userSchema);

// export default User;

// export default mongoose.models.user || mongoose.model("user", userSchema);
// module.exports = mongoose.model.User || mongoose.models("User", userSchema);

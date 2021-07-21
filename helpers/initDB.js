import mongoose, { connect } from 'mongoose';


function initDB() {
    if(mongoose.connections[0].readyState){
        console.log('Already connected');
        return ;
    } 
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    mongoose.connection.on('connected', () => {
        console.log('connected to db');
    })
    mongoose.connection.on('error', () => {
        console.log('error in connection');
    })  
}

export default initDB;



// const initDB = handler => async (req, res) => {
//     if(mongoose.connections[0].readyState){
//         console.log('Already connected');
//         return handler(req, res);
//     } 
    
//     await mongoose.connect(process.env.MONGO_URI,{
//         useNewUrlParser:true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify:false 
//     })
//     return handler(req, res)
    // mongoose.connection.on('connected', () => {
    //     console.log('connected to db');
    // })
    // mongoose.connection.on('error', () => {
    //     console.log('error in connection');
    // })  
// }

// export default initDB;




// const connection = {};

// async function initDB() {
//     if (connection.isConnected) {
//         return;
//     }

//     const db = await mongoose.connect(process.env.MONGO_URI,{
//                 useNewUrlParser:true,
//                 useUnifiedTopology: true,
//                 useCreateIndex: true 
//             });

//             connection.isConnected = db.connections[0].readyState;
//             console.log(connection.isConnected);
// }

// export default initDB;
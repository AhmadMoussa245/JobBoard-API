import mongoose from 'mongoose';
import app from './app.js';
import 'dotenv/config'

const PORT=process.env.PORT ;
const URL=process.env.URL;

mongoose.connect(URL).then(con=>{
    console.log('DB connection success');
});


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')
const morgan = require("morgan");
// const bodyParser = require('body-parser');

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));


//Middlewares
app.use('/posts',(req,res, next)=>{
    console.log('This is a middleware running');
    next();
})

 

//import routes
const postsRoute = require('./routes/posts');

app.use('/posts',postsRoute);



//connect to DB
async function connectToDatabase() {
  try {
    process.env.DB_CONNECTION
    // await mongoose.connect('mongodb+srv://ritin123:mongoritin123@cluster0.2edljxp.mongodb.net/?retryWrites=true&w=majority');
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

connectToDatabase();


const port  = process.env.PORT || 3000;
app.listen(port ,()=>{
    console.log("App listening at http://localhost:"+port)
});
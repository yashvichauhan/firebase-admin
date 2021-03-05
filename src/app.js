const express = require('express');
const bodyparser =require('body-parser');
const cors = require('cors');

const userRoute=require('./routes/userRoute');

//APP 
const port = process.env.PORT || 4004;
const app = express();
//MIDDLEWARE
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
//ROUTES MIDDLEWARES
app.use(userRoute);

//LISTEN
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

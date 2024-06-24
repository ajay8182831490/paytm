const express = require("express");

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

const userRouting = require('./router/userRouting');
const accountRouting = require('./router/accountRouting')
app.use('/user', userRouting);
app.use('/account', accountRouting);


app.listen(3000, () => {
    console.log("server is running on port no 3000")
})
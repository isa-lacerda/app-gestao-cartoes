const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(cors());

app.use(express.json());


//DB Connection

const conn = require('./db/conn.js');

conn();

//routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

const routes = require("./routes/router");
app.use("/api", routes);



//app.listen(PORT, HOST);


app.listen(PORT, HOST, function(){
    console.log("Servidor Online!");
}); 


//wUe6ji1ZYVBOZfpK










































                                                        
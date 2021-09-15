const express = require('express');
const app = express();

app.get('/', (req,res)=> res.send("Hello!"));


// It will look for an environment variable called PORT
// locally we will run it on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port... ${PORT}`);
});
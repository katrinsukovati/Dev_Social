const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Connect database
connectDB();

app.get('/', (req,res)=> res.send("API is running..."));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));


// It will look for an environment variable called PORT
// However, locally we will run it on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening on port... ${PORT}`);
});
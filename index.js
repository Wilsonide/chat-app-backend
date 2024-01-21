const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/connectDb');
const { errorHandler } = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const app = express();

connectDB() 
app.use(express.json());
app.use(cors());
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/chat',require('./routes/chatRoutes'));
app.use('/api/messages',require('./routes/messageRoutes'));
app.use(errorHandler)


const port = process.env.PORT||5000;

app.listen(port,()=>
  console.log('listening on port '+port)
)


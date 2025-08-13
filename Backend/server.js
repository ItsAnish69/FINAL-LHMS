const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require("cors");
require("jsonwebtoken")
const app = express();

app.use(express.json());

//connects the frotend with the backend
app.use(cors({
    origin: process.env.ORIGIN_CORS, // Adjust this to your frontend URL
    credentials: true,
}));

//connect to the mongoDB
mongoose.connect("mongodb://localhost:27017/test")
.then(() => {console.log("Connected to the mongoDB")})
.catch((err) => {console.log(err);});

const BookRoutes = require('./routes/bookRoutes');
const BorrowRoutes = require('./routes/borrowRoutes');
const UserRoutes = require('./routes/userRoutes');
const AuthRoutes = require('./routes/authRoutes');

// organize the routes
app.use('/api/user',UserRoutes);
app.use('/api/borrow', BorrowRoutes);
app.use('/api/book', BookRoutes);
app.use('/api/auth', AuthRoutes);

//default route
app.get('/', (req, res) => {
    res.send("Welcome to the Library Management System");
});

//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
}); 

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("connected to server"));
const mongoose = require("mongoose");

// const URI = 'mongodb://127.0.0.1/Education';
const URI = 'mongodb+srv://vm4595228:vishal123@cluster0.j1kdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => { // Fixing the typo here
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connection successful to database');
    } catch (error) {
        console.error('Connection to database failed:', error);
    }
};

module.exports = connectDB;

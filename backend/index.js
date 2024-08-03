const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const appRoutes = require("./routes/accManagerRoutes");
const Path = require("path");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (cors(
    
))
app.use(bodyParser.json());
app.use ("", appRoutes)


// Connect to MongoDB and Start the server after connection to DB
mongoose.connect(process.env.MONGO_URI, {
})

.then(() => console.log("MongoDB connected"))

.then(() => { 
    app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});


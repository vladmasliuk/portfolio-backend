const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
.then(()=> console.log('DB is connected'))
.catch((err)=> console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);

app.listen(8800, ()=>{
    console.log('Server is runing');
})

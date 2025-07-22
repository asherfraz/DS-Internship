const express = require("express")
const morgan = require('morgan')
const { PORT } = require("./config/dotenv.js")
const viewsRoutes = require("./routes/views.routes.js")
const userRoutes = require("./routes/user.routes.js")
const connectDB = require("./DBconnect.js")


const app = express()
connectDB();

// Third-party middlewares
app.set("view engine", 'ejs')
// app.use(morgan('dev'))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// setting up routes
app.use("/", viewsRoutes);
app.use("/user", userRoutes);


app.listen(PORT, () => {
    console.log("Server is Running on PORT: ", PORT);
})

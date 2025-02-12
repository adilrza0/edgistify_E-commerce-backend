const express =require("express")
const connection = require("./config/db")
const router = require("./routes")
const cors = require("cors")

require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api",router)


app.listen(process.env.port||3000, async ()=>{
    await connection
    console.log("Connected to the database")
    console.log("Server is running on port "+process.env.port)
})
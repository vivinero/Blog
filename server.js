const express = require("express")
require("./config/config")
const blogRouter = require("./routes/blogRouter")
const commentRouter = require("./routes/commentRouter")
const port = process.env.port

const app = express()
app.use(express.json())
app.use("/api/v1", blogRouter)
app.use("/api/v1", commentRouter)



app.listen(port, ()=> {
    console.log(`server is listening on port: ${port}`)
})

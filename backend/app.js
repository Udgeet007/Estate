import express from "express"

const app = express();

app.use("/api/test", (req,res) => {
  res.send("Its Works!")
})

app.listen(8800,()=>{
  console.log("Server is Running!");
})
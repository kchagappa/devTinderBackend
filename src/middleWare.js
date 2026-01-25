const express = require("express")

const app = express()

const port = 8080
app.listen(port, () => {
    console.log("port running on:", port)
})

app.use("/user", (req, res, next) => {
    let namew = "chagappa"
    console.log(req.query.name)
    if (namew === req.query.name) {
        next()
    } else {
        res.send("Authontication Failed").code(400)
    }
})

app.get("/user/getUser", (req, res) => {
    console.log("users")
    res.send("nameee")

})

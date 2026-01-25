const mongoose = require('mongoose')

const connectDatabase = async () => {
    await mongoose.connect(
        "mongodb+srv://kchaga023_db_user:3pN5e5WMaiqXXaHO@namastenodejs.n5c7ud8.mongodb.net/devTinder"
    )
}


module.exports = connectDatabase

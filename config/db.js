const { default: mongoose } = require("mongoose");

exports.dbConfig = () =>{
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => console.log('DB Connection Error:', err.message));
}
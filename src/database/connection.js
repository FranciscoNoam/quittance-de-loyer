const mongoose = require("mongoose");

const username = "quittance_loyer";
const password = "quittance_loyer";
const url = `mongodb+srv://${username}:${password}@cluster0.gpmqiwz.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);

const connectDB = async() => {
    try {
        await mongoose
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((conn) => {
                console.log("Connecté avec mongoDB");
                return conn;
            })
            .catch((err) => {
                console.log("Erreur lors de la connection à MongoDB: ", err);
            });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};


module.exports = connectDB;

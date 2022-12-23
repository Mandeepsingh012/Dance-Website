const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const port = 8000;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/harryKart');

}
// define Mongoose Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// Express Specific Stuff
app.use("/static", express.static("static"));   // For serving the static files
app.use(express.urlencoded());


// Pug specific stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// body-parser specific stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// End points
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params)
});

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("contact.pug", params)
});

app.post("/contact", (req, res) => {
    const myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.send("This item has been saved to the database")
        }).catch(() => {
            res.status(400).send("The item has not saved to the database")
        });

});


// Start the server
app.listen(port, () => {
    console.log(`The application has been successfully started on ports ${port}`);
});
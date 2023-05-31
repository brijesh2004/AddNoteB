const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const cookiesParsar = require("cookie-parser");
const Add = require("../model/register");
const cors = require("cors");

const authenticate = require("../middleware/authenticate");
router.use(cookiesParsar());

router.use(
  cors({
    credentials: true,
    origin: ['https://addnotess.onrender.com'],
    methods: ['POST', 'GET'],
    allowedHeaders: ["Content-Type", "Authorization"]
  }))

router.get("/", (req, res) => {

  res.send("router home page");
});
router.post('/addNote', async (req, res) => {
  res.header('Access-Control-Allow-Origin', `https://addnotess.onrender.com`);
  try {
    const { email, title, message } = req.body;

    if (!email || !title || !message) {
      console.log("error in add Notes Page");
      return res.status(401).json({ message: "please fill all the fields" });
    }
    const dataExist = await Add.findOne({ email });

    if (dataExist) {
      const userMessage = await dataExist.addMessage(title, message);
      await dataExist.save();
    }
    else {
      const newNote = new Add({ email});
      await newNote.save();
      // const dataExistornot = await Add.findOne({ email });
      const userMessage = await newNote.addMessage(title, message);
      await newNote.save();
    }

    res.status(201).json({ message: "Note saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});


router.post('/pullthedata', async (req, res) => {
  res.header('Access-Control-Allow-Origin', `https://addnotess.onrender.com`);
  try {
    const { email } = req.body;
    const dataExist = await Add.find({ email });
    console.log(dataExist);
    if (dataExist) {
      res.send(dataExist);
    } else {
      res.status(401).send("Data does not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

module.exports = router;

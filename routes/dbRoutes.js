const express = require('express');
const router = express.Router();

//importing controller 
const {addToDB} = require("../controllers/addDB");
const {fetchFive} = require("../controllers/fetchDB");
const { delFromDB } = require('../controllers/delDB');

//defining API route for adding

router.post("/createEntry", addToDB); //for adding in DB
router.get("/fetchFive", fetchFive); // for fetching last five entries
router.delete("/deleteById/:id", delFromDB); // for deleteing from history


module.exports = router;
//importing model
const musicSchema = require("../models/musicAdd");

const addToDB = async(req,res) => {
    try {
        //extract title and other details from req(sent from front end)
        const {title, subtitle, imageUrl} = req.body;
        console.log(imageUrl);
        //creating an Obj and inserting in DB
        const response = await musicSchema.create({title, subtitle, imageUrl});
        //sending a JSON response
        res.status(200).json({
            success:true,
            message:"Entry created in DB",
            data: response,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addToDB}
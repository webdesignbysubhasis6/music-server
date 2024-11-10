const musicSchema = require("../models/musicAdd");

const fetchFive = async(req,res) => {
    try {
        //fetch all song entries from DB
        const entries = await musicSchema.find().sort({ createdAt: -1 }).limit(6);
        res.status(200).json({
            success:true,
            data:entries,
            message:"All Entries Fetched",
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {fetchFive};
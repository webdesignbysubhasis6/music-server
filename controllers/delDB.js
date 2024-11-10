//importing the model

const musicSchema = require("../models/musicAdd");

const delFromDB = async (req, res) => {
  try {

    const {id} = req.params;
    await musicSchema.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Entry deleted in DB",
    })
  } catch (error) {
    console.log(error);
  }
};

module.exports = {delFromDB};

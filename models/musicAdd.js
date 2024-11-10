const mongoose = require('mongoose')

const musicSchema = mongoose.Schema(
    {
        title:{
            type:String
        },

        subtitle:{
            type:String
        },
        imageUrl:{
            type:String
        },
        dateCreated:{
            type:Date,
            default:Date.now(),
        }
    }
)

module.exports = mongoose.model("musicSchema", musicSchema);
const express = require("express");
const app = express();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const FormData = require("form-data");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json()); //used as middleware for json file
// app.use(express.static('uploads')); // so that upload folder is publically accessible
app.use(express.urlencoded({ extended: false })); //if formata is other than JSON type/text type
app.use(cors());

const PORT = process.env.PORT || 4000;

//setting up multer to save file in disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
    }
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/api/v1/upload", upload.single('audio'), async (req, res) => {
  try {
    console.log(req.file);
    const recognitionResult = await sendToRecog(req.file.path);
    const {matches} = recognitionResult;
    console.log(matches);
    if(matches && matches.length>0)
    {
      console.log("This is recognition result: ", recognitionResult);
      const { title, subtitle } = recognitionResult.track;
      const {images:{background}} = recognitionResult.track;
      console.log(`Title: ${title} Subtitle: ${subtitle}`);
      const musicData = {title, subtitle, background};
      res.status(200).json(musicData);
    }

    else{
      res.status(200).json({message:"Music not found"})
    }
    
    // res.status(200).send("File Uploaded");
  } catch (error) {
    console.error(error);
    res.status(500).send("File Not Uploaded");
  }
});

//sending received file to recognition
const sendToRecog = async (filePath) => {
  const data = new FormData();
  const fileStream = fs.createReadStream(filePath);
  data.append("audio", fileStream);

  // console.log("Form-Data:", data);

  const options = {
    method: 'POST',
    url: 'https://shazam-core7.p.rapidapi.com/songs/recognize-song',
    headers: {
      'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
      'x-rapidapi-host': 'shazam-core7.p.rapidapi.com',
      ...data.getHeaders(),
    },
    data: data
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  
  finally {
  await unlinkAsync(filePath); //deleting after upload done
  }
};

//defining routes realte to DB
const dbRoutes = require('./routes/dbRoutes');

app.use("/api/v1/", dbRoutes);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("This is homepage");
});

//connecting to DB
const connectDB = require('./config/connectDB');
connectDB();
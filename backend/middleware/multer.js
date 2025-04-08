import multer from "multer";

// Configure storage settings
const storage = multer.diskStorage({
    // Setting the filename to be the original file name
    filename: function(req,file,callback){
        callback(null,file.originalname)
        }
})
// Create an upload instance with the configured storage
const upload = multer({storage})

export default upload
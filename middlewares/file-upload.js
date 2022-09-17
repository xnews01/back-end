const { v4: uuidv4} = require('uuid');
const { ObjectId } = require('mongodb');
const multer = require('multer');


const MIME_TYPE= {
    'image/png': 'png' ,
    'image/jpeg': 'jpeg' ,
    'image/jpg': 'jpg'
}
const fileUploader = multer({
    limits: 2000000,
    storage: multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, 'data/images');
        },
        filename: (req, file, cb)=> {
            const ext = MIME_TYPE[file.mimetype];
            cb(null, uuidv4() + '.' + ext)
            console.log(fileUploader.path)
        }
    })
});



module.exports = fileUploader;
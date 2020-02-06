import multer from 'multer'
import path from 'path'

function uploadHelper(dest) {
    let storage = multer.diskStorage({
        destination: dest,
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' +
                Date.now() +
                path.extname(file.originalname))
        }
    }),
        upload = multer({
            storage
        })
    return upload
}

export { uploadHelper }
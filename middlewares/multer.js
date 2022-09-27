import multer from 'multer'

//Store in memory as a buffer
const multerStorage = multer.memoryStorage()

const multerFilter = function (req, file, cb) {
	//Only allow image files to be uploaded
	if (file.mimetype.startsWith('image')) return cb(null, true)

	// Nope! Not here fam! Error time🤖.
	return cb(
		new Error('Incorrect file format. Please ensure files is of type Image'),
		false
	)
}

const multerConfig = { storage: multerStorage, fileFilter: multerFilter }
const upload = multer(multerConfig)
const uploadMiddleware = upload.single('product')

export default uploadMiddleware

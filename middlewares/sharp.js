import path from 'path'
import sharp from 'sharp'
import { nanoid } from 'nanoid'

function sharpHandler(handler) {
	return async function (req, res) {
		if (req.file) {

			const imagesFilePath = path.join(process.cwd(), 'public', 'images', 'products')
			const imageName = `product-${nanoid()}-${Date.now()}.jpeg`

			await sharp(req.file.buffer)
				.resize(1000, 1000)
				.toFormat('jpeg')
				.jpeg({ mozjpeg: true })
				.toFile(imagesFilePath + '/' + imageName)

			req.file.filename = imageName
		}
		return handler(req, res)
	}
}

export default sharpHandler

import path from 'path'
import sharp from 'sharp'
import { nanoid } from 'nanoid'

/** resize images, conver to jpeg, save image name to file*/
function imageResizeHandler(handler) {
	return async function (req, res) {
		const imagesFilePath = path.join(process.cwd(), 'public', 'images', 'products')

		if (req.files.imageCover) {
			// Handle cover image
			try {
				const coverImageName = `product-${nanoid()}-${Date.now()}-cover.jpeg`
				await sharp(req.files.imageCover[0].buffer)
					.resize(2000, 1333)
					.toFormat('jpeg')
					.jpeg({ mozjpeg: true })
					.toFile(imagesFilePath + '/' + coverImageName)

				req.files.imageCover = coverImageName
			} catch (error) {
				throw new Error(error)
			}
		}

		if (req.files.images) {
			try {
				//Handle Images
				const imagesNamesArr = await req.files.images.map(async (image, i) => {
					const imageName = `product-${nanoid()}-${Date.now()}-${i + 1}.jpeg`
					await sharp(image.buffer)
						.resize(2000, 1333)
						.toFormat('jpeg')
						.jpeg({ mozjpeg: true })
						.toFile(imagesFilePath + '/' + imageName)

					return imageName
				})

				req.files.images = await Promise.all(imagesNamesArr)
			} catch (error) {
				throw new Error(error)
			}
		}

		return handler(req, res)
	}
}

export default imageResizeHandler

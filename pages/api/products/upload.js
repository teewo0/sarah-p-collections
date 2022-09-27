import nextConnect from 'next-connect'

import sharpHandler from '../../../middlewares/sharp'
import uploadMiddleware from '../../../middlewares/multer'
import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/product-model'

const handler = nextConnect({
	onNoMatch: function (req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	},
	onError: (err, req, res, next) => {
		
		res.status(500).end('Something broke!')
	},
})

handler.use(uploadMiddleware)

handler.post(
	sharpHandler(async (req, res) => {
		try {
			await dbConnect()

			const productObj = { ...req.body }
			if (req.file) {
				productObj.imageCover = req.file.filename
			}

			const newProduct = await Product.create(productObj)
			res.status(201).json({
				status: 'success',
				message: 'Successfully created new  Product',
				product: newProduct,
			})
		} catch (err) {
			res.status(422).json({ status: 'fail', message: err.message })
		}
	})
)

export default handler

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
}

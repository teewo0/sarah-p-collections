import dbConnect from '../lib/dbConnect'
import Product from '../models/product-model'
import { setProductToSchema } from '../helpers/db-upload'

export function handleNoMatch(req, res) {
	res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}

export function handleError(err, req, res, next) {
	res.status(500).json({ success: false, message: 'Something went wrong!' })
}

export async function handleUploadToDb(req, res) {
	const productObj = { ...req.body }
	const filterArr = [
		'name',
		'description',
		'brand',
		'category',
		'productType',
		'price',
		'color',
		'quantity',
		'discountPercentage',
	]

	const filtered = setProductToSchema(productObj, filterArr)

	try {
		await dbConnect()
		console.log('Connected to MongoDb sucessfully ✔👍')

		if (req.files.imageCover) {
			filtered.imageCover = req.files.imageCover
		}

		if (req.files.images) {
			filtered.images = req.files.images
		}

		console.log('Filtered 🧰', filtered)
		const newProduct = await Product.create(filtered)

		return res.status(201).json({
			status: 'success',
			message: 'Successfully created new product',
			product: newProduct,
		})
	} catch (err) {
		return res.status(422).json({ status: 'fail', message: err.message })
	}
}

import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/product-model'

async function handler(req, res) {
	const { method } = req

	if (method === 'GET') {
		try {
			await dbConnect()
			console.log('Connected to database sucessfully 👍')
			const allProducts = await Product.find()
			res.status(200).json({
				success: true,
				message: 'Products queried successfully',
				results: allProducts.length,
				products: allProducts,
			})
		} catch (err) {
			res.status(500).json({ status: 'fail', message: err.message })
		}
		return
	}

	return res.status(405).json({
		success: false,
		message: `${req.method} request is not allowed on the route`,
	})
}

export default handler

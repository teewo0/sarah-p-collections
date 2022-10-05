import dbConnect from '../../helpers/db-connect'
import Product from '../../models/product-model'

const ProductsPage = ({ products }) => {
	return <div>Products Page</div>
}

export async function getStaticProps() {
	try {
		await dbConnect()
		const unserializedProducts = await Product.find()
		const products = JSON.parse(JSON.stringify(unserializedProducts))

		if (!products) {
			return { notFound: true }
		}

		return {
			props: { products },
			revalidate: 1,
		}
	} catch (error) {
		return { notFound: true }
	}
}

export default ProductsPage

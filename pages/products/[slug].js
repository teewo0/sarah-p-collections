import dbConnect from '../../helpers/db-connect'
import Product from '../../models/product-model'

import Image from 'next/image'

const ProductPage = (props) => {
	const { product } = props

	return (
		<div>
			<h1>{product.name}</h1>
			<div>
				<h2>Image Cover</h2>
				<Image
					src={`/images/products/${product.imageCover}`}
					alt={product.name}
					width={500}
					height={500}
				/>
			</div>
			<div>
				<h2>Other Images</h2>
				{product.images.map((image) => (
					<Image
						key={image}
						src={`/images/products/${image}`}
						width={300}
						height={200}
						alt={image}
					/>
				))}
			</div>
			<p>{product.description}</p>
		</div>
	)
}

export async function getStaticProps(context) {
	const { slug } = context.params
	try {
		await dbConnect()

		const unserializedProduct = await Product.findOne({ slug })
		const product = JSON.parse(JSON.stringify(unserializedProduct))

		if (!product) {
			return { notFound: true }
		}

		return {
			props: { product },
			revalidate: 1,
		}
	} catch (error) {
		return { notFound: true }
	}
}

export async function getStaticPaths() {
	try {
		await dbConnect()
		const products = await Product.find({})

		const slugPaths = products.map((product) => {
			const serializedProduct = JSON.parse(JSON.stringify(product))
			return { params: { slug: serializedProduct.slug } }
		})

		return {
			paths: slugPaths,
			fallback: 'blocking',
		}
	} catch (error) {
		return { notFound: true }
	}
}

export default ProductPage

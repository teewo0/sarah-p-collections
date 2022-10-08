import dbConnect from '../../lib/db-connect'
import Product from '../../models/product-model'
import CollectionGrid from '../../components/grids/collection-grid'
import { purify, description } from '../../lib/utils'

const CollectionPage = (props) => {
	
	return (
		<div>
			<p>{props.description}</p>
			<CollectionGrid products={props.products} />
		</div>
	)
}

export default CollectionPage

export async function getStaticProps(context) {
	const { category } = context.params

	try {
		await dbConnect()

		const results = await Product.aggregate([{ $match: { category } }])
		const collection = purify(results)

		if (!collection) {
			return { notFound: true }
		}

		return {
			props: {
				// description: description[category],
				products: collection,
			},
		}
	} catch (e) {
		return { notFound: true }
	}
}

export async function getStaticPaths() {
	try {
		await dbConnect()

        //Get all the possible values in the category feilds of Products collection
		const categoryGroups = await Product.aggregate([
			{
				$group: {
					_id: '$category',
				},
			},
		])

        // Map to {params: "key:value"} objects format
		const pathsWithSlug = categoryGroups.map((category) => ({
			params: { category: category._id },
		}))

		return {
			paths: pathsWithSlug,
			fallback: 'blocking',
		}
	} catch (e) {
		return { notFound: true }
	}
}

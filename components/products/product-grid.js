import Item from '../cards/item'

const AllProducts = (props) => {
	const productCards = props.products.map((product) => (
		<Item key={product.id} product={product} />
	))
	return <div>{productCards}</div>
}

export default AllProducts

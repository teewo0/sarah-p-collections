import CollectionCard from '../cards/collection-card'
const CollectionGrid = (props) => {

	const collectionCardsEl = props.products.map((product, i) => (
		<CollectionCard key={i} product={product} />
	))
	return <div>{collectionCardsEl}</div>

}

export default CollectionGrid

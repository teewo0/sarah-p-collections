import { useRouter } from 'next/router'
import Image from 'next/image'

import CollectionButton from '../ui/collection-button'

const CollectionCard = ({ product }) => {

	console.log("From collection Card => Props 😁", product)
	const Router = useRouter()

	


	return <h1>Hello there</h1>

	// function handleClick() {
	// 	Router.push(`/collections/${product.category}`)
	// }

	// return (
	// 	<figure>
	// 		<div>
	// 			<Image
	// 				src={`images/collections/${''}`}
	// 				alt={product.excerpt}
	// 				width={400}
	// 				height={400}
	// 			/>
	// 		</div>
	// 		<figcaption>{product.excerpt}</figcaption>
	// 		<CollectionButton onclick={handleClick} title={product.title} />
	// 	</figure>
	// )
}

export default CollectionCard

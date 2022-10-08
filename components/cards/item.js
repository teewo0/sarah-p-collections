import Image from 'next/image'

const Product = (props) => {
	const { product } = props
	return (
		<figure>
			<div>
				<Image
					src={`/images/products/${product.imageCover}`}
					alt={product.name}
					width={800}
					height={500}
				/>
			</div>
            <figcaption>
                <h2>{product.name}</h2>
                <span>{product.price}</span>

            </figcaption>
		</figure>
	)
}

export default Product

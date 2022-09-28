export function setProductToSchema(obj, arr) {
	const productModel = {}
	arr.forEach((element) => {
		if (
			element === 'quantity' ||
			element === 'price' ||
			element === 'discountPercentage'
		) {
			productModel[element] = +obj[element]
		} else {
			productModel[element] = obj[element]
		}
	})
	return productModel
}

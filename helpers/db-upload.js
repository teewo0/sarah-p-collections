export function setProductToSchema(obj, arr) {
	const productModel = {}
	arr.forEach((element) => {
		if (
			element === 'quantity' ||
			element === 'price' ||
			element === 'discountPercentage'
		) {
			// Convert value to Number data type
			productModel[element] = +obj[element]
			return
		}

		if (element === 'sizes') {

			// Lets make sure of no duplicates
			const sizesArray = obj[element].split(',') //Split to an array
			const unique = [...new Set(sizesArray)]
			// Remove duplicates
			productModel[element] = unique
			return
		}

		productModel[element] = obj[element]
	})
	return productModel
}

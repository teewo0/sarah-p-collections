/** Returns a modified object with properties set to match schema specs*/
export function setProductToSchema(obj, arr) {
	const objectToModelSchema = {}

	//Set the data type of the product's value to match the Schema
	arr.forEach((element) => {
		if (element === 'quantity') {
			// Convert value to Number data type
			return (objectToModelSchema[element] = +obj[element])
		}

		if (element === 'sizes') {
			// Lets make sure of no duplicates
			const sizesArray = obj[element].split(',') //Split to an array
			const unique = [...new Set(sizesArray)] // Remove duplicates

			return (objectToModelSchema[element] = unique)
		}

		if (element === 'price' || element === 'discountPrice') {
			const initialValue = obj[element]
		
			const valueFormatted = initialValue.replace(/,/g, '') //lets remove commas
			const finalValue = valueFormatted ? +valueFormatted : +initialValue //convert to Number
		
			return (objectToModelSchema[element] = finalValue)
		}

		objectToModelSchema[element] = obj[element]
	})

	return objectToModelSchema
}

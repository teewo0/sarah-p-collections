import axios from 'axios'

import classes from './product-upload.module.css'
import Input from './input'

const UploadProduct = () => {
	async function handleSubmit(event) {
		event.preventDefault()
		const form = event.target
		const url = event.target.action
		const formData = new FormData(form)

		const response = await axios.post(url, formData)
		console.log('Axios response ✔✔🥳', response)
	}

	return (
		<form
			action='/api/products/upload'
			className={classes.formGridContainer}
			onSubmit={handleSubmit}
		>
			<Input label='Name' name='name' type='text' />
			<Input label='Brand' name='brand' type='text' />
			<Input label='Color' name='color' type='text' />

			<div>
				<label htmlFor='category'>Collection</label>
				<select className={classes.select} id='category' name='category'>
					<option value=''>Select product collection</option>
					<option value='clothing'>Clothing</option>
					<option value='footware'>Footware</option>
					<option value='accessories'>Accessories</option>
				</select>
			</div>

			<Input label='Product Type' name='productType' type='text' />
			<Input label='Price' name='price' type='text' />
			<Input label='Quantity' name='quantity' type='text' />
			<Input label='Percentage Discount' name='discountPercentage' type='text' />
			<Input label='Description' name='description' type='textarea' />
			<Input label='Cover Image' name='imageCover' type='file' accept='image/*' />

			<button className={classes.formBtn}>upload</button>
		</form>
	)
}

export default UploadProduct

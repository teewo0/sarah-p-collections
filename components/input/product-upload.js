import { useState, useRef, Fragment } from 'react'
import axios from 'axios'

import classes from './product-upload.module.css'
import Input from './input'

const UploadProductForm = () => {
	const [imageUploadsNum, setImageUploadsNum] = useState()
	const imageUploadsRef = useRef(null)

	async function handleSubmit(event) {
		event.preventDefault()

		const form = event.target
		const url = event.target.action
		const formData = new FormData(form)

		const response = await axios.post(url, formData)
		console.log('Axios response ✔✔🥳', response.data)
	}

	function handleImageNumSubmit(event) {
		event.preventDefault()

		const imageUploadsValue = +imageUploadsRef.current.value
		setImageUploadsNum(imageUploadsValue)
	}

	let imagesUploadInputEl
	if (imageUploadsNum) {
		const dummyArr = new Array(imageUploadsNum).fill(1)
	
		imagesUploadInputEl = dummyArr.map((element, i) => {
			return (
				<Input
					key={i}
					label={`Product Image ${i + 1}`}
					name='images'
					type='file'
					accept='image/*'
				/>
			)
		})
	}

	
	return (
		<div className={classes.formContainer}>
			<form className={classes.firstForm} onSubmit={handleImageNumSubmit}>
				<input
					type='number'
					id='image-num'
					ref={imageUploadsRef}
					placeholder='Number of images to upload. MAX: 5 images'
				/>
				<button className={classes.btn}>submit</button>
			</form>

			<form
				action='/api/products/upload'
				className={classes.secondForm}
				onSubmit={handleSubmit}
			>
				<Input label='Name' name='name' type='text' required={true} />
				<Input label='Brand' name='brand' type='text' required={true} />
				<Input label='Color' name='color' type='text' required={true} />
				<Input label='Product Type' name='productType' type='text' required={true} />
				<Input label='Price' name='price' type='text' required={true} />
				<Input label='Quantity' name='quantity' type='text' />
				<Input label='Percentage Discount' name='discountPercentage' type='text' />

				<select className={classes.select} id='category' name='category'>
					<option value=''>Collection</option>
					<option value='clothing'>Clothing</option>
					<option value='footware'>Footware</option>
					<option value='accessories'>Accessories</option>
				</select>

				<div className={classes.textareaWrapper}>
					<label htmlFor='description'>Add a product description</label>
					<Input label='Description' name='description' type='textarea' />
				</div>

				<div className={classes.coverImageInputWrapper}>
					<label htmlFor='imageCover' className={classes.coverImageLabel}>
						👈 Cover image
					</label>
					<Input label='Cover Image' name='imageCover' type='file' accept='image/*' />
				</div>

				<div className={classes.imageInputWrapper}>
					{imageUploadsNum && imagesUploadInputEl}
				</div>

				<button className={classes.btn}>upload product data</button>
			</form>
		</div>
	)
}

export default UploadProductForm

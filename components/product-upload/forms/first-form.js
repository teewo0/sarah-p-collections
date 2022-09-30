import { Fragment } from 'react'
import classes from './first-form.module.css'

import Input from '../input'
import Button from '../../ui/button'

const FirstForm = (props) => {
	return (
		<form
			action='/api/products/upload'
			className={classes.form}
			onSubmit={props.onSubmit}
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

			<div>
				<Input label='Product Description 👇 ' name='description' type='textarea' />
			</div>

			<div className={classes.coverImageInputWrapper}>
				<label htmlFor='imageCover' className={classes.coverImageLabel}>
					👈 Cover image
				</label>
				<Input name='imageCover' type='file' accept='image/*' />
			</div>

			<div className={classes.imageInputWrapper}>
				{props.imagesNum > 0 && props.imagesEl}
			</div>

			<Button classes={classes.btn} value={props.btnValue} btnClass={props.btnClass} />
		</form>
	)
}

export default FirstForm

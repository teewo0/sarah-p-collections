import { Fragment } from 'react'

import classes from '../../styles/products/upload.module.css'
import UploadProduct from '../../components/product-upload/upload'
import Hero from '../../components/product-upload/hero'

const uploadNewProductPage = () => {
	return (
		<div className={classes.container}>
			<Fragment>
				<Hero />
				<UploadProduct />
			</Fragment>
		</div>
	)
}

export default uploadNewProductPage

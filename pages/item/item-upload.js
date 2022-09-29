import UploadProduct from '../../components/input/product-upload'
import styles from '../../styles/UploadItem.module.css'

const uploadNewProductPage = () => {
	return (
		<div className={styles.container}>
			<div>
				<h1>Upload product information to database</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aliquid
					ex dolore reprehenderit unde officia blanditiis.{' '}
					<span>Lorem ipsum dolor sit amet consectetur.</span> Et exercitationem officia
					ipsa sed praesentium itaque vel, quas facere accusantium ducimus harum beatae!
				</p>
			</div>
			<UploadProduct />
		</div>
	)
}

export default uploadNewProductPage

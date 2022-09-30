import classes from './second-form.module.css'
import Input from '../input'

const SecondForm = (props) => {
	return (
		<form className={classes.form} onSubmit={props.onSubmit}>
			<Input
				type='text'
				name='image-num'
				reference={props.reference}
				label='No of images to upload.'
			/>
			<button className={classes.btn}>Click me!</button>
		</form>
	)
}

export default SecondForm

import { useEffect, useState } from 'react'
import classes from './input.module.css'

const Input = (props) => {
	const { type, name, label, accept, required } = props

	const [inputValue, setInputValue] = useState("")
	const [inputClasses, setInputClasses] = useState(classes.formControl)

	useEffect(() => {
		if (inputValue !== "") {
			const InputClassesActive = `${classes.formControl} ${classes.formControlActive}`
			return setInputClasses(InputClassesActive)
		}

		setInputClasses(classes.formControl)
	}, [inputValue])

	if (type === 'textarea') {
		return (
			<div className={classes.formGroup}>
				<label className={classes.formLabel} htmlFor={name}>
					{label}
				</label>
				<textarea
					className={classes.formTextArea}
					rows={2}
					id={name}
					name={name}
				></textarea>
			</div>
		)
	}

	if (type === 'file') {
		return (
			<div className={classes.formGroup}>
				<label className={classes.formLabel} htmlFor={name}>
					{label}
				</label>
				<input type='file' accept={accept} id={name} name={name} />
			</div>
		)
	}
	console.log()

	return (
		<div className={classes.formGroup}>
			<label className={classes.formLabel} htmlFor={name}>
				{label}
			</label>
			<input
				className={inputClasses}
				type={type}
				id={name}
				name={name}
				onChange={(e) => setInputValue(e.target.value)}
				ref={props.reference}
			/>
		</div>
	)
}

export default Input

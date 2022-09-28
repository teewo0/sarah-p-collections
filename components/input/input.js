const Input = (props) => {
	const { type, name, label, accept } = props

	if (type === 'textarea') {
		return (
			<div>
				<label htmlFor={name}>{label}:</label>
				<textarea rows={6} id={name} name={name}></textarea>
			</div>
		)
	}

	if (type === 'file') {
		return (
			<div>
				<label htmlFor={name}>{label}:</label>
				<input type='file' accept={accept} id={name} name={name} />
			</div>
		)
	}

	return (
		<div>
			<label htmlFor={name}>{label}:</label>
			<input type={type} id={name} name={name} />
		</div>
	)
}

export default Input

const Input = (props) => {
	const { type, name, label, accept, required } = props

	if (type === 'textarea') {
		return <textarea rows={6} id={name} name={name}></textarea>
	}

	if (type === 'file') {
		return <input type='file' accept={accept} id={name} name={name} />
	}

	return <input type={type} id={name} name={name} placeholder={label} />
}

export default Input

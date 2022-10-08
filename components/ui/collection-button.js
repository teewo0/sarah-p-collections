const CollectionButton = (props) => {
	const btnText = `View ${props.title} collection`
	return (
		<button onClick={props.onClick} className={classes.btn}>
			{btnText}
		</button>
	)
}

export default CollectionButton

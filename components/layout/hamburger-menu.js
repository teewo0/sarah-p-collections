import classes from './hamburger-menu.module.css'
const Hamburger = (props) => {
	return (
		<div className={classes.burger} onClick={props.onClick}>
			<div className={classes.burgerItem}></div>
			<div className={classes.burgerItem}></div>
			<div className={classes.burgerItem}></div>
		</div>
	)
}

export default Hamburger

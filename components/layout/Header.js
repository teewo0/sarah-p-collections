import { Fragment, useState, useEffect } from 'react'

import Logo from './logo'
import Nav from './nav'
import Hamburger from './hamburger-menu'
import classes from './header.module.css'

const Header = () => {
	const [showHamburger, setShowHamburger] = useState(false)
	const [deviseWidth, setDevicesWidth] = useState()

	function getWindowWidth() {
		return window.innerWidth
	}

	useEffect(() => {
		const handleWindowSize = () => setDevicesWidth(getWindowWidth())
		handleWindowSize() //Get the onload window size to useState

		//Listen for window resize, update state
		window.addEventListener('resize', handleWindowSize)

		return () => window.removeEventListener('resize', handleWindowSize)
	}, [])

	useEffect(() => {
		if (deviseWidth && deviseWidth > 760) return setShowHamburger(false)
		setShowHamburger(true)
	}, [deviseWidth])

	function handleHamburgerClick() {
		setShowHamburger((prevState) => !prevState)
	}

	return (
		<header className={classes.header}>
			<Fragment>
				<Logo />
				{!showHamburger && <Nav />}
				{showHamburger && <Hamburger onClick={handleHamburgerClick} />}
			</Fragment>
		</header>
	)
}

export default Header

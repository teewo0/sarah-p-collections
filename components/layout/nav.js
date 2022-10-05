import Link from 'next/link'
import { Fragment } from 'react'

//Icons from react-icons 
import { FiUser } from 'react-icons/fi'
import { MdContactSupport } from 'react-icons/md'
import { BsCart } from 'react-icons/bs'

//Class module
import classes from './nav.module.css'

const Nav = () => {
	return (
		<nav className={classes.nav}>
			<Fragment>

				<Link href={'/login'}>
					<div className={classes.navLink}>
						<span className={classes.navLogo}>
							<FiUser />
						</span>
						<p>login</p>
					</div>
				</Link>

				<Link href={'/cart'}>
					<div className={classes.navLink}>
						<span className={classes.navLogo}>
							<BsCart />
						</span>
						<p>cart</p>
					</div>
				</Link>

				<Link href={'/contact'}>
					<div className={classes.navLink}>
						<span className={classes.navLogo}>
							<MdContactSupport />
						</span>
						<p>Contact</p>
					</div>
				</Link>
                
			</Fragment>
		</nav>
	)
}

export default Nav

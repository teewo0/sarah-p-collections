import { Fragment } from 'react'
import { useRouter } from 'next/router'

import dbConnect from '../lib/db-connect'
import AllProducts from '../components/products/product-grid'
import Hero from '../components/layout/hero'
import Product from '../models/product-model'
import classes from '../styles/Home.module.css'

export default function Home(props) {

	console.log(useRouter())
	return (
		<div className={classes.container}>
			<Fragment>
				<Hero />
				<AllProducts products={props.products} />
			</Fragment>
		</div>
	)
}

export async function getStaticProps() {
	try {
		await dbConnect()
		const AllProducts = await Product.find({}).sort({ uploadedAt: -1 })

		if (!AllProducts) return { notFound: true }

		const products = JSON.parse(JSON.stringify(AllProducts))

		return { props: { products }, revalidate: 60 }
	} catch (error) {
		return { notFound: true }
	}
}

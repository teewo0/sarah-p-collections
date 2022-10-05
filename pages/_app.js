import Head from 'next/head'

import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>Sarah P Collections</title>
				<meta
					name='description'
					content='Sarah P Collections | We sell high quality | affordable clothing and accessories for males and females '
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp

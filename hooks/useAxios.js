import { useState, useEffect } from 'react'
import axios from 'axios'

function useAxios(url, options) {

	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

		
	useEffect(() => {
		async function getData() {
			//Post, Patch, Put, Delete Requests
			if (options !== null) return await axios(url, options)

			//Get Request
			return await axios.get(url)
		}

		getData()
			.then((res) => setData(res.data))
			.catch((err) => setError(err.response.data))
	},[options, url])

	return { data, error }
}

export default useAxios

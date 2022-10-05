import mongoose from 'mongoose'

const DB_URI = process.env.DATABASE_CONNECT_STRING
const connection = {}

/** Connects to mongoDb with mongoose.connect method  */
async function dbConnect() {
	if (connection.isConnected) return

	try {
		const db = await mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		connection.isConnected = db.connections[0].readyState === 1
	} catch (error) {
		throw new Error(error)
	}
}

export default dbConnect

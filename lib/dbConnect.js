import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const DB_URI = process.env.DATABASE_CONNECT_STRING

if (!DB_URI) {
	throw new Error('Please define the DB_URI environment variable inside .env')
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {

		cached.promise = mongoose.connect(DB_URI).then((mongoose) => {
			return mongoose
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}

export default dbConnect

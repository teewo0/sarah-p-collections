import mongoose from 'mongoose'
import slugify from 'slugify'

// /**
//  * name
//  * size range
//  * description
//  * quantitiy
//  * price
//  * discount
//  * uploadedAt
//  * coverImage
//  * images
//  * category [clothing, footaware, accessories]
//  * type : [shirt]
//  * color
//  * brand
//  * salesCategory
//  * rating
//  * ratingAverage
//  */

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A product must have a name'],
			trim: true,
			unique: true,
		},
		brand: {
			type: String,
			required: [true, 'A product must have a brand'],
			trim: true,
		},
		category: {
			type: String,
			enum: ['clothing', 'footware', 'accessories'],
			required: [true, 'A product must have a category'],
		},
		color: String,
		description: {
			required: [true, 'A product must have a description'],
			type: String,
			maxLength: 90,
		},
		discountPercentage: Number,
		discountPrice: {
			type: Number,
			validate: {
				validator: function (value) {
					return this.price < value
				},
				message: 'A discount price must be less than the product price.',
			},
		},
		quantity: {
			type: Number,
			default: 0,
		},
		imageCover: String,
		images: [String],
		rating: Number,
		ratingsAverage: Number,
		salesCategory: String,
		sizes: [Number],
		slug: String,
		price: {
			type: Number,
			required: [true, 'A product must have a price'],
		},
		productType: {
			type: String,
			required: [true, 'A product must belong to a type'],
			trim: true,
		},
		uploadedAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

// Create/Save Middlewares
productSchema.pre('save', function (next) {
	if (this.discountPercentage) {
		const discountAmount = (this.discountPercentage / 100) * this.price
		this.discountPrice = this.price - discountAmount
		return next()
	}
	next()
})

// AUTO GENERATE SLUG PRE-SAVE MIDDLEWARE
productSchema.pre('save', function (next) {
	const slugString = `${this.color} ${this.brand} ${this.productType} ${this.name} `
	this.slug = slugify(slugString, { lower: true })
	next()
})

// Query Middlewares
productSchema.pre(/^find/, function (next) {
	this.select('-__v')
	next()
})

export default mongoose.model('Product', productSchema)

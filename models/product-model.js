import mongoose from 'mongoose'

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
			// required: [true, 'A product must have a name'],
			trim: true,
			unique: true,
		},
		brand: {
			type: String,
			// required: [true, 'A product must have a brand'],
			trim: true,
		},
		category: {
			type: String,
			// enum: ['clothing', 'footaware', 'accessories'],
			// required: [true, 'A product must have a category'],
		},
		color: {
			type: String,
			// required: [true, 'A product must have a color'],
		},
		description: {
			// required: [true, 'A product must have a description'],
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
		salesCategory: {
			type: String,
		},
		sizes: [Number],
		price: {
			type: Number,
			default: 0,
			// required: [true, 'A product must have a price'],
		},

		type: {
			type: String,
			// required: [true, 'A protect must belong to a type'],
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

// Query Middlewares
productSchema.pre(/^find/, function (next) {
	this.select('-__v')
	next()
})


export default mongoose.model('Product', productSchema)

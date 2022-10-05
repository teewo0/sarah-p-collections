import mongoose from 'mongoose'
import slugify from 'slugify'

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
			lowercase: true,
		},
		category: {
			type: String,
			enum: ['clothing', 'footware', 'accessories'],
			required: [true, 'A product must have a category'],
		},
		color: {
			type: String,
			required: [true, 'A product must have a color'],
			lowercase: true,
		},
		description: {
			required: [true, 'A product must have a description'],
			type: String,
			minLength: [20, 'A product description must have at least 20 characters'],
		},
		discountPercentage: Number,
		discountPrice: {
			type: Number,
			// validate: {
			// 	validator: function (value) {
			// 		return this.price >= value
			// 	},
			// 	message: 'A discount price must be less than the product price.',
			// },
		},
		quantity: {
			type: Number,
			default: 0,
		},
		imageCover: String,
		images: [String],
		inStock: Boolean,
		rating: Number,
		ratingsAverage: Number,
		salesCategory: String,
		sizes: [{ type: String, lowercase: true }],
		slug: String,
		price: {
			type: Number,
			required: [true, 'A product must have a price'],
		},
		productType: {
			type: String,
			required: [true, 'A product must belong to a type'],
			trim: true,
			lowercase: true,
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

productSchema.indexes({ name: 1, description: 1 }, { unique: true })

productSchema.pre('save', function (next) {
	if (this.quantity === 0) {
		this.inStock = false
		return next()
	}

	this.inStock = true
	next()
})

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
	const millisecondsToStringArr = Date.now().toString().split('')
	const lastFiveChar = millisecondsToStringArr.splice(8).join('')

	const slugString = `${lastFiveChar} ${this.brand} ${this.name} `
	this.slug = slugify(slugString, { lower: true })
	next()
})

//Set stock value
productSchema.pre('save', function (next) {
	if (this.quantity === 0) {
		this.inStock = false
	}
	next()
})

// Query Middlewares
productSchema.pre(/^find/g, function (next) {
	this.select('-__v')
	next()
})

export default mongoose.models.Product || mongoose.model('Product', productSchema)

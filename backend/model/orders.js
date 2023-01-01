const mongoose = require('mongoose');

const Schema = mongoose.Schema

// const orderSchema = new Schema({
//     user: {
//         type: mongoose.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     mode: {
//         type: String,
//         required: true
//     },
//     order: {
//         total_qty: {
//             type: Number,
//             default: 0,
//             required: true
//         },
//         total_price: {
//             type: Number,
//             default: 0,
//             required: true
//         },
//         items: [{
//             itemId: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'products',
//                 required: true,
//             },
//             name: {
//                 type: String,
//                 required: true
//             },
//             price: {
//                 type: Number,
//                 required: true
//             },
//             qty: {
//                 type: Number,
//                 required: true
//             }
//         }]
//     },
//     deliveryCharges: {
//         type: Number,
//         default: 0
//     },
//     status: {
//         type: String,
//         default: false
//     },
//     address: {
//         type: Object
//     },
//     payment: {
//         type: String
//     },
//     time: {
//         type: Date,
//         default: Date.now()
//     }

// })

const OrderSchema = new Schema(
	{
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Products',
				},
				quantity: {
					type: Number,
				},
			},
		],
		customer: {
			userID: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'User',
			},
		},
		isPurchased: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		shippingAddress: {
			type: 'object',
		},
        deliveryCharges: {
            type: Number,
            default: 0
        },
		amount: {
			type: Number,
			required: true,
		},
		paymentID: {
			type: String,
		},
		paymentSignature: {
			type: String,
		},
		transactionTime: {
			type: Date,
            default: Date.now()
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Orders', OrderSchema)

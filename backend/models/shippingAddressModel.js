import mongoose from "mongoose";

const shippingAddressSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		userEmail: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		postalCode: {
			type: Number,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const ShippingAddress = mongoose.model(
	"ShippingAddress",
	shippingAddressSchema
);
export default ShippingAddress;

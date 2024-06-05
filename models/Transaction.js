import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema(
	{
		buyer: {
			type: String,
			require: true,
		},
		amount: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		productIds: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Product",
			},
		],
	},
	{ toJSON: { getters: true }, timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;

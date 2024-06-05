import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const monthSchema = new Schema(
	{
		month: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		operationalExpenses: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		nonOperationalExpenses: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
	},
	{ toJSON: { getters: true } }
);

/**
 * A helper function that converts a currency value to a value in rupees. It
 * divides the value by 100 because mongoose stores currency values as a
 * float in the range [100, 1000000000000] in units of 100 paisa.
 */
const daySchema = new Schema(
	{
		date: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
	},
	{ toJSON: { getters: true } }
);

const KPISchema = new Schema(
	{
		totalProfit: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		totalRevenue: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		totalExpenses: {
			type: mongoose.Types.Currency,
			currency: "INR",
			get: (v) => v / 100,
		},
		expensesByCategory: {
			type: Map,
			of: {
				type: mongoose.Types.Currency,
				currency: "INR",
				get: (v) => v / 100,
			},
		},
		monthlyData: [monthSchema],

		dailyData: [daySchema],
	},
	{ toJSON: { getters: true }, timestamps: true }
);


const KPI = mongoose.model("KPI", KPISchema);

export default KPI;

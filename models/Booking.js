const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
	bookingDateStart: { type: Date, required: true },
	bookingDateEnd: { type: Date, required: true },
	invoice: { type: Number, required: true },
	itemId: {
		_id: {
			type: ObjectId,
			required: true,
			ref: 'Item',
		},
		title: { type: String, required: true },
		price: { type: Number, required: true },
		duration: { type: Number, required: true },
	},
	total: { type: Number, required: true },
	memberId: { type: ObjectId, required: true, ref: 'Member' },
	payments: {
		proofPayment: { type: String, required: true },
		bankFrom: { type: String, required: true },
		status: { type: String, default: 'Process' },
		accountHolder: { type: String, required: true },
	},
});

module.exports = mongoose.model('Booking', bookingSchema);

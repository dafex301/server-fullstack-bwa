const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true },
	country: { type: String, required: true, default: 'Indonesia' },
	city: { type: String, required: true },
	isPopular: { type: Boolean },
	description: { type: String, required: true },
	imageId: { type: ObjectId, required: true, ref: 'Image' },
	featureId: { type: ObjectId, required: true, ref: 'Feature' },
	activityId: { type: ObjectId, required: true, ref: 'Activity' },
});

module.exports = mongoose.model('Item', itemSchema);

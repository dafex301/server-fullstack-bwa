const Item = require('../models/Item');
const Treasure = require('../models/Activity');
const Traveler = require('../models/Booking');
const Category = require('../models/Category');

module.exports = {
	landingPage: async (req, res) => {
		try {
			const mostPicked = await Item.find()
				.select('_id title country city price unit imageId')
				.limit(5)
				.populate({ path: 'imageId', select: '_id imageUrl' });
			const category = await Category.find()
				.select('_id name')
				.limit(3)
				.populate({
					path: 'itemId',
					perDocumentLimit: 4,
					select: '_id title country city isPopular imageId',
					populate: {
						path: 'imageId',
						perDocumentLimit: 1,
						select: '_id imageUrl',
					},
				});
			const traveler = await Traveler.find();
			const treasure = await Treasure.find();
			const city = await Item.find();
			res.status(200).json({
				hero: {
					travelers: traveler.length,
					treasures: treasure.length,
					cities: city.length,
				},
				mostPicked,
				category,
			});
		} catch (error) {}
	},
};

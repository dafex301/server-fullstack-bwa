const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Item = require('../models/Item');
const Image = require('../models/Image');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	viewDashboard: (req, res) => {
		res.render('admin/dashboard/view_dashboard', {
			title: 'Staycation | Dashboard',
		});
	},

	// Category
	viewCategory: async (req, res) => {
		try {
			const category = await Category.find();
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };

			res.render('admin/category/view_category', {
				category,
				alert,
				title: 'Staycation | Category',
			});
		} catch (error) {
			res.redirect('/admin/category');
		}
	},
	addCategory: async (req, res) => {
		try {
			const { name } = req.body;
			await Category.create({ name });
			req.flash('alertMessage', 'Success add category');
			req.flash('alertStatus', 'success');
			res.redirect('/admin/category');
		} catch (err) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/category');
		}
	},
	updateCategory: async (req, res) => {
		try {
			const { id, name } = req.body;
			const category = await Category.findOne({ _id: id });
			category.name = name;
			await category.save();
			req.flash('alertMessage', 'Success update category');
			req.flash('alertStatus', 'success');
			res.redirect('/admin/category');
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/category');
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Category.findOne({ _id: id });
			await category.delete();
			req.flash('alertMessage', 'Success delete category');
			req.flash('alertStatus', 'success');
			res.redirect('/admin/category');
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/category');
		}
	},

	// Bank
	viewBank: async (req, res) => {
		try {
			const bank = await Bank.find();
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			res.render('admin/bank/view_bank', {
				bank,
				title: 'Staycation | Bank',
				alert,
			});
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/bank');
		}
	},
	addBank: async (req, res) => {
		try {
			const { nameBank, accountNumber, accountHolder } = req.body;
			await Bank.create({
				nameBank,
				accountNumber,
				accountHolder,
				imageUrl: `images/${req.file.filename}`,
			});
			req.flash('alertMessage', 'Success add bank');
			req.flash('alertStatus', 'success');
			res.redirect('/admin/bank');
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/bank');
		}
	},
	editBank: async (req, res) => {
		try {
			const { id, nameBank, accountHolder, accountNumber } = req.body;
			const bank = await Bank.findOne({ _id: id });
			if (req.file == undefined) {
				bank.nameBank = nameBank;
				bank.accountNumber = accountNumber;
				bank.accountHolder = accountHolder;
				await bank.save();
				req.flash('alertMessage', 'Success update bank');
				req.flash('alertStatus', 'success');
				res.redirect('/admin/bank');
			} else {
				await fs.unlink(path.join(`public/${bank.imageUrl}`));
				bank.nameBank = nameBank;
				bank.accountNumber = accountNumber;
				bank.accountHolder = accountHolder;
				bank.imageUrl = `images/${req.file.filename}`;
				await bank.save();
				req.flash('alertMessage', 'Success update bank');
				req.flash('alertStatus', 'success');
				res.redirect('/admin/bank');
			}
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/bank');
		}
	},
	deleteBank: async (req, res) => {
		try {
			const { id } = req.params;
			const bank = await Bank.findOne({ _id: id });
			await fs.unlink(path.join(`public/${bank.imageUrl}`));
			await bank.remove();
			req.flash('alertMessage', 'Success delete bank');
			req.flash('alertStatus', 'success');
			res.redirect('/admin/bank');
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/bank');
		}
	},
	// Item
	viewItem: async (req, res) => {
		try {
			const category = await Category.find();
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			res.render('admin/item/view_item', {
				title: 'Staycation | Item',
				category,
				alert,
			});
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/bank');
		}
	},
	addItem: async (req, res) => {
		try {
			const { categoryId, title, price, city, about } = req.body;
			if (req.files.length > 0) {
				const category = await Category.findOne({ _id: categoryId });
				const newItem = {
					categoryId,
					title,
					description: about,
					price,
					city,
				};
				const item = await Item.create(newItem);
				category.itemId.push({ _id: item._id });
				await category.save();
				for (let i = 0; i < req.files.length; i++) {
					const imageSave = await Image.create({
						imageUrl: `images/${req.files[i].filename}`,
					});
					item.imageId.push({ _id: imageSave._id });
					await item.save();
				}
				req.flash('alertMessage', 'Success Add Item');
				req.flash('alertStatus', 'success');
				res.redirect('/admin/item');
			}
		} catch (error) {
			console.log(error);
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/admin/item');
		}
	},

	// Booking
	viewBooking: (req, res) => {
		res.render('admin/booking/view_booking', {
			title: 'Staycation | Booking',
		});
	},
};

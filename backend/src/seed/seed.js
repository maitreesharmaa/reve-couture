// src/seed/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
// Corrected paths for a file inside src/seed
const { connectDatabase } = require('../config/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { ROLES } = require('../utils/roles');

async function seed() {
  try {
    await connectDatabase();

    const wipe = process.argv.includes('--wipe');
    if (wipe) {
      console.log('Wiping database...');
      await Promise.all([
        User.deleteMany({}),
        Category.deleteMany({}),
        Product.deleteMany({}),
      ]);
      console.log('Database wiped.');
    }

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({ name: 'Admin', email: adminEmail, password: adminPassword, role: ROLES.ADMIN });
      console.log('Admin created:', adminEmail);
    } else {
      console.log('Admin exists:', adminEmail);
    }

    // Brands (as Categories)
    console.log('Seeding brands...');
    const brandNames = ['Prada', 'Louis Vuitton', 'Gucci', 'Dior', 'Christian Louboutin', 'Charlotte Tilbury'];
    const brands = {};
    for (const name of brandNames) {
      let brand = await Category.findOne({ name });
      if (!brand) brand = await Category.create({ name });
      brands[name] = brand;
    }
    console.log('Brands seeded.');

    // Sample Products
    console.log('Seeding products...');
    const products = [
        { name: 'Prada Re-Edition 2005 Bag', description: 'Iconic re-edition nylon bag.', price: 1850, stock: 15, category: brands['Prada']._id },
        { name: 'LV Neverfull MM', description: 'The iconic tote bag in Monogram canvas.', price: 2030, stock: 10, category: brands['Louis Vuitton']._id },
        { name: 'Gucci Horsebit 1955 Shoulder Bag', description: 'A classic design with the Horsebit detail.', price: 3250, stock: 12, category: brands['Gucci']._id },
        { name: 'Dior Saddle Bag', description: 'The legendary Saddle bag in blue Dior Oblique jacquard.', price: 4400, stock: 8, category: brands['Dior']._id },
        { name: 'So Kate Pumps', description: 'Pointed-toe pump in black patent leather.', price: 795, stock: 30, category: brands['Christian Louboutin']._id },
        { name: 'Pillow Talk Lipstick', description: 'The iconic nude-pink matte lipstick.', price: 35, stock: 150, category: brands['Charlotte Tilbury']._id }
    ];

    for (const p of products) {
      const exists = await Product.findOne({ name: p.name });
      if (!exists) await Product.create(p);
    }
    console.log('Products seeded.');

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
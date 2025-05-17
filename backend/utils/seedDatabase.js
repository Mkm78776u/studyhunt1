 const mongoose = require('mongoose');
const Educator = require('../models/Educator');
const bcrypt = require('bcryptjs');

const seedEducators = async () => {
  const hashedPassword = await bcrypt.hash('MK3424103', 10);
  
  const educatorData = [{
    username: 'mithileshkumawat1',
    password: hashedPassword,
    email: 'educator@example.com'
  }];

  await Educator.deleteMany();
  await Educator.insertMany(educatorData);
  console.log('Database seeded!');
  process.exit();
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => seedEducators())
  .catch(err => console.error(err));
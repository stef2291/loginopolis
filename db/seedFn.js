const { sequelize } = require("./db");
const { User } = require("./");
const users = require("./seedData");
const bcrypt = require("bcrypt");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  const hashedPromises = users.map(async (user) => {
    const hashed = await bcrypt.hash(user.password, 5);
    user.password = hashed;
    return user;
  });

  const hashedUsers = await Promise.all(hashedPromises);

  console.log(hashedUsers);

  await User.bulkCreate(hashedUsers);
}; // creates all users from seedData.json when called - seed is called in seedFn.js

module.exports = seed;

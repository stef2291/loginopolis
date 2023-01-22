const app = require("./index");
const { sequelize } = require("./db");
const bcrypt = require("bcrypt");

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Users are ready at http://localhost:${PORT}`);
});



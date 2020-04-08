const db = require('../index');

db.sequelize.sync({force: true}).then(() => {
  console.log("Reset DB");
  Promise.resolve();
}).then(() => db.sequelize.close());
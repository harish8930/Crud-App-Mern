const app = require("./app");
const { dbConnect } = require("./config/Db");
dbConnect();

app.listen(4000, () => {
  console.log(`Server is Started At PORT ${4000}`);
});

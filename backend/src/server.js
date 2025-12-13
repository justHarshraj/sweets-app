const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB(); // prod connection only

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

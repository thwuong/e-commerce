require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The application listening on port http://localhost:${PORT}`);
});

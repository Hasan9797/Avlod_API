const express = require("express");
require("dotenv").config();
const fileUploade = require("express-fileupload");

const app = express();

app.use(express.json());

app.use(fileUploade());

app.use("/avlod/about", require("./src/routers"));
app.use("/avlod/ourwork", require("./src/routers/index2"));
app.use("/avlod/services", require("./src/routers/find_to_sponsor"));
app.use("/avlod/investors", require("./src/routers/investor"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

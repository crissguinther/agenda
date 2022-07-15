require("dotenv").config();
const mongoose = require("mongoose");
const database = mongoose.connect(process.env.CONNECTION_STRING);
const makeApp = require("./server.js");
const app = makeApp(database);
const port = process.env.PORT;

app.on("database connected", () => {
  app.listen(port, () => {
    console.log(`[SERVER] Server running at port ${port}`);
    console.log(`[SERVER] Access http://localhost:${port}`);
  });
});

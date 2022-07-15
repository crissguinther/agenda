require("dotenv").config();
const makeApp = require("./server.js");
const app = makeApp(process.env.CONNECTION_STRING);
const port = process.env.PORT;

app.on("database connected", () => {
  app.listen(port, () => {
    console.log(`[SERVER] Server running at port ${port}`);
    console.log(`[SERVER] Access http://localhost:${port}`);
  });
});

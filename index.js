require("dotenv").config();
const app = require("./server.js");
const port = process.env.PORT;

app.on("database connected", () => {
  app.listen(port, () => {
    console.log(`[SERVER] Server running at port ${port}`);
    console.log(`[SERVER] Access http://localhost:${port}`);
  });
});

const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;
let d = new Date();

app.listen(PORT, () => {
  console.log(
    `Server listening on port http://localhost:${PORT} time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  );
});

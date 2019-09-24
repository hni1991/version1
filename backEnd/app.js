const express = require("express");
const path = require("path");
const app = express();

//app.use(session({ secret: "mysecret" }));
const userRoute = require("./src/routes/userRoutes");
app.use(express.static(path.join(__dirname, "public")));
//app.use('/admin',adminRout);
app.use("/", userRoute);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

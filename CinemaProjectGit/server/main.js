const express = require("express");
const connectdb = require("./configs/Database");
const cors = require("cors");
const movieRouter = require("./routers/MovieRouter");
const subRouter = require("./routers/SubsRouter");
const userRouter = require("./routers/UserRouter");
const memberRouter = require("./routers/MembersRouter");
const app = express();

connectdb();

const port = 3000;
app.use(cors());
app.use(express.json());

app.use("/movie", movieRouter);
app.use("/sub", subRouter);
app.use("/user", userRouter);
app.use("/member", memberRouter);

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});

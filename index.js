import express from "express";
import compression from "compression";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(compression(), express.json({ limit: "50mb" }));

app.use("/redis", async function (req, res) {
  res.send({
    success: 0,
  });
});

app.listen(PORT, () => {
  console.log(`live on ${PORT}`);
});

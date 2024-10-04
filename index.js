import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "50mb" }));

app.use("/redis", async function (req, res) {
  res.send({
    success: 0,
  });
});

app.listen(PORT, () => {
  console.log(`live on ${PORT}`);
});

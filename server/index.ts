import express from "express";
import cargoShipRouter from "./routes/cargo-ship.js";

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "we-ERP API",
  });
});

app.use("/api/cargo-ship", cargoShipRouter);

app.listen(PORT, () => {
  console.log(`we-ERP API running at http://localhost:${PORT}`);
});

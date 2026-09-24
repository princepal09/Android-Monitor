import express from "express";
import os from "os";
import cors from "cors"

const app = express();
const PORT = 3000;


app.use(cors({
  origin : "*",
  credentials : true
}))


app.get("/api/system", (req, res) => {
  const cpus = os.cpus();

  res.json({
    platform: os.platform(),
    architecture: os.arch(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    cpu: {
      model: cpus[0]?.model,
      cores: cpus.length,
      speed: cpus[0]?.speed,
    },
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
    },
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
import express from "express";
import getUploadsPath from "../getUploadsPath.js";
import disk from "diskusage";
import prettyBytes from "pretty-bytes";

const router = express.Router();
const dir = getUploadsPath();

router.get("/drivedata", (req, res) => {
  const rawStats = disk.checkSync(dir);

  const prettyStats = {
    usedSpace: prettyBytes(rawStats.total - rawStats.free),
    totalSpace: prettyBytes(rawStats.total),
    usagePercent: (rawStats.available / (rawStats.total / 100)).toFixed(1),
  };
  res.send({ prettyStats });
});

export default router;

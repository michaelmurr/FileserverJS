import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const configPath = __dirname + "/storagePath.json";

const getUploadsPath = () => {
  let PathObj = JSON.parse(fs.readFileSync(configPath));
  if (!fs.existsSync(PathObj.path)) fs.mkdirSync(PathObj.path);
  return PathObj.path;
};

export default getUploadsPath;

import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const configPath = __dirname + "/storagePath.json";

const getUploadsPath = function () {
  console.log(configPath);
  let PathObj = JSON.parse(fs.readFileSync(configPath));
  return PathObj.path;
};

export default getUploadsPath;

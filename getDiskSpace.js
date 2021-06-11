const disk = require("diskusage");
const getUploadsPath = require("./getUploadsPath.js");
const dir = getUploadsPath();

const getDiskSpace = function () {
    let diskStats = disk.checkSync(dir);
    if (diskStats === undefined) {
        console.log("An error occured while getting the remaining harddrive space!");
    } else {
        let usagePerc = 100 - diskStats.free / (diskStats.total / 100);
        let totalSpace = diskStats.total / 1000000000;
        let freeSpace = diskStats.free / 1000000000;
        let usedSpace = totalSpace - freeSpace;
        let diskStatsObj = {
            usagePerc: usagePerc.toFixed(1),
            totalSpace: totalSpace.toFixed(1),
            freeSpace: freeSpace.toFixed(1),
            usedSpace: usedSpace.toFixed(1)
        }
        return diskStatsObj;
    }
}

module.exports = getDiskSpace;
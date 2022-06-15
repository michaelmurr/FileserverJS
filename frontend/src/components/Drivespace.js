import React, { useState, useEffect } from "react";

export default function Drivespace() {
  const [driveData, setDriveData] = useState(null);

  useEffect(() => {
    fetchDriveData();
  });

  const fetchDriveData = async () => {
    const res = await fetch("/api/drivedata");
    const json = await res.json();
    setDriveData(json.prettyStats);
  };

  return (
    <>
      {driveData && (
        <h4>
          [{driveData.usedSpace} / {driveData.totalSpace}] |{" "}
          {driveData.usagePercent} % Free
        </h4>
      )}
    </>
  );
}

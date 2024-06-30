import React, { useState, useEffect } from "react";

const UploadProgress = ({ progress }) => {
  const [uploadProgress, setUploadProgress] = useState([]);

  useEffect(() => {
    setUploadProgress(progress);
  }, [progress]);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <span>Uploading file...</span>
        <div className="progress">
          <div className="progress-filled" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;

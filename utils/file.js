const fs = require("fs");

const deleteFile = (filePath) => {
  if (fs.access(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  }
  return;
};

exports.deleteFile = deleteFile;

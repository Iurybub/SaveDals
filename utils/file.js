const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err, file) => {
    if (err) {
      return null;
    }
  });
};

exports.deleteFile = deleteFile;

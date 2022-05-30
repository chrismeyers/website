const fs = require('fs');
const path = require('path');

module.exports = (type = null) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'data.json')),
  );
  return type ? data[type] : data;
};

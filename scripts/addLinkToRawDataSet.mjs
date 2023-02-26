const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..', 'demo/tiddlers/CDDA');
const files = fs.readdirSync(base);
for (const fileName of files) {
  const content = fs.readFileSync(path.join(base, fileName), 'utf-8');

  const replaceLinkToParent = content.replace(/(!! 所在文件\n\n)\/Kenan-Structured-Modpack\/([a-zA-Z_0-9%]+)\//, '$1[[Kenan-Structured-Modpack|CDDA]]/[[$2]]/');
  fs.writeFileSync(path.join(base, fileName), replaceLinkToParent);
}
const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // replace src="/something" with src={`${import.meta.env.BASE_URL}something`}
    content = content.replace(/src="\/([^"]+)"/g, 'src={`${import.meta.env.BASE_URL}$1`}');

    // replace src={`/something`} with src={`${import.meta.env.BASE_URL}something`}
    content = content.replace(/src=\{\`\/([^`]+)\`\}/g, 'src={`${import.meta.env.BASE_URL}$1`}');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});

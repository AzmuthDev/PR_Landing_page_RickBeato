const Jimp = require('jimp');

async function removeBlackBackground() {
  try {
    const J = Jimp.default || Jimp;
    console.log('Reading image with Jimp...', typeof J.read);
    const image = await J.read('public/geddy-bust-puzzle.jpeg');
    const threshold = 30; // Dark pixels threshold

    console.log('Scanning pixels...');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx+1];
      const b = this.bitmap.data[idx+2];
      
      // Remove black background
      if (r < threshold && g < threshold && b < threshold) {
        this.bitmap.data[idx+3] = 0; // Transparent
      }
    });

    await image.writeAsync('public/geddy-bust-puzzle-transparent.png');
    console.log('Success! Image saved as png.');
  } catch (err) {
    console.error('Error:', err);
  }
}

removeBlackBackground();

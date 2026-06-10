import { Jimp } from "jimp";

async function removeBlackBackground() {
  try {
    console.log('Reading image...');
    // In jimp v1, we can use Jimp.read
    const image = await Jimp.read('public/geddy-bust-puzzle.jpeg');
    const threshold = 35; // Dark pixels threshold to remove the background but keep the shadows

    console.log('Scanning pixels...');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx+1];
      const b = this.bitmap.data[idx+2];
      
      // Remove pure or very dark black background
      // The background is solid black, so rgb is close to 0,0,0
      if (r < threshold && g < threshold && b < threshold) {
        this.bitmap.data[idx+3] = 0; // Transparent
      }
    });

    console.log('Writing transparent image...');
    await image.write('public/geddy-bust-puzzle-transparent.png');
    console.log('Success! Image saved as png.');
  } catch (err) {
    console.error('Error:', err);
  }
}

removeBlackBackground();

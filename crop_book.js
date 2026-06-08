import { Jimp } from 'jimp';

async function cropBook() {
  try {
    const image = await Jimp.read('./public/livro_geddy.jpg');
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    let minX = w, minY = h, maxX = 0, maxY = 0;
    
    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = image.bitmap.data[idx];
        const g = image.bitmap.data[idx+1];
        const b = image.bitmap.data[idx+2];
        
        // Darker than very light shadow (threshold 235)
        if (r < 235 && g < 235 && b < 235) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    if (minX <= maxX && minY <= maxY) {
      // Add a small padding to prevent cutting the edges too much, but wait, 235 is pretty generous
      image.crop({x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1});
      image.write('./public/livro_geddy_transparent.png');
      console.log(`Cropped from (${minX},${minY}) to (${maxX},${maxY})`);
    } else {
      console.log("No book found?");
    }
  } catch (e) {
    console.error(e);
  }
}
cropBook();

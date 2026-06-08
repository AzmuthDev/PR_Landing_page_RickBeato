import { Jimp } from 'jimp';

async function removeBackground() {
  try {
    const image = await Jimp.read('./public/livro_geddy.jpg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    const visited = new Uint8Array(width * height);
    const queue = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];
    
    const tolerance = 65; 

    const isSimilar = (idx) => {
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      return (r > 255 - tolerance && g > 255 - tolerance && b > 255 - tolerance);
    };

    let head = 0;
    while (head < queue.length) {
      const [x, y] = queue[head++];
      
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      
      const pIdx = y * width + x;
      if (visited[pIdx]) continue;
      visited[pIdx] = 1;

      const idx = (y * width + x) * 4;
      
      if (isSimilar(idx)) {
        image.bitmap.data[idx + 3] = 0; // Transparent
        
        queue.push([x + 1, y]);
        queue.push([x - 1, y]);
        queue.push([x, y + 1]);
        queue.push([x, y - 1]);
      }
    }

    image.write('./public/livro_geddy_transparent.png');
    console.log('Background removed!');
  } catch (e) {
    console.error(e);
  }
}

removeBackground();

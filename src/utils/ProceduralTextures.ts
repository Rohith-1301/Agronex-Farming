import * as THREE from 'three';

// Procedural Muddy Paddy Soil Texture with puddles & organic crumb
export function createPaddySoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base deep alluvial mud color
  ctx.fillStyle = '#26170d';
  ctx.fillRect(0, 0, 512, 512);

  // Organic soil crumbs and variations
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 2.5 + 0.5;
    const darkness = Math.random() > 0.5 ? '#1a0f08' : '#331f11';
    ctx.fillStyle = darkness;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft puddles / standing water sheen areas
  for (let p = 0; p < 8; p++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    const grad = ctx.createRadialGradient(px, py, 5, px, py, 45);
    grad.addColorStop(0, 'rgba(40, 55, 45, 0.45)');
    grad.addColorStop(1, 'rgba(38, 23, 13, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, 45, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Procedural Coconut Bark Texture with fibrous trunk rings
export function createCoconutBarkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base aged wood trunk color
  ctx.fillStyle = '#5c3a21';
  ctx.fillRect(0, 0, 256, 512);

  // Vertical fibrous grain
  for (let x = 0; x < 256; x += 2) {
    const shade = Math.floor(65 + Math.random() * 35);
    ctx.fillStyle = `rgb(${shade}, ${Math.floor(shade * 0.65)}, ${Math.floor(shade * 0.4)})`;
    ctx.fillRect(x, 0, 1.5, 512);
  }

  // Prominent horizontal ring scars left by shed fronds (characteristic of coconut palms)
  for (let y = 15; y < 512; y += 38) {
    ctx.fillStyle = '#2b180d';
    ctx.fillRect(0, y - 2, 256, 4);
    ctx.fillStyle = '#7a5132';
    ctx.fillRect(0, y + 2, 256, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Procedural Terracotta Roof Tile Texture
export function createTerracottaTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#b44c28'; // Rich South Indian terracotta brick-red
  ctx.fillRect(0, 0, 256, 256);

  // Repeating curved Spanish / Mangalore tiles
  const tileHeight = 24;
  for (let y = 0; y < 256; y += tileHeight) {
    // Shadow under tile overlap
    ctx.fillStyle = '#5c1f0d';
    ctx.fillRect(0, y, 256, 4);
    // Highlight on tile ridge
    ctx.fillStyle = '#d9653b';
    ctx.fillRect(0, y + 4, 256, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

// Procedural Rice Leaf Botanical Texture
export function createRiceLeafTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Gradient from rich chlorophyll base to lighter sunlit leaf tip
  const grad = ctx.createLinearGradient(0, 256, 0, 0);
  grad.addColorStop(0, '#15803d');
  grad.addColorStop(0.6, '#22c55e');
  grad.addColorStop(1, '#84cc16');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 256);

  // Parallel venation lines characteristic of monocot paddy leaves
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let x = 4; x < 64; x += 6) {
    ctx.fillRect(x, 0, 1, 256);
  }

  // Central midrib vein
  ctx.fillStyle = '#166534';
  ctx.fillRect(31, 0, 2, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

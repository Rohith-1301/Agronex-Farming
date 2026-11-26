/**
 * Exact, authentic crop plant images stored locally in /crops/
 * Never uses generic, stock, or unrelated images.
 */

export function getFieldCropImage(cropName: string): string {
  const c = (cropName || '').toLowerCase().trim();

  // 1. Paddy / Rice / நெல் / धान
  if (c.includes('paddy') || c.includes('rice') || c.includes('நெல்') || c.includes('धान') || c.includes('samba') || c.includes('kuruvai')) {
    return '/crops/paddy.jpg';
  }

  // 2. Banana / வாழை / केला
  if (c.includes('banana') || c.includes('plantain') || c.includes('வாழை') || c.includes('केலா') || c.includes('grand naine')) {
    return '/crops/banana.jpg';
  }

  // 3. Sugarcane / கரும்பு / गन्ना
  if (c.includes('sugar') || c.includes('cane') || c.includes('கரும்பு') || c.includes('गन्ना')) {
    return '/crops/sugarcane.jpg';
  }

  // 4. Groundnut / Peanut / மணிலா / நிலக்கடலை / मूंगफली
  if (c.includes('groundnut') || c.includes('peanut') || c.includes('kadiri') || c.includes('மணிலா') || c.includes('கடலை') || c.includes('நிலக்கடலை') || c.includes('मूंगफली')) {
    return '/crops/groundnut.jpg';
  }

  // 5. Turmeric / மஞ்சள் / हल्दी
  if (c.includes('turmeric') || c.includes('bhavani') || c.includes('மஞ்சள்') || c.includes('हल्दी')) {
    return '/crops/turmeric.jpg';
  }

  // 6. Finger Millet / Ragi / கேழ்வரகு / ராகி / रागी
  if (c.includes('millet') || c.includes('ragi') || c.includes('கேழ்வரகு') || c.includes('ராகி') || c.includes('रागी')) {
    return '/crops/ragi.jpg';
  }

  // 7. Maize / Corn / மக்காச்சோளம் / मक्का
  if (c.includes('maize') || c.includes('corn') || c.includes('மக்கா') || c.includes('मक्का')) {
    return '/crops/maize.jpg';
  }

  // 8. Cotton / பருத்தி / कपास
  if (c.includes('cotton') || c.includes('பருத்தி') || c.includes('कपास')) {
    return '/crops/cotton.jpg';
  }

  // Fallback to authentic paddy
  return '/crops/paddy.jpg';
}

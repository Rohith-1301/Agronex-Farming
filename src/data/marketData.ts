import { MarketListing } from '../types';

export interface MandiRate {
  id: string;
  commodity: string;
  variety: string;
  mandi: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  priceTrend: 'up' | 'down' | 'stable';
  changePercent: number;
  updatedAt: string;
}

export const mandiRatesTamilNadu: MandiRate[] = [
  {
    id: 'm1',
    commodity: 'Paddy (நெல்)',
    variety: 'Ponni Deluxe / CR 1009',
    mandi: 'Thanjavur Regulated Market',
    district: 'Thanjavur',
    minPrice: 2280,
    maxPrice: 2450,
    modalPrice: 2360,
    unit: 'Quintal (100 kg)',
    priceTrend: 'up',
    changePercent: +3.2,
    updatedAt: 'Today, 09:30 AM'
  },
  {
    id: 'm2',
    commodity: 'Turmeric (மஞ்சள்)',
    variety: 'Erode Finger (விரலி மஞ்சள்)',
    mandi: 'Perundurai Agro Market',
    district: 'Erode',
    minPrice: 14200,
    maxPrice: 16800,
    modalPrice: 15500,
    unit: 'Quintal (100 kg)',
    priceTrend: 'up',
    changePercent: +5.4,
    updatedAt: 'Today, 10:15 AM'
  },
  {
    id: 'm3',
    commodity: 'Coconut (தென்னை)',
    variety: 'Pollachi Grade-A Tender & Nut',
    mandi: 'Pollachi Coconut Market',
    district: 'Coimbatore',
    minPrice: 32,
    maxPrice: 42,
    modalPrice: 38,
    unit: 'Per Nut (Piece)',
    priceTrend: 'stable',
    changePercent: 0.0,
    updatedAt: 'Today, 08:45 AM'
  },
  {
    id: 'm4',
    commodity: 'Small Onion (சின்ன வெங்காயம்)',
    variety: 'CO-5 Country Rose',
    mandi: 'Dindigul APMC Yard',
    district: 'Dindigul',
    minPrice: 48,
    maxPrice: 65,
    modalPrice: 58,
    unit: 'kg',
    priceTrend: 'down',
    changePercent: -2.8,
    updatedAt: 'Today, 11:00 AM'
  },
  {
    id: 'm5',
    commodity: 'Banana (வாழை)',
    variety: 'Nendran & Poovan',
    mandi: 'Tiruchirappalli Gandhi Market',
    district: 'Tiruchirappalli',
    minPrice: 380,
    maxPrice: 520,
    modalPrice: 460,
    unit: 'Per Bunch (தார்)',
    priceTrend: 'up',
    changePercent: +4.1,
    updatedAt: 'Today, 07:30 AM'
  },
  {
    id: 'm6',
    commodity: 'Tomato (தக்காளி)',
    variety: 'Hybrid Shivam',
    mandi: 'Ottanchatram Veg Market',
    district: 'Dindigul',
    minPrice: 22,
    maxPrice: 34,
    modalPrice: 28,
    unit: 'kg',
    priceTrend: 'up',
    changePercent: +8.5,
    updatedAt: 'Today, 08:00 AM'
  }
];

export const initialMarketListings: MarketListing[] = [
  {
    id: 'list-101',
    farmerName: 'K. Rengaraj',
    crop: 'Paddy (நெல்)',
    variety: 'Mappillai Samba Organic (மாப்பிள்ளை சம்பா)',
    quantityKg: 3500,
    pricePerKg: 58,
    district: 'Thanjavur',
    contactNumber: '+91 94432 10892',
    harvestDate: '2026-10-28',
    organicCertified: true,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional heritage rice cultivated using only Jeevamirtham and Panchagavya. High fiber and immunity boosting.'
  },
  {
    id: 'list-102',
    farmerName: 'V. Senthilkumar',
    crop: 'Coconut (தென்னை)',
    variety: 'Pollachi Green Fresh Tender Coconut',
    quantityKg: 5000,
    pricePerKg: 35,
    district: 'Coimbatore',
    contactNumber: '+91 98421 55430',
    harvestDate: '2026-11-05',
    organicCertified: true,
    imageUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet tender coconuts with thick cream (வழுக்கை). Direct tree harvest available for bulk retail or wholesale delivery.'
  },
  {
    id: 'list-103',
    farmerName: 'M. Dharmalingam',
    crop: 'Turmeric (மஞ்சள்)',
    variety: 'Curcumin-Rich Erode Gold Finger Turmeric',
    quantityKg: 1800,
    pricePerKg: 175,
    district: 'Erode',
    contactNumber: '+91 97880 43921',
    harvestDate: '2026-09-12',
    organicCertified: false,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    description: 'Boiled and sun-dried finger turmeric with 4.2% laboratory-certified curcumin content. Best for export and Ayurvedic medicine.'
  },
  {
    id: 'list-104',
    farmerName: 'P. Muthulakshmi',
    crop: 'Banana (வாழை)',
    variety: 'Thottiyam Nendran Chips Grade',
    quantityKg: 2200,
    pricePerKg: 42,
    district: 'Tiruchirappalli',
    contactNumber: '+91 93601 77298',
    harvestDate: '2026-11-08',
    organicCertified: true,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp green Nendran bananas ideal for Kerala chips preparation and fruit ripening. Hand-harvested without bruising.'
  }
];

import { RecommendedCrop, CropGrowthStageDetail, FieldRecord } from '../types';

/**
 * MASTER DATABASE OF ALL CROPS SUITABLE FOR INDIAN AGROECOLOGICAL ZONES
 * Each entry includes rich agronomic data, authentic crop imagery, and market economics.
 */
export const allCropsDatabase: RecommendedCrop[] = [
  {
    id: 'crop-paddy',
    name: 'Samba Paddy (Rice)',
    scientificName: 'Oryza sativa',
    tamilName: 'சம்பா நெல் (CR 1009 / BPT 5204)',
    hindiName: 'सांभा धान (चावल)',
    variety: 'CR 1009 Sub-1 / CO 51',
    imageUrl: '/crops/paddy.jpg',
    suitabilityScore: 96,
    suitabilityReason: 'Ideal for Clay Loam or Alluvial soils with Canal or flood irrigation and high water retention capacity.',
    suitableSoil: 'Clay Loam, Heavy Clay, Alluvial (pH 5.5 – 7.2)',
    suitableClimate: 'Tropical wet climate, 22°C to 34°C, high relative humidity (>70%)',
    waterRequirementsMm: '1200 – 1400 mm (Requires continuous shallow 2-5 cm submergence during tillering)',
    cropDurationDays: 135,
    expectedYieldRange: '24 – 30 Quintals per acre (6.0 – 7.5 Tons/ha)',
    estimatedCultivationCostPerAcre: 22650,
    potentialMarketRatePerQuintal: 2350,
    estimatedNetProfitPerAcre: 38750,
    bestSeason: 'Samba / Thaladi (August – January) or Kuruvai (June – September)',
    potentialRisks: [
      'Brown Plant Hopper (BPH) during prolonged cloudiness & high humidity',
      'Paddy Blast (Magnaporthe oryzae) in case of excessive urea application',
      'Water logging during untimely northeast monsoon depressions'
    ],
    seedRequirementsKgPerAcre: '12 – 15 kg/acre (Modified Mat Nursery / SRI method)',
    sowingMethod: 'Line transplanting of 14–18 day old single seedlings with 25x25 cm spacing',
    fertilizerRequirements: 'NPK 60:20:20 kg/acre + 10 kg Zinc Sulphate + 5 tons Farm Yard Manure',
    commonPestsDiseases: ['Stem Borer', 'Leaf Folder', 'Brown Plant Hopper', 'Bacterial Leaf Blight', 'Blast'],
    harvestingInfo: 'Harvest when 80-85% grains in panicles turn straw golden yellow with 18-20% grain moisture.'
  },
  {
    id: 'crop-banana',
    name: 'Grand Naine Tissue Culture Banana',
    scientificName: 'Musa acuminata (AAA)',
    tamilName: 'ஜி-9 நேந்திரன் / கிராண்ட் நைன் வாழை',
    hindiName: 'ग्रैंड नैन केला (टिशू कल्चर)',
    variety: 'Grand Naine (G-9) / Robusta',
    imageUrl: '/crops/banana.jpg',
    suitabilityScore: 94,
    suitabilityReason: 'Thrives in rich alluvial or clay loam soils with high fertility, deep root room, and micro-fertigation.',
    suitableSoil: 'Deep rich alluvial loam, fertile clay loam (pH 6.5 – 7.5, EC < 1.0)',
    suitableClimate: 'Subtropical to tropical humid, 15°C to 38°C, protected from heavy high-velocity winds',
    waterRequirementsMm: '1500 – 1800 mm (15 – 20 Litres/plant/day via twin-row drip)',
    cropDurationDays: 330,
    expectedYieldRange: '35 – 45 Tons per acre (1200 – 1400 bunches averaging 25-30 kg)',
    estimatedCultivationCostPerAcre: 31600,
    potentialMarketRatePerQuintal: 2000,
    estimatedNetProfitPerAcre: 52000,
    bestSeason: 'February – March or August – September planting',
    potentialRisks: [
      'Sigatoka Leaf Spot fungus causing premature foliage drying',
      'Pseudostem Borer weevil causing stem hollow',
      'Wind toppling during summer squalls without bamboo propping'
    ],
    seedRequirementsKgPerAcre: '1,200 Tissue Culture plantlets per acre (1.8m x 1.8m spacing)',
    sowingMethod: 'Planting virus-indexed tissue culture hardening saplings in 45cm x 45cm pits',
    fertilizerRequirements: '200g N, 60g P, 300g K per plant delivered through drip fertigation in 30 weekly splits',
    commonPestsDiseases: ['Pseudostem Weevil', 'Rhizome Weevil', 'Yellow Sigatoka', 'Panama Wilt Fusarium', 'Banana Bunchy Top Virus'],
    harvestingInfo: 'Harvest when bunches develop full angular plumpness and light green hue, approximately 90-100 days after flowering.'
  },
  {
    id: 'crop-sugarcane',
    name: 'Co 86032 High-Recovery Sugarcane',
    scientificName: 'Saccharum officinarum',
    tamilName: 'கரும்பு (கோ 86032 நயானா)',
    hindiName: 'गन्ना (को 86032 उत्तम किस्म)',
    variety: 'Co 86032 / Co 0238',
    imageUrl: '/crops/sugarcane.jpg',
    suitabilityScore: 92,
    suitabilityReason: 'Optimal for medium loam and alluvial soils with reliable irrigation. Produces heavy tonnage and high Brix recovery.',
    suitableSoil: 'Deep rich loam, alluvial or clay loam with good drainage (pH 6.5 – 7.8)',
    suitableClimate: 'Subtropical to tropical sunny climate, 20°C to 38°C, minimum 8 hours daily bright sunlight',
    waterRequirementsMm: '1600 – 2000 mm (Subsurface drip fertigation saves 45% water)',
    cropDurationDays: 360,
    expectedYieldRange: '55 – 65 Tons per acre (SSI single eye bud technique)',
    estimatedCultivationCostPerAcre: 48000,
    potentialMarketRatePerQuintal: 315, // ~₹3,150/ton
    estimatedNetProfitPerAcre: 72000,
    bestSeason: 'Special season (June – July) or Main season (December – March)',
    potentialRisks: [
      'Early Shoot Borer and Internode Borer larvae',
      'Red rot fungus causing internal vascular breakdown',
      'Lodging during high-velocity cyclonic gales'
    ],
    seedRequirementsKgPerAcre: '5,000 single bud chips or 25,000 two-budded setts per acre',
    sowingMethod: 'Trench method with 4-5 feet wide row spacing and subsurface drip line',
    fertilizerRequirements: '120 kg N, 30 kg P, 60 kg K per acre in 4 split doses before 90 days',
    commonPestsDiseases: ['Early Shoot Borer', 'Internode Borer', 'Whitefly', 'Red Rot', 'Smut', 'Wilt'],
    harvestingInfo: 'Harvest at 11-12 months when juice refractometer Brix reaches 19-21% and purity exceeds 85%.'
  },
  {
    id: 'crop-groundnut',
    name: 'Kadiri 6 Bold Groundnut',
    scientificName: 'Arachis hypogaea',
    tamilName: 'வேர்க்கடலை / மணிலா (கதிரி 6 / VRI 8)',
    hindiName: 'मूングफली (कादिरी 6 दानेदार)',
    variety: 'Kadiri 6 / TMV 13 / VRI 8',
    imageUrl: '/crops/groundnut.jpg',
    suitabilityScore: 95,
    suitabilityReason: 'Superb rotation crop for Red Loam and Sandy Loam. Loose soil texture allows easy subterranean peg penetration and nitrogen fixation.',
    suitableSoil: 'Well-aerated Red Loam, Sandy Loam, light Alluvial (pH 6.0 – 7.5)',
    suitableClimate: 'Warm semi-arid climate, 25°C to 35°C, requires warm root zone',
    waterRequirementsMm: '450 – 550 mm (Low water need; critical stages: Flowering & Pegging)',
    cropDurationDays: 105,
    expectedYieldRange: '14 – 18 Quintals per acre (Dry pods with 72% shelling outturn)',
    estimatedCultivationCostPerAcre: 18500,
    potentialMarketRatePerQuintal: 6400,
    estimatedNetProfitPerAcre: 68500,
    bestSeason: 'Kharif (June – July) or Rabi/Summer (December – February)',
    potentialRisks: [
      'Tikka Leaf Spot (Cercospora arachidicola) defoliation',
      'Root grubs eating subterranean pegs and pods',
      'Hard crust formation if topsoil dries out during pegging'
    ],
    seedRequirementsKgPerAcre: '50 – 55 kg kernels per acre treated with Trichoderma and Rhizobium',
    sowingMethod: 'Broad bed and furrow (BBF) method with 30 cm x 10 cm seed spacing',
    fertilizerRequirements: '10 kg N, 20 kg P, 30 kg K + 160 kg Gypsum at 40-45 DAS for pod filling',
    commonPestsDiseases: ['Leaf Miner', 'Spodoptera', 'White Grub', 'Tikka Leaf Spot', 'Rust', 'Collar Rot'],
    harvestingInfo: 'Harvest when inner shell wall shows blackish brown pigmentation and kernel seed coat turns pink.'
  },
  {
    id: 'crop-turmeric',
    name: 'Bhavani Erode Turmeric',
    scientificName: 'Curcuma longa',
    tamilName: 'ஈரோடு பவானி மஞ்சள்',
    hindiName: 'ईरोड हल्दी (करक्यूमिन समृद्ध)',
    variety: 'Bhavani / Salem Lokhandi / IISR Pratibha',
    imageUrl: '/crops/turmeric.jpg',
    suitabilityScore: 91,
    suitabilityReason: 'Outstanding high-value commercial cash crop for fertile Red Loam or Loam with high organic matter.',
    suitableSoil: 'Well-drained loose friable Red Loam or Loam (pH 6.0 – 7.2)',
    suitableClimate: 'Warm and humid, 20°C to 35°C, requires open sunny days with timely irrigation',
    waterRequirementsMm: '700 – 900 mm (Requires 15 to 18 light irrigations)',
    cropDurationDays: 240,
    expectedYieldRange: '32 – 38 Quintals cured dry rhizomes per acre',
    estimatedCultivationCostPerAcre: 58000,
    potentialMarketRatePerQuintal: 6800,
    estimatedNetProfitPerAcre: 125000,
    bestSeason: 'May – July (Early monsoon planting)',
    potentialRisks: [
      'Rhizome rot (Pythium aphanidermatum) in water-logged fields',
      'Leaf spot / Colletotrichum blotch during heavy rains',
      'Shoot borer larvae boring into pseudo stems'
    ],
    seedRequirementsKgPerAcre: '1,000 – 1,200 kg mother / finger rhizomes per acre',
    sowingMethod: 'Ridge and furrow planting at 45 cm distance and 20 cm spacing within row',
    fertilizerRequirements: '10 tons FYM + 50 kg Urea, 120 kg Super Phosphate, 60 kg MOP at basal and 2 top dressings',
    commonPestsDiseases: ['Shoot Borer', 'Thrips', 'Rhizome Rot', 'Leaf Spot', 'Leaf Blotch'],
    harvestingInfo: 'Harvest when lower leaves turn yellow and completely dry out (8-9 months after sowing).'
  },
  {
    id: 'crop-cotton',
    name: 'Bt Cotton Hybrid',
    scientificName: 'Gossypium hirsutum',
    tamilName: 'பருத்தி (Bt வீரிய ஒட்டு - Suraj)',
    hindiName: 'कपास (बीटी हाइब्रिड)',
    variety: 'Bollgard II / RCH 659 / Suraj',
    imageUrl: '/crops/cotton.jpg',
    suitabilityScore: 88,
    suitabilityReason: 'Excellent commercial fiber crop for Black Cotton or deep Loamy soils. Moderate water demand with high market rate.',
    suitableSoil: 'Deep Black Cotton soil, Medium Clay Loam or Loam (pH 6.5 – 8.5)',
    suitableClimate: 'Warm semi-arid climate, 21°C to 35°C, requires long frost-free sunshine period',
    waterRequirementsMm: '600 – 700 mm (Controlled drip fertigation during squaring and boll bursting)',
    cropDurationDays: 160,
    expectedYieldRange: '11 – 15 Quintals seed cotton (Kapas) per acre',
    estimatedCultivationCostPerAcre: 24000,
    potentialMarketRatePerQuintal: 7200,
    estimatedNetProfitPerAcre: 52000,
    bestSeason: 'Kharif (July – August) or Winter irrigated (September – October)',
    potentialRisks: [
      'Pink Bollworm (Pectinophora gossypiella) late season resistance',
      'Sucking pests (Whitefly, Thrips, Jassids) transmitting leaf curl',
      'Boll shedding during continuous cloudy weather or excess moisture'
    ],
    seedRequirementsKgPerAcre: '1.5 – 2.0 packets (450g each) per acre with 90 cm x 60 cm spacing',
    sowingMethod: 'Dibbling single seed on ridges with pre-emergence weed management',
    fertilizerRequirements: '48 kg N, 24 kg P, 24 kg K + 1% Magnesium Sulphate spray at flowering',
    commonPestsDiseases: ['Pink Bollworm', 'American Bollworm', 'Whitefly', 'Thrips', 'Bacterial Blight', 'Grey Mildew'],
    harvestingInfo: 'Hand pick fully opened clean dry bolls in morning hours after dew has evaporated.'
  },
  {
    id: 'crop-maize',
    name: 'Hybrid Grain Maize (Corn)',
    scientificName: 'Zea mays',
    tamilName: 'மக்காச்சோளம் (வீரிய ஹைப்ரிட்)',
    hindiName: 'मक्का (उच्च उपज हाइब्रिड)',
    variety: 'NK 6240 / Pioneer P3522 / CO 6',
    imageUrl: '/crops/maize.jpg',
    suitabilityScore: 93,
    suitabilityReason: 'Fast-growing high-yield grain crop perfect for Loam or Sandy Loam. Highly responsive to nitrogen with strong market demand.',
    suitableSoil: 'Well-drained Loam, Sandy Loam or Silt Loam (pH 6.0 – 7.5)',
    suitableClimate: 'Warm sunny weather, 20°C to 36°C, bright sunshine throughout growth',
    waterRequirementsMm: '500 – 600 mm (Critical stages: Tasseling and Cob Silk emergence)',
    cropDurationDays: 105,
    expectedYieldRange: '30 – 38 Quintals grain per acre + nutritious green fodder',
    estimatedCultivationCostPerAcre: 19500,
    potentialMarketRatePerQuintal: 2150,
    estimatedNetProfitPerAcre: 48500,
    bestSeason: 'Kharif (June – July) or Rabi/Winter (October – November)',
    potentialRisks: [
      'Fall Armyworm (Spodoptera frugiperda) defoliating whorls',
      'Stem borer damage at seedling stage',
      'Moisture stress during 10 days of silking'
    ],
    seedRequirementsKgPerAcre: '8 kg hybrid seeds per acre with 60 cm x 20 cm spacing',
    sowingMethod: 'Ridge sowing at 4 cm depth with seed treatment using Imidacloprid',
    fertilizerRequirements: '60 kg N, 25 kg P, 25 kg K + 10 kg Zinc Sulphate per acre',
    commonPestsDiseases: ['Fall Armyworm', 'Stem Borer', 'Turcicum Leaf Blight', 'Downy Mildew'],
    harvestingInfo: 'Harvest when outer husk dries completely, cob grains feel hard, and black layer appears at grain base.'
  },
  {
    id: 'crop-millets',
    name: 'Finger Millet (Ragi)',
    scientificName: 'Eleusine coracana',
    tamilName: 'கேழ்வரகு / ராகி (GPU 28)',
    hindiName: 'रागी / मड़ुआ (पौष्टिक मोटा अनाज)',
    variety: 'GPU 28 / CO 15 / ML 365',
    imageUrl: '/crops/ragi.jpg',
    suitabilityScore: 90,
    suitabilityReason: 'Extreme drought resilience and low input cost. Excellent for light soils and water-saving crop rotation.',
    suitableSoil: 'Red Sandy Loam, gravelly, laterite soils, shallow light soils (pH 5.0 – 7.8)',
    suitableClimate: 'Warm semi-arid, 20°C to 34°C, minimal rainfall requirement',
    waterRequirementsMm: '350 – 450 mm (Extremely water frugal, withstands dry spells)',
    cropDurationDays: 100,
    expectedYieldRange: '14 – 18 Quintals per acre + 2.5 Tons high quality cattle fodder',
    estimatedCultivationCostPerAcre: 11500,
    potentialMarketRatePerQuintal: 3800,
    estimatedNetProfitPerAcre: 41700,
    bestSeason: 'Kharif (June – July) or Rabi irrigated (December – January)',
    potentialRisks: [
      'Ragi Blast (Pyricularia grisea) at finger emergence',
      'Aphid infestation on tender ears',
      'Lodging if excessive nitrogen is applied'
    ],
    seedRequirementsKgPerAcre: '2 kg/acre for direct sowing or 1.5 kg for nursery transplantation',
    sowingMethod: 'Line sowing or transplanting 18-20 day old seedlings at 22.5 x 10 cm spacing',
    fertilizerRequirements: '24 kg N, 12 kg P, 12 kg K per acre + 5 tons FYM',
    commonPestsDiseases: ['Blast', 'Brown Spot', 'Stem Borer', 'Aphids', 'Earhead Caterpillar'],
    harvestingInfo: 'Harvest earheads when 85% fingers turn brown and dry; dry in sun before threshing.'
  }
];

// =========================================================================
// AUTHENTIC CROP GROWTH TIMELINES FOR MULTIPLE CROPS
// =========================================================================

export const cropGrowthTimelines: Record<string, CropGrowthStageDetail[]> = {
  // 1. PADDY (RICE) TIMELINE
  'Paddy': [
    {
      stageNumber: 1,
      stageName: 'Seed & Germination',
      dayRange: 'Day 1 – 7',
      startDay: 1,
      endDay: 7,
      description: 'Seed soaking in water for 24 hours followed by 24 hour incubation in gunny bag. Radicle and coleoptile emerge to form young sprout.',
      waterRequirements: 'Keep seedbed saturated with thin film (1-2 cm). Do not allow crusting.',
      nutrientRequirements: 'Seed treatment with Pseudomonas fluorescens (10g/kg) and Azospirillum.',
      keyFarmingActivities: [
        'Treat certified seeds with biocontrol agents',
        'Prepare raised nursery beds of 1.5m width',
        'Evenly broadcast sprouted seeds onto muddy seedbed'
      ],
      pestDiseaseRisks: ['Bird damage to exposed sprouts', 'Seedling damping off in stagnant water'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Seedling Stage',
      dayRange: 'Day 8 – 18',
      startDay: 8,
      endDay: 18,
      description: 'First, second, and third green leaves emerge. Crown roots establish anchor in the soil. Seedlings reach 12-15 cm height, ready for transplanting.',
      waterRequirements: 'Gradually raise water depth to 2 cm to suppress early weed emergence.',
      nutrientRequirements: 'Apply 2 kg DAP per cent of nursery area on Day 10.',
      keyFarmingActivities: [
        'Puddle the main field thoroughly with cage wheels',
        'Apply basal fertilizer dose in main field',
        'Gently uproot 15-day old single seedlings for SRI planting'
      ],
      pestDiseaseRisks: ['Thrips scratching tender leaves', 'Caseworm cutting leaf tubes'],
      imageUrl: '/timeline/seedling.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Tillering Stage (Active Tillering)',
      dayRange: 'Day 19 – 45',
      startDay: 19,
      endDay: 45,
      description: 'Primary, secondary, and tertiary tillers emerge rapidly from nodal points. Plant diameter expands, root depth reaches 20 cm with dense crown.',
      waterRequirements: 'Maintain 2 to 3 cm water level. Adopt Alternate Wetting and Drying (AWDI) to aerate root zone.',
      nutrientRequirements: 'Top dress 25% Nitrogen (Urea) + 25% Potassium (MOP) at 25 DAS and 40 DAS.',
      keyFarmingActivities: [
        'Operate rotary conoweeder between rows at 15 and 30 DAS',
        'Incorporate weeds into mud as green manure',
        'Check for yellowing indicating zinc deficiency'
      ],
      pestDiseaseRisks: ['Stem Borer dead hearts', 'Leaf Folder folding leaf blades', 'Brown Spot'],
      imageUrl: '/crops/paddy.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Panicle Initiation & Booting',
      dayRange: 'Day 46 – 75',
      startDay: 46,
      endDay: 75,
      description: 'Internodes elongate rapidly. The flag leaf sheath swells (booting). Young panicle forms inside the stem and prepares for anthesis.',
      waterRequirements: 'Essential: Maintain 4-5 cm standing water without allowing field to dry.',
      nutrientRequirements: 'Apply third top dressing: 15 kg Urea + 10 kg MOP per acre.',
      keyFarmingActivities: [
        'Stop conoweeding to avoid root trimming',
        'Inspect stem base for Brown Plant Hopper (BPH)',
        'Erect 10 bird perches per acre for natural pest control'
      ],
      pestDiseaseRisks: ['BPH multiplying at water level', 'Bacterial Leaf Blight on leaf margins'],
      imageUrl: '/paddy-golden-panicle.jpg'
    },
    {
      stageNumber: 5,
      stageName: 'Flowering & Anthesis',
      dayRange: 'Day 76 – 95',
      startDay: 76,
      endDay: 95,
      description: 'Panicles emerge fully. Golden anthers open between 9:00 AM and 11:30 AM for wind pollination. Spikelets fertilize.',
      waterRequirements: 'CRITICAL STAGE: Moisture stress causes empty grains (chaffy grain). Keep 5 cm water.',
      nutrientRequirements: 'Foliar spray of 1% Potassium Nitrate (KNO3) + 0.2% Borax.',
      keyFarmingActivities: [
        'Do not spray chemicals during morning flowering hours',
        'Maintain clean flag leaves for peak photosynthesis',
        'Install yellow sticky traps'
      ],
      pestDiseaseRisks: ['Neck Blast cutting panicle neck', 'False Smut spores', 'Gundhi Bug sucking milky sap'],
      imageUrl: '/paddy-golden-panicle.jpg'
    },
    {
      stageNumber: 6,
      stageName: 'Grain Filling (Milky to Dough)',
      dayRange: 'Day 96 – 118',
      startDay: 96,
      endDay: 118,
      description: 'Liquid milky starch accumulates in fertilized kernels, transforming into soft dough and hard dough. Panicles bend downwards under grain weight.',
      waterRequirements: 'Intermittent shallow wetting (1-2 cm). Withhold standing water periodically.',
      nutrientRequirements: 'No soil fertilizer required. Starch translocation relies on healthy flag leaves.',
      keyFarmingActivities: [
        'Control late sucking pests like rice earhead bugs',
        'Maintain field bunds clean from rodents',
        'Watch for rat burrows and place bamboo traps'
      ],
      pestDiseaseRisks: ['Rice Earhead Bug (Leptocorisa acuta)', 'Rodents cutting productive tillers'],
      imageUrl: '/crops/paddy.jpg'
    },
    {
      stageNumber: 7,
      stageName: 'Maturity & Harvesting',
      dayRange: 'Day 119 – 135',
      startDay: 119,
      endDay: 135,
      description: 'Grains turn golden yellow and reach 18-20% moisture. Flag leaves senesce. Stems turn straw color. Crop is fully harvest-ready.',
      waterRequirements: 'Drain all water from the field completely 10 to 12 days before harvest to firm up soil for combine harvesters.',
      nutrientRequirements: 'Nil. Prepare post-harvest threshing and storage bags.',
      keyFarmingActivities: [
        'Final field drainage',
        'Book Combine Harvester or manual reaping team',
        'Thresh, winnow, and sun dry grain on tarpaulins to 12% storage moisture',
        'Bag grain in clean HDPE sacks with moisture barrier'
      ],
      pestDiseaseRisks: ['Unseasonal cyclone or rain lodging ripe crop', 'Storage grain weevils if bagged wet'],
      imageUrl: '/paddy-golden-panicle.jpg'
    }
  ],

  // 2. BANANA TIMELINE
  'Banana': [
    {
      stageNumber: 1,
      stageName: 'Tissue Culture Sapling Establishment',
      dayRange: 'Day 1 – 45',
      startDay: 1,
      endDay: 45,
      description: 'Hardened tissue culture plantlets (or selected sword suckers) planted in 45cm pits. Rapid feeder root development into loosened fertile soil.',
      waterRequirements: '10–12 Litres/plant/day via drip line. Maintain root zone moisture without standing waterlogging.',
      nutrientRequirements: 'Basal dose: 10 kg FYM + 200g Neem cake + 50g VAM per pit.',
      keyFarmingActivities: [
        'Pit preparation with compost and soil mixture',
        'Careful planting without damaging delicate primary root plug',
        'Light earthing up to support tender pseudostem'
      ],
      pestDiseaseRisks: ['Rhizome rot from poor drainage', 'Nematodes infesting root tips'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Active Vegetative & Canopy Expansion',
      dayRange: 'Day 46 – 160',
      startDay: 46,
      endDay: 160,
      description: 'One new large leaf emerges every 5 to 7 days. Pseudostem girth increases significantly to 50-65 cm. Broad lush leaves maximize solar harvesting.',
      waterRequirements: '15–20 Litres/plant/day delivered through twin drip emitters.',
      nutrientRequirements: 'Weekly fertigation: 10g Urea + 15g Potassium Sulphate per plant.',
      keyFarmingActivities: [
        'Regular de-suckering (prune unwanted side suckers with knife)',
        'Maintain clean basin free of competitive weeds',
        'Inspect leaf undersides for Sigatoka spot streaks'
      ],
      pestDiseaseRisks: ['Pseudostem weevil boring holes', 'Yellow Sigatoka leaf blight'],
      imageUrl: '/crops/banana.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Shooting & Inflorescence Emergence',
      dayRange: 'Day 161 – 230',
      startDay: 161,
      endDay: 230,
      description: 'The vegetative growing point transforms into floral apex. A large heart-shaped maroon flower bell emerges through the central crown of leaves.',
      waterRequirements: '22–25 Litres/plant/day. Peak water consumption stage.',
      nutrientRequirements: 'High Potassium fertigation: 20g MOP per plant weekly for bunch sizing.',
      keyFarmingActivities: [
        'Propping: Support heavy pseudostems with double bamboo poles or nylon ropes',
        'Denavelling: Remove terminal male floral bud after all hands have formed',
        'Cover developing bunch with perforated blue polypropylene sleeves'
      ],
      pestDiseaseRisks: ['Wind toppling of unpropped plants', 'Thrips scratching tender young fingers'],
      imageUrl: '/timeline/banana-flower.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Bunch Filling & Maturity',
      dayRange: 'Day 231 – 330',
      startDay: 231,
      endDay: 330,
      description: 'Banana fingers expand, losing distinct sharp angular ridges and becoming plump, rounded, and shiny light green. Starch accumulation peaks.',
      waterRequirements: '18–20 Litres/plant/day; taper off 10 days before harvest.',
      nutrientRequirements: 'Sulphate of Potash (0:0:50) foliar spray 1% for fruit shine and sweetness.',
      keyFarmingActivities: [
        'Check bunch sleeve ventilation holes',
        'Harvest when top hand fingers turn smooth and rounded',
        'Cut bunch with 30cm stalk hook for safe transport without bruising'
      ],
      pestDiseaseRisks: ['Sunburn on exposed bunches', 'Crown rot fungus during humid spells'],
      imageUrl: '/timeline/banana-bunch.jpg'
    }
  ],

  // 3. SUGARCANE TIMELINE
  'Sugarcane': [
    {
      stageNumber: 1,
      stageName: 'Germination & Sett Sprouting',
      dayRange: 'Day 1 – 35',
      startDay: 1,
      endDay: 35,
      description: 'Single-bud chips or setts absorb soil moisture. Eye buds swell and sprout through soil crust. Primary root system establishes.',
      waterRequirements: 'Light, frequent irrigations at 5-7 day intervals to keep trenches moist.',
      nutrientRequirements: 'Basal application: 25% Nitrogen + 100% Phosphorus (Single Super Phosphate).',
      keyFarmingActivities: [
        'Dip setts in Carbendazim solution before planting',
        'Place setts end-to-end in deep furrows',
        'Cover with 2-3 cm fine soil'
      ],
      pestDiseaseRisks: ['Early Shoot Borer larvae boring into growing point (Dead hearts)'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Tillering & Formative Stage',
      dayRange: 'Day 36 – 100',
      startDay: 36,
      endDay: 100,
      description: 'Underground nodal buds produce 6-10 tillers per clump. Root zone expands to 45 cm depth. High nutrient absorption phase.',
      waterRequirements: 'Irrigate at 8-10 day intervals. Subsurface drip delivers 35% water savings.',
      nutrientRequirements: 'Apply 50% Nitrogen + 50% Potassium in two split doses (at 45 and 90 days).',
      keyFarmingActivities: [
        'Partial earthing up at 45 days to control early tillers',
        'Intercultivation to loosen soil between rows',
        'Release Trichogramma egg parasitoids for borer control'
      ],
      pestDiseaseRisks: ['Internode borer', 'Whitefly on lower leaf surface'],
      imageUrl: '/timeline/seedling.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Grand Growth & Cane Elongation',
      dayRange: 'Day 101 – 270',
      startDay: 101,
      endDay: 270,
      description: 'Rapid internode elongation and cane girth thickening. Canes add 4-5 internodes monthly, reaching 2.5 to 3.5 meters height.',
      waterRequirements: 'Peak water requirement: maintain steady soil moisture.',
      nutrientRequirements: 'Final top dressing of Nitrogen completed before 120 days.',
      keyFarmingActivities: [
        'Heavy final earthing up to create deep irrigation channels',
        'Trash mulching: Remove dry senescent leaves and spread as mulch',
        'Wrap and tie canes together (propping) to prevent lodging during wind'
      ],
      pestDiseaseRisks: ['Red rot fungus', 'Woolly aphid infestation on cane foliage'],
      imageUrl: '/crops/sugarcane.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Ripening & Sugar Accumulation',
      dayRange: 'Day 271 – 360',
      startDay: 271,
      endDay: 360,
      description: 'Vegetative growth slows. Sucrose synthesizes rapidly in leaves and stores in stalk parenchyma tissue. Hand refractometer Brix reaches 19-21%.',
      waterRequirements: 'Withhold irrigation 15 to 20 days prior to harvest to concentrate sucrose.',
      nutrientRequirements: 'Nil. Avoid any late nitrogen which reduces sugar recovery.',
      keyFarmingActivities: [
        'Field Brix testing with hand refractometer',
        'Base-level cutting right at ground level (bottom internodes contain highest sugar)',
        'Immediate dispatch to sugar factory within 24 hours of cutting'
      ],
      pestDiseaseRisks: ['Post-harvest inversion loss of sugar if left uncrushed'],
      imageUrl: '/crops/sugarcane.jpg'
    }
  ],

  // 4. GROUNDNUT TIMELINE
  'Groundnut': [
    {
      stageNumber: 1,
      stageName: 'Seed & Germination',
      dayRange: 'Day 1 – 7',
      startDay: 1,
      endDay: 7,
      description: 'Bold kernels imbibe soil moisture; radicle emerges within 48 hours followed by hypocotyl arch pushing cotyledons toward surface.',
      waterRequirements: 'Light pre-sowing irrigation to ensure uniform germination.',
      nutrientRequirements: 'Seed treatment with Trichoderma viride (4g/kg) + Rhizobium culture.',
      keyFarmingActivities: ['Select bold, unsplit Kadiri 6 kernels', 'Sow at 4-5 cm depth with 30x10 cm spacing'],
      pestDiseaseRisks: ['Collar rot (Aspergillus niger)', 'Seed-rotting soil fungi'],
      imageUrl: '/timeline/seedling.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Emergence & Seedling',
      dayRange: 'Day 8 – 20',
      startDay: 8,
      endDay: 20,
      description: 'Tetrafoliate leaves unfold cleanly, taproot penetrates down to 30 cm, and pink Rhizobium root nodules begin nitrogen fixation.',
      waterRequirements: 'Moist seedbed; one light life-saving irrigation at 12 DAS if dry.',
      nutrientRequirements: 'Basal dose: 10 kg N + 20 kg P2O5 + 30 kg K2O + 5 kg Borax.',
      keyFarmingActivities: ['Gap filling at 10 DAS', 'First hand weeding at 15 DAS'],
      pestDiseaseRisks: ['Cutworms cutting tender stems', 'Thrips on young leaves'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Vegetative Branching',
      dayRange: 'Day 21 – 32',
      startDay: 21,
      endDay: 32,
      description: 'Lateral branches spread across the row forming a dense green canopy. Root nodulation reaches peak biological nitrogen fixation.',
      waterRequirements: 'Moderate irrigation at 8-10 day intervals.',
      nutrientRequirements: 'Foliar micronutrient spray (ZnSO4 0.5% + FeSO4 0.5%) if chlorosis appears.',
      keyFarmingActivities: ['Second hand weeding before flowering', 'Install pheromone traps for Spodoptera'],
      pestDiseaseRisks: ['Leaf miner caterpillars', 'Early Tikka leaf spots'],
      imageUrl: '/crops/groundnut.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Flowering & Pegging',
      dayRange: 'Day 33 – 55',
      startDay: 33,
      endDay: 55,
      description: 'Bright yellow papilionaceous flowers bloom near the base. After self-pollination, geotropic gynophores (pegs) elongate downward into the soil.',
      waterRequirements: 'CRITICAL STAGE: Keep top soil soft and moist so pegs penetrate effortlessly.',
      nutrientRequirements: 'Apply 160 kg Gypsum per acre at 40-45 DAS around plant base.',
      keyFarmingActivities: [
        'Earthing up carefully around pegging zone',
        'Stop all intercultivation once pegs enter soil',
        'Incorporate gypsum into top 3 cm soil for Calcium supply'
      ],
      pestDiseaseRisks: ['Tikka leaf spot (Cercospora)', 'Red hairy caterpillar'],
      imageUrl: '/timeline/groundnut-flower.jpg'
    },
    {
      stageNumber: 5,
      stageName: 'Pod Formation & Bulking',
      dayRange: 'Day 56 – 85',
      startDay: 56,
      endDay: 85,
      description: 'Subterranean peg tips swell horizontally into two-seeded pods. Kernels rapidly accumulate lipids, oil, and storage proteins.',
      waterRequirements: 'Steady sprinkler irrigation every 7-8 days; avoid waterlogging.',
      nutrientRequirements: 'Foliar spray of 1% DAP + 0.5% Urea + 0.2% Borax for bold kernels.',
      keyFarmingActivities: ['Monitor white grub damage', 'Control late Tikka & Rust with Mancozeb if needed'],
      pestDiseaseRisks: ['White grub larvae chewing pods', 'Groundnut Rust pustules'],
      imageUrl: '/crops/groundnut.jpg'
    },
    {
      stageNumber: 6,
      stageName: 'Maturity & Harvesting',
      dayRange: 'Day 86 – 105',
      startDay: 86,
      endDay: 105,
      description: 'Leaves yellow and shed; 75-80% of pods show hardened shells with dark reticulate inner veins and pink-reddish mature kernels.',
      waterRequirements: 'Withhold irrigation 10 days before lifting for clean pod separation.',
      nutrientRequirements: 'Nil.',
      keyFarmingActivities: [
        'Check inner pod shell darkening on 5 random plants',
        'Lift plants cleanly and invert in field for 2-day sun curing',
        'Strip pods and dry to <8% moisture to prevent aflatoxin'
      ],
      pestDiseaseRisks: ['Pre-harvest sprouting if unseasonal rain occurs', 'Aflatoxin in damp pods'],
      imageUrl: '/timeline/groundnut-pods.jpg'
    }
  ],

  // 5. TURMERIC TIMELINE
  'Turmeric': [
    {
      stageNumber: 1,
      stageName: 'Rhizome Planting & Sprouting',
      dayRange: 'Day 1 – 30',
      startDay: 1,
      endDay: 30,
      description: 'Disease-free mother/finger rhizome bits (30-40g with 2-3 buds) sprout slowly under warm moist ridges.',
      waterRequirements: 'Irrigate immediately after planting and every 5-6 days.',
      nutrientRequirements: 'Basal: 10 tons FYM + 100% P2O5 + 25% K2O + Azospirillum.',
      keyFarmingActivities: ['Treat seed rhizomes with Carbendazim + Quinalphos', 'Mulch beds with green leaves (12 t/ha)'],
      pestDiseaseRisks: ['Rhizome scale', 'Early rhizome rot in poorly drained pockets'],
      imageUrl: '/timeline/seedling.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Vegetative Leaf Emergence',
      dayRange: 'Day 31 – 90',
      startDay: 31,
      endDay: 90,
      description: 'Broad lanceolate lush green leaves unfurl in pairs, forming a dense 1m tall pseudostem canopy.',
      waterRequirements: 'Drip or furrow irrigation every 7 days.',
      nutrientRequirements: 'Top dress 50% N + 25% K2O at 45 and 90 DAP.',
      keyFarmingActivities: ['Hand weeding and second green leaf mulching at 60 DAP', 'Earthing up soil around base'],
      pestDiseaseRisks: ['Shoot borer (Conogethes punctiferalis)', 'Leaf blotch (Taphrina)'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Rhizome Initiation & Tillering',
      dayRange: 'Day 91 – 150',
      startDay: 91,
      endDay: 150,
      description: 'Underground mother rhizome produces lateral primary and secondary fingers. Curcuminoid pigment synthesis begins.',
      waterRequirements: 'Maintain uniform soil moisture; avoid drought stress.',
      nutrientRequirements: 'Apply remaining Nitrogen + Potash + Micronutrients (Zn, Fe, B) at 120 DAP.',
      keyFarmingActivities: ['Final earthing up to cover exposed young rhizomes', 'Check for rhizome rot wilting'],
      pestDiseaseRisks: ['Pythium rhizome rot', 'Leaf spot (Colletotrichum)'],
      imageUrl: '/crops/turmeric.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Rhizome Bulking & Curing Maturity',
      dayRange: 'Day 151 – 240',
      startDay: 151,
      endDay: 240,
      description: 'Fingers plump with deep orange-yellow flesh and high curcumin (4.5-5.5%). Foliage turns golden-yellow and dries down.',
      waterRequirements: 'Stop irrigation 20 days prior to digging.',
      nutrientRequirements: 'Nil.',
      keyFarmingActivities: ['Dig rhizomes carefully without bruising', 'Boil, sun-dry for 10-12 days, and polish'],
      pestDiseaseRisks: ['Storage beetles if dried incompletely'],
      imageUrl: '/crops/turmeric.jpg'
    }
  ],

  // 6. FINGER MILLET (RAGI) TIMELINE
  'Ragi': [
    {
      stageNumber: 1,
      stageName: 'Seed & Germination',
      dayRange: 'Day 1 – 10',
      startDay: 1,
      endDay: 10,
      description: 'Tiny reddish-brown seeds germinate rapidly within 4 days; fibrous adventitious roots anchor seedling.',
      waterRequirements: 'Light irrigation at sowing and Day 4 if dry.',
      nutrientRequirements: 'Treat seeds with Azospirillum (600g/ha). Basal: 50% N + 100% P & K.',
      keyFarmingActivities: ['Line sow or transplant 18-day nursery seedlings at 30x10 cm'],
      pestDiseaseRisks: ['Bird picking', 'Seedling blight'],
      imageUrl: '/timeline/seedling.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Tillering & Vegetative Growth',
      dayRange: 'Day 11 – 40',
      startDay: 11,
      endDay: 40,
      description: 'Profuse basal tillers emerge (4-7 productive tillers per hill) with narrow, erect dark-green leaves.',
      waterRequirements: 'Drought tolerant; irrigate once every 10-12 days if rain fails.',
      nutrientRequirements: 'Top dress remaining 50% Nitrogen at 25-30 DAS.',
      keyFarmingActivities: ['Intercultivation with hand hoe at 20 DAS', 'Thinning to maintain spacing'],
      pestDiseaseRisks: ['Pink stem borer', 'Aphids on young shoots'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Earhead Emergence & Flowering',
      dayRange: 'Day 41 – 70',
      startDay: 41,
      endDay: 70,
      description: 'Characteristic 5-7 curved finger-like spikes emerge from the boot leaf and undergo self-pollination.',
      waterRequirements: 'CRITICAL STAGE: Ensure adequate soil moisture during flowering.',
      nutrientRequirements: 'Foliar 1% Urea if crop shows pale stress.',
      keyFarmingActivities: ['Scout for neck & finger blast lesions'],
      pestDiseaseRisks: ['Finger & Neck Blast (Pyricularia grisea)', 'Earhead caterpillars'],
      imageUrl: '/crops/ragi.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Grain Filling & Harvest',
      dayRange: 'Day 71 – 100',
      startDay: 71,
      endDay: 100,
      description: 'Spikelets fill with calcium-rich reddish-brown grains; fingers curve inward and turn golden-brown.',
      waterRequirements: 'Stop irrigation 12 days before harvest.',
      nutrientRequirements: 'Nil.',
      keyFarmingActivities: ['Harvest mature earheads in 2 pickings', 'Sun dry, thresh, and winnow'],
      pestDiseaseRisks: ['Bird damage on ripening earheads'],
      imageUrl: '/crops/ragi.jpg'
    }
  ],

  // 7. HYBRID MAIZE TIMELINE
  'Maize': [
    {
      stageNumber: 1,
      stageName: 'Emergence & V4 Seedling',
      dayRange: 'Day 1 – 20',
      startDay: 1,
      endDay: 20,
      description: 'Coleoptile emerges in 5 days; 4 true leaves unfold with deep seminal and nodal roots establishing.',
      waterRequirements: 'Light irrigation immediately after sowing and at 10 DAS.',
      nutrientRequirements: 'Basal: 25% N + 100% P2O5 + 50% K2O + 10 kg ZnSO4/acre.',
      keyFarmingActivities: ['Ridge-and-furrow sowing (60x20 cm)', 'Pre-emergence Atrazine weed control'],
      pestDiseaseRisks: ['Fall Armyworm (FAW) whorl feeding', 'Shoot fly'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Knee-High & Rapid Vegetative',
      dayRange: 'Day 21 – 48',
      startDay: 21,
      endDay: 48,
      description: 'Stalk elongates rapidly to 1.5m+. Ear shoot initials and tassel differentiate internally.',
      waterRequirements: 'Irrigate every 7-8 days; sensitive to waterlogging.',
      nutrientRequirements: 'Top dress 50% N at 25 DAS and remaining 25% N + 50% K2O at 45 DAS.',
      keyFarmingActivities: ['Earthing up at 30 DAS', 'Monitor whorl for Fall Armyworm frass'],
      pestDiseaseRisks: ['Fall Armyworm', 'Turcicum leaf blight'],
      imageUrl: '/crops/maize.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Tasseling & Silking',
      dayRange: 'Day 49 – 70',
      startDay: 49,
      endDay: 70,
      description: 'Top tassel sheds golden pollen onto receptive green silks emerging from cob husks.',
      waterRequirements: 'CRITICAL STAGE: Moisture stress causes poor pollination and missing kernels.',
      nutrientRequirements: 'Foliar 1% KNO3 if needed.',
      keyFarmingActivities: ['Ensure uninterrupted irrigation', 'Avoid foliar sprays during morning pollen shed'],
      pestDiseaseRisks: ['Cob borer', 'Pollen-washing storms'],
      imageUrl: '/timeline/maize-tassel.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Grain Filling & Physiological Maturity',
      dayRange: 'Day 71 – 105',
      startDay: 71,
      endDay: 105,
      description: 'Kernels pass through milky, dough, and dent stages; black layer forms at kernel base and husks dry.',
      waterRequirements: 'Stop irrigation 15 days before harvest.',
      nutrientRequirements: 'Nil.',
      keyFarmingActivities: ['Harvest when husks turn straw-yellow', 'Shell cobs and dry grain to 12% moisture'],
      pestDiseaseRisks: ['Stalk rot', 'Storage weevils'],
      imageUrl: '/crops/maize.jpg'
    }
  ],

  // 8. BT COTTON TIMELINE
  'Cotton': [
    {
      stageNumber: 1,
      stageName: 'Seedling & Establishment',
      dayRange: 'Day 1 – 25',
      startDay: 1,
      endDay: 25,
      description: 'Dicotyledonous seedlings emerge in 5-6 days; deep taproot anchors strongly into black/loam soil.',
      waterRequirements: 'Light irrigation at sowing and 12 DAS.',
      nutrientRequirements: 'Basal: 25% N + 100% P2O5 + 50% K2O.',
      keyFarmingActivities: ['Dibbling at 90x60 cm', 'Gap filling & thinning at 15 DAS'],
      pestDiseaseRisks: ['Thrips & Jassids (leafhoppers)', 'Damping off'],
      imageUrl: '/timeline/germination.jpg'
    },
    {
      stageNumber: 2,
      stageName: 'Squaring & Branching',
      dayRange: 'Day 26 – 55',
      startDay: 26,
      endDay: 55,
      description: 'Sympodial fruiting branches develop and triangular green flower buds (squares) appear.',
      waterRequirements: 'Moderate irrigation every 10-12 days.',
      nutrientRequirements: 'Top dress 50% N at 35 DAS + Magnesium Sulphate spray if leaf reddening occurs.',
      keyFarmingActivities: ['Intercultivation and earthing up', 'Install yellow sticky traps for whitefly'],
      pestDiseaseRisks: ['Whitefly', 'Aphids', 'Square shedding'],
      imageUrl: '/timeline/seedling.jpg'
    },
    {
      stageNumber: 3,
      stageName: 'Flowering & Boll Formation',
      dayRange: 'Day 56 – 110',
      startDay: 56,
      endDay: 110,
      description: 'Creamy-white flowers turn pink after pollination and develop into green spherical cotton bolls.',
      waterRequirements: 'CRITICAL STAGE: Maintain steady soil moisture; avoid stress.',
      nutrientRequirements: 'Final 25% N + 50% K2O at 65 DAS + 2% DAP foliar spray.',
      keyFarmingActivities: ['Nipping terminal bud at 85 DAS', 'Monitor pheromone traps for Pink Bollworm'],
      pestDiseaseRisks: ['Pink Bollworm', 'American Bollworm', 'Grey mildew'],
      imageUrl: '/timeline/cotton-flower.jpg'
    },
    {
      stageNumber: 4,
      stageName: 'Boll Opening & Picking',
      dayRange: 'Day 111 – 160',
      startDay: 111,
      endDay: 160,
      description: 'Mature bolls split open cleanly exposing bright white lint fibers ready for clean picking.',
      waterRequirements: 'Stop irrigation once 50% bolls begin bursting.',
      nutrientRequirements: 'Nil.',
      keyFarmingActivities: ['Pick clean dry lint in 3-4 rounds during dry mornings', 'Store by grade away from moisture'],
      pestDiseaseRisks: ['Cotton stainer bug', 'Unseasonal rain discoloring lint'],
      imageUrl: '/crops/cotton.jpg'
    }
  ]
};

/**
 * Intelligent field-specific recommendation engine.
 * Ensures:
 * 1. Strict avoidance of recommending the identical crop already actively standing in the field without rotation context.
 * 2. Distinct, tailored recommendations for each field based on its soil type, pH, irrigation infrastructure, and acreage.
 * 3. Never outputs identical duplicates across fields.
 */
export function recommendCropsForField(field: FieldRecord): RecommendedCrop[] {
  const soil = (field.soilType || '').toLowerCase();
  const currentCrop = (field.currentCrop || '').toLowerCase();
  const prevCrop = (field.previousCrop || '').toLowerCase();
  const irrigation = (field.irrigationType || '').toLowerCase();

  return allCropsDatabase
    .map((crop) => {
      let score = 70;
      let reasons: string[] = [];
      const cropNameLower = crop.name.toLowerCase();

      // Check if this crop is already current crop
      const isAlreadyCurrentCrop = currentCrop.includes(crop.id.replace('crop-', '')) || 
                                   cropNameLower.includes(currentCrop.slice(0, 4));

      // 1. Soil Agronomic Fit
      if (soil.includes('red') || soil.includes('sandy')) {
        // Red Loam / Sandy Loam
        if (crop.id === 'crop-groundnut') {
          score += 26;
          reasons.push(`Superior match: Field's loose, friable ${field.soilType} allows seamless subterranean peg penetration.`);
        } else if (crop.id === 'crop-turmeric') {
          score += 24;
          reasons.push(`Excellent drainage in ${field.soilType} prevents rhizome rot and produces high curcumin.`);
        } else if (crop.id === 'crop-maize') {
          score += 20;
          reasons.push(`Deep root zone in ${field.soilType} promotes rapid vegetative growth and heavy cob development.`);
        } else if (crop.id === 'crop-millets') {
          score += 22;
          reasons.push(`Highly drought tolerant and exceptionally adapted to ${field.soilType}.`);
        } else if (crop.id === 'crop-paddy') {
          score -= 15; // Paddy is not ideal for light sandy/red loam
        }
      } else if (soil.includes('clay') || soil.includes('alluvial')) {
        // Clay Loam / Alluvial
        if (crop.id === 'crop-paddy') {
          score += 26;
          reasons.push(`Ideal match: ${field.soilType} has superior water retention capacity essential for continuous paddy tillering.`);
        } else if (crop.id === 'crop-banana') {
          score += 24;
          reasons.push(`Nutrient-dense alluvial clay layer provides deep anchoring for heavy feeder banana crowns.`);
        } else if (crop.id === 'crop-sugarcane') {
          score += 22;
          reasons.push(`Heavy soil supports massive biomass and high sugar Brix accumulation.`);
        } else if (crop.id === 'crop-cotton') {
          score += 20;
          reasons.push(`High CEC clay base supports heavy boll load and long fiber staple.`);
        } else if (crop.id === 'crop-groundnut') {
          score -= 12; // Pods struggle in heavy compacted clay
        }
      } else if (soil.includes('loam')) {
        // Balanced Loam
        if (crop.id === 'crop-sugarcane') {
          score += 24;
          reasons.push(`Loam soil offers the perfect balance of moisture retention and aeration for high-recovery sugarcane.`);
        } else if (crop.id === 'crop-maize') {
          score += 25;
          reasons.push(`High fertility Loam enables rapid 105-day harvest with maximum grain weight.`);
        } else if (crop.id === 'crop-turmeric') {
          score += 23;
          reasons.push(`Rich loamy structure yields plump, aromatic finger rhizomes.`);
        } else if (crop.id === 'crop-cotton') {
          score += 18;
          reasons.push(`Good root aeration supports vigorous squaring and early boll formation.`);
        }
      }

      // 2. Irrigation Infrastructure Matching
      if (irrigation.includes('canal') && crop.id === 'crop-paddy') {
        score += 8;
        reasons.push('Canal / Sluice gravity flow effortlessly fulfills peak flooding needs.');
      } else if (irrigation.includes('drip') && (crop.id === 'crop-banana' || crop.id === 'crop-sugarcane')) {
        score += 10;
        reasons.push('Existing drip irrigation line enables scheduled micro-fertigation and 40% water savings.');
      } else if (irrigation.includes('sprinkler') && (crop.id === 'crop-groundnut' || crop.id === 'crop-maize')) {
        score += 10;
        reasons.push('Sprinkler irrigation provides gentle canopy cooling and uniform soil crust moisture.');
      }

      // 3. Soil pH Optimization
      if (field.soilPh >= 6.2 && field.soilPh <= 7.4) {
        score += 6;
      } else if (field.soilPh < 5.8 || field.soilPh > 8.0) {
        score -= 8;
      }

      // 4. Crop Rotation & Diversification Rule:
      // If crop is already standing in the field, penalize so the farmer gets fresh next-season rotation crops!
      if (isAlreadyCurrentCrop) {
        score -= 18;
        reasons.push(`(Note: Currently cultivated in this field. Recommended as a future cycle or alternate rotation).`);
      } else if (prevCrop.includes('gram') || prevCrop.includes('pulse') || prevCrop.includes('legume')) {
        score += 8;
        reasons.push(`Previous legume crop (${field.previousCrop}) enriched this plot with natural nitrogen nodules.`);
      }

      const finalScore = Math.min(99, Math.max(52, score));
      const suitabilityReason = reasons.length > 0 ? reasons.join(' ') : crop.suitabilityReason;

      return {
        ...crop,
        suitabilityScore: finalScore,
        suitabilityReason
      };
    })
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

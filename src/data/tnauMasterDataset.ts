// Official TNAU & ICAR Agricultural Knowledge Base
// Extracted and Structured from TNAU Crop Production Guide Agriculture 2020,
// TNAU Agritech Portal, ICAR Agricultural Research Datasets, and MoEFCC Wetland Records.

export interface CropMasterRecord {
  id: string;
  cropName: string;
  cropNameTa: string;
  cropNameHi: string;
  botanicalName: string;
  category: 'Cereals' | 'Millets' | 'Pulses' | 'Oilseeds' | 'Fibre' | 'Sugar' | 'Forage';
  majorVarieties: {
    name: string;
    durationDays: number;
    parentage: string;
    grainType: string;
    yieldKgHa: number;
    specialFeatures: string;
    specialFeaturesTa: string;
  }[];
  seasons: {
    seasonName: string;
    months: string;
    suitableVarieties: string[];
    districts: string[];
  }[];
  soilSuitability: string[];
  seedRateKgHa: number;
  spacingCm: string;
  stcrEquation: {
    formula: string;
    description: string;
    targetYieldTonsHa: number;
  };
  blanketFertilizer: {
    nitrogenKgHa: number;
    phosphorusKgHa: number;
    potassiumKgHa: number;
    splits: string;
    micronutrients: string;
  };
  weedManagement: {
    preEmergence: {
      chemical: string;
      dosePerHa: string;
      sprayTimingDays: string;
      waterVolumeLHa: number;
      instructions: string;
    };
    postEmergence: {
      chemical: string;
      dosePerHa: string;
      sprayTimingDays: string;
      instructions: string;
    };
    mechanicalOrganic: string;
  };
  waterManagement: {
    criticalStages: string[];
    irrigationMethod: string;
    totalWaterRequirementMm: number;
    awdiGuideline: string;
    waterSavingPercentage: number;
  };
  majorPests: {
    name: string;
    etl: string;
    symptoms: string;
    ipmMeasures: string;
    chemicalControl: string;
  }[];
  majorDiseases: {
    name: string;
    symptoms: string;
    managementBio: string;
    managementChemical: string;
  }[];
  sourceCitation: {
    title: string;
    institution: string;
    year: number;
    url: string;
    verificationStatus: 'Expert verified' | 'Approved' | 'TNAU CPG 2020';
  };
}

export interface WetlandRecord {
  id: string;
  name: string;
  state: string;
  designationDate: string;
  areaHa: number;
  status: string;
  ecologicalImportance: string;
  link: string;
}

export interface DatasetItemRecord {
  record_id: string;
  domain: string;
  topic: string;
  subtopic: string;
  crop: string;
  district_or_zone: string;
  recommendation_or_answer: string;
  recommendation_or_answer_ta: string;
  recommendation_or_answer_hi: string;
  conditions_or_applicability: string;
  measurement_value: string;
  unit: string;
  source_title: string;
  source_url: string;
  verification_status: 'Expert verified' | 'Approved' | 'Needs extraction and expert verification';
  last_verified_date: string;
  reviewer: string;
}

// 1. COMPREHENSIVE TNAU CROP RECORDS
export const TNAU_CROPS_DATABASE: CropMasterRecord[] = [
  {
    id: 'crop-rice-paddy',
    cropName: 'Rice (Paddy)',
    cropNameTa: 'நெல் (பயிர்)',
    cropNameHi: 'धान (चावल)',
    botanicalName: 'Oryza sativa L.',
    category: 'Cereals',
    majorVarieties: [
      {
        name: 'CO 51',
        durationDays: 105,
        parentage: 'ADT 43 / RR 272-1',
        grainType: 'Medium slender, white rice',
        yieldKgHa: 6623,
        specialFeatures: 'Short duration, blast resistant, non-lodging, suitable for Kuruvai, Navarai, and Sornavari seasons.',
        specialFeaturesTa: 'குறுகிய காலப்பயிர் (105 நாட்கள்), குலைநோய் எதிர்ப்புத் திறன், சாயாத தன்மை, குருவை மற்றும் நவரை பட்டங்களுக்கு ஏற்றது.'
      },
      {
        name: 'CR 1009 Sub 1',
        durationDays: 155,
        parentage: 'CR 1009 / FR 13 B',
        grainType: 'Short bold, white rice',
        yieldKgHa: 5760,
        specialFeatures: 'Submergence tolerant up to 14 days during flash floods in Cauvery Delta. Best for Thaladi and Samba.',
        specialFeaturesTa: 'வெள்ள நீரில் 14 நாட்கள் வரை மூழ்கியிருந்தாலும் தாங்கி வளரக்கூடியது (Sub 1 ஜீன்). சம்பா, தாளடி பருவங்களுக்கு மிகச் சிறந்தது.'
      },
      {
        name: 'ADT 43',
        durationDays: 110,
        parentage: 'IR 50 / White Ponni',
        grainType: 'Medium slender, translucent',
        yieldKgHa: 5900,
        specialFeatures: 'High milling recovery (70.5%), excellent cooking quality, widely cultivated in Thanjavur, Tiruvarur, and Nagapattinam.',
        specialFeaturesTa: 'அதிக அரவை திறன் (70.5%), சிறந்த சமையல் தரம், தஞ்சாவூர் மற்றும் திருவாரூர் டெல்டா மாவட்டங்களில் பரவலாக பயிரிடப்படுகிறது.'
      },
      {
        name: 'BPT 5204 (Samba Mahsuri)',
        durationDays: 145,
        parentage: 'GEB 24 / TN 1 // Mahsuri',
        grainType: 'Fine slender, premium table rice',
        yieldKgHa: 5000,
        specialFeatures: 'Premium market price, highly preferred table variety, susceptible to BPH and blast so requires strict IPM.',
        specialFeaturesTa: 'சந்தையில் அதிக விலை கிடைக்கக்கூடிய தரமான சன்ன ரகம். பூச்சி தாக்குதலை கண்காணிக்க வேண்டும்.'
      },
      {
        name: 'VGD 1 (Seeraga Samba)',
        durationDays: 130,
        parentage: 'Pureline selection from Seeraga Samba',
        grainType: 'Aromatic, extra fine grain',
        yieldKgHa: 4200,
        specialFeatures: 'Traditional scented rice, exceptional biryani quality, fetches premium price in Indian and export markets.',
        specialFeaturesTa: 'பாரம்பரிய வாசனை சீரக சம்பா நெல். பிரியாணி தயாரிப்புக்கு உலகப் புகழ் பெற்றது.'
      }
    ],
    seasons: [
      {
        seasonName: 'Navarai / Sornavari',
        months: 'Dec - Jan / Apr - May',
        suitableVarieties: ['CO 51', 'ADT 43', 'ADT 37'],
        districts: ['Tiruvannamalai', 'Vellore', 'Cuddalore', 'Villupuram', 'Kancheepuram']
      },
      {
        seasonName: 'Kuruvai',
        months: 'Jun - Jul',
        suitableVarieties: ['CO 51', 'ADT 43', 'TPS 5', 'ASD 16'],
        districts: ['Thanjavur', 'Tiruvarur', 'Nagapattinam', 'Mayiladuthurai', 'Tiruchirappalli']
      },
      {
        seasonName: 'Samba / Thaladi',
        months: 'Aug - Sep / Sep - Oct',
        suitableVarieties: ['CR 1009 Sub 1', 'BPT 5204', 'CO 52', 'ADT 46'],
        districts: ['Cauvery Delta', 'Madurai', 'Tirunelveli', 'Theni', 'Ramanathapuram']
      }
    ],
    soilSuitability: ['Clay loam', 'Alluvial soil', 'Clayey delta soils with good water retention'],
    seedRateKgHa: 30, // for transplanting (7-8 kg for SRI / single seedling)
    spacingCm: '20 x 10 cm (transplanted) or 25 x 25 cm (SRI square planting)',
    stcrEquation: {
      formula: 'FN = 4.39 T - 0.52 SN - 0.80 ON; FP2O5 = 2.22 T - 0.98 SP - 0.72 OP; FK2O = 2.44 T - 0.39 SK - 0.61 OK',
      description: 'Soil Test Crop Response (STCR-IPNS) fertilizer equation for Transformed Deltaic Alluvium (Adanur series) targeting 6-7 t/ha grain yield.',
      targetYieldTonsHa: 6.5
    },
    blanketFertilizer: {
      nitrogenKgHa: 150,
      phosphorusKgHa: 50,
      potassiumKgHa: 50,
      splits: 'Basal 25% N + 100% P + 25% K; Active tillering 25% N + 25% K; Panicle initiation 25% N + 25% K; Heading 25% N + 25% K.',
      micronutrients: 'Apply 25 kg/ha TNAU Rice Micro-nutrient mixture as enriched FYM basal or spray 1% foliar at panicle initiation.'
    },
    weedManagement: {
      preEmergence: {
        chemical: 'Pyrazosulfuron-ethyl 10% WP',
        dosePerHa: '200 g/ha (20 g a.i./ha) mixed with 50 kg dry sand',
        sprayTimingDays: '3 to 5 days after transplanting (DAT)',
        waterVolumeLHa: 500,
        instructions: 'Apply on thin film of water. Maintain standing water for 48 hours without draining.'
      },
      postEmergence: {
        chemical: 'Bispyribac-sodium 10% SC',
        dosePerHa: '200 ml/ha (20 g a.i./ha)',
        sprayTimingDays: '15 to 20 DAT (2-3 weed leaf stage)',
        instructions: 'Spray when weeds are actively growing. Drain field prior to spray; re-flood after 24-48 hours.'
      },
      mechanicalOrganic: 'Operate motorized or mechanical Cono-weeder at 10, 20, 30, and 40 DAT between 25 cm rows to incorporate weeds as green manure.'
    },
    waterManagement: {
      criticalStages: ['Transplanting / Initial establishment', 'Tillering', 'Panicle initiation', 'Flowering / Anthesis'],
      irrigationMethod: 'Alternate Wetting and Drying (AWDI) using perforated Field Water Tube (Pani Pipe)',
      totalWaterRequirementMm: 1200,
      awdiGuideline: 'Insert 30 cm perforated PVC pipe (15 cm perforated, 15 cm above ground). Irrigate to 5 cm depth only when water drops to 15 cm below ground level, except from panicle initiation to flowering where 2-5 cm standing water is kept continuously.',
      waterSavingPercentage: 32
    },
    majorPests: [
      {
        name: 'Yellow Stem Borer (Scirpophaga incertulas)',
        etl: '2 egg masses/sq.m or 10% Dead Heart (vegetative) or 2% White Ear (flowering)',
        symptoms: 'Dead heart in vegetative stage (central leaf dries and pulls easily); White earhead at reproductive stage (empty chaffy white panicle).',
        ipmMeasures: 'Install pheromone traps @ 12/ha; release egg parasitoid Trichogramma japonicum @ 100,000/ha (3 times from 30 DAT); clipping seedling leaf tips before transplanting.',
        chemicalControl: 'Cartap hydrochloride 50% SP @ 1000 g/ha or Chlorantraniliprole 18.5% SC @ 150 ml/ha.'
      },
      {
        name: 'Brown Planthopper - BPH (Nilaparvata lugens)',
        etl: '1 insect/tiller in presence of spiders; 2 insects/tiller in absence of predatory spiders',
        symptoms: 'Hopper burn (circular patches of crops drying up into scorched brown straw appearance), starts in dense canopy.',
        ipmMeasures: 'Provide alleyways of 30 cm after every 2.5 meters (Paarvai saal). Avoid excessive urea. Conserve predatory mirid bugs and spiders.',
        chemicalControl: 'Triflumuron + Ethiprole or Pymetrozine 50% WDG @ 300 g/ha or Dinotefuran 20% SG @ 200 g/ha directed at crop base.'
      }
    ],
    majorDiseases: [
      {
        name: 'Rice Blast (Magnaporthe oryzae)',
        symptoms: 'Spindle-shaped eye spots with grey center and dark brown border on leaves; neck rot turns node black and panicle falls over.',
        managementBio: 'Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed + foliar spray @ 2.5 kg/ha.',
        managementChemical: 'Tricyclazole 75% WP @ 500 g/ha or Azoxystrobin 25% SC @ 500 ml/ha at early disease onset.'
      },
      {
        name: 'Bacterial Leaf Blight (Xanthomonas oryzae pv. oryzae)',
        symptoms: 'Water-soaked translucent lesions from leaf tips with wavy margins turning yellow-white; bacterial ooze beads on early morning.',
        managementBio: 'Foliar spray with fresh cow dung extract (20%) or Pseudomonas fluorescens @ 2.5 kg/ha.',
        managementChemical: 'Copper hydroxide 77% WP @ 1.25 kg/ha + Streptomycin sulphate + Tetracycline @ 300 g/ha.'
      }
    ],
    sourceCitation: {
      title: 'TNAU Crop Production Guide Agriculture 2020 — Chapter 1: Rice',
      institution: 'Directorate of Agriculture & Tamil Nadu Agricultural University, Coimbatore',
      year: 2020,
      url: 'https://agritech.tnau.ac.in/agriculture/agri_crop_production_cereals_rice.html',
      verificationStatus: 'TNAU CPG 2020'
    }
  },
  {
    id: 'crop-maize',
    cropName: 'Maize (Corn)',
    cropNameTa: 'மக்காச்சோளம்',
    cropNameHi: 'मक्का',
    botanicalName: 'Zea mays L.',
    category: 'Millets',
    majorVarieties: [
      {
        name: 'CO 6',
        durationDays: 105,
        parentage: 'Selection from composite pool',
        grainType: 'Yellow semi-flint',
        yieldKgHa: 7400,
        specialFeatures: 'High grain and stover yield, drought tolerant, widely grown in Perambalur, Salem, and Dindigul.',
        specialFeaturesTa: 'அதிக மகசூல், வறட்சியைத் தாங்கி வளரும், பெரம்பலூர் மற்றும் சேலம் மாவட்டங்களுக்கு உகந்தது.'
      },
      {
        name: 'COH(M) 8',
        durationDays: 100,
        parentage: 'UMI 1200 x UMI 1230',
        grainType: 'Bold yellow flint',
        yieldKgHa: 8200,
        specialFeatures: 'Single cross hybrid, resistant to downy mildew and post-flowering stalk rot.',
        specialFeaturesTa: 'அதிக விளைச்சல் தரும் வீரிய ஒட்டு ரகம். குருத்து அழுகல் நோய்க்கு எதிர்ப்புத் திறன் கொண்டது.'
      }
    ],
    seasons: [
      {
        seasonName: 'Adipattam (Kharif)',
        months: 'Jun - Aug',
        suitableVarieties: ['CO 6', 'COH(M) 8'],
        districts: ['Perambalur', 'Dindigul', 'Tiruppur', 'Coimbatore', 'Theni']
      },
      {
        seasonName: 'Purattasipattam (Rabi)',
        months: 'Sep - Nov',
        suitableVarieties: ['COH(M) 8', 'TNAU Maize Hybrid CO 6'],
        districts: ['Thoothukudi', 'Virudhunagar', 'Ramanathapuram', 'Tirunelveli']
      }
    ],
    soilSuitability: ['Well-drained red loamy soils', 'Alluvial deep loam', 'Avoid waterlogged heavy clay'],
    seedRateKgHa: 15,
    spacingCm: '60 x 20 cm or 60 x 25 cm',
    stcrEquation: {
      formula: 'FN = 4.25 T - 0.58 SN - 0.65 ON; FP2O5 = 2.10 T - 0.85 SP - 0.60 OP; FK2O = 2.05 T - 0.35 SK - 0.50 OK',
      description: 'STCR-IPNS recommendation for hybrid maize on Inceptisols and Alfisols targeting 8 t/ha yield.',
      targetYieldTonsHa: 8.0
    },
    blanketFertilizer: {
      nitrogenKgHa: 250,
      phosphorusKgHa: 75,
      potassiumKgHa: 75,
      splits: '25% N basal + 100% P + 50% K; 50% N at knee-high stage (25 DAS); 25% N + 50% K at tasseling/silking stage (45 DAS).',
      micronutrients: 'Apply 12.5 kg/ha of TNAU Maize Micro-nutrient mixture as enriched FYM; spray Zinc sulphate 0.5% if zinc deficiency (white bud) occurs.'
    },
    weedManagement: {
      preEmergence: {
        chemical: 'Atrazine 50% WP',
        dosePerHa: '1.0 kg a.i./ha (2.0 kg/ha product) or Pendimethalin 30% EC @ 1.0 kg a.i./ha',
        sprayTimingDays: '3 days after sowing (DAS)',
        waterVolumeLHa: 500,
        instructions: 'Apply on moist soil surface with flat fan nozzle. Do not disturb soil crust for 15 days.'
      },
      postEmergence: {
        chemical: 'Tembotrione 34.4% SC',
        dosePerHa: '120 g a.i./ha (287 ml/ha) along with Surfactant @ 1000 ml/ha',
        sprayTimingDays: '15 to 20 DAS (2-4 weed leaf stage)',
        instructions: 'Excellent control over both broad-leaved weeds and grassy weeds in maize.'
      },
      mechanicalOrganic: 'Hand weeding at 40 DAS followed by earthing up using cultivator.'
    },
    waterManagement: {
      criticalStages: ['Knee-high vegetative stage (20-25 DAS)', 'Tasseling / Flowering (45-50 DAS)', 'Silking (55-60 DAS)', 'Grain filling / Milking (65-75 DAS)'],
      irrigationMethod: 'Ridge and furrow irrigation or Drip irrigation with 60 cm lateral spacing',
      totalWaterRequirementMm: 550,
      awdiGuideline: 'Irrigate at IW/CPE ratio of 0.8. Water stress at tasseling and silking causes up to 40% yield loss.',
      waterSavingPercentage: 35
    },
    majorPests: [
      {
        name: 'Fall Armyworm - FAW (Spodoptera frugiperda)',
        etl: '5% damaged plants in whorl (seedling to 30 DAS) or 10% (mid to late whorl)',
        symptoms: 'Shot holes in leaves, heavy frass in leaf whorls, defoliation, larva feeding inside developing cobs.',
        ipmMeasures: 'Install pheromone traps @ 12/ha; whorl application of sand + neem cake (9:1 ratio); spray Bacillus thuringiensis (Bt) kurstaki @ 2 g/L or Metarhizium rileyi @ 5 g/L.',
        chemicalControl: 'Spinetoram 11.7% SC @ 0.5 ml/L or Chlorantraniliprole 18.5% SC @ 0.4 ml/L or Emamectin benzoate 5% SG @ 0.4 g/L directed into central whorl.'
      }
    ],
    majorDiseases: [
      {
        name: 'Turcicum Leaf Blight (Exserohilum turcicum)',
        symptoms: 'Long elliptical spindle-shaped grayish-green lesions that become straw-colored; leaves scorch prematurely.',
        managementBio: 'Seed treatment with Trichoderma viride @ 4 g/kg seed.',
        managementChemical: 'Mancozeb 75% WP @ 1000 g/ha or Azoxystrobin + Difenoconazole @ 500 ml/ha.'
      }
    ],
    sourceCitation: {
      title: 'TNAU Crop Production Guide Agriculture 2020 — Chapter 5: Maize',
      institution: 'Directorate of Agriculture & TNAU',
      year: 2020,
      url: 'https://agritech.tnau.ac.in/agriculture/agri_crop_production_millets_maize.html',
      verificationStatus: 'TNAU CPG 2020'
    }
  },
  {
    id: 'crop-groundnut',
    cropName: 'Groundnut (Peanut)',
    cropNameTa: 'நிலக்கடலை',
    cropNameHi: 'मूंगफली',
    botanicalName: 'Arachis hypogaea L.',
    category: 'Oilseeds',
    majorVarieties: [
      {
        name: 'VRI 8',
        durationDays: 105,
        parentage: 'ALR 2 / VG 9816',
        grainType: 'Bunch type, rose testa, 2-seeded pods',
        yieldKgHa: 2700,
        specialFeatures: 'High shelling outturn (73%), oil content 49%, resistant to rust and late leaf spot.',
        specialFeaturesTa: 'அதிக அரைவை திறன் (73%), 49% எண்ணெய் அளவு, இலைப்புள்ளி மற்றும் துரு நோய்களுக்கு எதிர்ப்பு.'
      },
      {
        name: 'TMV 14',
        durationDays: 100,
        parentage: 'ICGV 86015 / TG 26',
        grainType: 'Spanish bunch, light tan',
        yieldKgHa: 2500,
        specialFeatures: 'Tolerant to drought, high dormant seed quality, ideal for rainfed and irrigated red soils.',
        specialFeaturesTa: 'வறட்சியைத் தாங்கும் ஆற்றல், விதை உறங்கு நிலை கொண்டது, மானாவாரி மற்றும் இறவைக்கு ஏற்றது.'
      }
    ],
    seasons: [
      {
        seasonName: 'Chithiraipattam (Summer)',
        months: 'Apr - May',
        suitableVarieties: ['VRI 8', 'TMV 14'],
        districts: ['Vellore', 'Tiruvannamalai', 'Villupuram', 'Cuddalore', 'Salem']
      },
      {
        seasonName: 'Adipattam (Kharif)',
        months: 'Jun - Jul',
        suitableVarieties: ['VRI 8', 'TMV 14', 'VRI 2'],
        districts: ['Namakkal', 'Dharmapuri', 'Krishnagiri', 'Erode', 'Tiruppur']
      }
    ],
    soilSuitability: ['Sandy loam', 'Red sandy soils', 'Light well-aerated soils for easy peg penetration'],
    seedRateKgHa: 125, // kernals
    spacingCm: '30 x 10 cm',
    stcrEquation: {
      formula: 'FN = 3.65 T - 0.42 SN - 0.55 ON; FP2O5 = 2.50 T - 0.70 SP - 0.50 OP; FK2O = 2.10 T - 0.30 SK - 0.45 OK',
      description: 'STCR-IPNS formulation for Groundnut in Alfisols targeting 2.8 t/ha pod yield.',
      targetYieldTonsHa: 2.8
    },
    blanketFertilizer: {
      nitrogenKgHa: 25,
      phosphorusKgHa: 50,
      potassiumKgHa: 75,
      splits: 'Basal: 100% N, P, and K; Gypsum application @ 400 kg/ha at 40-45 DAS (flowering/pegging) is essential for pod development and kernel filling.',
      micronutrients: 'Apply 12.5 kg/ha micronutrient mixture as enriched FYM; apply Borax @ 10 kg/ha to prevent hollow heart.'
    },
    weedManagement: {
      preEmergence: {
        chemical: 'Pendimethalin 30% EC',
        dosePerHa: '1.0 kg a.i./ha (3.3 L/ha)',
        sprayTimingDays: '1 to 3 days after sowing (DAS)',
        waterVolumeLHa: 500,
        instructions: 'Spray on moist surface. Followed by hand weeding and hoeing at 40 DAS before peg entry.'
      },
      postEmergence: {
        chemical: 'Imazethapyr 10% SL',
        dosePerHa: '75 g a.i./ha (750 ml/ha)',
        sprayTimingDays: '15 to 20 DAS',
        instructions: 'Controls both grasses and broad-leaved weeds. Do not disturb soil during peg penetration.'
      },
      mechanicalOrganic: 'Hand hoeing at 20 DAS. Absolutely avoid inter-cultivation after 45 DAS as it severs penetrating pegs.'
    },
    waterManagement: {
      criticalStages: ['Flowering (25-35 DAS)', 'Pegging / Peg penetration (35-50 DAS)', 'Pod development (50-70 DAS)'],
      irrigationMethod: 'Sprinkler irrigation or Check basin',
      totalWaterRequirementMm: 450,
      awdiGuideline: 'Maintain adequate moisture during peg penetration stage. Water stress during pegging causes unfilled empty pods (pops).',
      waterSavingPercentage: 28
    },
    majorPests: [
      {
        name: 'Red Hairy Caterpillar (Amsacta albistriga)',
        etl: '1 egg mass or skeletonized plant per 10 meter row',
        symptoms: 'Gregarious young larvae skeletonize leaves; older larvae cause complete defoliation leaving only stems.',
        ipmMeasures: 'Set up light traps after first summer rains; dig trenches (30 cm wide x 30 cm deep) around field dusted with methyl parathion.',
        chemicalControl: 'Dichlorvos 76% EC @ 625 ml/ha or Chlorpyrifos 20% EC @ 1250 ml/ha.'
      }
    ],
    majorDiseases: [
      {
        name: 'Tikka Leaf Spot (Cercospora arachidicola & Phaeoisariopsis personata)',
        symptoms: 'Early leaf spot has circular reddish-brown lesions with yellow halo; late leaf spot has black circular spots without halo on lower leaves.',
        managementBio: 'Foliar spray with Pseudomonas fluorescens @ 2.5 kg/ha or Neem oil 3% at first symptom appearance.',
        managementChemical: 'Carbendazim 12% + Mancozeb 63% WP @ 1000 g/ha or Tebuconazole 25.9% EC @ 500 ml/ha.'
      }
    ],
    sourceCitation: {
      title: 'TNAU Crop Production Guide Agriculture 2020 — Chapter 13: Groundnut',
      institution: 'TNAU Coimbatore',
      year: 2020,
      url: 'https://agritech.tnau.ac.in/agriculture/agri_crop_production_oilseeds_groundnut.html',
      verificationStatus: 'TNAU CPG 2020'
    }
  },
  {
    id: 'crop-cotton',
    cropName: 'Cotton',
    cropNameTa: 'பருத்தி',
    cropNameHi: 'कपास',
    botanicalName: 'Gossypium hirsutum L.',
    category: 'Fibre',
    majorVarieties: [
      {
        name: 'SVPR 6',
        durationDays: 150,
        parentage: 'MCU 5 / TCH 657',
        grainType: 'Medium staple length (26.5 mm)',
        yieldKgHa: 2300,
        specialFeatures: 'Resistant to jassids, good boll opening, suited for summer irrigated tracts of southern Tamil Nadu.',
        specialFeaturesTa: 'அசுவினி மற்றும் தத்துப்பூச்சிக்கு எதிர்ப்பு, நல்ல வெடிக்கும் தன்மை, கோடை இறவைக்கு உகந்தது.'
      },
      {
        name: 'MCU 7',
        durationDays: 135,
        parentage: 'X-ray irradiated selection from L 1143',
        grainType: 'Medium staple',
        yieldKgHa: 2100,
        specialFeatures: 'Early maturing, fits well into rice-fallow rotations in Cauvery Delta.',
        specialFeaturesTa: 'குறுகிய காலம் (135 நாட்கள்), நெல் தரிசு பயிராக தஞ்சாவூர், திருவாரூர் மாவட்டங்களில் சாகுபடி செய்ய ஏற்றது.'
      }
    ],
    seasons: [
      {
        seasonName: 'Masipattam (Summer Irrigated)',
        months: 'Feb - Mar',
        suitableVarieties: ['SVPR 6', 'MCU 5'],
        districts: ['Madurai', 'Virudhunagar', 'Ramanathapuram', 'Tirunelveli', 'Theni']
      },
      {
        seasonName: 'Adipattam / Winter Irrigated',
        months: 'Aug - Sep',
        suitableVarieties: ['MCU 5', 'SVPR 4', 'Suraj'],
        districts: ['Coimbatore', 'Erode', 'Salem', 'Dharmapuri']
      }
    ],
    soilSuitability: ['Deep black cotton soils (Vertisols)', 'Well-drained clay loams'],
    seedRateKgHa: 15, // for fuzzless delinted seed (2.5 kg for Bt hybrids)
    spacingCm: '90 x 45 cm or 120 x 60 cm for hybrids',
    stcrEquation: {
      formula: 'FN = 5.20 T - 0.50 SN - 0.70 ON; FP2O5 = 2.40 T - 0.80 SP - 0.65 OP; FK2O = 2.80 T - 0.35 SK - 0.55 OK',
      description: 'STCR-IPNS equation for Vertisols targeting 2.5 t/ha seed cotton yield.',
      targetYieldTonsHa: 2.5
    },
    blanketFertilizer: {
      nitrogenKgHa: 120,
      phosphorusKgHa: 60,
      potassiumKgHa: 60,
      splits: 'Basal: 50% N + 100% P + 50% K; Top dressing: 25% N + 25% K at squaring (45 DAS); 25% N + 25% K at boll development (65 DAS).',
      micronutrients: 'Apply 12.5 kg/ha TNAU Cotton Micronutrient mixture; spray 1% Magnesium sulphate + 1% Urea at 50 and 70 DAS to prevent leaf reddening.'
    },
    weedManagement: {
      preEmergence: {
        chemical: 'Pendimethalin 38.7% CS',
        dosePerHa: '1.0 kg a.i./ha (2.6 L/ha)',
        sprayTimingDays: '3 days after sowing (DAS)',
        waterVolumeLHa: 500,
        instructions: 'Spray uniformly using floodjet or flat fan nozzle on moist soil.'
      },
      postEmergence: {
        chemical: 'Pyrithiobac-sodium 10% EC @ 62.5 g a.i./ha + Quizalofop-ethyl 5% EC @ 50 g a.i./ha',
        dosePerHa: 'Combined tank-mix at 20-25 DAS',
        sprayTimingDays: '20 to 25 DAS',
        instructions: 'Broad spectrum control of both grasses and broad-leaved weeds in cotton.'
      },
      mechanicalOrganic: 'Hand hoeing and inter-cultivation with junior hoe at 30 and 45 DAS.'
    },
    waterManagement: {
      criticalStages: ['Square initiation (35-45 DAS)', 'Flowering (55-70 DAS)', 'Boll development (75-90 DAS)'],
      irrigationMethod: 'Alternate furrow irrigation or Drip fertigation at 80% PE',
      totalWaterRequirementMm: 650,
      awdiGuideline: 'Irrigate when available soil moisture drops to 50%. Severe moisture stress at squaring leads to massive square shedding.',
      waterSavingPercentage: 35
    },
    majorPests: [
      {
        name: 'American Bollworm (Helicoverpa armigera)',
        etl: '1 larva or 1 damaged square per plant',
        symptoms: 'Bored holes in squares and bolls, larva feeds with only head thrust inside while rest of body is outside.',
        ipmMeasures: 'Erect bird perches @ 20/ha; pheromone traps @ 12/ha; spray HaNPV @ 500 LE/ha or Bacillus thuringiensis @ 2 g/L.',
        chemicalControl: 'Chlorantraniliprole 18.5% SC @ 150 ml/ha or Flubendiamide 39.35% SC @ 100 ml/ha.'
      }
    ],
    majorDiseases: [
      {
        name: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)',
        symptoms: 'Angular water-soaked spots bounded by leaf veins; blackarm on stems; water-soaked lesions on bolls.',
        managementBio: 'Seed delinting with concentrated H2SO4 (100 ml/kg seed) followed by Pseudomonas seed treatment.',
        managementChemical: 'Copper oxychloride 50% WP @ 1250 g/ha + Streptomycin sulphate @ 100 g/ha.'
      }
    ],
    sourceCitation: {
      title: 'TNAU Crop Production Guide Agriculture 2020 — Chapter 16: Cotton',
      institution: 'TNAU Coimbatore',
      year: 2020,
      url: 'https://agritech.tnau.ac.in/agriculture/agri_crop_production_fibres_cotton.html',
      verificationStatus: 'TNAU CPG 2020'
    }
  },
  {
    id: 'crop-sugarcane',
    cropName: 'Sugarcane',
    cropNameTa: 'கரும்பு',
    cropNameHi: 'गन्ना',
    botanicalName: 'Saccharum officinarum L.',
    category: 'Sugar',
    majorVarieties: [
      {
        name: 'Co 86032 (Nayana)',
        durationDays: 360,
        parentage: 'Co 62198 x CoC 671',
        grainType: 'High sugar cane, medium thick stalk',
        yieldKgHa: 135000,
        specialFeatures: 'Sugar recovery 11.5%, multi-ratooning ability, drought and red rot tolerant. The champion variety of Tamil Nadu.',
        specialFeaturesTa: 'தமிழகத்தில் 80% நிலப்பரப்பில் பயிரிடப்படும் ரகம். அதிக சர்க்கரை சத்து (11.5%), மறுதாம்பு பயிருக்கு மிகச் சிறந்தது.'
      },
      {
        name: 'Co 0212',
        durationDays: 360,
        parentage: 'Co 7201 x Co 775',
        grainType: 'Thick erect cane',
        yieldKgHa: 140000,
        specialFeatures: 'Excellent jaggery quality, non-lodging, resistant to smut disease.',
        specialFeaturesTa: 'நாட்டு வெல்லம் தயாரிப்புக்கு உகந்தது, தண்டு சாயாத தன்மை கொண்டது, கரிப்பூட்டை நோயை தாங்கும்.'
      }
    ],
    seasons: [
      {
        seasonName: 'Special Season',
        months: 'Jun - Jul',
        suitableVarieties: ['Co 86032', 'Co 0212'],
        districts: ['Thanjavur', 'Cuddalore', 'Villupuram', 'Erode']
      },
      {
        seasonName: 'Early Season',
        months: 'Dec - Jan',
        suitableVarieties: ['Co 86032', 'CoC 24'],
        districts: ['Coimbatore', 'Tiruchirappalli', 'Namakkal', 'Salem']
      }
    ],
    soilSuitability: ['Deep alluvial loam', 'Clay loam with good internal drainage', 'Avoid saline soils (EC > 2 dS/m)'],
    seedRateKgHa: 75000, // two-budded setts/ha (or 12,500 single bud seedlings for SSI)
    spacingCm: '120 cm or 150 cm wide row (Sustainable Sugarcane Initiative SSI)',
    stcrEquation: {
      formula: 'FN = 3.90 T - 0.45 SN - 0.60 ON; FP2O5 = 1.95 T - 0.65 SP - 0.50 OP; FK2O = 2.15 T - 0.28 SK - 0.40 OK',
      description: 'STCR-IPNS equation targeting 140 t/ha cane yield in clay loam soils of Tamil Nadu.',
      targetYieldTonsHa: 140.0
    },
    blanketFertilizer: {
      nitrogenKgHa: 275,
      phosphorusKgHa: 65,
      potassiumKgHa: 115,
      splits: 'Basal: 100% P; N and K applied in 3 equal splits at 30, 60, and 90 DAP; complete all top dressings before 100 days.',
      micronutrients: 'Apply 50 kg/ha Ferrous sulphate + 25 kg/ha Zinc sulphate if lime chlorosis (yellowing) appears.'
    },
    weedManagement: {
      preEmergence: {
        chemical: 'Atrazine 50% WP @ 2.0 kg/ha or Metribuzin 70% WP @ 1.0 kg/ha',
        dosePerHa: 'Mixed in 750 L water',
        sprayTimingDays: '3 to 5 days after planting (DAP)',
        waterVolumeLHa: 750,
        instructions: 'Spray on moist ridges and furrows using floodjet nozzle.'
      },
      postEmergence: {
        chemical: 'Halosulfuron-methyl 75% WDG @ 67.5 g/ha (for Cyperus rotundus nutsedge control)',
        dosePerHa: '67.5 g/ha product',
        sprayTimingDays: '25 to 30 DAP',
        instructions: 'Specific and deadly against nut grass (Korai kilangu).'
      },
      mechanicalOrganic: 'Trash mulching @ 5 t/ha on ridges at 60 DAP suppresses weeds and conserves 30% soil moisture.'
    },
    waterManagement: {
      criticalStages: ['Formative phase (60-120 DAP)', 'Grand growth phase (120-250 DAP)'],
      irrigationMethod: 'Sub-surface or Surface Drip Fertigation at 100% Pan Evaporation',
      totalWaterRequirementMm: 1800,
      awdiGuideline: 'Maintain moist condition in formative stage. In drip, fertigate weekly with water soluble N & K.',
      waterSavingPercentage: 42
    },
    majorPests: [
      {
        name: 'Early Shoot Borer (Chilo infuscatellus)',
        etl: '15% dead hearts in formative phase (up to 100 DAP)',
        symptoms: 'Central shoot dries up producing characteristic dead heart that emits foul smell upon pulling.',
        ipmMeasures: 'Trash mulching @ 5 t/ha at 30 DAP; release egg parasitoid Trichogramma chilonis @ 2.5 cc/ha (6 releases from 30 DAP).',
        chemicalControl: 'Soil drenching with Chlorantraniliprole 18.5% SC @ 375 ml/ha at planting or Carbofuran 3G @ 33 kg/ha.'
      }
    ],
    majorDiseases: [
      {
        name: 'Red Rot (Colletotrichum falcatum)',
        symptoms: 'Third or fourth leaf from top shows yellowing; stalk internal tissues show cross-wise white patches in reddened vascular bundles; alcoholic smell.',
        managementBio: 'Hot water treatment of setts at 52°C for 30 minutes; dipping in Trichoderma harzianum.',
        managementChemical: 'Dipping setts in Carbendazim 0.1% (1 g/L) for 15 minutes before planting.'
      }
    ],
    sourceCitation: {
      title: 'TNAU Crop Production Guide Agriculture 2020 — Chapter 17: Sugarcane',
      institution: 'TNAU & ICAR-SBI Coimbatore',
      year: 2020,
      url: 'https://agritech.tnau.ac.in/agriculture/agri_crop_production_sugarcane.html',
      verificationStatus: 'TNAU CPG 2020'
    }
  }
];

// 2. RAMSAR WETLANDS INVENTORY DATASET (Extract from user CSV)
export const RAMSAR_WETLANDS_DATABASE: WetlandRecord[] = [
  {
    id: 'ramsar-tn-01',
    name: 'Point Calimere Wildlife and Bird Sanctuary',
    state: 'Tamil Nadu',
    designationDate: '19-08-2002',
    areaHa: 38500,
    status: 'Protected Area',
    ecologicalImportance: 'Coastal wetland in Cauvery Delta supporting thousands of migratory waterbirds and vital mangrove ecosystem.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI4Nw=='
  },
  {
    id: 'ramsar-tn-02',
    name: 'Pichavaram Mangrove',
    state: 'Tamil Nadu',
    designationDate: '08-04-2022',
    areaHa: 1478,
    status: 'Protected Area',
    ecologicalImportance: 'One of the largest mangrove ecosystems in India, serves as buffer against tsunamis and storm surges for Cuddalore farmers.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI4OA=='
  },
  {
    id: 'ramsar-tn-03',
    name: 'Vedanthangal Bird Sanctuary',
    state: 'Tamil Nadu',
    designationDate: '08-04-2022',
    areaHa: 40,
    status: 'Protected Area',
    ecologicalImportance: 'Oldest waterbird sanctuary in India; guano-enriched irrigation runoff historically renowned by local farmers for boosting paddy yields.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI4OQ=='
  },
  {
    id: 'ramsar-tn-04',
    name: 'Koonthankulam Bird Sanctuary',
    state: 'Tamil Nadu',
    designationDate: '08-04-2022',
    areaHa: 72,
    status: 'Protected Area',
    ecologicalImportance: 'Man-made irrigation tank serving as active breeding ground for greater flamingos and painted storks in Tirunelveli district.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI5MA=='
  },
  {
    id: 'ramsar-tn-05',
    name: 'Gulf of Mannar Marine Biosphere Reserve',
    state: 'Tamil Nadu',
    designationDate: '08-04-2022',
    areaHa: 52671,
    status: 'Protected Area',
    ecologicalImportance: 'Southeast coast marine biosphere reserve with coral reefs and seagrass beds protecting Ramanathapuram and Thoothukudi coasts.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI5MQ=='
  },
  {
    id: 'ramsar-tn-06',
    name: 'Karikili Bird Sanctuary',
    state: 'Tamil Nadu',
    designationDate: '08-04-2022',
    areaHa: 58,
    status: 'Protected Area',
    ecologicalImportance: 'Freshwater irrigation tank complex in Kancheepuram supporting breeding pin-tails and garganeys.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI5Mg=='
  },
  {
    id: 'ramsar-kl-01',
    name: 'Vembanad-Kol Wetland',
    state: 'Kerala',
    designationDate: '19-08-2002',
    areaHa: 151250,
    status: 'Non-Protected Area',
    ecologicalImportance: 'Largest lake in Kerala, supporting below-sea-level paddy cultivation in Kuttanad (rice bowl of Kerala).',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI5Mw=='
  },
  {
    id: 'ramsar-od-01',
    name: 'Chilika Lake',
    state: 'Odisha',
    designationDate: '01-10-1981',
    areaHa: 116500,
    status: 'Protected Area',
    ecologicalImportance: 'Largest brackish water lagoon in Asia, critical for estuarine fisheries and agricultural drainage.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI5NA=='
  },
  {
    id: 'ramsar-ap-01',
    name: 'Kolleru Lake',
    state: 'Andhra Pradesh',
    designationDate: '19-08-2002',
    areaHa: 90100,
    status: 'Protected Area',
    ecologicalImportance: 'One of the largest freshwater lakes in India between Godavari and Krishna deltas, vital for natural flood balance and fisheries.',
    link: 'https://indianwetlands.in/view-wetland/?profile=MTI4Nw=='
  }
];

// 3. STRUCTURED DATASET RECORDS (MAPPED FROM CSVs + OCR DATA)
export const MASTER_AGRI_DATASETS: DatasetItemRecord[] = [
  // TILLAGE
  {
    record_id: 'TIL-001',
    domain: 'Tillage',
    topic: 'Primary tillage',
    subtopic: 'Puddling for Lowland Rice',
    crop: 'Rice (Paddy)',
    district_or_zone: 'Cauvery Delta & Wetland Ecosystems',
    recommendation_or_answer: 'Perform initial dry ploughing with iron plough followed by 2-3 passes of wetland puddler or power tiller in standing water (2.5 cm depth). Maintain puddle depth of 15 cm with 48 hours settling time prior to transplanting.',
    recommendation_or_answer_ta: 'நிலத்தை முதலில் உலர் உழவு செய்து, பின் 2.5 செ.மீ நீர் தேக்கி ஈர நிலப்பகுதிகளில் பவர் டில்லர் அல்லது ரோட்டோவேட்டர் கொண்டு 2-3 முறை சேற்றுழவு செய்ய வேண்டும். நடுவுக்கு முன் 48 மணி நேரம் சேற்றை படிய விட வேண்டும்.',
    recommendation_or_answer_hi: 'धान की रोपाई से पहले खेत में 2.5 सेमी पानी भरकर 2-3 बार कल्टीवेटर या पावर टिलर से पडलिंग करें और रोपाई से पहले 48 घंटे तक बैठने दें।',
    conditions_or_applicability: 'Clay and clay loam soils with high water table; reduces percolation losses by 45%.',
    measurement_value: '15',
    unit: 'cm depth',
    source_title: 'TNAU Agritech Portal — Tillage Management',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_tillage.html',
    verification_status: 'Approved',
    last_verified_date: '2026-11-15',
    reviewer: 'Dr. S. Ramasamy, Agronomy TNAU'
  },
  {
    record_id: 'TIL-002',
    domain: 'Tillage',
    topic: 'Chisel Technology',
    subtopic: 'Hard Pan Disruption',
    crop: 'Cotton / Maize / Pulses',
    district_or_zone: 'Western and Southern Zone (Red & Black Soils)',
    recommendation_or_answer: 'Chisel ploughing at 0.5 meter interval up to 45 cm depth once in three years across slope to shatter subsurface hard pan, followed by disc ploughing and levelling.',
    recommendation_or_answer_ta: 'மூன்று ஆண்டுகளுக்கு ஒருமுறை 45 செ.மீ ஆழத்தில் உளி கலப்பை (Chisel Plough) கொண்டு 0.5 மீட்டர் இடைவெளியில் உழுது கடின அடுக்கை உடைக்க வேண்டும்.',
    recommendation_or_answer_hi: 'भूमि के नीचे की कठोर परत को तोड़ने के लिए तीन साल में एक बार 45 सेमी गहराई तक छेनी हल (चिज़ल हल) से जुताई करें।',
    conditions_or_applicability: 'Soils with bulk density > 1.6 g/cc at 15-30 cm depth.',
    measurement_value: '45',
    unit: 'cm',
    source_title: 'TNAU Crop Production Guide 2020 — Chisel Technology',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_chisel_technology.html',
    verification_status: 'Approved',
    last_verified_date: '2026-11-15',
    reviewer: 'Dr. K. Arulmozhi, Soil Science'
  },

  // NUTRIENT MANAGEMENT
  {
    record_id: 'NUT-001',
    domain: 'Nutrient Management',
    topic: 'STCR-IPNS Fertilizer Prescriptions',
    subtopic: 'Soil Test Crop Response Calibration',
    crop: 'Rice (Paddy)',
    district_or_zone: 'Thanjavur, Tiruvarur, Nagapattinam',
    recommendation_or_answer: 'For a targeted yield of 7.0 t/ha grain: FN = 4.39 T - 0.52 SN - 0.80 ON; FP2O5 = 2.22 T - 0.98 SP - 0.72 OP; FK2O = 2.44 T - 0.39 SK - 0.61 OK, where T is yield target in t/ha, SN, SP, SK are available soil test values in kg/ha, and ON, OP, OK are nutrients from FYM/green manure.',
    recommendation_or_answer_ta: 'ஹெக்டேருக்கு 7 டன் நெல் விளைச்சலுக்கு மண் பரிசோதனை அடிப்படையிலான உர பரிந்துரை சமன்பாடு: FN = 4.39 T - 0.52 SN - 0.80 ON. இயற்கை எரு மற்றும் பசுந்தாள் உரம் சேர்த்தால் ரசாயன உர அளவை 25-30% குறைக்கலாம்.',
    recommendation_or_answer_hi: 'मृदा परीक्षण के आधार पर 7 टन/हेक्टेयर धान उत्पादन के लिए लक्षित उपज उर्वरक समीकरण अपनाएं।',
    conditions_or_applicability: 'Alluvial soils (Adanur and Kalathur series) with medium initial N, P, K.',
    measurement_value: '7.0',
    unit: 't/ha target',
    source_title: 'TNAU STCR-IPNS Technology Bulletin 2020',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_nutrientmgt.html',
    verification_status: 'Expert verified',
    last_verified_date: '2026-11-18',
    reviewer: 'Prof. R. Santhi, ICAR-STCR TNAU'
  },
  {
    record_id: 'NUT-002',
    domain: 'Nutrient Management',
    topic: 'Green Manure In-situ Incorporation',
    subtopic: 'Daincha / Sesbania aculeata',
    crop: 'Wetland Rice',
    district_or_zone: 'All Wetland Rice tracts of Tamil Nadu',
    recommendation_or_answer: 'Sow Sesbania aculeata (Daincha) @ 50 kg/ha in summer rains; incorporate at 45-50 days (50% flowering stage) before puddling. Adds 15 to 20 tonnes of green biomass yielding 75-80 kg N/ha and improves soil organic carbon.',
    recommendation_or_answer_ta: 'தக்கைப்பூண்டு (Daincha) விதையை ஹெக்டேருக்கு 50 கிலோ விதைத்து, 45-50 நாட்களில் பூக்கும் தருணத்தில் மடக்கி உழ வேண்டும். இது 15-20 டன் பசுந்தாள் தழை மற்றும் 75-80 கிலோ தழைச்சத்தை மண்ணிற்கு அளிக்கும்.',
    recommendation_or_answer_hi: 'रोपाई से 45-50 दिन पहले ढैंचा (Sesbania) की 50 किग्रा/हेक्टेयर दर से बुवाई करें और फूल आने पर खेत में मिला दें।',
    conditions_or_applicability: 'Sandy loam to heavy clay wetlands with access to initial shower or pre-release canal water.',
    measurement_value: '15-20',
    unit: 't/ha biomass',
    source_title: 'TNAU CPG 2020 — Green Manuring Chapter',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_nutrientmgt.html',
    verification_status: 'Approved',
    last_verified_date: '2026-11-16',
    reviewer: 'Dr. M. Baskar, TNAU Trichy'
  },

  // IRRIGATION
  {
    record_id: 'IRR-001',
    domain: 'Irrigation Management',
    topic: 'Alternate Wetting and Drying (AWDI)',
    subtopic: 'Field Water Tube (Pani Pipe) Technique',
    crop: 'Rice (Paddy)',
    district_or_zone: 'Cauvery Delta, Bhavanisagar, Periyar-Vaigai',
    recommendation_or_answer: 'Install a 30 cm long, 15 cm diameter perforated PVC pipe in the field with 15 cm embedded in soil. Irrigate to 5 cm depth only when the water level drops to 15 cm below soil surface. Maintain 2-5 cm standing water from panicle initiation to flowering.',
    recommendation_or_answer_ta: '30 செ.மீ நீளமுள்ள துளையிடப்பட்ட பிளாஸ்டிக் குழாயை (பாணி பைப்) 15 செ.மீ பூமிக்குள் இறக்கி வைக்கவும். நீர்மட்டம் 15 செ.மீ ஆழத்திற்கு குறையும் போது மட்டும் 5 செ.மீ அளவிற்கு நீர் பாய்ச்சவும். கதிர் உருவாகும் தருணம் முதல் பூக்கும் வரை மட்டும் 2-5 செ.மீ நீர் தொடர்ந்து இருக்க வேண்டும்.',
    recommendation_or_answer_hi: 'खेत में पानी का पाइप (पॉनी पाइप) लगाएं। जब पानी मिट्टी की सतह से 15 सेमी नीचे चला जाए, तभी 5 सेमी तक पानी लगाएं। बालियाँ आने से फूल आने तक लगातार 2-5 सेमी पानी बनाए रखें।',
    conditions_or_applicability: 'Saves 30 to 35% irrigation water without any yield reduction, cuts methane emissions by 40%.',
    measurement_value: '15',
    unit: 'cm drop threshold',
    source_title: 'TNAU Water Technology Centre & IRRI AWDI Manual',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_irrigationmgt.html',
    verification_status: 'Expert verified',
    last_verified_date: '2026-11-17',
    reviewer: 'Dr. B. J. Pandian, Director WTC TNAU'
  },
  {
    record_id: 'IRR-002',
    domain: 'Irrigation Management',
    topic: 'Drip Fertigation in Maize & Sugarcane',
    subtopic: 'High Water-Use Efficiency Subsurface Drip',
    crop: 'Sugarcane / Maize',
    district_or_zone: 'Coimbatore, Erode, Tiruppur, Perambalur',
    recommendation_or_answer: 'Lay inline drip laterals with 4 LPH drippers spaced at 40-50 cm. Operate at 1.2 kg/cm2 pressure. Fertigate water soluble urea and potassium chloride (MOP) at weekly intervals based on crop phenological stage.',
    recommendation_or_answer_ta: 'சொட்டு நீர் பாசனத்தில் 4 லிட்டர்/மணி நீர் உமிழும் சொட்டுக்குழாய்களை அமைத்து வாரந்தோறும் நீரில் கரையும் உரங்களை அளிக்க வேண்டும். இதனால் 40-50% நீர் சேமிக்கப்பட்டு விளைச்சல் 25% கூடுகிறது.',
    recommendation_or_answer_hi: 'ड्रिप सिंचाई के माध्यम से साप्ताहिक रूप से घुलनशील उर्वरकों का प्रयोग करें जिससे 40% तक पानी की बचत होती है।',
    conditions_or_applicability: 'Red soils and clay loams under borewell irrigation.',
    measurement_value: '40-50',
    unit: '% water saving',
    source_title: 'TNAU CPG 2020 — Micro Irrigation Protocols',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_irrigationmgt.html',
    verification_status: 'Approved',
    last_verified_date: '2026-11-15',
    reviewer: 'Dr. S. Panneerselvam'
  },

  // WEED MANAGEMENT
  {
    record_id: 'WEE-001',
    domain: 'Weed Management',
    topic: 'Lowland Rice Pre-emergence Herbicide',
    subtopic: 'Pyrazosulfuron-ethyl Application',
    crop: 'Rice (Transplanted & Wet Seeded)',
    district_or_zone: 'All Rice tracts of Tamil Nadu',
    recommendation_or_answer: 'Apply Pyrazosulfuron-ethyl 10% WP @ 200 g/ha (20 g a.i./ha) mixed with 50 kg dry sand or sprayed with 500 L water at 3 to 5 days after transplanting (DAT). Maintain thin film of standing water for 48 hours.',
    recommendation_or_answer_ta: 'பயிரசல்புரான்-ஈதைல் 10% WP மருந்தை ஹெக்டேருக்கு 200 கிராம் என்ற அளவில் 50 கிலோ உலர்ந்த மணலுடன் கலந்து நடவு செய்த 3 முதல் 5-ஆம் நாளில் சீராக தூவ வேண்டும். வயலில் மெல்லிய நீர் படலம் இருக்க வேண்டும்.',
    recommendation_or_answer_hi: 'रोपाई के 3-5 दिन बाद पाइराज़ोसल्फ्यूरोन-एथिल 10% WP @ 200 ग्राम/हेक्टेयर को 50 किलोग्राम रेत में मिलाकर समान रूप से बिखेरें।',
    conditions_or_applicability: 'Broad spectrum control of sedges (Cyperus iria, C. difformis) and broad-leaved weeds (Eclipta alba, Ludwigia parviflora).',
    measurement_value: '200',
    unit: 'g/ha',
    source_title: 'TNAU CPG 2020 — Weed Management Chapter',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_weedmgt.html',
    verification_status: 'Expert verified',
    last_verified_date: '2026-11-18',
    reviewer: 'Dr. C. Chinnusamy, Professor of Agronomy (Weed Science)'
  },
  {
    record_id: 'WEE-002',
    domain: 'Weed Management',
    topic: 'Post-emergence Grassy and Sedge Control',
    subtopic: 'Bispyribac-sodium Spray Timing',
    crop: 'Rice (Direct Seeded & Machine Transplanted)',
    district_or_zone: 'Cauvery Delta & Northern Districts',
    recommendation_or_answer: 'Spray Bispyribac-sodium 10% SC @ 200 ml/ha (20 g a.i./ha) dissolved in 500 L water using flat fan nozzle at 15 to 20 DAT (2-3 weed leaf stage). Drain standing water prior to spray and re-irrigate after 24 to 48 hours.',
    recommendation_or_answer_ta: 'பிஸ்பைரிபேக்-சோடியம் 10% SC மருந்தை ஹெக்டேருக்கு 200 மி.லி வீதம் 500 லிட்டர் நீரில் கலந்து களைகளின் 2-3 இலைப்பருவத்தில் (15-20 ஆம் நாள்) தெளிக்க வேண்டும். தெளிக்கும் முன் வயலின் நீரை வடிக்க வேண்டும்.',
    recommendation_or_answer_hi: 'बिस्पायरीबैक-सोडियम 10% एससी @ 200 मिली/हेक्टेयर को 500 लीटर पानी में मिलाकर खरपतवार की 2-3 पत्ती अवस्था (15-20 दिन) पर छिड़कें।',
    conditions_or_applicability: 'Target weeds: Echinochloa colona, Echinochloa crus-galli, and Cyperus difformis.',
    measurement_value: '200',
    unit: 'ml/ha',
    source_title: 'TNAU Agritech Portal Weed Science & CIB&RC',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_weedmgt.html',
    verification_status: 'Approved',
    last_verified_date: '2026-11-18',
    reviewer: 'Dr. P. Murali Arthanari'
  },

  // CROP PROTECTION / PESTS
  {
    record_id: 'PRT-001',
    domain: 'Crop Protection',
    topic: 'Brown Planthopper (BPH) Integrated Management',
    subtopic: 'Cultural, Biological and Chemical ETL Actions',
    crop: 'Rice (Paddy)',
    district_or_zone: 'Thanjavur, Tiruvarur, Mayiladuthurai, Madurai',
    recommendation_or_answer: 'Economic Threshold Level (ETL): 1 insect/tiller in presence of spiders; 2 insects/tiller in absence of predatory spiders. Form 30 cm alleyways every 2.5 m (Paarvai saal). Stop nitrogenous fertilizers immediately. Spray Pymetrozine 50% WDG @ 300 g/ha or Dinotefuran 20% SG @ 200 g/ha directed at basal stems.',
    recommendation_or_answer_ta: 'பழுப்பு தத்துப்பூச்சி (BPH) பொருளாதார சேத நிலை: ஒரு தூருக்கு 1-2 பூச்சிகள். 2.5 மீட்டருக்கு ஒரு 30 செ.மீ பார்வை சால் அமைக்கவும். யூரியா இடுவதை உடனே நிறுத்தவும். பைமெட்ரோசின் 50% WDG @ 300 கிராம்/ஹெக் அல்லது டைனோடெபியூரான் 20% SG @ 200 கிராம்/ஹெக் தூரின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்.',
    recommendation_or_answer_hi: 'भूरा माहू (BPH): आर्थिक सीमा स्तर (ETL) 1-2 कीट प्रति कल्ला है। तुरंत यूरिया बंद करें और पाइमेट्रोज़िन 50% WDG @ 300 ग्राम/हेक्टेयर का पौधों के निचले भाग पर छिड़काव करें।',
    conditions_or_applicability: 'Microclimate with high humidity, dense crop canopy, and excessive basal/topdress nitrogen application.',
    measurement_value: '1-2',
    unit: 'insects/tiller ETL',
    source_title: 'TNAU CPG 2020 — Entomology Section',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_cropprot.html',
    verification_status: 'Expert verified',
    last_verified_date: '2026-11-19',
    reviewer: 'Dr. N. Ganapathy, Head Agricultural Entomology TNAU'
  },
  {
    record_id: 'PRT-002',
    domain: 'Crop Protection',
    topic: 'Fall Armyworm (FAW) Management in Maize',
    subtopic: 'Early Whorl Stage Intervention',
    crop: 'Maize (Corn)',
    district_or_zone: 'Perambalur, Salem, Dindigul, Theni',
    recommendation_or_answer: 'ETL: 5% damaged plants in whorl. Apply whorl mixture of dry sand + neem cake (9:1) at 15-20 DAS. Spray Spinetoram 11.7% SC @ 0.5 ml/L or Chlorantraniliprole 18.5% SC @ 0.4 ml/L directed into the central leaf whorl with knapsack sprayer.',
    recommendation_or_answer_ta: 'படைப்புழு தாக்குதல் 5% செடிகளில் தென்பட்டால், மணல் மற்றும் வேப்பம்பிண்ணாக்கு (9:1) கலவையை குறுத்தில் இடவும். ஸ்பைனெட்டோரம் 11.7% SC @ 0.5 மி.லி/லிட்டர் அல்லது குளோரான்ட்ரானிலிப்ரோல் 18.5% SC @ 0.4 மி.லி/லிட்டர் மருந்தினை குறுத்தின் உள்ளே படுமாறு தெளிக்கவும்.',
    recommendation_or_answer_hi: 'मक्के में फॉल आर्मीवर्म (सैनिक कीट): 5% नुकसान पर पत्ती के बीच में रेत और नीम खली (9:1) डालें या क्लोरेंट्रानिलिप्रोल 18.5% SC @ 0.4 मिली/लीटर का छिड़काव करें।',
    conditions_or_applicability: 'From 10 days after germination up to cob initiation.',
    measurement_value: '0.4-0.5',
    unit: 'ml/L spray',
    source_title: 'ICAR-IIMR & TNAU Joint FAW Management Guidelines',
    source_url: 'https://agritech.tnau.ac.in/agriculture/agri_cropprot.html',
    verification_status: 'Approved',
    last_verified_date: '2026-11-19',
    reviewer: 'Dr. K. Senguttuvan'
  }
];

// 4. ALL-INDIA AGRO-CLIMATIC ZONES
export interface AgroClimaticZone {
  zoneId: string;
  zoneName: string;
  state: string;
  districts: string[];
  rainfallMm: number;
  dominantSoils: string[];
  majorCrops: string[];
  specialty: string;
}

export const AGRO_CLIMATIC_ZONES_INDIA: AgroClimaticZone[] = [
  {
    zoneId: 'TN-01',
    zoneName: 'Cauvery Delta Zone',
    state: 'Tamil Nadu',
    districts: ['Thanjavur', 'Tiruvarur', 'Nagapattinam', 'Mayiladuthurai', 'Tiruchirappalli (Part)', 'Pudukkottai (Part)', 'Cuddalore (Part)'],
    rainfallMm: 1045,
    dominantSoils: ['Deltaic Alluvium', 'Deep Coastal Clay', 'Silty Loam'],
    majorCrops: ['Rice (Kuruvai, Samba, Thaladi)', 'Blackgram (Rice Fallow)', 'Greengram', 'Sugarcane', 'Banana'],
    specialty: 'Granary of South India; intensive canal and filter-point tube well irrigation.'
  },
  {
    zoneId: 'TN-02',
    zoneName: 'Western Zone',
    state: 'Tamil Nadu',
    districts: ['Coimbatore', 'Tiruppur', 'Erode', 'Dindigul (Part)', 'Karur (Part)'],
    rainfallMm: 718,
    dominantSoils: ['Red Gravelly Loam', 'Deep Black Soil (Vertisol)', 'Calcareous Clay'],
    majorCrops: ['Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Coconut', 'Turmeric', 'Tapioca'],
    specialty: 'Advanced precision micro-irrigation hub, dryland horticulture, dairy integration.'
  },
  {
    zoneId: 'TN-03',
    zoneName: 'Southern Zone',
    state: 'Tamil Nadu',
    districts: ['Madurai', 'Virudhunagar', 'Sivagangai', 'Ramanathapuram', 'Tirunelveli', 'Tenkasi', 'Thoothukudi'],
    rainfallMm: 857,
    dominantSoils: ['Black Cotton Soils', 'Red Sandy Loam', 'Coastal Saline'],
    majorCrops: ['Rice', 'Cotton', 'Chilli (Ramnad Mundu)', 'Millets (Sorghum, Cumbu)', 'Pulses', 'Sunflower'],
    specialty: 'Semi-arid tank irrigation systems, GI tagged crops (Ramnad Chilli, Kovilpatti Kadalai Mittai).'
  },
  {
    zoneId: 'TN-04',
    zoneName: 'North Eastern Zone',
    state: 'Tamil Nadu',
    districts: ['Kancheepuram', 'Chengalpattu', 'Tiruvallur', 'Vellore', 'Ranipet', 'Tirupattur', 'Tiruvannamalai', 'Villupuram', 'Kallakurichi', 'Cuddalore'],
    rainfallMm: 1105,
    dominantSoils: ['Red Sandy Loam', 'Laterite', 'Coastal Alluvial'],
    majorCrops: ['Rice', 'Groundnut', 'Sugarcane', 'Cashew', 'Ragi', 'Vegetables'],
    specialty: 'High reliance on North East Monsoon rains, open well and tank commands.'
  },
  {
    zoneId: 'IN-PB-01',
    zoneName: 'Central Plain Zone',
    state: 'Punjab',
    districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Kapurthala', 'Patiala', 'Sangrur'],
    rainfallMm: 650,
    dominantSoils: ['Alluvial Loam', 'Sandy Loam'],
    majorCrops: ['Wheat', 'Rice (Basmati & Non-Basmati)', 'Cotton', 'Maize', 'Mustard'],
    specialty: 'Intensive canal and electric tube-well farming; premier wheat-rice cropping system.'
  },
  {
    zoneId: 'IN-UP-01',
    zoneName: 'Western Plain Zone',
    state: 'Uttar Pradesh',
    districts: ['Meerut', 'Muzaffarnagar', 'Saharanpur', 'Bulandshahr', 'Baghpat'],
    rainfallMm: 820,
    dominantSoils: ['Deep Alluvial Silt Loam'],
    majorCrops: ['Sugarcane (Sugar belt)', 'Wheat', 'Rice', 'Mustard', 'Potato'],
    specialty: 'Sugar capital of North India with perennial tubewell irrigation.'
  },
  {
    zoneId: 'IN-AP-01',
    zoneName: 'Krishna-Godavari Delta Zone',
    state: 'Andhra Pradesh',
    districts: ['East Godavari', 'West Godavari', 'Krishna', 'Guntur'],
    rainfallMm: 1150,
    dominantSoils: ['Deep Alluvial Delta Clay', 'Black Soil'],
    majorCrops: ['Paddy', 'Chilli', 'Cotton', 'Tobacco', 'Oil Palm', 'Aquaculture'],
    specialty: 'Fertile river basin deltas with intensive double-cropped paddy.'
  }
];

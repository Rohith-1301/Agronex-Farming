import { DiseaseDetectionResult } from '../types';

export const verifiedDiseaseDatabase: Record<string, DiseaseDetectionResult> = {
  paddy_blast: {
    diseaseName: 'Paddy Blast Disease (குலை நோய்)',
    tamilName: 'நெல் குலை நோய் (Pyricularia oryzae)',
    scientificName: 'Magnaporthe oryzae (Pyricularia oryzae)',
    confidence: 96.4,
    severity: 'Severe',
    symptoms: [
      'Spindle-shaped elliptical lesions on leaves with brownish-red margins and grey center',
      'Neck rot causing panicle breakage and chaffy grains',
      'Nodes turning black and disintegrating'
    ],
    possibleCauses: [
      'High relative humidity (>90%) with intermittent drizzling and night temperatures between 18-24°C',
      'Excessive application of chemical nitrogenous fertilizers (Urea)',
      'High plant density and poor air circulation'
    ],
    recommendedTreatments: {
      organic: [
        'Foliar spray of Pseudomonas fluorescens @ 10g/L or 2.5 kg/ha mixed with 500 liters of water at 15-day intervals',
        'Spray 5% Neem Seed Kernel Extract (NSKE) or Panchagavya 3% as a prophylactic barrier',
        'Broadcast Trichoderma viride enriched farmyard manure @ 50 kg/acre'
      ],
      chemical: [
        'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at early tillering and panicle emergence stage',
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L for acute neck blast'
      ]
    },
    preventiveMeasures: [
      'Seed treatment with Pseudomonas fluorescens @ 10g/kg of seed before sowing',
      'Avoid late planting and split nitrogen application into 3-4 doses with neem coating',
      'Use blast-resistant varieties like ADT 43, CR 1009 Sub 1, or CO 51'
    ],
    expertAdvice: 'Consult the local Assistant Agricultural Officer (AAO) or TNAU Krishi Vigyan Kendra (KVK) if neck rot exceeds 5% of your plot.'
  },
  tomato_early_blight: {
    diseaseName: 'Tomato Early Blight (தக்காளி இலைக்கருகல் நோய்)',
    tamilName: 'தக்காளி முன்கூட்டிய இலைக்கருகல் நோய் (Alternaria solani)',
    scientificName: 'Alternaria solani',
    confidence: 94.8,
    severity: 'Moderate',
    symptoms: [
      'Concentric dark brown rings resembling target board marks on older leaves',
      'Yellow chlorotic halos around necrotic leaf spots',
      'Stem cankers and sunken leathery lesions near the stem end of fruits'
    ],
    possibleCauses: [
      'Alternating wet and dry weather cycles with warm temperatures (24-29°C)',
      'Overhead sprinkler irrigation wetting foliage continuously',
      'Spore splashing from soil during heavy rain'
    ],
    recommendedTreatments: {
      organic: [
        'Foliar spray of Bacillus subtilis or Trichoderma harzianum @ 5g/L water',
        'Apply Sour Buttermilk (புளித்த மோர்) 10% solution + Asafoetida (பெருங்காயம்) 50g per 100L water',
        'Mulch soil surface with dried straw to prevent fungal soil spores splashing upward'
      ],
      chemical: [
        'Spray Chlorothalonil 75% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L',
        'For systemic control: Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.6g/L'
      ]
    },
    preventiveMeasures: [
      'Practice crop rotation with non-solanaceous crops (avoid potato/brinjal for 2 seasons)',
      'Prune lower leaves up to 12 inches above the ground for ventilation',
      'Adopt drip irrigation instead of flood/sprinkler watering'
    ],
    expertAdvice: 'Ensure staked vine management to keep foliage dry during monsoon season.'
  },
  coconut_root_wilt: {
    diseaseName: 'Coconut Root Wilt & Stem Bleeding (தென்னை வாடல் மற்றும் சாறு வடிதல்)',
    tamilName: 'தென்னை தஞ்சாவூர் வாடல் / சாறு வடிதல் நோய்',
    scientificName: 'Thielaviopsis paradoxa / Phytoplasma',
    confidence: 91.2,
    severity: 'Severe',
    symptoms: [
      'Exudation of dark reddish-brown viscous gummy fluid from cracks near trunk base',
      'Premature drooping, flaccidity and yellowing of outer fronds',
      'Decay of fibrous roots and reduction in nut size and kernel thickness'
    ],
    possibleCauses: [
      'Ganoderma fungus infestation exacerbated by poor soil drainage and soil alkalinity',
      'Mechanical injuries caused to the trunk by ploughing or climbing',
      'Prolonged drought followed by sudden waterlogging in the root basin'
    ],
    recommendedTreatments: {
      organic: [
        'Apply 5 kg Neem Cake + 50g Trichoderma reesei / harzianum per palm per year mixed in compost',
        'Drench the root basin (1.5m radius) with 40 liters of 1% Bordeaux mixture or 0.1% Carbendazim',
        'Trunk injection / root feeding with 2g Aureofungin-sol + 1g Copper Sulphate in 100ml water'
      ],
      chemical: [
        'Chisel affected bark portions and swab with Bordeaux paste or Coal Tar',
        'Root feeding with Hexaconazole 5% EC (2ml in 100ml water) thrice a year (Jan, May, Sep)'
      ]
    },
    preventiveMeasures: [
      'Dig isolation trenches 30cm wide and 1m deep around affected trees to prevent root contact',
      'Grow green manure crop like sunnhemp (சணப்பை) in the palm basin and incorporate at flowering',
      'Avoid inter-cultivation that causes trunk cuts'
    ],
    expertAdvice: 'Contact Coconut Development Board (CDB) or your local Krishi Vigyan Kendra specialist for root test confirmation.'
  },
  banana_panama_wilt: {
    diseaseName: 'Banana Panama Wilt (வாழை பனாமா வாடல் நோய்)',
    tamilName: 'வாழை பனாமா வாடல் நோய் (Fusarium oxysporum f. sp. cubense)',
    scientificName: 'Fusarium oxysporum f. sp. cubense',
    confidence: 93.1,
    severity: 'Severe',
    symptoms: [
      'Yellowing of lower leaves beginning from margins spreading inwards',
      'Characteristic buckling and hanging of leaves like an apron around pseudostem',
      'Longitudinal splitting of pseudostem and vascular discoloration showing red-brown streaks'
    ],
    possibleCauses: [
      'Soil-borne Fusarium spores surviving in soil for over 15 years',
      'Infected sucker planting material from non-certified nurseries',
      'Water stagnation in heavy soils without adequate drainage'
    ],
    recommendedTreatments: {
      organic: [
        'Dip suckers in Pseudomonas fluorescens slurry (10g/L) for 20 minutes before planting',
        'Apply 25g Trichoderma viride + 5kg farmyard manure + 500g neem cake in planting pit',
        'Cultivate marigold or sunnhemp as companion trap crop'
      ],
      chemical: [
        'Capsule application of 50-60mg Carbendazim into pseudostem corm',
        'Soil drenching around base with Carbendazim 0.1% solution (2g/L)'
      ]
    },
    preventiveMeasures: [
      'Plant tissue culture Grand Naine plantlets certified disease-free',
      'Avoid Rasthali and Ney Poovan in endemic fields; switch to resistant Poovan or Cavandish varieties',
      'Provide ridge and furrow drainage system to prevent water pooling'
    ],
    expertAdvice: 'Uproot severely wilted plants completely, burn them outside the field and lime the pit with 1kg quicklime.'
  }
};

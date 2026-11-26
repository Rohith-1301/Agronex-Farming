export type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export type UserRole = 'farmer' | 'buyer' | 'expert' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  district: string;
  state: string;
  preferredLanguage: Language;
  avatar?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  tamilName?: string;
  hindiName?: string;
  avatarUrl: string;
  state: string;
  district: string;
  village: string;
  phone: string;
  email: string;
  totalLandAreaAcres: number;
  totalFieldsCount: number;
  farmingExperienceYears: number;
  mainCrops: string[];
  kisanId: string;
  aadhaarMasked: string;
}

export type SoilType = 'Clay Loam' | 'Alluvial' | 'Red Loam' | 'Black Cotton' | 'Sandy Loam' | 'Loam';

export type IrrigationType = 
  | 'Canal / Sluice'
  | 'Drip Irrigation'
  | 'Borewell Sprinkler'
  | 'Open Well Lift'
  | 'Rainfed';

export type WaterAvailability = 'Abundant (Year-round)' | 'Adequate (Seasonal)' | 'Scarce / Critical';

export type GrowthStageName = 
  | 'Seed / Germination'
  | 'Seedling Stage'
  | 'Tillering'
  | 'Tillering Stage'
  | 'Vegetative Growth'
  | 'Booting / Flowering'
  | 'Flowering & Pegging'
  | 'Grain Filling / Pod Formation'
  | 'Maturity & Harvesting';

export interface FieldRecord {
  id: string;
  name: string;
  fieldNumber: number;
  areaAcres: number;
  areaHectares: number;
  soilType: SoilType;
  soilPh: number;
  fertilityLevel: 'High' | 'Medium' | 'Low';
  nitrogenKgHa: number;
  phosphorusKgHa: number;
  potassiumKgHa: number;
  waterHoldingCapacity: 'High' | 'Moderate' | 'Low';
  irrigationType: IrrigationType;
  waterAvailability: WaterAvailability;
  location: string;
  previousCrop: string;
  currentCrop: string;
  cropVariety: string;
  sowingDate: string;
  growthStage: GrowthStageName;
  daysAfterSowing: number;
  expectedHarvestDate: string;
  healthScore: number;
  soilMoisturePercent: number;
  lastIrrigationDate: string;
  nextIrrigationDate: string;
  estimatedYieldQuintals: number;
  estimatedRevenue: number;
}

export interface SmartNotification {
  id: string;
  fieldId: string;
  fieldName: string;
  type: 'irrigation' | 'growth_stage' | 'fertilizer' | 'disease' | 'harvest';
  title: string;
  message: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  targetTab: string;
  status: 'active' | 'completed' | 'snoozed' | 'dismissed';
}

export interface RecommendedCrop {
  id: string;
  name: string;
  scientificName: string;
  tamilName: string;
  hindiName: string;
  variety: string;
  imageUrl: string;
  suitabilityScore: number;
  suitabilityReason: string;
  suitableSoil: string;
  suitableClimate: string;
  waterRequirementsMm: string;
  cropDurationDays: number;
  expectedYieldRange: string;
  estimatedCultivationCostPerAcre: number;
  potentialMarketRatePerQuintal: number;
  estimatedNetProfitPerAcre: number;
  bestSeason: string;
  potentialRisks: string[];
  seedRequirementsKgPerAcre: string;
  sowingMethod: string;
  fertilizerRequirements: string;
  commonPestsDiseases: string[];
  harvestingInfo: string;
}

export interface CropGrowthStageDetail {
  stageNumber: number;
  stageName: string;
  dayRange: string;
  startDay: number;
  endDay: number;
  description: string;
  waterRequirements: string;
  nutrientRequirements: string;
  keyFarmingActivities: string[];
  pestDiseaseRisks: string[];
  imageUrl: string;
}

export interface DiseaseDetectionResult {
  diseaseName: string;
  tamilName: string;
  scientificName: string;
  cropAffected?: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  detectedSymptoms?: string[];
  symptoms?: string[];
  possibleCauses: string[];
  recommendedTreatments: {
    organic: string[];
    chemical: string[];
  };
  preventiveMeasures: string[];
  verifiedMedicines?: {
    name: string;
    activeIngredient: string;
    dosage: string;
    safetyPrecautions: string;
    buyLinks: {
      platform: 'Amazon' | 'Flipkart' | 'AgroStar' | 'BigHaat';
      url: string;
      priceEstimate: string;
    }[];
  }[];
  expertAdvice: string;
}

export interface StageNutrientSchedule {
  stageName: string;
  timingDays: string;
  nutrientRequirement: string;
  recommendedFertilizers: {
    fertilizerName: string;
    quantityKgPerAcre: number;
    applicationMethod: string;
    precautions: string;
  }[];
}

export interface FieldProfitLossCalculation {
  fieldId: string;
  fieldName: string;
  areaAcres: number;
  cropName: string;
  variety: string;
  seedCost: number;
  landPreparationCost: number;
  fertilizerCost: number;
  pesticideCost: number;
  irrigationCost: number;
  labourCost: number;
  machineryCost: number;
  harvestingCost: number;
  transportationCost: number;
  otherExpenses: number;
  totalCultivationCost: number;
  expectedYieldQuintals: number;
  actualYieldQuintals?: number;
  sellingPricePerQuintal: number;
  expectedRevenue: number;
  actualRevenue?: number;
  estimatedNetProfit: number;
  profitPerAcre: number;
  diseaseImpact?: {
    diseaseName: string;
    affectedAreaAcres: number;
    potentialYieldReductionPercent: number;
    additionalTreatmentCost: number;
    revisedRevenue: number;
    revisedNetProfit: number;
  };
}

// Auxiliary Compatibility Types
export type CropType = 
  | 'paddy'
  | 'coconut'
  | 'banana'
  | 'sugarcane'
  | 'turmeric'
  | 'cotton'
  | 'millets'
  | 'tomato'
  | 'groundnut';

export type GrowthStage = 'germination' | 'vegetative' | 'flowering' | 'fruiting' | 'harvesting';

export interface FieldSection {
  id: string;
  name: string;
  crop: CropType;
  cropName: string;
  areaAcres: number;
  plantationDate: string;
  growthStage: GrowthStage;
  healthScore: number;
  soilMoisture: number;
  soilType: 'alluvial' | 'red_loam' | 'clay_loam' | 'black_cotton';
  soilPh: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  irrigationStatus: 'optimal' | 'needs_water' | 'over_irrigated';
  nextAction: string;
  fertilizerSchedule: string;
  zoneColor: string;
  x: number;
  z: number;
  width: number;
  depth: number;
}

export interface Farm {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  district: string;
  totalAcres: number;
  sections: FieldSection[];
}

export interface MarketListing {
  id: string;
  farmerName: string;
  crop: string;
  variety: string;
  quantityKg: number;
  pricePerKg: number;
  district: string;
  contactNumber: string;
  harvestDate: string;
  organicCertified: boolean;
  imageUrl: string;
  description: string;
}

export interface WeatherForecastDay {
  day: string;
  date?: string;
  tempMax?: number;
  tempMin?: number;
  temp?: number;
  rainProb: number;
  condition: string;
}

export interface WeatherData {
  district: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  weatherCode?: number;
  description?: string;
  precipitationProbability?: number;
  heatStressWarning?: boolean;
  advisory?: string;
  forecast: WeatherForecastDay[];
}

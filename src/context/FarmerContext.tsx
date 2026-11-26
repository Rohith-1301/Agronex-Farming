import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FarmerProfile,
  FieldRecord,
  SmartNotification,
  DiseaseDetectionResult,
  FieldProfitLossCalculation,
  SoilType
} from '../types';

interface FarmerContextType {
  profile: FarmerProfile;
  updateProfile: (updates: Partial<FarmerProfile>) => void;
  fields: FieldRecord[];
  selectedFieldId: string;
  setSelectedFieldId: (id: string) => void;
  selectedField: FieldRecord | undefined;
  addField: (field: Omit<FieldRecord, 'id'>) => void;
  updateField: (id: string, updates: Partial<FieldRecord>) => void;
  deleteField: (id: string) => void;
  notifications: SmartNotification[];
  completeNotification: (id: string) => void;
  snoozeNotification: (id: string) => void;
  dismissNotification: (id: string) => void;
  addNotification: (notif: Omit<SmartNotification, 'id'>) => void;
  recentDiagnosis: DiseaseDetectionResult | null;
  setRecentDiagnosis: (diag: DiseaseDetectionResult | null) => void;
  fieldProfits: FieldProfitLossCalculation[];
  updateFieldProfit: (calc: FieldProfitLossCalculation) => void;
}

const initialProfile: FarmerProfile = {
  id: 'farmer-ramesh-01',
  name: 'Ramesh Kumar',
  tamilName: 'ரமேஷ் குமார்',
  hindiName: 'रमेश कुमार',
  avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
  state: 'Tamil Nadu',
  district: 'Thanjavur',
  village: 'Thiruvaiyaru',
  phone: '+91 98421 67890',
  email: 'ramesh.kumar@agronex.in',
  totalLandAreaAcres: 5.5,
  totalFieldsCount: 4,
  farmingExperienceYears: 16,
  mainCrops: ['Paddy (சம்பா நெல்)', 'Banana (வாழை)'],
  kisanId: 'TN-THJ-2026-55412',
  aadhaarMasked: 'XXXX-XXXX-4812'
};

const initialFields: FieldRecord[] = [
  {
    id: 'field-1',
    name: 'Field 1',
    fieldNumber: 1,
    areaAcres: 2.0,
    areaHectares: 0.81,
    soilType: 'Sandy Loam',
    soilPh: 6.8,
    fertilityLevel: 'High',
    nitrogenKgHa: 115,
    phosphorusKgHa: 45,
    potassiumKgHa: 160,
    waterHoldingCapacity: 'High',
    irrigationType: 'Canal / Sluice',
    waterAvailability: 'Abundant (Year-round)',
    location: 'North Sluice Gate, Plot 142/A',
    previousCrop: 'Black Gram (உளுந்து)',
    currentCrop: 'Paddy',
    cropVariety: 'CR 1009 Sub 1',
    sowingDate: '2026-09-20',
    growthStage: 'Tillering',
    daysAfterSowing: 45,
    expectedHarvestDate: 'in 45 Days',
    healthScore: 94,
    soilMoisturePercent: 74,
    lastIrrigationDate: '2026-11-22',
    nextIrrigationDate: '2026-11-25',
    estimatedYieldQuintals: 48,
    estimatedRevenue: 105600
  },
  {
    id: 'field-2',
    name: 'Field 2',
    fieldNumber: 2,
    areaAcres: 1.5,
    areaHectares: 0.61,
    soilType: 'Red Loam',
    soilPh: 6.4,
    fertilityLevel: 'Medium',
    nitrogenKgHa: 88,
    phosphorusKgHa: 52,
    potassiumKgHa: 195,
    waterHoldingCapacity: 'Moderate',
    irrigationType: 'Drip Irrigation',
    waterAvailability: 'Adequate (Seasonal)',
    location: 'South Ridge, Plot 142/B',
    previousCrop: 'Sesame',
    currentCrop: 'Groundnut',
    cropVariety: 'Kadiri 6 Bold',
    sowingDate: '2026-09-25',
    growthStage: 'Flowering & Pegging',
    daysAfterSowing: 40,
    expectedHarvestDate: 'in 65 Days',
    healthScore: 92,
    soilMoisturePercent: 58,
    lastIrrigationDate: '2026-11-23',
    nextIrrigationDate: '2026-11-25',
    estimatedYieldQuintals: 26,
    estimatedRevenue: 82800
  },
  {
    id: 'field-3',
    name: 'Field 3',
    fieldNumber: 3,
    areaAcres: 1.0,
    areaHectares: 0.40,
    soilType: 'Clay Loam',
    soilPh: 7.1,
    fertilityLevel: 'High',
    nitrogenKgHa: 135,
    phosphorusKgHa: 62,
    potassiumKgHa: 225,
    waterHoldingCapacity: 'High',
    irrigationType: 'Drip Irrigation',
    waterAvailability: 'Abundant (Year-round)',
    location: 'East Canal Bank, Plot 143/1',
    previousCrop: 'Green Manure',
    currentCrop: 'Banana',
    cropVariety: 'Grand Naine (G-9)',
    sowingDate: '2026-05-10',
    growthStage: 'Vegetative Growth',
    daysAfterSowing: 110,
    expectedHarvestDate: 'in 120 Days',
    healthScore: 82,
    soilMoisturePercent: 65,
    lastIrrigationDate: '2026-11-20',
    nextIrrigationDate: '2026-11-26',
    estimatedYieldQuintals: 40,
    estimatedRevenue: 80000
  },
  {
    id: 'field-4',
    name: 'Field 4',
    fieldNumber: 4,
    areaAcres: 1.0,
    areaHectares: 0.40,
    soilType: 'Loam' as SoilType,
    soilPh: 6.7,
    fertilityLevel: 'Medium',
    nitrogenKgHa: 95,
    phosphorusKgHa: 54,
    potassiumKgHa: 140,
    waterHoldingCapacity: 'Moderate',
    irrigationType: 'Borewell Sprinkler',
    waterAvailability: 'Adequate (Seasonal)',
    location: 'West Terrace, Plot 144/2',
    previousCrop: 'Groundnut',
    currentCrop: 'Sugarcane',
    cropVariety: 'Co 86032 (Nayana)',
    sowingDate: '2026-06-01',
    growthStage: 'Tillering Stage',
    daysAfterSowing: 90,
    expectedHarvestDate: 'in 140 Days',
    healthScore: 91,
    soilMoisturePercent: 68,
    lastIrrigationDate: '2026-11-21',
    nextIrrigationDate: '2026-11-27',
    estimatedYieldQuintals: 58,
    estimatedRevenue: 70000
  }
];

const initialNotifications: SmartNotification[] = [
  {
    id: 'notif-1',
    fieldId: 'field-2',
    fieldName: 'Field 2 – Paddy',
    type: 'irrigation',
    title: 'Field 2 – Paddy',
    message: 'Time to irrigate your field!',
    date: '2h ago',
    priority: 'high',
    targetTab: 'crop-selection',
    status: 'active'
  },
  {
    id: 'notif-2',
    fieldId: 'field-1',
    fieldName: 'Field 1',
    type: 'fertilizer',
    title: 'Apply Urea in Field 1',
    message: '(Within 3 days)',
    date: '1d ago',
    priority: 'medium',
    targetTab: 'crop-doctor',
    status: 'active'
  },
  {
    id: 'notif-3',
    fieldId: 'field-1',
    fieldName: 'All Fields',
    type: 'disease',
    title: 'Crop Insurance Available',
    message: 'for your crops',
    date: '2d ago',
    priority: 'low',
    targetTab: 'schemes',
    status: 'active'
  }
];

const initialFieldProfits: FieldProfitLossCalculation[] = [
  {
    fieldId: 'field-1',
    fieldName: 'Field 1 – Samba Paddy',
    areaAcres: 2.0,
    cropName: 'Paddy',
    variety: 'CR 1009 Sub 1',
    seedCost: 2800,
    landPreparationCost: 5500,
    fertilizerCost: 6400,
    pesticideCost: 3200,
    irrigationCost: 2400,
    labourCost: 11000,
    machineryCost: 4500,
    harvestingCost: 6000,
    transportationCost: 2000,
    otherExpenses: 1500,
    totalCultivationCost: 45300,
    expectedYieldQuintals: 48,
    actualYieldQuintals: 46,
    sellingPricePerQuintal: 2300,
    expectedRevenue: 110400,
    actualRevenue: 105800,
    estimatedNetProfit: 60500,
    profitPerAcre: 30250
  },
  {
    fieldId: 'field-2',
    fieldName: 'Field 2 – Coconut Grove',
    areaAcres: 1.5,
    cropName: 'Coconut',
    variety: 'Pollachi Tall',
    seedCost: 0,
    landPreparationCost: 1800,
    fertilizerCost: 5600,
    pesticideCost: 2200,
    irrigationCost: 3200,
    labourCost: 8500,
    machineryCost: 2000,
    harvestingCost: 4500,
    transportationCost: 1800,
    otherExpenses: 1200,
    totalCultivationCost: 30800,
    expectedYieldQuintals: 72,
    sellingPricePerQuintal: 2000,
    expectedRevenue: 144000,
    estimatedNetProfit: 113200,
    profitPerAcre: 75466
  },
  {
    fieldId: 'field-3',
    fieldName: 'Field 3 – Grand Naine Banana',
    areaAcres: 3.0,
    cropName: 'Banana',
    variety: 'Grand Naine',
    seedCost: 12000,
    landPreparationCost: 7500,
    fertilizerCost: 16500,
    pesticideCost: 8400,
    irrigationCost: 6000,
    labourCost: 22000,
    machineryCost: 5000,
    harvestingCost: 10000,
    transportationCost: 4500,
    otherExpenses: 3000,
    totalCultivationCost: 94900,
    expectedYieldQuintals: 110,
    sellingPricePerQuintal: 2000,
    expectedRevenue: 220000,
    estimatedNetProfit: 125100,
    profitPerAcre: 41700
  },
  {
    fieldId: 'field-4',
    fieldName: 'Field 4 – Erode Turmeric',
    areaAcres: 1.0,
    cropName: 'Turmeric',
    variety: 'Bhavani Lokhandi',
    seedCost: 14000,
    landPreparationCost: 4500,
    fertilizerCost: 8500,
    pesticideCost: 4000,
    irrigationCost: 3500,
    labourCost: 14000,
    machineryCost: 3000,
    harvestingCost: 7500,
    transportationCost: 2200,
    otherExpenses: 1800,
    totalCultivationCost: 63000,
    expectedYieldQuintals: 32,
    sellingPricePerQuintal: 6000,
    expectedRevenue: 192000,
    estimatedNetProfit: 129000,
    profitPerAcre: 129000
  }
];

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export const FarmerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('agronex_farmer_profile');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  // 2. Fields State
  const [fields, setFields] = useState<FieldRecord[]>(() => {
    try {
      const saved = localStorage.getItem('agronex_farmer_fields_v4');
      return saved ? JSON.parse(saved) : initialFields;
    } catch {
      return initialFields;
    }
  });

  // 3. Selected Field
  const [selectedFieldId, setSelectedFieldId] = useState<string>(() => {
    return fields.length > 0 ? fields[0].id : 'field-1';
  });

  // 4. Notifications State
  const [notifications, setNotifications] = useState<SmartNotification[]>(() => {
    try {
      const saved = localStorage.getItem('agronex_notifications');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // 5. Recent Diagnosis
  const [recentDiagnosis, setRecentDiagnosis] = useState<DiseaseDetectionResult | null>(() => {
    try {
      const saved = localStorage.getItem('agronex_recent_diagnosis');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 6. Field Profits
  const [fieldProfits, setFieldProfits] = useState<FieldProfitLossCalculation[]>(() => {
    try {
      const saved = localStorage.getItem('agronex_field_profits');
      return saved ? JSON.parse(saved) : initialFieldProfits;
    } catch {
      return initialFieldProfits;
    }
  });

  // Sync Profile to LocalStorage & Recalculate totals
  useEffect(() => {
    try {
      localStorage.setItem('agronex_farmer_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  // Sync Fields to LocalStorage & update total acres in profile
  useEffect(() => {
    try {
      localStorage.setItem('agronex_farmer_fields_v4', JSON.stringify(fields));
      const totalAcres = fields.reduce((sum, f) => sum + f.areaAcres, 0);
      setProfile((prev) => ({
        ...prev,
        totalLandAreaAcres: parseFloat(totalAcres.toFixed(2)),
        totalFieldsCount: fields.length
      }));
    } catch (e) {
      console.error(e);
    }
  }, [fields]);

  // Sync Notifications
  useEffect(() => {
    try {
      localStorage.setItem('agronex_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  // Sync Recent Diagnosis
  useEffect(() => {
    try {
      localStorage.setItem('agronex_recent_diagnosis', JSON.stringify(recentDiagnosis));
    } catch (e) {
      console.error(e);
    }
  }, [recentDiagnosis]);

  // Sync Field Profits
  useEffect(() => {
    try {
      localStorage.setItem('agronex_field_profits', JSON.stringify(fieldProfits));
    } catch (e) {
      console.error(e);
    }
  }, [fieldProfits]);

  // Actions
  const updateProfile = (updates: Partial<FarmerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addField = (fieldData: Omit<FieldRecord, 'id'>) => {
    const newId = `field-${Date.now()}`;
    const newField: FieldRecord = {
      ...fieldData,
      id: newId
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newId);

    // Also create initial P&L entry
    const newProfit: FieldProfitLossCalculation = {
      fieldId: newId,
      fieldName: newField.name,
      areaAcres: newField.areaAcres,
      cropName: newField.currentCrop,
      variety: newField.cropVariety,
      seedCost: 3000 * newField.areaAcres,
      landPreparationCost: 2500 * newField.areaAcres,
      fertilizerCost: 3500 * newField.areaAcres,
      pesticideCost: 2000 * newField.areaAcres,
      irrigationCost: 1500 * newField.areaAcres,
      labourCost: 6000 * newField.areaAcres,
      machineryCost: 2500 * newField.areaAcres,
      harvestingCost: 3500 * newField.areaAcres,
      transportationCost: 1500 * newField.areaAcres,
      otherExpenses: 1000 * newField.areaAcres,
      totalCultivationCost: 27000 * newField.areaAcres,
      expectedYieldQuintals: Math.round(25 * newField.areaAcres),
      sellingPricePerQuintal: 2400,
      expectedRevenue: Math.round(25 * newField.areaAcres * 2400),
      estimatedNetProfit: Math.round(25 * newField.areaAcres * 2400 - 27000 * newField.areaAcres),
      profitPerAcre: Math.round((25 * newField.areaAcres * 2400 - 27000 * newField.areaAcres) / newField.areaAcres)
    };
    setFieldProfits((prev) => [...prev, newProfit]);
  };

  const updateField = (id: string, updates: Partial<FieldRecord>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteField = (id: string) => {
    setFields((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      if (selectedFieldId === id && filtered.length > 0) {
        setSelectedFieldId(filtered[0].id);
      }
      return filtered;
    });
    setFieldProfits((prev) => prev.filter((p) => p.fieldId !== id));
  };

  const completeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'completed' as const } : n))
    );
  };

  const snoozeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'snoozed' as const } : n))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (notif: Omit<SmartNotification, 'id'>) => {
    const newNotif: SmartNotification = {
      ...notif,
      id: `notif-${Date.now()}`
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateFieldProfit = (calc: FieldProfitLossCalculation) => {
    setFieldProfits((prev) => {
      const idx = prev.findIndex((p) => p.fieldId === calc.fieldId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = calc;
        return copy;
      }
      return [...prev, calc];
    });
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  return (
    <FarmerContext.Provider
      value={{
        profile,
        updateProfile,
        fields,
        selectedFieldId,
        setSelectedFieldId,
        selectedField,
        addField,
        updateField,
        deleteField,
        notifications,
        completeNotification,
        snoozeNotification,
        dismissNotification,
        addNotification,
        recentDiagnosis,
        setRecentDiagnosis,
        fieldProfits,
        updateFieldProfit
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw new Error('useFarmer must be used within a FarmerProvider');
  }
  return context;
};

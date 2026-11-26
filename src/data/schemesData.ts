export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  tamilName: string;
  hindiName: string;
  category: 'Income Support' | 'Crop Insurance' | 'Credit & Loan' | 'Pension' | 'Irrigation' | 'Price Support' | 'Mechanization' | 'Organic & Natural' | 'Horticulture' | 'Infrastructure' | 'Technology' | 'Agro-Allied';
  icon: string; // Lucide icon name or emoji representation
  financialBenefit: string;
  purpose: string;
  benefits: string[];
  whoCanApply: string[];
  eligibilityConditions: string[];
  requiredDocuments: string[];
  howToApplySteps: string[];
  officialUrl: string;
  status: 'Active' | 'Upcoming' | 'Continuous';
  applicationDeadline: string;
  relatedSchemeIds: string[];
  keywords: string[];
}

export const governmentSchemesData: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    shortName: 'PM-KISAN',
    tamilName: 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
    hindiName: 'प्रधानमंत्री किसान सम्मान निधि',
    category: 'Income Support',
    icon: 'Wallet',
    financialBenefit: '₹6,000 per year paid in 3 four-monthly installments of ₹2,000 directly via DBT.',
    purpose: 'To provide assured direct income support to all landholding farmer families across India for purchasing agricultural inputs and meeting household needs.',
    benefits: [
      'Direct Bank Transfer (DBT) of ₹2,000 every 4 months (April–July, August–November, December–March).',
      '100% centrally funded with no middleman or transaction fee.',
      'Enables timely purchase of certified seeds, fertilizers, and micronutrients.',
      'Over 11 crore farmers supported nationwide.'
    ],
    whoCanApply: [
      'Small, marginal and large agricultural landholder farmer families.',
      'Farmers with land records registered in state revenue portals.'
    ],
    eligibilityConditions: [
      'Farmer family must hold cultivable agricultural land in their name.',
      'Bank account must be Aadhaar-seeded and NPCI-linked for Direct Benefit Transfer.',
      'Mandatory completion of e-KYC (via OTP, biometric CSC, or facial authentication).',
      'Exclusions: Institutional landholders, serving/retired government officers, taxpayers paying income tax in the last assessment year, professionals (doctors, engineers, lawyers, CA).'
    ],
    requiredDocuments: [
      'Aadhaar Card linked to active mobile number',
      'Land Ownership Record (Patta / Chitta / 7/12 / ROR / Khata number)',
      'Bank Account Passbook with clear IFSC code',
      'Self-declaration of landholding and non-taxpayer status'
    ],
    howToApplySteps: [
      '1. Open the official PM-KISAN portal (pmkisan.gov.in) or visit nearest CSC/e-Seva centre.',
      '2. Navigate to "Farmers Corner" and select "New Farmer Registration".',
      '3. Select Rural or Urban Farmer Registration and enter your 12-digit Aadhaar Number and State.',
      '4. Complete OTP verification sent to your Aadhaar-registered mobile number.',
      '5. Fill in Land Details (Survey / Patta / Khata number, acreage, date of land registration).',
      '6. Upload the scanned Land Document (PDF under 200 KB) and submit.',
      '7. Note down the provisional Registration Reference ID to track status.'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    status: 'Active',
    applicationDeadline: 'Open round the year on pmkisan.gov.in',
    relatedSchemeIds: ['pm-kmy', 'kcc', 'soil-health-card'],
    keywords: ['pm kisan', 'income', 'cash', '6000', 'money', 'financial', 'direct transfer', 'dbt', 'support', 'small farmer', 'aid', 'paddy', 'wheat', 'all crops']
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortName: 'PMFBY',
    tamilName: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
    hindiName: 'प्रधानमंत्री फसल बीमा योजना',
    category: 'Crop Insurance',
    icon: 'ShieldCheck',
    financialBenefit: 'Comprehensive insurance coverage: Farmers pay only 1.5% premium (Rabi), 2% (Kharif), and 5% for commercial/horticultural crops.',
    purpose: 'To provide financial support to farmers suffering crop loss or damage arising out of unforeseen non-preventable natural calamities (drought, dry spells, flood, inundation, pests & diseases, landslides, unseasonal heavy rains).',
    benefits: [
      'Lowest uniform actuarial farmer premium (maximum 2% for foodgrains, 5% for horticultural crops).',
      'Balance premium fully subsidized equally by Central and State Governments.',
      'Coverage from pre-sowing (prevented sowing), standing crop damage, mid-season adversity, to post-harvest losses up to 14 days.',
      'Satellite and drone-assisted yield estimation for fast automated claim settlement.'
    ],
    whoCanApply: [
      'All farmers cultivating notified crops in notified revenue areas.',
      'Both loanee farmers (holding KCC/crop loans) and non-loanee farmers (sharecroppers and tenant farmers with tenancy agreement).'
    ],
    eligibilityConditions: [
      'Crop must be among notified crops in the farmer revenue village/district for that season.',
      'Application must be completed before the seasonal cut-off deadline (July 31 for Kharif, Dec 31 for Rabi in most states).',
      'Intimation of crop loss within 72 hours via Crop Insurance App or toll-free helpline (14447).'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Current Season Sowing Certificate / Adangal / Village Administrative Officer (VAO) Certificate',
      'Land Record Document (Patta / Khata / Registered Tenancy Agreement)',
      'Bank Account Passbook / Cancelled Cheque with IFSC',
      'Self-declaration of crop acreage'
    ],
    howToApplySteps: [
      '1. Visit the National Crop Insurance Portal (pmfby.gov.in) or download the Crop Insurance Mobile App.',
      '2. Select "Farmer Corner" -> "Guest Farmer" or "Login with Mobile".',
      '3. Enter State, District, Sub-district, Revenue Village, and Cropping Season.',
      '4. Select the notified crop and enter land area under cultivation.',
      '5. Upload the Sowing Certificate and Land Patta document.',
      '6. Pay the farmer premium online via UPI, net banking, or debit card.',
      '7. Download the Crop Insurance Policy Certificate with Policy Number.'
    ],
    officialUrl: 'https://pmfby.gov.in',
    status: 'Active',
    applicationDeadline: 'Kharif: July 31 | Rabi: December 31 / January 15',
    relatedSchemeIds: ['pm-kisan', 'kcc', 'pm-aasha'],
    keywords: ['insurance', 'crop loss', 'damage', 'cyclone', 'flood', 'drought', 'rain', 'pests', 'compensation', 'claim', 'fasal bima', 'paddy', 'cotton', 'groundnut', 'maize']
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC) Scheme',
    shortName: 'KCC',
    tamilName: 'விவசாயிகள் கடன் அட்டை (Kisan Credit Card)',
    hindiName: 'किसान क्रेडिट कार्ड',
    category: 'Credit & Loan',
    icon: 'CreditCard',
    financialBenefit: 'Agricultural loans up to ₹3,00,000 at effective 4% interest rate per annum (after 2% interest subvention + 3% prompt repayment incentive). Collateral-free up to ₹1.60 lakh.',
    purpose: 'To provide adequate and timely credit support from the banking system under a single window with flexible and simplified procedures for cultivation expenses, post-harvest costs, and maintenance of farm assets.',
    benefits: [
      'Effective interest rate of only 4% per annum upon prompt repayment on time.',
      'No collateral requirement for agricultural credit limits up to ₹1.60 lakh (extendable up to ₹3 lakh through tie-ups).',
      'Includes sub-limit for animal husbandry, poultry, and fisheries up to ₹2 lakh at subsidized rate.',
      'ATM-enabled RuPay Kisan Card for easy withdrawals and input store purchases.',
      'Valid for 5 years with annual renewal based on crop pattern.'
    ],
    whoCanApply: [
      'Individual and joint landholding farmers.',
      'Tenant farmers, oral lessees, and sharecroppers.',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.'
    ],
    eligibilityConditions: [
      'Applicant must be between 18 and 75 years of age.',
      'Satisfactory credit score and no willful default on previous agricultural loans.',
      'Operational agricultural landholding or livestock rearing setup.'
    ],
    requiredDocuments: [
      'Duly filled one-page simplified KCC Application Form',
      'Identity Proof: Aadhaar Card / Voter ID / PAN Card',
      'Address Proof: Aadhaar / Ration Card / Utility bill',
      'Land Records: Patta, Chitta, Adangal or Tenancy Certificate',
      'Passport size photographs and signature verification'
    ],
    howToApplySteps: [
      '1. Download the simplified one-page KCC application form from agricoop.gov.in or obtain it at any rural bank branch.',
      '2. Attach Land Patta / Chitta and copy of Aadhaar and Bank Passbook.',
      '3. Submit the form to the nearest Public Sector Bank, Regional Rural Bank (RRB), or Primary Agricultural Credit Society (PACS).',
      '4. The bank processes and sanctions the KCC within 14 working days under priority guidelines.',
      '5. Collect your RuPay Kisan Card from the branch for convenient input purchases.'
    ],
    officialUrl: 'https://agricoop.gov.in/en/kcc',
    status: 'Active',
    applicationDeadline: 'Open ongoing at all commercial and cooperative banks',
    relatedSchemeIds: ['pm-kisan', 'aif', 'smam'],
    keywords: ['loan', 'credit', 'bank', 'interest', 'working capital', 'money', 'kcc', 'kisan card', 'seeds', 'fertilizer credit', 'rupay']
  },
  {
    id: 'pm-kmy',
    name: 'Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)',
    shortName: 'PM-KMY',
    tamilName: 'பிரதம மந்திரி கிசான் மான்-தன் யோஜனா (விவசாயி ஓய்வூதியம்)',
    hindiName: 'प्रधानमंत्री किसान मान-धन योजना',
    category: 'Pension',
    icon: 'HeartHandshake',
    financialBenefit: 'Guaranteed monthly old-age pension of ₹3,000 upon reaching 60 years of age.',
    purpose: 'A voluntary and contributory pension scheme for small and marginal farmers to provide social security and dignity during their old age.',
    benefits: [
      'Fixed monthly pension of ₹3,000 directly credited to pensioner bank account after age 60.',
      '50% equal matching contribution paid by the Central Government into the pension fund.',
      'Affordable monthly contribution ranging from ₹55 to ₹200 based on entry age (18 to 40 years).',
      'Spouse receives 50% family pension (₹1,500/month) in the event of subscriber demise.'
    ],
    whoCanApply: [
      'Small and marginal farmers owning cultivable land up to 2 hectares (5 acres) as per land records.'
    ],
    eligibilityConditions: [
      'Entry age between 18 and 40 years.',
      'Must NOT be covered under other statutory social security schemes (NPS, ESIC, EPFO, PM-SYM).',
      'Must NOT be an institutional landholder, constitutional post holder, or income tax payer.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Savings Bank Account Passbook or Jan Dhan Bank Account with IFSC',
      'Copy of Land Record (Patta / 7/12 / Khata) verifying landholding <= 2 hectares',
      'Mobile number for registration'
    ],
    howToApplySteps: [
      '1. Visit the nearest Common Services Centre (CSC) or log in at maandhan.in.',
      '2. Provide Aadhaar number and Bank Account details to the VLE.',
      '3. System calculates monthly contribution amount based on age.',
      '4. Initial contribution is paid in cash at CSC; subsequent auto-debit consent is authorized on bank account.',
      '5. System generates the unique Kisan Pension Card (KPK Number).'
    ],
    officialUrl: 'https://maandhan.in',
    status: 'Active',
    applicationDeadline: 'Open enrollment throughout the year',
    relatedSchemeIds: ['pm-kisan', 'kcc'],
    keywords: ['pension', 'old age', 'retirement', '3000', 'maan dhan', 'senior', 'monthly', 'social security', 'small farmer']
  },
  {
    id: 'pmksy',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    shortName: 'PMKSY',
    tamilName: 'பிரதம மந்திரி கிருஷி சிஞ்சாயி யோஜனா (நீர்ப்பாசன திட்டம்)',
    hindiName: 'प्रधानमंत्री कृषि सिंचाई योजना',
    category: 'Irrigation',
    icon: 'Waves',
    financialBenefit: 'Up to 55% capital subsidy for farm ponds, water harvesting check dams, secondary storage tanks, and lift irrigation pipelines.',
    purpose: 'To achieve convergence of investments in irrigation at the field level, expand cultivable area under assured irrigation ("Har Khet Ko Pani"), and improve on-farm water use efficiency ("More Crop Per Drop").',
    benefits: [
      'Financial subsidy for digging individual and community farm ponds (krishi khet talab).',
      'Subsidized solar pumping systems and water distribution pipelines to reduce diesel costs.',
      'Groundwater recharge structures and check dams in overexploited watersheds.',
      'Assured irrigation coverage for dryland and rainfed agriculture.'
    ],
    whoCanApply: [
      'All categories of farmers, Water Users Associations (WUAs), FPOs, and village panchayats.'
    ],
    eligibilityConditions: [
      'Must have cultivable agricultural land with viable catchment for water collection.',
      'Prior approval from the District Agriculture / Horticulture Engineering Department.',
      'Adherence to standard technical specifications for lined/unlined farm ponds.'
    ],
    requiredDocuments: [
      'Land Ownership Record (Patta / Chitta / Revenue record)',
      'Field sketch and site elevation certificate',
      'Aadhaar Card',
      'Bank Passbook copy',
      'NOC / Consent from co-owners if joint patta'
    ],
    howToApplySteps: [
      '1. Visit pmksy.gov.in or the State Agriculture Engineering / Horticulture Department website.',
      '2. Submit application for Farm Pond Construction or Surface Water Distribution System.',
      '3. Assistant Agricultural Engineer conducts field inspection and GPS geo-tagging.',
      '4. Administrative sanction order issued with subsidy work order.',
      '5. Post-construction geo-tagged inspection and direct subsidy credit to bank account.'
    ],
    officialUrl: 'https://pmksy.gov.in',
    status: 'Active',
    applicationDeadline: 'Annual state allocation rounds (Open ongoing)',
    relatedSchemeIds: ['pdmc', 'midh', 'aif'],
    keywords: ['irrigation', 'water', 'pond', 'farm pond', 'borewell', 'canal', 'check dam', 'sinchayee', 'pipeline', 'har khet ko pani']
  },
  {
    id: 'pm-aasha',
    name: 'PM-AASHA (Annadata Aay Sanraksan Abhiyan)',
    shortName: 'PM-AASHA',
    tamilName: 'பிரதம மந்திரி ஆஷா திட்டம் (விவசாயிகள் விலை ஆதரவு)',
    hindiName: 'पीएम-आशा (अन्नदाता आय संरक्षण अभियान)',
    category: 'Price Support',
    icon: 'Scale',
    financialBenefit: 'Guaranteed Minimum Support Price (MSP) realization: Full MSP procurement payment or direct DBT reimbursement of price difference between MSP and market auction price.',
    purpose: 'To ensure remunerative prices to farmers for their produce, focusing specifically on pulses, oilseeds, and copra through comprehensive price support and deficit payment mechanisms.',
    benefits: [
      'Price Support Scheme (PSS): Physical procurement of pulses, oilseeds, and copra at MSP by NAFED/FCI.',
      'Price Deficiency Payment Scheme (PDPS): Direct compensation credited to bank account for gap between MSP and wholesale mandi modal price without physical produce handling.',
      'Private Procurement & Stockist Scheme (PPSS): Incentivizes private millers/traders to procure at MSP.',
      'Eliminates distress selling below MSP during post-harvest bumper harvest gluts.'
    ],
    whoCanApply: [
      'Farmers producing notified oilseeds (Soybean, Groundnut, Mustard, Sunflower, Sesame), pulses (Urad, Moong, Tur, Gram), and Copra.'
    ],
    eligibilityConditions: [
      'Pre-registration on State Procurement Portal (e-NAM or e-Uparjan) during sowing/pre-harvest window.',
      'Harvested produce must meet the Fair Average Quality (FAQ) standards specified by GOI.',
      'Produce quantity capped per acre as per notified district yield averages.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Record (Patta / Adangal / Village Girdawari showing crop acreage)',
      'Bank Account Passbook linked with Aadhaar/DBT',
      'Mandi / Procurement Centre Token / Registration Receipt'
    ],
    howToApplySteps: [
      '1. Register your crop on the State e-Procurement / Mandi portal before harvest.',
      '2. Receive SMS notification with allocated procurement date and designated Regulated Market / PACCS centre.',
      '3. Bring clean, dried produce meeting FAQ moisture norms to the procurement depot.',
      '4. Quality testing and digital weighing completed at the depot.',
      '5. Direct payment credited to Aadhaar-seeded bank account within 3 to 7 working days.'
    ],
    officialUrl: 'https://agricoop.nic.in',
    status: 'Active',
    applicationDeadline: 'Announced at start of each Kharif / Rabi marketing season',
    relatedSchemeIds: ['pm-kisan', 'pmfby', 'nmeo'],
    keywords: ['msp', 'price', 'selling', 'procurement', 'pulses', 'oilseeds', 'groundnut', 'soybean', 'urad', 'moong', 'aasha', 'nafed', 'market rate']
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    shortName: 'SMAM',
    tamilName: 'வேளாண் இயந்திரமயமாக்கல் துணை இயக்கம் (SMAM)',
    hindiName: 'कृषि यंत्रीकरण उप-मिशन',
    category: 'Mechanization',
    icon: 'Tractor',
    financialBenefit: '40% to 50% subsidy on purchase of Tractors, Power Tillers, Combine Harvesters, Rotavators, and implements. Up to 80% subsidy for FPOs establishing Custom Hiring Centres.',
    purpose: 'To increase reach of farm mechanization to small and marginal farmers, promote Custom Hiring Centres (CHCs) to offset high capital costs, and introduce advanced automated agricultural machinery.',
    benefits: [
      '40% to 50% direct subsidy on tractors, mini tractors, power tillers, reapers, and laser land levellers.',
      'Special 50% subsidy rate for SC, ST, women, and small/marginal farmers.',
      'Up to ₹10 lakh subsidy (80%) for FPOs and Rural Cooperatives setting up Custom Hiring Centres (CHC).',
      'Drastically reduces labor dependency, optimizes field preparation time, and cuts operational costs.'
    ],
    whoCanApply: [
      'Individual farmers across all land categories.',
      'Farmer Producer Organizations (FPOs), Cooperative Societies, and Rural Youth Entrepreneurs.'
    ],
    eligibilityConditions: [
      'Must have not availed government subsidy for the same category of machine in the last 5 to 7 years.',
      'Valid agricultural landholding in applicant or family lineage name.',
      'Valid driving license required for tractor purchase subsidy applications.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Record (Patta / Chitta / Khata)',
      'Bank Account Passbook / Cancelled Cheque',
      'Quotation and proforma invoice from authorized registered machinery dealer',
      'Caste Certificate (for SC/ST subsidy preference)'
    ],
    howToApplySteps: [
      '1. Visit the SMAM official portal (agrimachinery.nic.in).',
      '2. Click "Registration" -> "Farmer" and select State and Aadhaar details.',
      '3. Select the equipment needed (e.g. Tractor 4WD, Rotavator, Multi-crop thresher, Power Weeder).',
      '4. Choose approved manufacturer and authorized district dealer.',
      '5. Upload Land Patta, Bank Passbook, and Dealer Quotation.',
      '6. District Agriculture Engineering Officer verifies and issues Administrative Sanction Token.',
      '7. Purchase machinery, submit invoice and physical inspection for direct DBT release.'
    ],
    officialUrl: 'https://agrimachinery.nic.in',
    status: 'Active',
    applicationDeadline: 'State quota lottery / first-come windows announced quarterly',
    relatedSchemeIds: ['kcc', 'aif', 'drone-didi'],
    keywords: ['tractor', 'machinery', 'tiller', 'rotavator', 'harvester', 'equipment', 'implement', 'mechanization', 'smam', 'custom hiring', 'chc', 'weeder']
  },
  {
    id: 'pkvy',
    name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    shortName: 'PKVY',
    tamilName: 'பாரம்பரிய கிருஷி விகாஸ் யோஜனா (இயற்கை / இயற்கை உரம்)',
    hindiName: 'परम्परागत कृषि विकास योजना',
    category: 'Organic & Natural',
    icon: 'Leaf',
    financialBenefit: '₹50,000 per hectare financial assistance for 3 years (₹31,000/ha for organic inputs like biofertilizers & vermicompost + ₹8,800/ha for packaging and branding).',
    purpose: 'To promote organic farming through a cluster approach with Participatory Guarantee System (PGS-India) certification, chemical-free input production, and premium market linkages.',
    benefits: [
      'Direct financial support of ₹31,000 per hectare for on-farm and off-farm organic inputs.',
      'Free organic PGS-India certification for the entire farmer group cluster without expensive third-party audits.',
      'Assistance for custom packaging, organic branding, and marketing at local farmer markets (Uzhavar Sandhai / Jaivik Kheti).',
      'Improves soil organic carbon (SOC), micro-flora, and water retention capacity.'
    ],
    whoCanApply: [
      'Individual farmers forming a cluster of 20 to 50 farmers covering minimum 20 hectares (50 acres).',
      'Existing organic farming groups and registered Farmer Producer Organizations (FPOs).'
    ],
    eligibilityConditions: [
      'Commitment to discontinue synthetic chemical fertilizers and pesticides for minimum 3 years.',
      'Participation in PGS-India peer group reviews and maintain farm diary.',
      'Field contiguous with cluster boundary preferred for buffer zone management.'
    ],
    requiredDocuments: [
      'Aadhaar Card of all participating cluster farmers',
      'Land Records (Patta / Khata) verifying cluster land area',
      'Group Resolution / Cluster Registration Form',
      'Baseline Soil Test Report before organic conversion',
      'Bank Account details of Lead Farmer / Cluster Group'
    ],
    howToApplySteps: [
      '1. Form a group of 20–50 farmers in your village panchayat covering at least 20 ha.',
      '2. Contact the local Assistant Director of Agriculture (ADA) or Regional Council for PGS-India.',
      '3. Register the cluster on the Jaivik Kheti / PGS-India portal (pgsindia-ncof.gov.in).',
      '4. Baseline soil sample testing and crop rotation planning conducted.',
      '5. First installment released directly for purchasing vermicompost units, bio-pesticides, and neem cake.',
      '6. Earn Green PGS-Green certificate in year 1 and PGS-India Organic Certificate after year 3.'
    ],
    officialUrl: 'https://pgsindia-ncof.gov.in',
    status: 'Active',
    applicationDeadline: 'Annual cluster mobilization rounds through District Agri Offices',
    relatedSchemeIds: ['nmnf', 'soil-health-card', 'midh'],
    keywords: ['organic', 'vermicompost', 'biofertilizer', 'chemical-free', 'pgs', 'natural', 'manure', 'pkvy', 'jaivik kheti', 'neem', 'panchagavya']
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Card (SHC) Scheme',
    shortName: 'Soil Health Card',
    tamilName: 'மண் வள அட்டை திட்டம் (Soil Health Card)',
    hindiName: 'मृदा स्वास्थ्य कार्ड योजना',
    category: 'Technology',
    icon: 'TestTube',
    financialBenefit: '100% free comprehensive laboratory testing of 12 critical soil parameters with customized crop-specific fertilizer recommendations.',
    purpose: 'To assess the fertility status of agricultural soils across India and provide crop-specific nutrient management recommendations (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) to prevent excessive fertilizer usage.',
    benefits: [
      'Reduces fertilizer expenditure by 15% to 25% by preventing unneeded urea application.',
      'Improves crop yield by 8% to 12% through balanced macro and micro-nutrient application.',
      'Identifies soil acidity or alkalinity to guide corrective gypsum or lime treatment.',
      'Free periodic testing repeated every 3 years for continuous soil fertility tracking.'
    ],
    whoCanApply: [
      'All landholder farmers cultivating cereals, pulses, oilseeds, commercial, and horticultural crops.'
    ],
    eligibilityConditions: [
      'Operational agricultural landholding.',
      'Soil samples collected by department staff following GPS-gridded sampling methodology (2.5 ha for irrigated, 10 ha for rainfed).'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Revenue Survey Number / Patta Number / Khata Number',
      'Mobile number for receiving digital SMS Soil Card download link',
      'Previous crop and proposed crop details'
    ],
    howToApplySteps: [
      '1. Request soil sampling from the local Agricultural Officer or KVK (Krishi Vigyan Kendra).',
      '2. Official or certified sample collector collects composite soil samples from your field using GPS.',
      '3. Sample tested in designated district Soil Testing Laboratory across 12 chemical parameters.',
      '4. Download your permanent digital Soil Health Card from soilhealth.dac.gov.in using Survey Number.',
      '5. Apply the exact recommended dose of NPK and biofertilizers for higher productivity.'
    ],
    officialUrl: 'https://soilhealth.dac.gov.in',
    status: 'Active',
    applicationDeadline: 'Open continuous service across all agricultural circles',
    relatedSchemeIds: ['pm-kisan', 'pkvy', 'nmnf'],
    keywords: ['soil', 'test', 'soil health card', 'npk', 'fertilizer', 'urea', 'nutrients', 'ph', 'salinity', 'gypsum', 'micronutrient', 'fertility']
  },
  {
    id: 'midh',
    name: 'Mission for Integrated Development of Horticulture (MIDH)',
    shortName: 'MIDH',
    tamilName: 'ஒருங்கிணைந்த தோட்டக்கலை மேம்பாட்டு இயக்கம் (MIDH)',
    hindiName: 'एकीकृत बागवानी विकास मिशन',
    category: 'Horticulture',
    icon: 'Apple',
    financialBenefit: '40% to 50% capital subsidy on Polyhouses, Shade Net Houses, high-density orchards, mushroom units, packhouses, and cold storage.',
    purpose: 'To promote holistic growth of the horticulture sector covering fruits, vegetables, root and tuber crops, mushrooms, spices, flowers, aromatic plants, coconut, cashew, and cocoa.',
    benefits: [
      'Up to 50% subsidy (₹7.10 lakh per 1,000 sq.m) for naturally ventilated polyhouses and shade nets.',
      'Subsidy for establishment of new high-density mango, guava, citrus, and banana orchards.',
      'Assistance for post-harvest pack houses, sorting/grading units, and on-farm solar cold rooms.',
      'Enables round-the-year high-value off-season vegetable and flower cultivation.'
    ],
    whoCanApply: [
      'Individual farmers, Horticulture Producer Societies, FPOs, Women SHGs, and Agri-entrepreneurs.'
    ],
    eligibilityConditions: [
      'Land title documents confirming clear ownership or minimum 10-year registered lease.',
      'Assured irrigation water source (well/borewell/drip irrigation system).',
      'Adherence to standard MIDH cost norms and structural specifications.'
    ],
    requiredDocuments: [
      'Land Patta, Chitta, and FMB sketch',
      'Aadhaar Card & Bank Passbook',
      'Detailed Project Report (DPR) and vendor quotation for structures > ₹2 lakh',
      'Water and Soil test suitability certificate'
    ],
    howToApplySteps: [
      '1. Visit the State Horticulture Department portal (or midh.gov.in / tnhorticulture.tn.gov.in).',
      '2. Select scheme component (e.g. Protected Cultivation, Polyhouse, Shade Net, High-Density Plantation).',
      '3. Submit application along with land documents and empaneled vendor quotation.',
      '4. Horticultural Officer inspects site and grants administrative sanction.',
      '5. Complete installation and request joint verification for direct subsidy disbursement.'
    ],
    officialUrl: 'https://midh.gov.in',
    status: 'Active',
    applicationDeadline: 'State horticulture department allocation windows (Open ongoing)',
    relatedSchemeIds: ['pdmc', 'pmksy', 'aif'],
    keywords: ['horticulture', 'fruit', 'vegetable', 'polyhouse', 'greenhouse', 'shade net', 'mango', 'banana', 'flower', 'midh', 'orchard', 'mushroom', 'cold storage']
  },
  {
    id: 'pdmc',
    name: 'Per Drop More Crop (PDMC)',
    shortName: 'PDMC',
    tamilName: 'ஒரு துளி நீரில் அதிக பயிர் (சொட்டு & தெளிப்பு நீர் பாசனம்)',
    hindiName: 'प्रति बूंद अधिक फसल (सूक्ष्म सिंचाई)',
    category: 'Irrigation',
    icon: 'Droplets',
    financialBenefit: '55% subsidy for Small & Marginal farmers; 45% for other farmers. (In Tamil Nadu, state top-up provides 100% full subsidy for Small & Marginal farmers).',
    purpose: 'To drastically enhance water use efficiency at the farm level through Micro Irrigation technologies like Drip Irrigation and Sprinkler Systems, maximizing crop yield per unit of water consumed.',
    benefits: [
      '100% subsidy for Small/Marginal farmers (< 5 acres) in Tamil Nadu; 75% for other farmers.',
      'Saves 40% to 60% irrigation water compared to traditional flood irrigation.',
      'Integrated Venturi Fertigation system reduces chemical fertilizer wastage by 30%.',
      'Increases crop yield by 20% to 45% through uniform root-zone moisture delivery.'
    ],
    whoCanApply: [
      'All farmers cultivating sugarcane, banana, coconut, vegetables, cotton, maize, flowers, and orchards.'
    ],
    eligibilityConditions: [
      'Must possess functional well, borewell, or canal lift connection with adequate water.',
      'Must have registered agricultural electricity service (Free Agri EB connection or solar pump).',
      'Land ownership patta or registered lease agreement of at least 10 years.'
    ],
    requiredDocuments: [
      'Land Patta, Chitta, and Village Map (Adangal)',
      'Field Measurement Book (FMB) sketch indicating well / borewell location',
      'Aadhaar Card and Bank Passbook copy',
      'Water and Soil test certificate from Agriculture Engineering lab'
    ],
    howToApplySteps: [
      '1. Register online on the State Micro Irrigation Portal (e.g. tnhorticulture.tn.gov.in/tnhorti/microirrigation).',
      '2. Select registered empaneled micro-irrigation manufacturer (e.g. Jain Irrigation, Netafim, EPC Mahindra).',
      '3. Company engineer conducts field GPS survey and prepares tailored CAD micro-irrigation design.',
      '4. Department verifies documents and issues work order.',
      '5. Company installs drip lines, filters, and valves; department conducts physical verification.',
      '6. Subsidy released directly to vendor or farmer account.'
    ],
    officialUrl: 'https://pmksy.gov.in/microirrigation',
    status: 'Active',
    applicationDeadline: 'Continuous open portal registration',
    relatedSchemeIds: ['pmksy', 'midh', 'smam'],
    keywords: ['drip', 'sprinkler', 'micro irrigation', 'per drop more crop', 'water saving', 'pipe', 'lateral', 'emitter', 'pdmc', 'sugarcane', 'coconut', 'banana', 'vegetable']
  },
  {
    id: 'aif',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortName: 'AIF',
    tamilName: 'வேளாண் உள்கட்டமைப்பு நிதி (AIF கடன் திட்டம்)',
    hindiName: 'कृषि अवसंरचना कोष',
    category: 'Infrastructure',
    icon: 'Building2',
    financialBenefit: 'Medium-long term debt financing up to ₹2 Crore with 3% interest subvention per annum for up to 7 years + CGTMSE Credit Guarantee coverage.',
    purpose: 'To mobilize medium-to-long term debt financing for investment in viable projects for post-harvest management infrastructure and community farming assets.',
    benefits: [
      '3% per annum interest rate discount for loans up to ₹2 Crore for a maximum duration of 7 years.',
      'Government pays Credit Guarantee fee under CGTMSE for loans up to ₹2 Crore with no mortgage required.',
      'Eligible assets: Cold storages, modern warehouses, grain silos, sorting/grading units, drying yards, assaying labs, primary processing units, and smart agri tech.',
      'Helps farmers store produce post-harvest and avoid distress distress sales.'
    ],
    whoCanApply: [
      'Primary Agricultural Credit Societies (PACS), FPOs, Agri-entrepreneurs, Startups, Individual farmers, and SHGs.'
    ],
    eligibilityConditions: [
      'Viable project proposal for post-harvest or community farming infrastructure.',
      'Applicant contribution of minimum 10% to 20% project cost.',
      'Sanctioned by participating commercial or cooperative bank.'
    ],
    requiredDocuments: [
      'Detailed Project Report (DPR) with cash flow projections',
      'Land Title Deed / Registered Lease Deed for warehouse/facility site',
      'Aadhaar, PAN Card, and Bank statements for last 12 months',
      'In-principle bank loan sanction letter'
    ],
    howToApplySteps: [
      '1. Register on the National AIF Portal (agriinfra.dac.gov.in).',
      '2. Fill in project details, required loan amount, and select preferred lending bank branch.',
      '3. Upload the Detailed Project Report (DPR) and site land documents.',
      '4. Ministry PMU reviews and approves project viability within 10 days.',
      '5. Selected bank reviews, performs due diligence, and disburses subsidized loan with 3% interest rebate.'
    ],
    officialUrl: 'https://agriinfra.dac.gov.in',
    status: 'Active',
    applicationDeadline: 'Scheme active till Financial Year 2032-33',
    relatedSchemeIds: ['kcc', 'smam', '10000-fpo'],
    keywords: ['infrastructure', 'warehouse', 'cold storage', 'drying yard', 'processing', 'godown', 'loan', 'interest subvention', 'aif', 'post harvest', 'silo']
  },
  {
    id: '10000-fpo',
    name: 'Formation and Promotion of 10,000 FPOs',
    shortName: '10,000 FPOs',
    tamilName: '10,000 உழவர் உற்பத்தியாளர் நிறுவனங்கள் (FPO இயக்கம்)',
    hindiName: '10,000 एफपीओ का गठन और संवर्धन',
    category: 'Agro-Allied',
    icon: 'Users',
    financialBenefit: 'Financial support of up to ₹18 lakh per FPO for 3 years + Equity Grant match of up to ₹2,000 per member (max ₹15 lakh) + Credit Guarantee up to ₹2 Crore.',
    purpose: 'To organize small, marginal, and landless farmers into Farmer Producer Organizations (FPOs) to leverage collective bargaining power, bulk input discounts, direct market access, and better prices.',
    benefits: [
      'Financial grant of ₹18 lakh per FPO for 3 years to cover management, CEO salary, office rent, and utility costs.',
      'Matching Equity Grant of up to ₹15 lakh per FPO to enhance borrowing and equity capital.',
      'Credit Guarantee facility up to ₹2 Crore per FPO without collateral through NABARD/SFAC.',
      'Direct collective sale of crops to institutional buyers, food processors, and export terminals.'
    ],
    whoCanApply: [
      'Cluster of minimum 300 farmers in plain areas (100 farmers in hilly/North-Eastern regions).'
    ],
    eligibilityConditions: [
      'Must be registered as a Producer Company under Companies Act or Cooperative Societies Act.',
      'Minimum 50% members must be small and marginal farmers.',
      'Assigned Cluster-Based Business Organization (CBBO) handholding for 5 years.'
    ],
    requiredDocuments: [
      'Certificate of Incorporation / Registration of Producer Company',
      'List of Shareholder Farmer Members with Aadhaar and Land verification',
      'Company PAN, TAN, and Bank Account details',
      '3-Year Business Plan and Board Resolution'
    ],
    howToApplySteps: [
      '1. Contact NABARD, SFAC, or NCDC district office or assigned CBBO in your block.',
      '2. Mobilize minimum 300 farmers around a common crop cluster (e.g. Paddy, Millets, Vegetables, Spices).',
      '3. Incorporate as Farmer Producer Company with Ministry of Corporate Affairs.',
      '4. Apply for Equity Grant and Management Grant via the SFAC portal (sfacindia.com).',
      '5. Grants disbursed directly into FPO account upon member equity contribution.'
    ],
    officialUrl: 'https://sfacindia.com',
    status: 'Active',
    applicationDeadline: 'Active continuous rollout through implementing agencies',
    relatedSchemeIds: ['aif', 'smam', 'pm-aasha'],
    keywords: ['fpo', 'farmer group', 'collective', 'producer company', 'cluster', '10000 fpos', 'sfac', 'nabard', 'bulk buying', 'direct market']
  },
  {
    id: 'nmnf',
    name: 'National Mission on Natural Farming (NMNF)',
    shortName: 'NMNF',
    tamilName: 'தேசிய இயற்கை விவசாய இயக்கம் (NMNF)',
    hindiName: 'राष्ट्रीय प्राकृतिक खेती मिशन',
    category: 'Organic & Natural',
    icon: 'Sprout',
    financialBenefit: 'Financial support of ₹15,000 per hectare for 3 years + ₹4,00,000 financial grant to establish Bio-Input Resource Centres (BRCs).',
    purpose: 'To promote natural farming rooted in Indian indigenous agrarian wisdom, eliminating external chemical inputs and relying on on-farm livestock-derived Jeevamrutha, Beejamrutha, and crop diversity.',
    benefits: [
      'Direct financial support of ₹15,000 per hectare for on-farm preparation of botanical and cow-dung formulations.',
      'Subsidy of ₹4 lakh per Gram Panchayat to set up Bio-Input Resource Centres (BRCs) for selling ready Jeevamrutha.',
      'Improves soil biodiversity, earthworm counts, root depth, and water percolation.',
      'Reduces input cost to nearly zero, shielding farmers from rising chemical fertilizer prices.'
    ],
    whoCanApply: [
      'Gram Panchayats, Farmer Groups, and individual farmers shifting to zero-chemical natural farming.'
    ],
    eligibilityConditions: [
      'Contiguous village cluster covering at least 50 hectares.',
      'Pledge to avoid synthetic chemical fertilizers, weedicides, and chemical pesticides entirely.',
      'Presence of indigenous desi cow or access to Bio-Input Resource Centre.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Record (Patta / Khata number)',
      'Natural Farming Declaration form signed at Gram Sabha',
      'Bank Account Passbook'
    ],
    howToApplySteps: [
      '1. Contact the local Village Agriculture Extension Worker or District Agriculture Officer.',
      '2. Enroll in the village 50-hectare Natural Farming Cluster.',
      '3. Attend 3-day practical training on preparing Beejamrutha, Jeevamrutha, and Neemastra.',
      '4. Register on the National Natural Farming Portal (naturalfarming.dac.gov.in).',
      '5. Financial assistance for input drums and formulations credited to your bank account.'
    ],
    officialUrl: 'https://naturalfarming.dac.gov.in',
    status: 'Active',
    applicationDeadline: 'Seasonal village cluster mobilization rounds',
    relatedSchemeIds: ['pkvy', 'soil-health-card'],
    keywords: ['natural farming', 'jeevamrutha', 'beejamrutha', 'indigenous cow', 'zero budget', 'chemical free', 'nmnf', 'desi cow', 'neemastra', 'brahmastra']
  },
  {
    id: 'digital-agri-mission',
    name: 'Digital Agriculture Mission (AgriStack)',
    shortName: 'Digital Agri Mission',
    tamilName: 'டிஜிட்டல் வேளாண் இயக்கம் (அக்ரிஸ்டாக் - AgriStack)',
    hindiName: 'डिजिटल कृषि मिशन (एग्रीस्टैक)',
    category: 'Technology',
    icon: 'Cpu',
    financialBenefit: 'Unified Digital Farmer ID with instant paperless access to subsidized crop loans, automated PMFBY claim disbursals, and satellite advisories.',
    purpose: 'To build Digital Public Infrastructure for agriculture — including AgriStack (Farmer Registry, Crop Sown Registry, and Geo-referenced Village Maps) — enabling transparent and automated delivery of government agricultural services.',
    benefits: [
      'Universal "Kisan ID" (Farmer Registry ID) linked to Aadhaar and land records.',
      'Zero paperwork for accessing KCC crop loans and government welfare schemes.',
      'Automated satellite-based crop damage assessments for immediate PMFBY claim settlements.',
      'Hyper-localized AI weather advisories, pest alerts, and customized soil nutrient advice on mobile.'
    ],
    whoCanApply: [
      'All Indian agricultural landholders and verified tenant farmers.'
    ],
    eligibilityConditions: [
      'Active agricultural land record registered in state digital land portal.',
      'Mobile number linked to Aadhaar for biometric/OTP e-KYC authentication.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Document with Patta / Survey Number / Khata Number',
      'Mobile Number registered with Aadhaar'
    ],
    howToApplySteps: [
      '1. Download your State Agri-Stack / Digital Farmer Registry mobile app or visit agristack.gov.in.',
      '2. Complete Aadhaar e-KYC verification using OTP.',
      '3. System automatically fetches and maps your geo-referenced land parcels using revenue survey numbers.',
      '4. Generate and download your unique 12-digit Digital Farmer ID card.',
      '5. Use your Farmer ID for single-click access across all central and state agriculture welfare schemes.'
    ],
    officialUrl: 'https://agristack.gov.in',
    status: 'Active',
    applicationDeadline: 'Continuous national rollout across all states',
    relatedSchemeIds: ['pm-kisan', 'pmfby', 'kcc'],
    keywords: ['digital', 'agristack', 'farmer id', 'ai advisory', 'tech', 'satellite', 'registry', 'crop survey', 'kisan id', 'paperless']
  },
  {
    id: 'nbhm',
    name: 'National Beekeeping and Honey Mission (NBHM)',
    shortName: 'NBHM',
    tamilName: 'தேசிய தேனீ வளர்ப்பு மற்றும் தேன் இயக்கம் (NBHM)',
    hindiName: 'राष्ट्रीय मधुमक्खी पालन और शहद मिशन',
    category: 'Agro-Allied',
    icon: 'Hexagon',
    financialBenefit: 'Up to 80% subsidy for women SHGs; 50% subsidy for individual farmers on bee boxes, colonies, honey extraction equipment, and processing.',
    purpose: 'To promote holistic development of scientific beekeeping ("Sweet Revolution") to enhance honey production, create rural non-farm livelihood opportunities, and boost crop yields through natural bee pollination.',
    benefits: [
      '50% subsidy on purchase of 10 to 50 scientific bee colonies and ISI-standard bee boxes.',
      'Special 80% capital subsidy for eligible Women Self-Help Groups (SHGs).',
      'Increases crop yields (mustard, sunflower, apple, pulses, vegetables) by 20% to 35% through enhanced cross-pollination.',
      'Additional regular household income of ₹30,000 to ₹1,00,000 annually through pure raw honey and beeswax sales.'
    ],
    whoCanApply: [
      'Individual farmers, landless rural youth, Women SHGs, FPOs, and registered Beekeepers.'
    ],
    eligibilityConditions: [
      'Completion of basic 5 to 7 days training in scientific apiculture from KVK or National Bee Board (NBB).',
      'Availability of adequate flowering crops, mustard, sunflower, or orchard flora in vicinity.'
    ],
    requiredDocuments: [
      'Aadhaar Card and Bank Passbook',
      'Certificate of Apiculture Training from recognized KVK/NBB institute',
      'Land / Yard site clearance certificate',
      'Quotation from National Bee Board recognized bee breeder'
    ],
    howToApplySteps: [
      '1. Complete 5-day beekeeping training at your nearest Krishi Vigyan Kendra (KVK).',
      '2. Register on the Madhukranti Portal (madhukranti.in) and NBHM portal (nbhm.gov.in).',
      '3. Submit application for Bee Colonies & Hive Equipment subsidy.',
      '4. District Horticulture Officer verifies training certificate and inspects installation site.',
      '5. Receive subsidy directly via DBT after purchasing hives from certified NBB breeders.'
    ],
    officialUrl: 'https://nbhm.gov.in',
    status: 'Active',
    applicationDeadline: 'Open ongoing round the year on Madhukranti portal',
    relatedSchemeIds: ['midh', 'aif'],
    keywords: ['beekeeping', 'honey', 'bee box', 'apiculture', 'sweet revolution', 'pollinator', 'bee colony', 'nbhm', 'madhukranti', 'beeswax']
  },
  {
    id: 'drone-didi',
    name: 'Namo Drone Didi Scheme',
    shortName: 'Namo Drone Didi',
    tamilName: 'நமோ ட்ரோன் தீதி திட்டம் (மகளிர் சுயஉதவி குழுக்கள் ட்ரோன்)',
    hindiName: 'नमो ड्रोन दीदी योजना',
    category: 'Technology',
    icon: 'Radio',
    financialBenefit: '80% capital subsidy (up to ₹8,00,000) for agricultural spray drones + 15 days DGCA-certified drone pilot and co-pilot training.',
    purpose: 'To empower rural women Self-Help Groups (SHGs) by providing them with agricultural drones for offering spraying services of fertilizers and pesticides to local farmers, transforming them into modern tech entrepreneurs.',
    benefits: [
      '80% cost of the drone package (drone, 4 batteries, rapid generator charger, spraying nozzles) paid by Central Government (up to ₹8 lakh).',
      '15-day certified DGCA Remote Pilot License training provided free of cost.',
      'Sprays 1 acre of crop in only 7 to 10 minutes, using 90% less water.',
      'Generates steady rental income of ₹300–₹500 per acre for women SHGs (earning ₹1.5 to ₹3 lakh per annum).'
    ],
    whoCanApply: [
      'Eligible Women Self-Help Groups (SHGs) registered under Deendayal Antyodaya Yojana - DAY-NRLM.'
    ],
    eligibilityConditions: [
      'SHG must have a proven record of regular savings and internal lending for at least 2 years.',
      'Selected female candidate must be between 18 and 40 years of age with minimum 10th standard pass qualification.',
      'Pass medical fitness for DGCA Remote Pilot Certificate.'
    ],
    requiredDocuments: [
      'SHG Registration Certificate and DAY-NRLM ID',
      'Resolution passed by SHG selecting the woman candidate for drone pilot training',
      '10th Standard Mark Sheet / Educational Proof',
      'Aadhaar Card, Passport size photos, and Bank Passbook'
    ],
    howToApplySteps: [
      '1. SHG submits application to the Block Development Officer (BDO) or District Mission Management Unit (DMMU) under DAY-NRLM.',
      '2. Candidate selected and sent to DGCA-approved Drone Pilot Training Institute for 15 days.',
      '3. Empaneled drone manufacturer delivers agricultural drone package to the SHG.',
      '4. 80% subsidy released directly; balance 20% availed through low-interest loan under AIF/MUDRA.',
      '5. Drone Didi commences commercial spraying operations across village farms.'
    ],
    officialUrl: 'https://agricoop.gov.in',
    status: 'Active',
    applicationDeadline: 'District-wise phased allocation through DAY-NRLM',
    relatedSchemeIds: ['smam', 'digital-agri-mission'],
    keywords: ['drone', 'namo drone didi', 'women shg', 'spraying', 'nano urea', 'pesticide drone', 'dgca', 'tech', '8 lakh subsidy', 'women', 'shg']
  },
  {
    id: 'nfsm',
    name: 'National Food Security Mission (NFSM)',
    shortName: 'NFSM',
    tamilName: 'தேசிய உணவு பாதுகாப்பு இயக்கம் (NFSM - பயிர் உற்பத்தி)',
    hindiName: 'राष्ट्रीय खाद्य सुरक्षा मिशन',
    category: 'Income Support',
    icon: 'Wheat',
    financialBenefit: 'Up to 50% seed subsidy on high-yielding certified seeds + up to ₹9,000/ha cluster demonstration assistance for pulses and nutri-cereals.',
    purpose: 'To increase production of rice, wheat, pulses, coarse cereals, and nutri-cereals (millets) through area expansion, productivity enhancement, and soil fertility restoration.',
    benefits: [
      'Subsidized certified hybrid seeds for paddy, wheat, pulses (red gram, black gram, green gram), and millets.',
      'Free distribution of seed minikits directly to small and marginal farmers.',
      'Financial subsidy for micro-nutrients, gypsum, biofertilizers (Rhizobium, Azospirillum, PSB), and plant protection chemicals.',
      'Up to 50% subsidy on manual sprayers, water carrying pipes, and zero-till seed drills.'
    ],
    whoCanApply: [
      'All farmers cultivating food grains, pulses, or millets in notified NFSM districts.'
    ],
    eligibilityConditions: [
      'Operational agricultural land under cultivation during the corresponding cropping season.',
      'Must purchase certified seeds through Department of Agriculture / AECs.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Record (Patta / Chitta / Adangal)',
      'Seed Purchase Bill from Agricultural Extension Centre (AEC) or PACCS',
      'Bank Account Passbook'
    ],
    howToApplySteps: [
      '1. Visit your local Agricultural Extension Centre (AEC / Uzhavar Maiyam).',
      '2. Register using Aadhaar and show Land Patta/Adangal for the season.',
      '3. Select subsidized certified seed varieties (e.g. BPT 5204, CO 51 paddy, VBN pulses).',
      '4. Subsidy is deducted at source or credited directly via DBT to bank account.',
      '5. Attend field demonstrations conducted by Agricultural Officers.'
    ],
    officialUrl: 'https://nfsm.gov.in',
    status: 'Active',
    applicationDeadline: 'Kharif: May–July | Rabi: October–December',
    relatedSchemeIds: ['pm-kisan', 'soil-health-card'],
    keywords: ['rice', 'paddy', 'wheat', 'pulses', 'millet', 'grain', 'certified seeds', 'hybrid seeds', 'nfsm', 'food security', 'gypsum', 'rhizobium']
  },
  {
    id: 'nbm',
    name: 'National Bamboo Mission (NBM)',
    shortName: 'NBM',
    tamilName: 'தேசிய மூங்கில் இயக்கம் (National Bamboo Mission)',
    hindiName: 'राष्ट्रीय बांस मिशन',
    category: 'Horticulture',
    icon: 'Trees',
    financialBenefit: '50% financial subsidy up to ₹1,20,000 per hectare for bamboo plantation, drip irrigation, tissue culture saplings, and maintenance for 3 years.',
    purpose: 'To promote the cultivation of high-yield commercial bamboo species on non-forest private agricultural lands, field bunds, and wastelands to supplement farmer incomes and supply raw material for industries.',
    benefits: [
      '50% subsidy for planting commercial bamboo species (Bambusa balcooa, Bambusa tulda, Dendrocalamus strictus).',
      'Subsidized micro-irrigation and fertigation installation specifically for bamboo plantations.',
      'Long-term sustainable annual income from year 4 onwards for up to 40 years without replanting.',
      'Excellent for soil conservation, erosion control, and high carbon sequestration.'
    ],
    whoCanApply: [
      'Individual farmers, farmer groups, cooperatives, and private landowners with vacant/degraded agricultural land.'
    ],
    eligibilityConditions: [
      'Ownership of private cultivable or degraded non-forest land.',
      'Irrigation facility available for initial 2 years of sapling establishment.',
      'Approval of plantation design from District Forest / Agriculture Officer.'
    ],
    requiredDocuments: [
      'Land Record (Patta / Registered Sale Deed / Khata)',
      'Aadhaar Card and Bank Passbook',
      'Soil and water availability report',
      'Quotation for certified tissue culture bamboo plants from accredited nursery'
    ],
    howToApplySteps: [
      '1. Log on to the National Bamboo Mission portal (nbm.nic.in) or visit District Horticulture / Forest Office.',
      '2. Submit plantation proposal indicating bamboo species and acreage.',
      '3. Technical inspection of field and water source conducted by department officers.',
      '4. Purchase certified tissue culture bamboo plantlets from accredited nurseries.',
      '5. Subsidy released in 3 installments based on plant survival rate.'
    ],
    officialUrl: 'https://nbm.nic.in',
    status: 'Active',
    applicationDeadline: 'Seasonal planting windows (June to October)',
    relatedSchemeIds: ['midh', 'pdmc'],
    keywords: ['bamboo', 'agroforestry', 'plantation', 'wood', 'biomass', 'timber', 'green gold', 'nbm', 'bambusa', 'carbon credit']
  },
  {
    id: 'nmeo',
    name: 'National Mission on Edible Oils (NMEO-OP & Oilseeds)',
    shortName: 'NMEO',
    tamilName: 'தேசிய சமையல் எண்ணெய் இயக்கம் (எண்ணெய் பனை & எண்ணெய் வித்துக்கள்)',
    hindiName: 'राष्ट्रीय खाद्य तेल मिशन (ऑयल पाम एवं तिलहन)',
    category: 'Price Support',
    icon: 'Droplet',
    financialBenefit: '₹29,000/ha for Oil Palm planting material + ₹50,000/ha maintenance assistance for 4 years + guaranteed Viability Price mechanism.',
    purpose: 'To achieve self-reliance (Atmanirbhar) in edible oils by substantially expanding area under Oil Palm and high-yielding oilseeds (Mustard, Groundnut, Soybean, Sunflower), backed by guaranteed price protection.',
    benefits: [
      'Substantial subsidy of ₹29,000 per hectare for planting material and up to ₹50,000/ha for 4-year gestation maintenance.',
      'Government Viability Price formula guarantees fair price for Fresh Fruit Bunches (FFB) even during global crude palm oil crashes.',
      '50% subsidy for oilseed seed mini-kits and specialized harvesting equipment.',
      'Assured buyback agreements with licensed oil processing mills.'
    ],
    whoCanApply: [
      'Farmers possessing land in notified suitable districts with perennial irrigation facilities.'
    ],
    eligibilityConditions: [
      'Minimum contiguous land of 0.5 acre with assured perennial irrigation (borewell/canal).',
      'Installation of Drip Irrigation system is mandatory for oil palm cultivation.',
      'Tie-up agreement with the factory factory allocated to the zone.'
    ],
    requiredDocuments: [
      'Land Patta, Chitta, and FMB sketch',
      'Water source test certificate',
      'Aadhaar Card and Bank Passbook',
      'Agreement form with processing factory'
    ],
    howToApplySteps: [
      '1. Register on the State Horticulture Department Oil Palm Portal or nmeo.gov.in.',
      '2. Designated processing company and Horticultural Officer inspect field water yield.',
      '3. High-quality imported hybrid oil palm saplings supplied at subsidized rate.',
      '4. Mandatory drip irrigation installed under PDMC scheme.',
      '5. 4-year maintenance subsidy credited directly to farmer bank account.'
    ],
    officialUrl: 'https://nmeo.gov.in',
    status: 'Active',
    applicationDeadline: 'Continuous open registration in notified districts',
    relatedSchemeIds: ['pdmc', 'pm-aasha', 'midh'],
    keywords: ['edible oil', 'oil palm', 'mustard', 'groundnut', 'soybean', 'sunflower', 'oilseeds', 'viability price', 'nmeo', 'cooking oil', 'ffb']
  }
];

// Helper to filter schemes by category or natural language query
export function searchSchemes(query: string, categoryFilter: string = 'All'): Scheme[] {
  let results = governmentSchemesData;

  if (categoryFilter !== 'All') {
    results = results.filter((s) => s.category === categoryFilter);
  }

  if (!query || query.trim() === '') {
    return results;
  }

  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  return results
    .map((scheme) => {
      let score = 0;

      // Exact phrase match
      if (
        scheme.name.toLowerCase().includes(q) ||
        scheme.tamilName.toLowerCase().includes(q) ||
        scheme.shortName.toLowerCase().includes(q)
      ) {
        score += 50;
      }

      // Keyword matches
      for (const token of tokens) {
        if (scheme.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
          score += 15;
        }
        if (scheme.purpose.toLowerCase().includes(token)) {
          score += 5;
        }
        if (scheme.financialBenefit.toLowerCase().includes(token)) {
          score += 5;
        }
        if (scheme.whoCanApply.some((w) => w.toLowerCase().includes(token))) {
          score += 8;
        }
      }

      return { scheme, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.scheme);
}

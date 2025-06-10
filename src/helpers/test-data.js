const sampleAutoParts = [
  {
    name: "Brake Pad Set - Front",
    description: "High-performance ceramic front brake pad set for sedans.",
    images: ["images/brake_pad_front.jpg"],
    uniqueCode: "BP-F001",
    price: 59.99,
    quantityRemaining: 50,
    quantitySold: 120,
    partNumber: "BPFR-789",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["brakes", "front", "sedan"]
  },
  {
    name: "Oil Filter - V6 Engine",
    description: "Premium oil filter compatible with most V6 engines.",
    images: ["images/oil_filter.jpg"],
    uniqueCode: "OF-V6002",
    price: 12.49,
    quantityRemaining: 200,
    quantitySold: 300,
    partNumber: "OFV6-456",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["filter", "oil", "engine"]
  },
  {
    name: "Air Filter - Cabin",
    description: "HEPA cabin air filter for clean interior airflow.",
    images: ["images/cabin_air_filter.jpg"],
    uniqueCode: "CAF-003",
    price: 18.75,
    quantityRemaining: 100,
    quantitySold: 80,
    partNumber: "CAF-901",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["filter", "cabin", "air"]
  },
  {
    name: "Spark Plug Set (4 pcs)",
    description: "Platinum spark plugs for optimal engine ignition.",
    images: ["images/spark_plugs.jpg"],
    uniqueCode: "SP-004",
    price: 29.99,
    quantityRemaining: 75,
    quantitySold: 140,
    partNumber: "SPK-444",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["ignition", "engine", "spark plug"]
  },
  {
    name: "Timing Belt Kit",
    description: "Complete timing belt kit including tensioners and pulleys.",
    images: ["images/timing_belt_kit.jpg"],
    uniqueCode: "TBK-005",
    price: 199.00,
    quantityRemaining: 20,
    quantitySold: 10,
    partNumber: "TBK-320",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["belt", "timing", "engine"]
  },
  {
    name: "Radiator - Aluminum Core",
    description: "Lightweight aluminum radiator for efficient cooling.",
    images: ["images/radiator.jpg"],
    uniqueCode: "RAD-006",
    price: 120.00,
    quantityRemaining: 15,
    quantitySold: 5,
    partNumber: "RAD-222",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["cooling", "radiator", "engine"]
  },
  {
    name: "Fuel Pump Assembly",
    description: "OEM replacement fuel pump with strainer and sending unit.",
    images: ["images/fuel_pump.jpg"],
    uniqueCode: "FP-007",
    price: 149.95,
    quantityRemaining: 22,
    quantitySold: 17,
    partNumber: "FPUMP-339",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["fuel", "pump", "assembly"]
  },
  {
    name: "Shock Absorber - Rear",
    description: "Gas-charged rear shock absorbers for improved ride comfort.",
    images: ["images/shock_absorber_rear.jpg"],
    uniqueCode: "SA-R008",
    price: 85.00,
    quantityRemaining: 30,
    quantitySold: 65,
    partNumber: "SHKR-554",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["suspension", "rear", "shock"]
  },
  {
    name: "Alternator 12V 120A",
    description: "High-output alternator for various compact vehicles.",
    images: ["images/alternator.jpg"],
    uniqueCode: "ALT-009",
    price: 189.99,
    quantityRemaining: 12,
    quantitySold: 25,
    partNumber: "ALT12V-321",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["electrical", "alternator", "charging"]
  },
  {
    name: "Headlight Assembly - Right",
    description: "Right-side headlight assembly with clear lens and halogen bulb.",
    images: ["images/headlight_right.jpg"],
    uniqueCode: "HL-R010",
    price: 95.75,
    quantityRemaining: 40,
    quantitySold: 90,
    partNumber: "HLR-888",
    status: "active",
    // sku: new mongoose.Types.ObjectId("661f1f9e9c5ae3e84fe0a999"),
    tags: ["lighting", "headlight", "right"]
  }
];

module.exports = {
  sampleAutoParts
}
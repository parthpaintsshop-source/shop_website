export const STORE_INFO = {
  name: "Parth Paints",
  tagline: "Authorized Nerolac Dealer",
  description: "Your trusted destination for premium Nerolac paints and expert color consultation.",
  phone: "+91 98XXX XXXXX", // Placeholder
  whatsapp: "+919800000000", // Placeholder
  email: "hello@parthpaints.com", // Placeholder
  address: {
    line1: "Shop No. XX, Main Market Road",
    line2: "City Name, State — PIN Code",
    mapUrl: "https://maps.google.com", // Placeholder
  },
  hours: {
    weekdays: "9:00 AM — 8:00 PM",
    sunday: "10:00 AM — 6:00 PM",
  },
} as const;

export const NAV_LINKS = [
  { label: "Explore Colors", href: "#room-explorer" },
  { label: "Products", href: "#products" },
  { label: "Inspiration", href: "#gallery" },
  { label: "Why Us", href: "#why-us" },
  { label: "Visit Store", href: "#contact" },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    id: "interior",
    title: "Interior Paints",
    description: "Transform your living spaces with rich, lasting finishes that bring warmth to every room.",
    image: "/images/placeholder-interior.jpg",
    colors: ["#FAF6F1", "#E8DDD3", "#D4C5B5", "#C67B5C", "#87A878"],
  },
  {
    id: "exterior",
    title: "Exterior Paints",
    description: "Weather-resistant formulations that protect and beautify your home's exterior for years.",
    image: "/images/placeholder-exterior.jpg",
    colors: ["#F5F0E8", "#D9CFC3", "#B8AFA6", "#722F37", "#4A4A4A"],
  },
  {
    id: "waterproofing",
    title: "Waterproofing",
    description: "Advanced waterproofing solutions that shield your walls from moisture and dampness.",
    image: "/images/placeholder-waterproof.jpg",
    colors: ["#87A878", "#6B8E5A", "#4A7340", "#3A5C32", "#2C4525"],
  },
  {
    id: "wood-metal",
    title: "Wood & Metal",
    description: "Specialized finishes for wood and metal surfaces — from elegant enamels to protective coats.",
    image: "/images/placeholder-wood.jpg",
    colors: ["#C67B5C", "#A86544", "#8B5038", "#6E3B2C", "#512820"],
  },
] as const;

export const ROOM_COLORS = [
  { name: "Warm Ivory", hex: "#F5EBDC", family: "Neutrals" },
  { name: "Antique White", hex: "#FAEBD7", family: "Neutrals" },
  { name: "Soft Linen", hex: "#EDE4D4", family: "Neutrals" },
  { name: "Morning Mist", hex: "#E8E4DF", family: "Neutrals" },
  { name: "Sage Garden", hex: "#87A878", family: "Greens" },
  { name: "Olive Whisper", hex: "#A3B899", family: "Greens" },
  { name: "Forest Calm", hex: "#6B8E5A", family: "Greens" },
  { name: "Eucalyptus", hex: "#7DAEA3", family: "Greens" },
  { name: "Terracotta Dream", hex: "#C67B5C", family: "Warm" },
  { name: "Sunset Clay", hex: "#D4956B", family: "Warm" },
  { name: "Desert Rose", hex: "#C4826D", family: "Warm" },
  { name: "Amber Glow", hex: "#D4A574", family: "Warm" },
  { name: "Deep Burgundy", hex: "#722F37", family: "Bold" },
  { name: "Midnight Navy", hex: "#2C3E50", family: "Bold" },
  { name: "Charcoal Slate", hex: "#4A4A4A", family: "Bold" },
  { name: "Smoky Plum", hex: "#614051", family: "Bold" },
] as const;

export const WHY_US_POINTS = [
  {
    number: "01",
    title: "Authorized Nerolac Dealer",
    description: "Genuine products, full warranty, and manufacturer-backed quality assurance on every purchase.",
  },
  {
    number: "02",
    title: "Expert Color Consultation",
    description: "Our trained color consultants help you find the perfect palette for your space — free of charge.",
  },
  {
    number: "03",
    title: "Computerized Tinting",
    description: "Precision color mixing with computerized tinting machines for exact shade matching, every time.",
  },
  {
    number: "04",
    title: "Complete Range",
    description: "From premium interiors to waterproofing — access the full Nerolac product range under one roof.",
  },
] as const;

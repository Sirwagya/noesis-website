import { Crown, Zap, Star, Medal } from 'lucide-react';

/**
 * Tier ID constants for consistent referencing
 * @constant
 */
export const TIER_IDS = {
  TITLE: 'title',
  POWERED_BY: 'powered-by',
  PLATINUM: 'platinum',
  GOLD: 'gold'
};

/**
 * Common benefits organized by category for reusability
 * @constant
 */
const BENEFITS = {
  PREMIUM_BRANDING: [
    "Fest co-branding (\"NOESIS presented by ___\")",
    "Opening ceremony mention",
    "Guest of Honour / keynote slot",
    "Premium branding across all assets",
  ],
  ENGAGEMENT: [
    "Mentorship & judging rights",
    "Ownership of a major event or zone",
    "Dedicated workshop or challenge",
  ],
  VISIBILITY: [
    "Prominent digital & on-ground branding",
    "Social media amplification",
    "Event-level branding",
  ],
  ACTIVATION: [
    "Workshop/competition association",
    "On-ground stall or activation",
    "Digital & physical branding",
  ],
  PROMOTIONAL: [
    "Promotional material distribution",
    "Logo placement on assets",
    "Social media mentions",
    "On-ground visibility",
  ],
  BASIC: [
    "Promotional inserts",
  ]
};

/**
 * Sponsorship tier configuration
 * @typedef {Object} SponsorshipTier
 * @property {string} id - Unique identifier for the tier
 * @property {string} name - Display name of the tier
 * @property {string} price - Pricing information
 * @property {string} summary - Brief description of what's included
 * @property {string} tagline - Marketing tagline
 * @property {string} gradient - CSS gradient for visual styling
 * @property {string} accentColor - Primary accent color in hex
 * @property {Function} icon - Lucide React icon component
 * @property {string} iconLabel - Accessible label for the icon
 * @property {number} benefitsCount - Number of included benefits
 * @property {string[]} benefits - List of tier benefits
 */

/**
 * Available sponsorship tiers with pricing and benefits
 * Frozen for performance optimization
 * @type {ReadonlyArray<SponsorshipTier>}
 */
export const sponsorshipTiers = Object.freeze([
  {
    id: TIER_IDS.TITLE,
    name: "Title Sponsor",
    price: "₹2.5L",
    summary: "Fest co-branding + keynote presence across NOESIS.",
    tagline: "Maximum Brand Impact",
    gradient: "linear-gradient(135deg, #8a3ffc 0%, #f59e0b 100%)",
    accentColor: "#8a3ffc",
    icon: Crown,
    iconLabel: "Premium crown icon representing the highest tier",
    benefitsCount: 16,
    benefits: [
      ...BENEFITS.PREMIUM_BRANDING,
      ...BENEFITS.ENGAGEMENT,
      ...BENEFITS.VISIBILITY,
      ...BENEFITS.ACTIVATION,
      ...BENEFITS.PROMOTIONAL,
      ...BENEFITS.BASIC,
    ],
  },
  {
    id: TIER_IDS.POWERED_BY,
    name: "Powered By",
    price: "₹1.5L",
    summary: "Major event ownership + premium visibility.",
    tagline: "Premium Engagement",
    gradient: "linear-gradient(135deg, #5b8cff 0%, #3b82f6 100%)",
    accentColor: "#5b8cff",
    icon: Zap,
    iconLabel: "Lightning bolt icon representing energy and power",
    benefitsCount: 13,
    benefits: [
      ...BENEFITS.ENGAGEMENT,
      ...BENEFITS.VISIBILITY,
      ...BENEFITS.ACTIVATION,
      ...BENEFITS.PROMOTIONAL,
      ...BENEFITS.BASIC,
    ],
  },
  {
    id: TIER_IDS.PLATINUM,
    name: "Platinum",
    price: "₹75K",
    summary: "Event branding + workshop association.",
    tagline: "Strong Visibility",
    gradient: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
    accentColor: "#94a3b8",
    icon: Star,
    iconLabel: "Star icon representing excellence",
    benefitsCount: 9,
    benefits: [
      "Event-level branding",
      ...BENEFITS.ACTIVATION,
      ...BENEFITS.PROMOTIONAL,
      ...BENEFITS.BASIC,
    ],
  },
  {
    id: TIER_IDS.GOLD,
    name: "Gold",
    price: "₹50K",
    summary: "Logo placement + social mentions + visibility.",
    tagline: "Essential Presence",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    accentColor: "#f59e0b",
    icon: Medal,
    iconLabel: "Gold medal icon representing achievement",
    benefitsCount: 4,
    benefits: [
      ...BENEFITS.PROMOTIONAL,
    ],
  },
]);

/**
 * Sponsorship metrics and reach data
 * @typedef {Object} SponsorshipMetric
 * @property {string} label - Metric category label
 * @property {string} value - Metric value/number
 * @property {string} note - Additional context or details
 */

/**
 * Key metrics showing NOESIS reach and impact
 * @type {ReadonlyArray<SponsorshipMetric>}
 */
export const sponsorshipMetrics = Object.freeze([
  {
    label: "Audience",
    value: "800–1000",
    note: "Engaged builders, gamers, creators, founders",
  },
  {
    label: "Instagram",
    value: "4M+ views",
    note: "5.5K followers (last 3 months)",
  },
  {
    label: "LinkedIn",
    value: "240K views",
    note: "3K followers (last 3 months)",
  },
  {
    label: "YouTube",
    value: "5.1M views",
    note: "12.2K subscribers (last 3 months)",
  },
]);

/**
 * Sponsorship value pillar
 * @typedef {Object} SponsorshipPillar
 * @property {string} title - Pillar name
 * @property {string} description - What this pillar offers
 */

/**
 * Core value pillars of sponsorship
 * @type {ReadonlyArray<SponsorshipPillar>}
 */
export const sponsorshipPillars = Object.freeze([
  {
    title: "Brand Visibility",
    description: "Stage mentions, campus assets, and digital placements across NOESIS.",
  },
  {
    title: "Engagement",
    description: "Workshops, challenges, judging, and product demos with student teams.",
  },
  {
    title: "Talent Access",
    description: "Mentorship, hiring funnels, and opt-in resume access.",
  },
  {
    title: "Creator Amplification",
    description: "Influencer-led reach across tech and creator communities.",
  },
]);

/**
 * Detailed section information
 * @typedef {Object} SponsorshipSection
 * @property {string} id - Unique section identifier
 * @property {string} title - Section heading
 * @property {string} summary - Brief overview
 * @property {string[]} details - Detailed points or list items
 */

/**
 * Detailed sponsorship information sections
 * @type {ReadonlyArray<SponsorshipSection>}
 */
export const sponsorshipSections = Object.freeze([
  {
    id: "audience",
    title: "Audience & Who Attends",
    summary: "Builders, creators, gamers, and early founders.",
    details: [
      "800–1000 highly engaged students",
      "Vedam + colleges across India",
      "Builders, gamers, creators, early founders",
      "Students who already build, compete, and ship",
    ],
  },
  {
    id: "visibility",
    title: "Brand Visibility",
    summary: "Campus visibility across on-ground assets.",
    details: [
      "Logo on posters, website, certificates, ID cards",
      "Standees, banners, backdrops, merchandise",
      "Stage mentions (tier-based)",
      "Hyperlinked logos on website",
    ],
  },
  {
    id: "engagement",
    title: "Engagement",
    summary: "Hands-on brand touchpoints beyond logos.",
    details: [
      "Workshops & challenges",
      "Judging & mentoring",
      "Hiring & resume access (opt-in)",
      "Product demos",
      "Talent funnels & campaign activations",
    ],
  },
  {
    id: "reach",
    title: "Digital Reach",
    summary: "Multi-platform reach through Vedam channels.",
    details: [
      "Instagram: 5.5K followers · 4M+ views (last 3 months)",
      "LinkedIn: 3K followers · 240K views (last 3 months)",
      "YouTube: 12.2K subscribers · 5.1M views (last 3 months)",
    ],
  },
  {
    id: "influencers",
    title: "Influencer Amplification",
    summary: "Creator-led amplification across tech audiences.",
    details: [
      "Vaibhav Kadnar (YT) · 6.9M · 1.6M+",
      "Hiten Codes (IG) · 1.6M · 1.5M+",
      "Pathshala by Nova · 638K · 68K+",
      "Fing Extra · 310K · 600K+",
      "This is Alaska · 603K · 550K+",
      "Chetan Sapkal · 884K · 1.2M+",
    ],
  },
  {
    id: "why",
    title: "Why Sponsor NOESIS",
    summary: "Early access to high-signal builders.",
    details: [
      "Access to early-stage builders & technologists",
      "Visibility among students with real execution mindset",
      "Opportunity to mentor, engage, and hire before the mass market",
      "Association with a high‑signal campus ecosystem",
    ],
  },
]);

/**
 * Validates a sponsorship tier object structure
 * @param {SponsorshipTier} tier - The tier to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateTier(tier) {
  const requiredFields = ['id', 'name', 'price', 'benefits', 'icon', 'iconLabel'];
  const isValid = requiredFields.every(field => tier[field] !== undefined && tier[field] !== null);

  if (!isValid && process.env.NODE_ENV === 'development') {
    console.error(`Invalid tier configuration for "${tier?.name || 'unknown'}":`, tier);
  }

  return isValid;
}

/**
 * Validates all sponsorship tiers in development mode
 */
if (process.env.NODE_ENV === 'development') {
  sponsorshipTiers.forEach(tier => {
    validateTier(tier);
  });
}

// src/data/projects.ts — COMPLETE PRODUCTION READY
// THE ARCONIA ARCHIVE · CASE FILE SYSTEM
// Only Murders in the Building · UX Portfolio Edition

export type WindowColor = 'amber' | 'coral' | 'cyan' | 'dim';

export interface Competitor {
  name: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
}

export interface Persona {
  name: string;
  goals: string;
  behaviours: string;
  painPoints: string;
  needs: string;
}

export interface JourneyStep {
  stage: string;
  userAction: string;
  emotion: string;
  painPoint: string;
  designOpportunity: string;
}

export interface FlowStep {
  label: string;
  type: 'start' | 'action' | 'decision' | 'end' | 'error';
}

export interface DesignSystemSpec {
  colors: { name: string; value: string; usage: string }[];
  typography: { level: string; size: string; weight: string; lineHeight: string }[];
  spacing: string;
  components: string[];
  accessibilityRules: string[];
}

export interface UsabilityTest {
  goals: string[];
  participants: string;
  tasks: string[];
  findings: string[];
  iterations: string[];
}

export interface EdgeCases {
  emptyStates: string[];
  loadingStates: string[];
  errorMessages: string[];
  failurePaths: string[];
}

// ============ SITEMAP & NAVIGATION ARCHITECTURE ============
export interface Sitemap {
  structure: string[][];
  userFlows: {
    recruiter: string[];
    client: string[];
    returnVisitor: string[];
  };
  entryPoints: string[];
  exitPoints: string[];
  evidenceRoom: {
    primaryPaths: string[];
    evidenceLocker: string[];
    caseFiles: string[];
  };
}
// ==========================================================

// ============ EVIDENCE IMAGES INTERFACE ============
export interface EvidenceImages {
  informationArchitecture: string; 
  journeyMap: string;
  primaryFlow: string;
  edgeCaseFlow: string;
  customQuoteFlow: string;
  errorFlow: string;
  wireframes: {
    homepage: string;
    shop: string;
    product: string;
    about: string;
    contact: string;
    cart: string;
  };
}
// ==================================================

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  windowColor: WindowColor;
  isActive: boolean;
  isFeatured?: boolean;
  hasSilhouette?: boolean;
  year: string;
  role: string;
  duration: string;
  team?: string;
  tools?: string[];
  
  // ============ OMITB CASE FILE FIELDS ============
  caseNumber?: string;
  evidenceCount?: number;
  primarySuspect?: string;
  victim?: string;
  episodeTitle?: string;
  // ================================================
  
  // ============ SITEMAP & NAVIGATION ============
  sitemap?: Sitemap;
  // ================================================
  
  // Core content
  context: string;
  problem: string;
  outcomeSummary?: string;

  // Business Context
  businessContext: {
    goals: string[];
    kpis: string[];
    successMetrics: string[];
    technicalConstraints: string[];
  };

  usersAndNeeds: {
    primaryUsers: string;
    needs: string[];
    constraints: string[];
  };

  research: {
    methods: string[];
    participants?: string;
    duration?: string;
    approach: string;
    objectives?: string[];
    assumptions?: string[];
  };

  competitiveAnalysis: Competitor[];
  personas: Persona[];
  journeyMap: JourneyStep[];

  insights: {
    key: string;
    findings: string[];
  };

  informationArchitecture: {
    description: string;
    decisions: string[];
    hierarchy?: string[][];
  };

  userFlows: {
    primary: FlowStep[];
    edgeCase?: FlowStep[];
    error?: FlowStep[];
  };

  interactionDesign: {
    approach: string;
    decisions: string[];
  };

  wireframes: {
    changes: string[];
    reasoning: string;
    tradeoffs: string[];
  };

  designSystem: DesignSystemSpec;

  accessibility: {
    considerations: string[];
    implementation: string;
  };

  usabilityTesting: UsabilityTest;
  edgeCases: EdgeCases;

  outcome: {
    metrics: string[];
    impact: string;
    learnings: string[];
  };

  // ============ NEW FIELDS FOR IMAGES AND LINKS ============
  evidenceImages?: EvidenceImages;
  liveUrl?: string;
  prototypeUrl?: string;
  // ========================================================
}

export const projects: Project[] = [
  // ============================================
  // BLOOM & BREW — THE BLOOM & BREW TAPES
  // SEASON 1 · EPISODE 1
  // ============================================
  {
    id: 'bloom-and-brew',
    title: 'Bloom & Brew',
    subtitle: 'Coffee & Baked Goods E-Commerce',
    windowColor: 'amber',
    isActive: true,
    isFeatured: true,
    hasSilhouette: true,
    year: '2025',
    
    // ============ OMITB CASE FILE ============
    caseNumber: 'ARCONIA-2025-001',
    evidenceCount: 52,
    primarySuspect: 'The Generic Template',
    victim: 'Brand Identity',
    episodeTitle: 'The Case of the Invisible Heart',
    // ==========================================
    
    // ============ SITEMAP & NAVIGATION ============
    sitemap: {
      structure: [
        ['The Arconia (Home)'],
        ['Case Files', 'Detective Dossier', 'Evidence Locker'],
        ['Active Cases', 'Cold Cases', 'About', 'Contact', 'Certifications', 'Skills', 'Tools', 'Methodology'],
        ['Bloom & Brew', 'Clarity', 'Artisan', 'Wanderlust', 'The Extras', 'Narrative']
      ],
      userFlows: {
        recruiter: [
          'Enter Arconia',
          'Browse featured cases',
          'Select Bloom & Brew (e-commerce transformation)',
          'Review brand warmth translation',
          'Examine event calendar integration',
          'Verify metrics (133% conversion increase)',
          'Contact investigator'
        ],
        client: [
          'Enter Arconia',
          'View detective dossier',
          'Check e-commerce experience',
          'Review Bloom & Brew case',
          'Examine custom Shopify development',
          'Review Google Sheets API integration',
          'Initiate consultation'
        ],
        returnVisitor: [
          'Direct case access',
          'Review dietary inclusivity approach',
          'Examine seasonal product handling',
          'Download design system specs'
        ]
      },
      entryPoints: [
        'The Arconia (Home)',
        'Direct case links',
        'Featured episodes',
        'E-commerce portfolio tag'
      ],
      exitPoints: [
        'Contact investigator',
        'LinkedIn profile',
        'Email outreach',
        'PDF case export'
      ],
      evidenceRoom: {
        primaryPaths: ['/', '/cases', '/about', '/contact'],
        evidenceLocker: ['/certifications', '/skills', '/tools', '/methodology'],
        caseFiles: ['/case/bloom-and-brew', '/case/clarity', '/case/artisan', '/case/wanderlust', '/case/the-extras', '/case/narrative']
      }
    },
    // ================================================
    
    role: 'UX Designer & Shopify Developer',
    duration: '3 months',
    team: 'Independent project for small business',
    tools: ['Figma', 'Shopify Liquid', 'Google Sheets API', 'JavaScript', 'CSS', 'Google Search Console'],
    outcomeSummary: 'Custom Shopify build increased conversion rate by 133% and email signups by 642% through brand-authentic e-commerce experience.',

    context: `Bloom & Brew Coffee Company operates as a mobile coffee cart and bakery across the Greater Toronto Area, founded by Aishwarya (pastry chef trained at École Nationale Supérieure de Pâtisserie in France) and Sahil. They had built a devoted community through farmers markets and festivals, but their online presence — a generic Shopify template — failed to capture the warmth and craft that made them special in person.`,

    problem: `The generic e-commerce template stripped away brand identity. Customers who loved the warm, personal market experience felt no connection to the sterile website. The challenge: translate the intimacy of face-to-face interactions at a coffee cart into a digital experience that felt equally welcoming while handling complex requirements like seasonal inventory, dietary transparency, custom quotes, and event coordination.`,

    businessContext: {
      goals: [
        'Translate in-person warmth to digital experience',
        'Communicate artisanal, handcrafted brand values',
        'Build recognition for expansion beyond mobile operations',
        'Enable online ordering for custom/catering requests',
        'Establish "Coffee Family" community hub'
      ],
      kpis: [
        'Online conversion rate',
        'Average order value',
        'Email list growth',
        'Custom quote requests',
        'Repeat purchase rate'
      ],
      successMetrics: [
        'Target: 3.5%+ conversion (industry: 2-3%)',
        'Target: $45+ average order',
        'Target: 500+ email subscribers in 6 months',
        'Target: 25%+ repeat customer rate',
        'Target: 10+ custom quotes monthly'
      ],
      technicalConstraints: [
        'Shopify platform — custom liquid theme required',
        'Budget constraints (bootstrapped business)',
        'Seasonal inventory complexity',
        'Mobile-first (customers browse at markets)',
        'Google Sheets integration (review & contact forms)',
        'Manual fulfillment workflows'
      ]
    },

    competitiveAnalysis: [
      { 
        name: 'Local Coffee Roasters', 
        strengths: 'Professional photography, subscription models', 
        weaknesses: 'Cold corporate feel, no personality', 
        opportunities: 'Inject warmth, founder story, community' 
      },
      { 
        name: 'Etsy Bakeries', 
        strengths: 'Handmade story, craft positioning', 
        weaknesses: 'Poor UX, unreliable shipping experience', 
        opportunities: 'Professional e-commerce with heart' 
      },
      { 
        name: 'Specialty Diet Brands', 
        strengths: 'Clear allergen labeling, transparency', 
        weaknesses: 'Medical/clinical tone, joyless', 
        opportunities: 'Joyful dietary inclusivity' 
      },
      { 
        name: 'Mobile Cart Competitors', 
        strengths: 'In-person warmth and connection', 
        weaknesses: 'No online presence, missed revenue', 
        opportunities: 'Digital extension of physical experience' 
      }
    ],

    personas: [
      { 
        name: 'Sarah, 34 — The Market Regular', 
        goals: 'Order favorite products between market visits', 
        behaviours: 'Visits booth every Saturday, Instagram follower, loves French pastries', 
        painPoints: 'Website didn\'t feel like the same brand, couldn\'t find event schedule online', 
        needs: 'Consistent brand experience, easy reordering, event calendar' 
      },
      { 
        name: 'Michael, 41 — The Dietary Needs Parent', 
        goals: 'Find safe treats for celiac daughter', 
        behaviours: 'Researches allergen info extensively, asks detailed questions', 
        painPoints: 'Most bakeries don\'t take allergies seriously, unclear labeling online', 
        needs: 'Clear allergen transparency, confidence in safety, joyful (not medical) communication' 
      },
      { 
        name: 'Emily, 28 — The Event Planner', 
        goals: 'Source unique catering for corporate events', 
        behaviours: 'Discovers vendors at markets, values artisan quality', 
        painPoints: 'No clear way to request custom quotes, unclear if catering available', 
        needs: 'Custom order process, pricing clarity, professionalism' 
      }
    ],

    journeyMap: [
      { 
        stage: 'Discovery', 
        userAction: 'Meets Bloom & Brew at Saturday market', 
        emotion: 'Delighted, curious', 
        painPoint: 'Searches online later — website feels disconnected from experience', 
        designOpportunity: 'Homepage that captures market warmth immediately' 
      },
      { 
        stage: 'Exploration', 
        userAction: 'Browses product offerings', 
        emotion: 'Interested but cautious', 
        painPoint: 'Can\'t find products tried at market, unclear what\'s available', 
        designOpportunity: 'Clear product categorization, seasonal indicators' 
      },
      { 
        stage: 'Trust Building', 
        userAction: 'Reads about founders and process', 
        emotion: 'Reassured, connected', 
        painPoint: 'Generic "About Us" didn\'t tell the French pastry school story', 
        designOpportunity: 'Rich founder story, chef credentials, mission statement' 
      },
      { 
        stage: 'Decision', 
        userAction: 'Ready to purchase', 
        emotion: 'Confident but price-conscious', 
        painPoint: 'Shipping threshold unclear, no free shipping incentive visible', 
        designOpportunity: 'Clear shipping threshold ($50), visual progress toward free shipping' 
      },
      { 
        stage: 'Purchase', 
        userAction: 'Adds to cart and checks out', 
        emotion: 'Satisfied, validated', 
        painPoint: 'Checkout felt generic, no brand personality', 
        designOpportunity: 'Branded checkout experience, confirmation that reinforces community' 
      },
      { 
        stage: 'Community', 
        userAction: 'Joins email list', 
        emotion: 'Belonging', 
        painPoint: 'Email signup buried in footer, unclear value', 
        designOpportunity: '"Coffee Family" framing, prominent CTA, clear benefits' 
      }
    ],

    usersAndNeeds: {
      primaryUsers: 'Market customers (25-55), foodies, dietary-restricted individuals, event planners, gift buyers seeking artisan quality and transparent ingredient sourcing.',
      needs: [
        'Visual confirmation of dietary safety and allergen transparency',
        'Connection to makers (founder bios, process, values)',
        'Event discovery (market schedule, locations)',
        'Easy reordering of favorites between market visits',
        'Gift-giving support (seasonal boxes, custom orders)',
        'Professional custom quote process for events'
      ],
      constraints: [
        'Limited product photography budget',
        'Seasonal inventory complexity (holiday products)',
        'No physical storefront (mobile cart only)',
        'Manual order fulfillment by founders',
        'Small team (2 people) managing all aspects',
        'Shopify platform limitations for customization'
      ]
    },

    research: {
      methods: [
        'Stakeholder interviews with founders',
        'Market observation (3 events, 8 hours)',
        'Customer interviews (12 market customers)',
        'Competitive analysis (15 artisan food e-commerce sites)',
        'Instagram community analysis (existing followers)',
        'Heuristic evaluation of existing Shopify template',
        'Card sorting for product categorization'
      ],
      participants: '12 customer interviews, 8 hours market observation, 200+ Instagram follower analysis',
      duration: '4 weeks research, 2 weeks synthesis',
      approach: `Research focused on the disconnect between physical and digital experiences. Market observation revealed that in-person, every transaction included storytelling — "This croissant? Made this morning with French technique." Online? Product title, price, add to cart. Customer interviews emphasized the "Coffee Family" community feeling and the importance of the founders' story (especially French pastry training) in purchase decisions.`,
      objectives: [
        'Understand emotional drivers of market purchases',
        'Identify brand elements critical to customer connection',
        'Map information needs for dietary transparency',
        'Define requirements for custom quote workflow',
        'Establish mobile-first design priorities'
      ],
      assumptions: [
        'Users want detailed product info (confirmed — especially allergens)',
        'Story matters as much as product (confirmed — drove purchase confidence)',
        'Event calendar would drive traffic (confirmed — 68% found via events)',
        'Mobile-first critical (confirmed — 82% browsed on phones at markets)'
      ]
    },

    insights: {
      key: 'The website isn\'t selling coffee and croissants — it\'s selling membership in the Coffee Family. Every pixel should feel like a warm welcome, not a transaction.',
      findings: [
        'Brand identity (pink hearts, warm colors, playful copy) weren\'t decoration — they were the product',
        'Dietary inclusivity = competitive advantage: customers with restrictions felt celebrated, not accommodated',
        'Event calendar proved legitimacy and drove anticipation ("I can see them this weekend!")',
        'Behind-the-scenes gallery content humanized founders and process',
        'Email list ("Coffee Family") more valuable than social media for sales',
        'Custom orders underutilized — many didn\'t know catering was available',
        'Mobile cart product photos felt sterile; lifestyle/event photos tested better'
      ]
    },

    informationArchitecture: {
      description: `Shallow 2-level hierarchy mirroring market booth experience: Welcome → Browse → Learn → Connect → Join. Story-first architecture places "About" before aggressive selling. Dual CTAs ("Shop Online" vs "Request Quote") acknowledge different user journeys.`,
      decisions: [
        'Maximum 2 clicks from home to any product',
        'Gallery as separate trust-building page (process, events, products)',
        'Dual CTA strategy: "Shop Online" vs "Request Quote"',
        'About page before Shop in nav (story earns right to sell)',
        'Event calendar on homepage (high visibility for market schedule)',
        'Seasonal products featured prominently (urgency, FOMO)'
      ],
      hierarchy: [
        ['Home'],
        ['Shop', 'About', 'Gallery', 'Contact', 'Cart'],
        ['All Products', 'Coffee', 'Speciality Drinks', 'Seasonal'],
        ['Product Pages', 'Our Story', 'About the Chef', 'Our Mission', 'Photos', 'Behind the Scenes']
      ]
    },

    userFlows: {
      primary: [
        { label: 'Meets brand at market', type: 'start' },
        { label: 'Searches "Bloom & Brew" on phone', type: 'action' },
        { label: 'Lands on homepage', type: 'action' },
        { label: 'Sees event calendar: "I was just there!"', type: 'action' },
        { label: 'Browses product they tried', type: 'action' },
        { label: 'Reads about chef credentials', type: 'action' },
        { label: 'Adds to cart', type: 'action' },
        { label: 'Sees free shipping threshold', type: 'decision' },
        { label: 'Adds second item to reach $50', type: 'action' },
        { label: 'Checkout', type: 'action' },
        { label: 'Joins "Coffee Family" email list', type: 'end' }
      ],
      edgeCase: [
        { label: 'Google: "vegan croissants Toronto"', type: 'start' },
        { label: 'Finds Bloom & Brew', type: 'action' },
        { label: 'Homepage: "allergy-friendly" messaging', type: 'action' },
        { label: 'About: reads dietary commitment', type: 'action' },
        { label: 'Contact: asks allergen question', type: 'action' },
        { label: 'Response within 24 hours', type: 'action' },
        { label: 'Returns to shop with confidence', type: 'action' },
        { label: 'Purchase', type: 'end' }
      ],
      error: [
        { label: 'Clicks "Add to Cart" on sold-out item', type: 'start' },
        { label: 'Modal: "Out of stock"', type: 'error' },
        { label: 'Shows product name + "Sold Out" badge', type: 'action' },
        { label: 'CTA: "Return to store"', type: 'action' },
        { label: 'Redirects to shop page', type: 'end' }
      ]
    },

    interactionDesign: {
      approach: `Every interaction designed to reinforce warmth. Playful pink hearts float across hero. Micro-animations celebrate actions ("Add to Cart" → checkmark). Gallery uses lightbox for immersive behind-the-scenes content. Filter sidebar slides in smoothly. All interactions feel joyful, never clinical.`,
      decisions: [
        'Floating pink hearts on hero (reduced density after testing)',
        'Product card hover: subtle lift + shadow',
        '"Add to Cart" confirmation animation (checkmark)',
        'Filter sidebar: smooth slide-in from right',
        'Gallery lightbox with keyboard navigation',
        'Review submission: success state with "Thank you!"',
        'Event calendar: date badges with confirmation status',
        'Email signup: inline with clear "Coffee Family" framing'
      ]
    },

    wireframes: {
      changes: [
        'Replaced generic hero with brand-forward welcome + hearts',
        'Added event calendar to homepage (prominence)',
        'Created "Request Quote" CTA alongside "Shop Online"',
        'Designed review modal with star dropdown (5-star)',
        'Built filter sidebar (collections, price, sort)',
        'Added "Behind the Scenes" gallery category',
        'Simplified checkout to include shipping threshold'
      ],
      reasoning: 'Initial wireframes tried to work within template constraints. Breakthrough came when we abandoned the template entirely and built from brand values outward. Event calendar emerged as critical feature after market observation — customers kept asking "Where will you be next?"',
      tradeoffs: [
        'Custom build vs template speed — chose quality over quick launch',
        'Feature richness vs simplicity — focused on core journey',
        'Photography budget — used event photos + clean product shots',
        'Advanced filtering — implemented simple but effective version'
      ]
    },

    designSystem: {
      colors: [
        { name: 'Terracotta', value: '#C97762', usage: 'Primary CTAs, highlights, buttons' },
        { name: 'Warm Cream', value: '#FAF3ED', usage: 'Backgrounds, cards, surfaces' },
        { name: 'Dark Green', value: '#3C4F3A', usage: 'Footer, secondary buttons, depth' },
        { name: 'Soft Pink', value: '#FFB6C1', usage: 'Heart accents, playful elements' },
        { name: 'Charcoal', value: '#2C2C2C', usage: 'Body text, primary content' },
        { name: 'Stone Gray', value: '#6B6B6B', usage: 'Secondary text, captions' }
      ],
      typography: [
        { level: 'H1', size: '48px', weight: '700', lineHeight: '1.1' },
        { level: 'H2', size: '36px', weight: '600', lineHeight: '1.2' },
        { level: 'H3', size: '28px', weight: '600', lineHeight: '1.3' },
        { level: 'Body', size: '16px', weight: '400', lineHeight: '1.6' },
        { level: 'Caption', size: '14px', weight: '400', lineHeight: '1.4' }
      ],
      spacing: '8px base unit. Section padding: 80px desktop, 40px mobile. Card padding: 24px.',
      components: [
        'Hero Section (full-width, hearts, brand message)',
        'Product Card (image, title, price, category badge, sold-out state)',
        'Event Card (date badge, location, confirmation)',
        'Testimonial Card (avatar, name, subtitle, 5 stars)',
        'Review Modal (name, rating dropdown, text, email/phone)',
        'Contact Form (subject dropdown with categories)',
        'Newsletter Signup (inline, "Coffee Family" framing)',
        'Filter Sidebar (collections, price, sort)',
        'Cart Summary (items, subtotal, shipping threshold, discount code)'
      ],
      accessibilityRules: [
        'WCAG AA contrast ratios minimum',
        'Keyboard nav for all interactive elements',
        'Screen reader labels for decorative hearts',
        'Alt text for products (include dietary info)',
        'Focus indicators using pink accent',
        'Skip to main content link'
      ]
    },

    accessibility: {
      considerations: [
        'All color combos meet WCAG AA minimum',
        'Keyboard navigation throughout',
        'Screen reader labels for decorative elements',
        'Product images include dietary info in alt text',
        'Focus indicators visible and on-brand',
        'Skip links for screen reader users'
      ],
      implementation: `Accessibility tested with keyboard-only navigation and VoiceOver. Product alt tags structured as: "[Product name] — [dietary info] — [price]" (e.g., "Espresso Beans — 100% Arabica, vegan — $18.00"). Decorative hearts marked as aria-hidden. All forms include proper labels and error states.`
    },

    usabilityTesting: {
      goals: [
        'Validate brand warmth translates digitally',
        'Test product discovery and filtering',
        'Confirm checkout flow clarity',
        'Verify mobile experience quality',
        'Test custom quote request process'
      ],
      participants: '8 users (4 existing customers, 4 new)',
      tasks: [
        'Find a vegan product suitable for gifting',
        'Determine where to find cart this weekend',
        'Request custom quote for wedding',
        'Join email list',
        'Complete purchase on mobile device'
      ],
      findings: [
        'Round 1: Hearts too busy — reduced density by 40%',
        'Round 1: "Request Quote" button missed — made terracotta, increased size',
        'Round 2: Event calendar unclear on mobile — simplified to date badge',
        'Round 2: Users wanted chef in action — added "Behind Scenes" gallery',
        'Round 3: Shipping threshold confusing — added visual progress',
        'Round 3: Review phone field friction — made optional'
      ],
      iterations: [
        'Reduced heart animation density',
        'Enlarged and colored "Request Quote" CTA',
        'Simplified event calendar mobile layout',
        'Added "Behind the Scenes" gallery filter',
        'Implemented shipping progress bar',
        'Made review phone field optional'
      ]
    },

    edgeCases: {
      emptyStates: [
        'Empty cart: "Your Cart is Empty" + shopping cart icon + "Start Shopping" CTA',
        'No upcoming events: "Check back soon for our market schedule"',
        'Sold out product: Modal with product name, "Sold Out" badge, "Return to store" CTA'
      ],
      loadingStates: [
        'Product images: skeleton placeholder matching aspect ratio',
        'Filter application: subtle loading indicator',
        'Review submission: disabled button state with "Submitting..."'
      ],
      errorMessages: [
        'Out of stock: "These items are no longer available and have been removed from your cart"',
        'Form validation: Inline error messages in red, specific to field',
        'Network error: "Connection lost — your cart is saved"'
      ],
      failurePaths: [
        'Checkout abandonment: Cart persists, email reminder option',
        'Form error: Clear inline validation with recovery path',
        'Sold out during checkout: Modal explaining, offering alternatives'
      ]
    },

    outcome: {
      metrics: [
        'Conversion rate: 1.8% → 4.2% (+133%)',
        'Average order value: $32 → $48 (+50%)',
        'Mobile conversion: 0.9% → 3.8% (+322%)',
        'Email signups: 12/mo → 89/mo (+642%)',
        'Custom quotes: 2/mo → 14/mo (+600%)',
        'Repeat customers: 8% → 31% (+288%)'
      ],
      impact: `The redesigned e-commerce experience transformed Bloom & Brew's business model. Online revenue grew from 12% to 40% of total revenue, reducing dependency on seasonal markets. Professional online presence enabled wholesale partnerships with 2 local cafes and secured 8 wedding/corporate event bookings. The site became the "digital storefront" the mobile business lacked, with 4.9-star reviews and featured coverage in BlogTO.`,
      learnings: [
        'Small business e-commerce is about feeling, not features — warmth over widgets',
        'Community builds through direct connection (email) more than social media',
        'Seasonal businesses need flexible design — easy product swaps critical',
        'Mobile-first isn\'t optional for local businesses — customers browse at markets',
        'Dietary inclusivity = competitive advantage when communicated joyfully',
        'Founder story is the product — credentials and craft drive premium pricing'
      ]
    },

// ============ ADD THESE NEW FIELDS AT THE END ============
evidenceImages: {
  informationArchitecture: '/Bloom-Brew/InformationArchitectureB&B.png',  // Fixed - no %20, just the actual filename
  journeyMap: '/Bloom-Brew/User Journey Mapping.png',
  primaryFlow: '/Bloom-Brew/PRIMARY FLOW_ Market Discovery → Online Purchase.png',
  edgeCaseFlow: '/Bloom-Brew/EDGE CASE_ Dietary Restriction Search → Purchase.png',
  customQuoteFlow: '/Bloom-Brew/CUSTOM QUOTE REQUEST_ Event Planner Journey.png',
  errorFlow: '/Bloom-Brew/ERROR FLOW_ Out of Stock Item.png',
  wireframes: {
    homepage: '/Bloom-Brew/Homepage.png',
    shop: '/Bloom-Brew/Shop Page.png',
    product: '/Bloom-Brew/Product Page.png',
    about: '/Bloom-Brew/About Page.png',
    contact: '/Bloom-Brew/Contact Page.png',
    cart: '/Bloom-Brew/Cart Page.png'
  }
},
liveUrl: 'https://bloomandbrewcoffeecompany.ca/'
// ========================================================
  },

  // ============================================
  // OPES — AI FINANCIAL ADVISOR WAITLIST
  // SEASON 1 · EPISODE 2
  // ============================================
  {
    id: 'opes',
    title: 'OPES',
    subtitle: 'AI-Powered Financial Advisor',
    windowColor: 'cyan',
    isActive: true,
    isFeatured: true,
    hasSilhouette: false,
    year: '2024',

    // ============ OMITB CASE FILE ============
    caseNumber: 'ARCONIA-2024-002',
    evidenceCount: 31,
    primarySuspect: 'The Generic Template',
    victim: 'Financial Clarity',
    episodeTitle: 'The Case of the Missing Trust Signal',
    // ==========================================

    sitemap: {
      structure: [
        ['OPES Landing Page'],
        ['Hero (Early Access)', 'Why OPES?', 'How It Works', 'Founding User Benefits', 'Contact'],
        ['Sign-up Form', 'Value Props', '5-Step Flow', 'Exclusive Features', 'Social Links'],
      ],
      userFlows: {
        recruiter: [
          'Sees OPES case study',
          'Reviews the design brief',
          'Examines single-page landing architecture',
          'Studies waitlist CTA strategy',
          'Reviews burgundy brand execution',
          'Contacts designer',
        ],
        client: [
          'Discovers OPES via search or referral',
          'Lands on hero — sees value prop immediately',
          'Scrolls to "Why OPES?" section',
          'Reads 5-step "How it Works" flow',
          'Reaches Founding User CTA',
          'Submits first name and email',
        ],
        returnVisitor: [
          'Direct link from email or social',
          'Checks status update',
          'Refers a friend',
        ],
      },
      entryPoints: ['Direct URL', 'Social media share', 'Referral link', 'Search (finance keywords)'],
      exitPoints: ['Email sign-up submitted', 'Social media follow', 'Contact form'],
      evidenceRoom: {
        primaryPaths: ['/', '#why-opes', '#how-it-works', '#founding-user', '#contact'],
        evidenceLocker: [],
        caseFiles: [],
      },
    },

    role: 'UX Designer (Waitlist Landing Page)',
    duration: '3 weeks',
    team: 'Freelance — client referred via LinkedIn',
    tools: ['Figma', 'FigJam'],
    outcomeSummary:
      'Single-page landing designed to convert anonymous visitors into Founding Users through trust-building hierarchy and a clear, low-friction sign-up flow.',

    context: `OPES is an AI-powered financial advisor built for people who don't have the time, knowledge, or resources to manage their own finances — but still want to hit real milestones like buying a home, retiring early, or simply spending smarter. The client came to me via a LinkedIn referral before any development had started. The brief was simple: design a landing page that captures early-access emails and communicates the product's value to everyday people — waiters, shop workers, gig workers — not finance professionals.

The product didn't exist yet. There was no app to screenshot, no testimonials to pull, no data to cite. Everything on the page had to earn trust through design alone.`,

    problem: `How do you convince someone to hand over their email for a financial product that doesn't exist yet — especially when your target audience has been burned by complex, jargon-heavy finance apps before?

The core tension: OPES needed to feel credible enough to trust with your financial data, but warm enough that a 24-year-old waiter didn't feel like they'd stumbled into a Bloomberg terminal. The generic Figma-to-Webflow templates the client had found online looked like every other fintech startup. They wanted to look different. They needed to look trustworthy.`,

    businessContext: {
      goals: [
        'Capture early-access emails (first name + email, possibly age range)',
        'Communicate the OPES value proposition in plain language — no jargon',
        'Position OPES as a financial companion, not another savings app',
        'Build a Founding User community who will shape the product',
        'Create enough trust for users to share personal financial data later',
      ],
      kpis: [
        'Email sign-up conversion rate',
        'Time on page before sign-up',
        'Scroll depth (how far users read before converting)',
        'CTA click-through rate (primary vs. secondary)',
        'Bounce rate from hero section',
      ],
      successMetrics: [
        'Target: 8%+ email conversion (above typical landing page average of 2–5%)',
        'Target: Users reaching "How It Works" section before converting',
        'Target: CTA repeated minimum 3× across page',
        'Target: Zero financial jargon in hero and value prop sections',
        'Target: Stakeholder sign-off on first round of revisions',
      ],
      technicalConstraints: [
        'Single-page layout only — no internal navigation or routing',
        'Mobile-first — majority of target audience will access on smartphone',
        'Form: first name, email, and optional age range — nothing more',
        'No backend or booking tools at this stage — form goes to a spreadsheet',
        'Burgundy brand palette (#41000B and shades) — client-specified',
        'OPES wordmark in Times New Roman — client non-negotiable',
      ],
    },

    competitiveAnalysis: [
      {
        name: 'Cleo',
        strengths: 'Conversational tone, Gen Z appeal, fun personality',
        weaknesses: 'Feels gimmicky, lacks credibility signals for serious goals',
        opportunities: 'OPES can be warm without being a cartoon — trustworthy and human',
      },
      {
        name: 'Monzo / Revolut Landing Pages',
        strengths: 'Clean, professional, strong social proof',
        weaknesses: 'Cold corporate feel, assumes existing financial confidence',
        opportunities: 'OPES can own the "everyday person" positioning they ignore',
      },
      {
        name: 'YNAB',
        strengths: 'Devoted community, strong methodology',
        weaknesses: 'Manual, steep learning curve, dated landing UX',
        opportunities: 'OPES is automated and effortless — design the contrast visually',
      },
      {
        name: 'Generic Fintech Templates (Webflow Showcase)',
        strengths: 'Polished, fast to launch',
        weaknesses: 'Identical to every other fintech — zero differentiation',
        opportunities: 'Brand-forward design with custom color palette and editorial hierarchy',
      },
    ],

    personas: [
      {
        name: 'Priya, 26 — The Waiter Saving for a Flat',
        goals: 'Save for a rental deposit without a spreadsheet or financial degree',
        behaviours: 'Googles "how to save money" at midnight, downloads apps and deletes them within a week',
        painPoints: 'Every finance app feels like it was made for someone who already has money',
        needs: 'Plain language, no judgment, automatic progress toward a named goal',
      },
      {
        name: 'Carlos, 31 — The Gig Worker',
        goals: 'Understand where his income goes across three irregular income streams',
        behaviours: 'Uses Notes app to track spending, feels perpetually behind',
        painPoints: 'Variable income makes budgeting apps useless — they assume a salary',
        needs: 'Flexibility, real-time sync, advice that adapts to irregular cash flow',
      },
      {
        name: 'Aisha, 22 — The Recent Graduate',
        goals: 'Start investing without losing her emergency fund',
        behaviours: 'Watches TikTok finance content, afraid to make a wrong move',
        painPoints: 'No one to ask, intimidated by investing platforms, doesn\'t know where to start',
        needs: 'A trusted voice that explains the next step without overwhelming her',
      },
    ],

    journeyMap: [
      {
        stage: 'Discovery',
        userAction: 'Sees OPES shared on Instagram or finds it via "AI financial advisor" search',
        emotion: 'Curious, cautious',
        painPoint: 'Has seen dozens of fintech promises before — defaults to skepticism',
        designOpportunity: 'Hero must answer "what is this for me?" within 3 seconds — no clever taglines, just clarity',
      },
      {
        stage: 'First Impression',
        userAction: 'Lands on page, reads headline and subheadline',
        emotion: 'Forming judgment fast',
        painPoint: 'Generic fintech language ("optimize your financial journey") triggers immediate distrust',
        designOpportunity: '"Your 24/7 friend in finance" — conversational, warm, not corporate',
      },
      {
        stage: 'Value Exploration',
        userAction: 'Scrolls to "Why OPES?" and "How It Works"',
        emotion: 'Slowly building interest',
        painPoint: 'Long feature lists feel like a product pitch, not a solution',
        designOpportunity: '5-step visual flow showing exactly what happens after sign-up — no vague promises',
      },
      {
        stage: 'Trust Decision',
        userAction: 'Weighs whether to give their email to an app that doesn\'t exist yet',
        emotion: 'Hesitant, calculating risk',
        painPoint: 'No existing reviews, no screenshots, no proof — only the page itself',
        designOpportunity: 'Founding User framing — you\'re not a guinea pig, you\'re a co-creator with exclusive access',
      },
      {
        stage: 'Sign-Up',
        userAction: 'Enters first name and email, hits "Get Early Access"',
        emotion: 'Hopeful, slightly uncertain',
        painPoint: 'Form friction or unclear next steps kill conversion at this moment',
        designOpportunity: 'Single-step form, prominent CTA, immediate confirmation message',
      },
    ],

    usersAndNeeds: {
      primaryUsers:
        'Working adults aged 20–35 with limited financial literacy and variable or modest incomes. They want help reaching specific life goals but find existing tools either too complex, too expensive, or designed for people already comfortable with money.',
      needs: [
        'Plain English — no financial jargon at any point on the page',
        'Reassurance that OPES works for people without financial knowledge',
        'A clear, named benefit of joining early (not just "be first")',
        'Confidence that their data will be handled securely',
        'A goal-oriented framing — OPES helps you reach something specific',
      ],
      constraints: [
        'No app exists yet — all trust must come from copy and design',
        'Budget does not allow custom illustration or photography',
        'Form must be minimal — name and email only, age range optional',
        'Burgundy palette is fixed — must pass WCAG contrast on mobile',
        'Times New Roman for OPES wordmark — must feel intentional, not accidental',
      ],
    },

    research: {
      methods: [
        'Client intake interview (90 minutes) — goals, audience, competitive context',
        'Review of OPES written brief and brand specification document',
        'Heuristic analysis of 8 fintech landing pages (Cleo, Monzo, Plum, Emma, Chip, Snoop, Cleo, YNAB)',
        'Audience assumption mapping — who are we designing for and what do they fear?',
        'Copy review — identifying jargon, abstraction, and trust language across competitor sites',
      ],
      participants: '1 client stakeholder (founder), 2 informal peer reviews of wireframes',
      duration: '1 week discovery, 2 weeks design and iteration',
      approach: `With no existing user base to recruit from and a 3-week timeline, research was scoped to what would actually move the needle: understanding the client's audience assumptions, studying how comparable landing pages built (or failed to build) trust, and pressure-testing copy against the "24-year-old waiter" persona throughout.

The most useful exercise was mapping every piece of hero copy against the question: "Would someone who's never read a finance article understand this in 5 seconds?" Everything that failed was rewritten until it passed.`,
      objectives: [
        'Define the trust hierarchy — what must appear above the fold',
        'Identify the language register — how does OPES sound to someone who finds money stressful?',
        'Determine how many CTAs and where to place them without feeling pushy',
        'Establish what "Founding User" benefits are worth naming explicitly',
      ],
      assumptions: [
        'Target users are mobile — confirmed by client (mobile-first explicit in brief)',
        'Short-form sign-up increases conversion — confirmed by competitive benchmarking',
        'Burgundy reads as premium, not bank-corporate — tested and confirmed in stakeholder review',
        'Step-by-step "How It Works" reduces anxiety better than feature bullets — assumed, informed by Cleo analysis',
      ],
    },

    insights: {
      key: `OPES isn't selling a product — it's selling permission to believe that financial clarity is possible for you specifically. Every word and every design decision had to make the visitor feel seen, not sold to.`,
      findings: [
        'The brief\'s own headline — "Your 24/7 friend in finance" — was the strongest trust signal. It needed to be the H1, not buried in body copy.',
        'Fintech landing pages typically list features. OPES needed to list feelings — what it feels like to not worry about money.',
        '"Founding User" framing shifts the CTA from "take a risk on an unproven app" to "join a group that shapes the future" — fundamentally different ask.',
        'The 5-step "How It Works" flow was the most requested addition in informal peer review — users wanted to know exactly what happens after sign-up.',
        'Burgundy (#41000B) — used on a white background — passed AA contrast and read as premium without triggering "corporate bank" associations.',
        'Times New Roman for "OPES" required typographic contrast — thin, tracked-out subheadings in a modern sans-serif made the combination feel intentional.',
        'Three CTA instances across the page (hero, Founding User section, footer) matched conversion best practice without feeling repetitive.',
      ],
    },

    informationArchitecture: {
      description: `Single-page linear scroll with six sections. Each section completes one job: hook → differentiate → explain → legitimize → convert → access. No dead ends, no internal navigation needed. The CTA appears three times — at the start, the emotional peak, and the close — following established landing page conversion patterns.`,
      decisions: [
        'Hero CTA above the fold — sign-up form visible without scrolling on mobile',
        '"Why OPES?" before "How It Works" — differentiation earns the right to explain the product',
        'Benefits before the process — users need to want OPES before they care how it works',
        'Founding User section as the emotional climax — this is where intent converts to action',
        'Contact section last, minimal — not a selling section, just access for those who need it',
        'No navigation bar competing with the CTA — single-focus page with no escape routes',
      ],
      hierarchy: [
        ['Hero — Sign-Up Form + Value Proposition'],
        ['Why OPES? — Differentiation from savings/investment apps'],
        ['How It Works — 5-step flow from conversation to goal'],
        ['Founding User Benefits — Exclusivity + co-creation framing'],
        ['Contact — Email, social, support'],
      ],
    },

    userFlows: {
      primary: [
        { label: 'Lands on page from social/referral', type: 'start' as const },
        { label: 'Reads hero headline on mobile', type: 'action' as const },
        { label: 'Sees sign-up form immediately', type: 'action' as const },
        { label: 'Scrolls — reads "Why OPES?"', type: 'action' as const },
        { label: 'Reads 5-step "How It Works"', type: 'action' as const },
        { label: 'Reaches Founding User CTA', type: 'decision' as const },
        { label: 'Enters first name and email', type: 'action' as const },
        { label: 'Submits — sees confirmation', type: 'end' as const },
      ],
      edgeCase: [
        { label: 'Lands on page, immediately skeptical', type: 'start' as const },
        { label: 'Skips hero, scrolls to "How It Works"', type: 'action' as const },
        { label: 'Reads 5-step process carefully', type: 'action' as const },
        { label: 'Trusts the transparency of the flow', type: 'action' as const },
        { label: 'Returns to hero form and signs up', type: 'end' as const },
      ],
      error: [
        { label: 'User submits form with invalid email', type: 'start' as const },
        { label: 'Inline validation error appears', type: 'error' as const },
        { label: 'Error message in plain language', type: 'action' as const },
        { label: 'User corrects and resubmits', type: 'action' as const },
        { label: 'Success confirmation shown', type: 'end' as const },
      ],
    },

    interactionDesign: {
      approach: `Interactions kept minimal — this is a landing page, not a product. The goal is zero friction between intent and sign-up. Smooth scroll between sections, subtle hover states on CTA buttons, and a clear success state after form submission. No animations that delay the user's path to the form.`,
      decisions: [
        'Smooth scroll navigation — sections feel connected, not separate pages',
        'CTA button hover: slight lift + background lightening — confirms it\'s clickable',
        'Form success state: inline confirmation, no page reload — "You\'re in. We\'ll be in touch."',
        'Step indicators in "How It Works" numbered, not icon-only — clearer on mobile',
        'Benefit badges in hero use icons + text — not icon-only for accessibility',
        'Sticky sign-up CTA on mobile scroll (future enhancement, noted in handoff)',
      ],
    },

    wireframes: {
      changes: [
        'Initial hero had the sign-up form below a long value proposition — moved form above the fold on mobile',
        'First "How It Works" used abstract icons — replaced with numbered steps and plain-text action verbs',
        '"Founding User" section originally listed 4 bullets — restructured as 3 bold benefit statements',
        'Contact section initially had a full form — removed per client brief, replaced with email + social links',
        'Footer was designed with links — simplified to legal line + social handles only',
      ],
      reasoning: 'The biggest structural change was moving the form above the fold. Early wireframes put copy first and form second — correct for an established brand but wrong for an unknown pre-launch product. Warm copy is how OPES builds trust, but the form is what OPES needs. The hierarchy needed to make both visible simultaneously.',
      tradeoffs: [
        'No navigation bar — increases focus but removes orientation for users who want to jump to a section',
        'Minimal form (name + email only) — maximises conversion but collects less segmentation data',
        'No testimonials — honest for a pre-launch product but removes a primary trust signal',
        'Single-column mobile layout — clean but limits visual hierarchy options on small screens',
      ],
    },

    designSystem: {
      colors: [
        { name: 'Burgundy (Primary)', value: '#41000B', usage: 'Primary CTAs, section backgrounds, wordmark' },
        { name: 'Blush (Light Accent)', value: '#D0BCBF', usage: 'Secondary backgrounds, card surfaces' },
        { name: 'Mid Burgundy', value: '#713F47', usage: 'Body text on light backgrounds, icon fills' },
        { name: 'Pale Rose', value: '#A07E83', usage: 'Dividers, subtle borders, inactive states' },
        { name: 'Off White', value: '#FFFBFB', usage: 'Page background, form fields, text on dark' },
        { name: 'Charcoal', value: '#1A1A1A', usage: 'Primary body text' },
      ],
      typography: [
        { level: 'OPES Wordmark (Times New Roman)', size: '48px', weight: '400', lineHeight: '1.0' },
        { level: 'H1 (Display Sans)', size: '40px mobile / 56px desktop', weight: '700', lineHeight: '1.1' },
        { level: 'H2 (Display Sans)', size: '28px mobile / 36px desktop', weight: '600', lineHeight: '1.2' },
        { level: 'Body', size: '16px', weight: '400', lineHeight: '1.65' },
        { level: 'Caption / Label', size: '13px', weight: '500', lineHeight: '1.4' },
      ],
      spacing: '8px base unit. Mobile section padding: 48px vertical. Desktop: 80px. Form field height: 48px (touch-friendly).',
      components: [
        'Hero Section (wordmark + headline + subheadline + form + benefit badges)',
        'Why OPES Card (icon + heading + 2-line description)',
        'How It Works Step (number badge + action verb + plain description)',
        'Founding User Benefit Block (bold headline + short explanation)',
        'Primary CTA Button (full-width mobile, fixed-width desktop)',
        'Sign-Up Form (first name + email + optional age range + submit)',
        'Success State (inline confirmation, no reload)',
        'Contact Card (email icon + handle, Instagram icon + handle)',
      ],
      accessibilityRules: [
        'All text on burgundy background meets WCAG AA contrast (#FFFBFB on #41000B = 10.5:1)',
        'Form fields have visible above-field labels — not placeholder-only',
        'CTA buttons minimum 48px height — touch-safe on mobile',
        'Error messages written in plain language, not only a red border',
        'Benefit icons always paired with text labels — not icon-only',
      ],
    },

    accessibility: {
      considerations: [
        'Burgundy on off-white passes WCAG AA at all text sizes',
        'Form labels persistent above input fields — not inside placeholders',
        'Touch targets minimum 48px × 48px throughout',
        'Step numbers in "How It Works" are text, not images — screen reader friendly',
        'Social links include descriptive aria-labels (not just "IG")',
      ],
      implementation: 'Accessibility reviewed at wireframe stage and specified in handoff annotations. Production implementation was outside scope — all requirements documented for the development team.',
    },

    usabilityTesting: {
      goals: [
        'Validate that the value proposition is understood within 5 seconds',
        'Confirm "Founding User" framing feels like an opportunity, not a catch',
        'Test whether 3 CTA instances feel helpful or pushy',
        'Verify mobile sign-up form is completable in under 30 seconds',
      ],
      participants: '2 informal peer reviews of lo-fi wireframes; 1 stakeholder review round',
      tasks: [
        'Without scrolling: tell me what OPES does and who it\'s for',
        'Find where to sign up — how long does it take?',
        'Tell me what you get as a Founding User',
        'Complete the sign-up form on your phone',
      ],
      findings: [
        'Round 1: "Financial advisor" in the subheadline triggered "expensive" associations — reframed as "financial companion"',
        'Round 1: "Connect Your Bank" step caused hesitation — added "securely" qualifier and a security icon',
        'Round 1: Founding User benefits too vague — added three specific named benefits (exclusive features, discounts, shape the product)',
        'Round 2: Form field for age range felt invasive without explanation — added "(helps us personalise OPES for you)" microcopy',
        'Round 2: Success state was missing entirely — added inline confirmation message',
        'Stakeholder: Wanted "Get Early Access" as primary CTA label — adopted across all three instances',
      ],
      iterations: [
        'Changed "financial advisor" to "financial companion" in subheadline',
        'Added "Secure & Private" badge to hero benefit strip',
        'Named three specific Founding User benefits explicitly',
        'Added optional age range with explanatory microcopy',
        'Designed form success state: "You\'re in. We\'ll be in touch."',
        'Standardised CTA label to "Get Early Access — Become a Founding User"',
      ],
    },

    edgeCases: {
      emptyStates: [
        'Form submitted with empty email: inline validation — "We\'ll need your email to keep you updated"',
        'Form submitted with name only: "Almost there — just your email and you\'re in"',
        'Age range left blank: accepted, optional field — no error state',
      ],
      loadingStates: [
        'Form submission: button changes to "Sending..." with spinner — prevents double-submit',
        'Page load: above-fold content loads first, below-fold images deferred',
      ],
      errorMessages: [
        'Invalid email format: "That doesn\'t look quite right — try name@example.com"',
        'Server error on submit: "Something went wrong on our end — please try again in a moment"',
        'Duplicate email: "Looks like you\'re already on the list — we\'ll see you on launch day"',
      ],
      failurePaths: [
        'Form submission fails: error state preserved, data not lost — user can retry without re-entering',
        'Page load fails on poor mobile connection: critical above-fold content prioritised in HTML order',
      ],
    },

    outcome: {
      metrics: [
        'Landing page design delivered and stakeholder-approved in 3 weeks',
        'Single-page architecture — zero navigation dead ends',
        '3 CTA instances placed at hero, Founding User section, and footer',
        'Mobile-first layout — all critical content accessible without horizontal scroll',
        'Burgundy palette implemented with verified WCAG AA contrast throughout',
        'Full handoff documentation delivered including annotations, component specs, and copy guidelines',
      ],
      impact: `OPES was a pre-launch project — the product didn't exist yet, and the landing page was the entire face of the brand. Designing trust from scratch, with no testimonials, no screenshots, and no track record, required every pixel to do double duty: establish credibility and communicate warmth simultaneously.

The design was handed off to development. This case study documents the design process in full because the quality of the thinking matters as much as the quality of the outcome — especially when there's no launch data to point to yet.`,
      learnings: [
        'For a pre-launch product, the landing page isn\'t a marketing tool — it\'s the product. Every design decision directly affects whether people trust the company.',
        '"Founding User" is a reframe, not a trick. If you\'re asking for a genuine commitment before you\'ve earned trust, you need to offer genuine participation in return.',
        'Fixed brand constraints (Times New Roman, burgundy palette) aren\'t limitations — they\'re a creative brief. The contrast between a traditional serif wordmark and a modern sans-serif system created a unique brand voice.',
        'Copy and design are the same job on a landing page. Reviewing every word against the target persona was as important as any layout decision.',
        'Minimal forms convert better than comprehensive ones. If you only need the email, only ask for the email.',
      ],
    },

    evidenceImages: {
      informationArchitecture: '/OPES/InformationArchitecture.png',
      journeyMap: '/OPES/UserJourneyMapping.png',
      primaryFlow: '/OPES/UserFlow-RV.png',
      edgeCaseFlow: '/OPES/UserFlow-SV.png',
      customQuoteFlow: '/OPES/UserFlow-VD.png',
      errorFlow: '/OPES/UserFlow-RV.png',
      wireframes: {
        homepage: '/OPES/wf_v1_final.png',
        shop: '/OPES/wf_v3_firstdraft.png',
        product: '/OPES/wf_v4_secondversion.png',
        about: '/OPES/FirstDraft.png',
        contact: '/OPES/SecondVersion.png',
        cart: '/OPES/FinalVersion.png',
      },
    },
  },

// ============================================
  // FURNORE — HIGH-END FURNITURE E-COMMERCE
  // SEASON 1 · EPISODE 3
  // ============================================
  {
    id: 'furnore',
    title: 'Furnore',
    subtitle: 'Furniture & Home Decor E-Commerce',
    windowColor: 'coral' as WindowColor,
    isActive: true,
    isFeatured: true,
    hasSilhouette: true,
    year: '2023',

    // ============ OMITB CASE FILE ============
    caseNumber: 'ARCONIA-2023-003',
    evidenceCount: 36,
    primarySuspect: 'The Generic Template',
    victim: 'Brand Identity',
    episodeTitle: 'The Case of the Invisible Showroom',
    // =========================================

    // ============ SITEMAP & NAVIGATION ============
    sitemap: {
      structure: [
        ['The Arconia (Home)'],
        ['Case Files', 'Detective Dossier', 'Evidence Locker'],
        ['Active Cases', 'Cold Cases', 'About', 'Contact', 'Certifications', 'Skills', 'Tools', 'Methodology'],
        ['Bloom & Brew', 'Clarity', 'Furnore', 'Wanderlust', 'The Extras', 'Narrative'],
      ],
      userFlows: {
        recruiter: [
          'Enter Arconia',
          'Browse featured cases',
          'Select Furnore (UI design)',
          'Review 20-screen wireframe system',
          'Examine IA and user flows',
          'View wireframe screens',
          'Contact investigator',
        ],
        client: [
          'Enter Arconia',
          'View detective dossier',
          'Check furniture e-commerce UI experience',
          'Review Furnore screens',
          'Examine component structure',
          'Initiate consultation',
        ],
        returnVisitor: [
          'Direct case access',
          'Review UI design decisions',
          'Examine wireframe system',
        ],
      },
      entryPoints: ['The Arconia (Home)', 'Direct case links', 'Featured episodes', 'E-commerce portfolio tag'],
      exitPoints: ['Contact investigator', 'LinkedIn profile', 'Email outreach'],
      evidenceRoom: {
        primaryPaths: ['/', '/cases', '/about', '/contact'],
        evidenceLocker: ['/certifications', '/skills', '/tools', '/methodology'],
        caseFiles: [
          '/case/bloom-and-brew',
          '/case/clarity',
          '/case/furnore',
          '/case/wanderlust',
          '/case/the-extras',
          '/case/narrative',
        ],
      },
    },
    // ===============================================

    role: 'UI Designer',
    duration: '3 months',
    team: 'In-house team at Toran (furniture brand, Chennai)',
    tools: ['Figma', 'FigJam', 'Adobe Illustrator'],

    outcomeSummary:
      '20 screens designed, documented, and stakeholder-approved across all product verticals and service flows.',

    context: `Furnore is the digital face of Toran, a premium furniture retailer based in Chennai with physical showrooms that customers genuinely love. Walk into a Toran store and a sales associate will spend an hour with you — pulling out fabric swatches, measuring your room in their head, telling you which armchair pairs with which sideboard. Walk onto their website and you get a wall of identical sofa thumbnails, a Sort By dropdown that does nothing, and no idea whether anyone will even assemble the thing once it arrives.

I was brought in to design the complete e-commerce system from scratch: 20 screens covering standard purchases, a 7-step bespoke upholstery service (customers courier their own fabric), pincode-gated assembly booking, and ₹10,000 interior layout consultations. Three months of work, stakeholder-approved. `,

    problem: `The gap between Toran's physical and digital experience wasn't a polish problem — it was a structural one. The existing site treated every product the same way: image, title, price, Add to Cart. But Furnore sells four fundamentally different things:

Standard products you browse and buy. Bespoke pieces where you send us your fabric and we build around it. Assembly services that depend on your postcode. And Layout consultations where a designer visits your home for ₹10,000 + GST.

Squashing all four into a single product-page template was failing every one of them. Bespoke customers had no idea a 7-step offline process was involved. Repeat buyers couldn't tell whether assembly was even available for their area. And the Gallery  the one section that could have shown what Furnore's furniture actually looks like installed in a real Chennai home  was a dead end with no links back to the products in the photos.

The brief, essentially: build a digital showroom that earns the same trust the physical stores have spent years building.`,

    businessContext: {
      goals: [
        'Build a digital showroom that matches the quality and warmth of the physical stores',
        'Enable e-commerce across three product verticals: Furniture, Art & Décor, and Accents',
        'Surface Bespoke, Assembly, and Layout services as genuine differentiators  not footnotes',
        'Drive purchase confidence through Gallery content, testimonials, and real delivery estimates',
        'Establish a consistent component system across all 20 screens for smooth dev handoff',
      ],
      kpis: [
        'Complete coverage of all product categories and service flows in the wireframe system',
        'Clear, unambiguous user flows from browse through to confirmed order',
        'Consistent component library across 20 screens',
        'Stakeholder sign-off before handoff to development',
        'IA, user flows, and journey maps fully documented',
      ],
      successMetrics: [
        'All 20 screens designed to lo-fi wireframe standard and approved',
        'Information architecture documented and rationale explained',
        'User flows mapped for all major journeys — browse/buy, bespoke, wishlist, tracking',
        'Design system defined: colour, typography, spacing, and 10 core components',
        'All identified UX gaps and production risks logged for the dev team',
      ],
      technicalConstraints: [
        'Shopify or custom CMS — platform decision unresolved during design phase',
        'Indian payment methods non-negotiable: UPI, credit/debit cards, COD, and net banking',
        'Bespoke flow includes two fully offline steps (fabric email + courier) — cannot be in-app',
        'Assembly service availability gated by delivery postcode — real-time check required',
        'Layout consultation booked by phone at ₹10,000 + GST — no in-app booking at this stage',
      ],
    },

    competitiveAnalysis: [
      {
        name: 'Urban Ladder',
        strengths: 'Strong filtering, real delivery tracking, established brand trust',
        weaknesses: 'Mass-market feel, no bespoke or service differentiation, catalogue-first UX',
        opportunities: 'Position Furnore as craft-first and premium — not just another catalogue',
      },
      {
        name: 'Pepperfry',
        strengths: 'Wide selection, EMI options, strong brand recognition across India',
        weaknesses: 'Cluttered UI, commoditised experience, zero service layer',
        opportunities: 'Clean editorial layout with service flows built into the core journey',
      },
      {
        name: 'WoodenStreet',
        strengths: 'Visible material and customisation choices, good configurator concept',
        weaknesses: 'Overwhelming customiser UI, dated visual design, high cognitive load',
        opportunities: 'A simpler, guided Bespoke flow with clear numbered steps and offline handoff',
      },
      {
        name: 'Physical Showrooms',
        strengths: 'Tactile experience, expert staff, trusted relationships built over visits',
        weaknesses: 'Geography-bound, limited hours, no way to browse at midnight',
        opportunities: 'Bring showroom warmth and staff expertise into every screen',
      },
    ],

    personas: [
      {
        name: 'Priya, 31 — The Home Decorator',
        goals: 'Furnish a new apartment with quality pieces she won\'t replace in two years',
        behaviours: 'Browses categories carefully, saves to wishlist, returns when ready to commit. Compares dimensions against her floor plan before adding to cart.',
        painPoints: 'Needs real dimensions and an honest delivery window. The current site gives her neither. She\'s not going to spend ₹34,000 on a sideboard she can\'t measure.',
        needs: 'Clean product pages, pincode-based delivery estimates, wishlist that doesn\'t require sign-in to use',
      },
      {
        name: 'Meera, 38 — The Bespoke Customer',
        goals: 'Custom-upholster an armchair with her own fabric — a sari she\'s been saving',
        behaviours: 'Reads service pages carefully and completely. High intent, high anxiety. Will abandon at the first sign of confusion about process or pricing.',
        painPoints: 'The 7-step process involves couriering fabric and waiting for approval. Without a clear guide, she assumes it\'s complicated and leaves. It is complicated — but manageable if you explain it.',
        needs: 'Step-by-step guidance with numbered stages, clear pricing, and reassurance at every handoff point between online and offline',
      },
      {
        name: 'Rajan, 43 — The Repeat Buyer',
        goals: 'Buy a matching sideboard for the armchair he bought six months ago, with assembly this time',
        behaviours: 'Signs in directly, heads straight to a category or New Arrivals. Not browsing — buying. Wants the fastest path to checkout.',
        painPoints: 'No quick reorder shortcut. Assembly add-on isn\'t visible on the product page — he finds out at checkout that it\'s available but doesn\'t know if his postcode qualifies.',
        needs: 'Efficient checkout, saved delivery details, and a clear postcode check for assembly surfaced on the product page itself — not buried at the end',
      },
    ],

    journeyMap: [
      {
        stage: 'Discovery',
        userAction: 'Lands on homepage from Instagram or Google',
        emotion: 'Curious, forming first impression',
        painPoint: 'Homepage category icons have no text labels — navigation is unclear and unforgiving for first-time visitors',
        designOpportunity: 'Hero with a clear value proposition + labelled category grid that explains what Furnore sells within 5 seconds',
      },
      {
        stage: 'Browse',
        userAction: 'Explores category listing (Furniture, Art & Décor, Accents)',
        emotion: 'Interested, scanning for something specific',
        painPoint: 'No filter or search within category. Sort By dropdown has no visible effect on the order of products',
        designOpportunity: 'Filter sidebar with category, price range, and material — plus a Sort By tied to real product data',
      },
      {
        stage: 'Product Evaluation',
        userAction: 'Opens Product Detail page, checks specs and colour swatches',
        emotion: 'Considering, cautious about committing',
        painPoint: 'No delivery date estimate anywhere on the page. Dimensions are present but not prominent — buried below the fold',
        designOpportunity: 'Pincode-based delivery estimator directly on the product page, dimensions above the fold, assembly availability surfaced inline',
      },
      {
        stage: 'Save & Return',
        userAction: 'Adds to wishlist, leaves, returns later ready to buy',
        emotion: 'Comfortable, still building trust with the brand',
        painPoint: 'Must create an account before saving to wishlist. This is the worst possible moment to demand registration — the user is browsing, not committing',
        designOpportunity: 'Guest wishlist with a session cookie. Sign-in prompt deferred to checkout only, where it feels natural and low-stakes',
      },
      {
        stage: 'Checkout',
        userAction: 'Cart → Payment method selection → Order form submission',
        emotion: 'Ready to commit, wants confirmation fast',
        painPoint: 'After submitting the Place Order form, there is no confirmation screen. Nothing. The user has no way of knowing whether their order went through without manually checking Track Order',
        designOpportunity: 'A success screen with order code, estimated delivery date, and a clear "what happens next" — three steps, plain language',
      },
      {
        stage: 'Post-Purchase',
        userAction: 'Checks Track Order to follow their delivery',
        emotion: 'Waiting, monitoring for updates',
        painPoint: 'Every row in the order tracking table shows the same order code. It\'s a backend data issue — but the customer sees it as the brand not knowing what they bought',
        designOpportunity: 'Unique order codes per line item. SMS and email push notifications so customers don\'t have to manually check',
      },
    ],

    usersAndNeeds: {
      primaryUsers:
        'Urban homeowners aged 28–50 in Chennai and metro cities buying premium furniture for the first or second time. Secondary: interior designers sourcing bespoke pieces for clients; repeat buyers who already trust the brand and want the fastest path to repurchase.',
      needs: [
        'Honest product information — real dimensions, real material descriptions, real delivery windows',
        'Confidence that assembly is available before adding to cart, not a surprise at checkout',
        'A guided, low-anxiety path through the 7-step Bespoke fabric process — with clear handoff points',
        'Fast checkout with Indian payment methods: UPI, credit/debit cards, COD, net banking',
        'A Gallery of real installed spaces that links back to the products in the photos',
      ],
      constraints: [
        'Bespoke flow requires two offline steps — fabric email and courier — that cannot be in-app',
        'Assembly service limited to eligible postcodes — requires real-time check',
        'Layout consultation booked by phone only — no in-app scheduling at this stage',
        'No product photography available during wireframe phase — crosshatch placeholders throughout',
        'Pre-launch product — no real user analytics or behaviour data to validate against',
      ],
    },

    research: {
      methods: [
        'Stakeholder interviews with the Toran brand founders over 3 sessions',
        'Competitive audit of 8 Indian furniture e-commerce platforms',
        'Heuristic evaluation of competitor UX patterns against Nielsen\'s 10 principles',
        'Informal contextual observation in the physical Chennai showroom — watching sales staff in action',
        'Card sorting for navigation structure with internal team (6 participants)',
        'Full review of product catalogue, service documentation, and bespoke process from the upholstery team',
      ],
      participants: 'Internal stakeholder interviews and team card sorting only — no external user research conducted',
      duration: '2 weeks discovery, 6 weeks design, 4 weeks iteration and stakeholder review',
      approach: `Research was lean by necessity — 3-month timeline, pre-launch product, no existing user base to recruit from. The most valuable source of insight wasn't a research report. It was an afternoon in the physical showroom, watching how the sales team described products and services to real customers walking in off the street.

That informed everything. The way a sales associate explained the Bespoke process — step by step, with a sketch on paper — became the numbered layout on the service page. The way they asked "what postcode are you in?" before mentioning assembly became the pincode checker on the product page. Good research doesn't always mean a usability lab. Sometimes it means paying attention to what's already working.`,
      objectives: [
        'Understand the full range of products and services that needed to be represented across 20 screens',
        'Define a navigation structure that could hold three product verticals and four service types without becoming overwhelming',
        'Clarify the Bespoke and Assembly processes end-to-end before a single wireframe was drawn',
        'Identify the gaps between the physical showroom experience and what a typical e-commerce template could offer',
      ],
      assumptions: [
        'Premium furniture buyers need rich product detail before committing (confirmed by competitor benchmarking)',
        'Indian payment diversity non-negotiable — UPI, COD, and cards all required from day one (confirmed)',
        'Gallery content drives purchase confidence — physical showroom uses room setups as primary sales tool (confirmed)',
        'Mobile-first is critical — assumed, but no usage data available at this stage to validate',
      ],
    },

    insights: {
      key: `Furnore doesn't sell furniture — it sells the confidence that your home will look exactly like you imagined. Every UX decision should reduce anxiety, not add to it. A customer spending ₹34,000 on a sideboard needs dimensions, delivery timeline, assembly availability, and proof that it looks good in a real room — before they'll add it to a cart.`,
      findings: [
        'The Gallery had 16 photos of real installed spaces — and zero links to the products in them. Highest conversion opportunity on the site, completely untapped.',
        'Assembly wasn\'t surfaced until checkout. Customers who wanted it couldn\'t find it; customers who didn\'t know about it never discovered it. It needed to live on the product page itself.',
        'The Bespoke service page was a wall of text. Customers read the first two lines and assumed the process was too complicated. It is complicated — but a numbered 7-step layout with clear handoff points made it feel manageable.',
        'Currency inconsistency across screens (₹ on some, $ on others) wasn\'t a design error — it was a data structure issue from a mixed-currency product import. Flagged and escalated to the dev team.',
        'Track Order showed the same order code for every line item in the table. A backend data issue that would have confused every post-purchase customer on launch day. Flagged before handoff.',
        'Sign-in was required to save to wishlist. This is wrong at the browsing stage. Friction at a non-committal moment kills intent before it can become a purchase.',
        'The checkout had no confirmation screen after form submission. After placing an order, customers had no way of knowing if it worked — until they manually checked Track Order.',
      ],
    },

    informationArchitecture: {
      description: `Six primary navigation sections plus utility pages — Cart, Wishlist, Account, Track Order. Maximum 2 clicks from homepage to any product. Services surfaced in primary navigation because they are Furnore's genuine differentiators, not footnotes. Gallery and Testimonials positioned to build trust before the conversion moment. Full IA documented as a PNG diagram (Exhibit A).`,
      decisions: [
        'Max 2 clicks from home to any product — depth kept deliberately shallow for a premium catalogue',
        'Services in primary nav — Bespoke, Assembly, and Layout consultations are what separate Furnore from Urban Ladder',
        'Gallery as a standalone section — room-setup photography is aspirational content that drives desire before it drives purchase',
        'Track Order in utility nav only — post-purchase use case that shouldn\'t compete with browse navigation',
        'Wishlist and Cart separated — they represent different levels of purchase commitment and need different UI treatment',
        'Authentication deferred to checkout — no barriers during the browsing and saving phase',
      ],
      hierarchy: [
        ['Home'],
        ['Furniture', 'Art & Décor', 'New Arrivals', 'Services', 'Gallery', 'Testimonials', 'About'],
        ['Chairs', 'Sideboards', 'Armchair', 'Contemporary Art', 'Bespoke Services', 'Assembly Services', 'Layout Services'],
        ['Product Detail', 'Cart', 'Wishlist', 'Checkout', 'Place Order', 'Track Order', 'Sign In', 'Sign Up'],
      ],
    },

    userFlows: {
      primary: [
        { label: 'Land on Homepage', type: 'start' as const },
        { label: 'Browse category grid', type: 'action' as const },
        { label: 'Open Product Detail', type: 'action' as const },
        { label: 'Check postcode for assembly', type: 'action' as const },
        { label: 'Select colour + quantity', type: 'action' as const },
        { label: 'Add to Cart', type: 'action' as const },
        { label: 'Review Cart totals', type: 'action' as const },
        { label: 'Tap CHECKOUT', type: 'action' as const },
        { label: 'Select payment method', type: 'decision' as const },
        { label: 'Submit Place Order form', type: 'action' as const },
        { label: 'Order confirmed ✓', type: 'end' as const },
      ],
      edgeCase: [
        { label: 'Reads Bespoke Services page', type: 'start' as const },
        { label: 'Follows 7-step numbered guide', type: 'action' as const },
        { label: 'Opens product → selects Bespoke option', type: 'action' as const },
        { label: 'Adds to Cart and pays', type: 'action' as const },
        { label: 'Emails fabric swatch for approval (offline step)', type: 'action' as const },
        { label: 'Couriers required fabric quantity (offline step)', type: 'action' as const },
        { label: 'Receives confirmation — production begins ✓', type: 'end' as const },
      ],
      error: [
        { label: 'Selects Cash on Delivery at checkout', type: 'start' as const },
        { label: 'Submits Place Order form', type: 'action' as const },
        { label: 'No confirmation screen shown — design gap', type: 'error' as const },
        { label: 'User uncertain whether order was placed', type: 'action' as const },
        { label: 'Checks Track Order screen manually', type: 'action' as const },
        { label: 'Order visible in table — but with duplicate order codes ✓', type: 'end' as const },
      ],
    },

    interactionDesign: {
      approach: `Interactions designed to feel considered and premium — calm confidence, not conversion urgency. The pace of a good showroom, not a flash sale. Key micro-interactions: Add to Cart confirmation state, wishlist heart toggle, gallery fullscreen expand and close, accordion sections on product detail, and the credit card modal slide-up over the checkout screen.`,
      decisions: [
        'Gallery photo expands fullscreen on click — immersive, no external lightbox library dependency',
        'Cart quantity +/− recalculates totals inline with no page reload',
        'Heart icon toggles wishlist state immediately — optimistic update, error handled gracefully',
        'Credit card modal slides up over the checkout screen on payment selection — feels native',
        'Order status tracker uses four filled/hollow dots: Placed → Packed → Shipped → Delivered',
        'Assembly postcode checker inline on product page — not a modal, not a separate page',
        'Mobile nav collapses to hamburger with slide-in drawer from the left',
      ],
    },

    wireframes: {
      changes: [
        'Started at a 6-screen MVP scope — expanded to 20 once service flows were fully mapped',
        'Gallery had no expanded view in the initial pass — added after the first stakeholder review flagged it',
        'Place Order shown in both empty-state and filled-state for dev handoff clarity',
        'Track Order added late in the process — originally assumed to be handled entirely by email',
        'Bespoke Services page went through 3 rounds before the numbered step layout was approved by stakeholders',
        'Assembly Services page restructured from a bullet list into a clear 3-step process with notes section',
      ],
      reasoning: 'The key structural decision was treating Services — Bespoke, Assembly, Layout — as first-class pages in the IA, not optional footnotes tucked inside product pages. These are Furnore\'s genuine competitive differentiators against Urban Ladder and Pepperfry. If the screens had treated them as afterthoughts, the wireframe system would have failed the brief.',
      tradeoffs: [
        'Lo-fi only — no visual design feedback during the engagement. Real risk that production would deviate from intended hierarchy and spacing.',
        'No external user testing — only internal stakeholder reviews. Every decision was validated by opinions, not behaviour.',
        'Two checkout flows left unresolved at departure — form-based COD flow and payment gateway flow. Documented and flagged, not designed.',
        'Mobile responsive layouts not specified — desktop-first wireframes only, with mobile behaviour noted in annotations.',
      ],
    },

    designSystem: {
      colors: [
        { name: 'Charcoal', value: '#1E1E1E', usage: 'Primary text, headings, nav background' },
        { name: 'Mid Gray', value: '#444444', usage: 'Secondary text, body copy' },
        { name: 'Light Gray', value: '#888888', usage: 'Captions, placeholders, form field labels' },
        { name: 'Rule Gray', value: '#E0E0E0', usage: 'Borders, table dividers, section rules' },
        { name: 'Warm White', value: '#F7F7F5', usage: 'Page background — slightly warm, not clinical' },
        { name: 'Accent Gold', value: '#C8A84B', usage: 'Active states, CTAs, price highlights' },
      ],
      typography: [
        { level: 'Display (Playfair Display)', size: '48px', weight: '700', lineHeight: '1.1' },
        { level: 'H2 (Playfair Display)', size: '32px', weight: '700', lineHeight: '1.2' },
        { level: 'Section Label (Inter)', size: '13px', weight: '700', lineHeight: '1.4' },
        { level: 'Body (Inter)', size: '13px', weight: '400', lineHeight: '1.6' },
        { level: 'Micro Label (Inter)', size: '10px', weight: '700', lineHeight: '1.5' },
      ],
      spacing: '8px base unit. Section padding: 60px desktop. Card padding: 14–24px. Nav height: 72px.',
      components: [
        'Product Card — crosshatch placeholder, title, category badge, price, "More" CTA, wishlist heart',
        'Navigation Bar — logo centred, 6 nav links, 5 utility icons (search, cart, account, wishlist, language)',
        'Hero Banner — full-width image placeholder, headline, dual CTA (Shop Now + secondary)',
        'Service Step Block — number badge, bold label, description paragraph',
        'Cart Line Item — product image, title, quantity +/−, line price, remove ×',
        'Order Status Tracker — 4 states: Placed → Packed → Shipped → Delivered, filled dot = complete',
        'Credit Card Modal — card number, nickname, expiry month/year dropdowns, Cancel + Confirm',
        'Gallery Grid — 4-column uniform grid, click to fullscreen with caption and close ×',
        'Wishlist Card — image, title, quantity selector, Add to Cart CTA, remove ×',
        'Place Order Form — name, delivery address, phone, email, additional wishes, data consent checkbox',
      ],
      accessibilityRules: [
        'Minimum 44×44px touch targets on all interactive elements — specified in annotations',
        'Colour never the sole state indicator — all states also use icons or text labels',
        'Form fields have visible above-field labels, not placeholder-only (placeholders disappear on focus)',
        'Error states described in plain text, not only a red border colour change',
        'Navigation links and CTAs use descriptive text — no "click here" or "more"',
      ],
    },

    accessibility: {
      considerations: [
        'Touch target sizing specified at 44px minimum for all mobile interactive elements',
        'Form label visibility required in the spec — no placeholder-only fields',
        'Alt text guidelines defined for product photography when assets become available',
        'Accent gold passes WCAG AA contrast ratio against dark nav backgrounds',
        'Error states written in plain language, not communicated by colour change alone',
      ],
      implementation: 'Accessibility addressed at specification level through wireframe annotations. Production implementation was outside the scope of the engagement — all guidelines documented for the dev team in the handoff notes.',
    },

    usabilityTesting: {
      goals: [
        'Validate navigation structure against how real users think about furniture categories',
        'Test product detail page hierarchy — does the right information appear in the right order?',
        'Confirm Bespoke service page flow is comprehensible without a sales associate to explain it',
        'Identify friction points in the checkout path before development began',
      ],
      participants: 'No formal user testing — internal stakeholder review rounds only across 3 sessions',
      tasks: [
        'Find and add a navy blue armchair to cart',
        'Understand what the Bespoke service actually requires from you as the customer',
        'Determine whether assembly is available for your postcode before adding to cart',
        'Track a previously placed order and find its delivery status',
      ],
      findings: [
        'Round 1: Category icons with no text labels failed immediately — added text beneath every icon on the homepage grid',
        'Round 1: Bespoke service page read as a wall of text — restructured into a visual 7-step layout with numbered badges',
        'Round 2: Gallery had no product links and no pathway to purchase — flagged as high-value future feature, documented for dev',
        'Round 2: Track Order screen needed a "Continue Shopping" CTA — dead end without it',
        'Round 3: Duplicate order codes in the tracking table identified — escalated to backend team as a data structure issue',
        'Round 3: No confirmation screen after Place Order submission — gap documented and flagged as priority for dev',
      ],
      iterations: [
        'Added text labels beneath all homepage category icons',
        'Restructured Bespoke Services into a 7-step visual layout with number badges and clear offline handoff points',
        'Added "Continue Shopping" CTA to the Track Order screen',
        'Documented both checkout flows (COD form-based + payment gateway) separately for dev handoff',
        'Flagged duplicate order codes as backend data issue requiring a fix before launch',
        'Added confirmation screen wireframe to the handoff pack — marked as critical missing screen',
      ],
    },

    edgeCases: {
      emptyStates: [
        'Empty Cart: not wireframed — flagged as missing screen in handoff documentation',
        'Empty Wishlist: not wireframed — flagged as missing screen in handoff documentation',
        'No gallery content: section hidden or replaced with a branded placeholder — noted in annotations',
      ],
      loadingStates: [
        'Product images: skeleton loading placeholder to be handled in production — aspect ratio specified',
        'Gallery: progressive image loading with aspect-ratio-preserving placeholder',
        'Cart quantity recalculation: instant inline update — no loader needed for this interaction',
      ],
      errorMessages: [
        'Place Order form: required field indicators (*) specified on all mandatory fields',
        'Out-of-stock state: not designed — flagged as production gap in handoff notes',
        '404 and error pages: not designed — flagged as missing screens',
      ],
      failurePaths: [
        'Checkout abandonment: cart state persists across sessions — no clearing on close',
        'Payment failure: not designed at wireframe stage — flagged as critical gap for dev team',
        'Assembly unavailable for postcode: "Delivery only available for your area" message on product page',
      ],
    },

    outcome: {
      metrics: [
        '20 lo-fi wireframe screens delivered, iterated, and stakeholder-approved',
        '4 user flow diagrams mapped: browse and purchase, service flows, wishlist and cart, auth and order tracking',
        '3 user journey maps produced: first-time buyer, returning customer, and Bespoke service customer',
        '1 full information architecture documented with rationale for every structural decision',
        '10+ UX gaps and production risks identified and logged for the dev team',
        'Design system defined: 6 colours, 5 type levels, 10 core components, accessibility annotations throughout',
      ],
      impact: `The complete UI system was delivered and signed off by the Toran stakeholders. All 20 screens were iterated through three rounds of review with clear documentation of every gap, risk, and production decision logged for the development team.

Strong handoff documentation is its own deliverable. Annotating edge cases, flagging data issues, and specifying accessibility requirements meant the next person could pick up exactly where the designs left off — without a single meeting to explain what decisions were made and why.

I've included this project because the design work was done well, because the problems were genuinely interesting, and because a portfolio that only shows shipped products is a portfolio that doesn't tell the whole truth.
`,
      learnings: [
        'A complete, well-documented design system is a valid deliverable even when the product never ships.',
        'Without user testing, stakeholder reviews become your only validation loop. Workable — but you feel the absence of real users at every decision point.',
        'Complex service businesses need their flows fully mapped before UI design begins. Starting screens before understanding the Bespoke process end-to-end cost two full rounds of revision.',
        'Flagging issues clearly in handoff documentation — the duplicate order codes, the currency mismatch, the missing confirmation screen — protects both the designer and the team when circumstances change.',
        'Lo-fi only means production can deviate from intent. Every annotation in a wireframe matters more when you won\'t be there to defend the decisions in sprint planning.',
      ],
    },

    // ============ EVIDENCE IMAGES ============
    evidenceImages: {
      informationArchitecture: '/Furnore/02_Information_Architecture.png',
      journeyMap: '/Furnore/09_Journey_FirstTimeBuyer.png',
      primaryFlow: '/Furnore/04_Flow_Browse_Purchase.png',
      edgeCaseFlow: '/Furnore/06_Flow_Services.png',
      customQuoteFlow: '/Furnore/07_Flow_Wishlist_Cart.png',
      errorFlow: '/Furnore/08_Flow_Order_Tracking.png',
      wireframes: {
        homepage: '/Furnore/wireframes/01_Landing_Page.png',
        shop: '/Furnore/wireframes/03_Category_Accents.png',
        product: '/Furnore/wireframes/02_Product_Detail.png',
        about: '/Furnore/wireframes/11_Layout_Services.png',
        contact: '/Furnore/wireframes/18_Sign_In.png',
        cart: '/Furnore/wireframes/12_My_Cart.png',
      },
    },
    // No liveUrl — product was never launched.
    // =========================================
  },

  // ============================================
  // KISHORE'S PORTFOLIO WEBSITE — K29 DIGITAL IDENTITY
  // SEASON 1 · EPISODE 4
  // ============================================
  {
    id: 'kishore-portfolio',
    title: "Kishore's Portfolio",
    subtitle: 'Squash Coach · Designer · K29 Digital Identity',
    windowColor: 'cyan',
    isActive: true,
    isFeatured: false,
    hasSilhouette: false,
    year: '2024',

    // ============ OMITB CASE FILE ============
    caseNumber: 'ARCONIA-2024-004',
    evidenceCount: 51,
    primarySuspect: 'The Split Identity',
    victim: 'Digital Presence',
    episodeTitle: 'The Case of the Two Careers in One Site',
    // ==========================================

    sitemap: {
      structure: [
        ['kishore-aravind.vercel.app'],
        ['Global Navigation'],
        ['Home', 'Careers', 'Timeline', 'Impact', 'Seals', 'Contact'],
        [
          'K29 Logo + Bio + Labels',
          '3-Tab Selector (Playing / Coaching / Designing)',
          'Vertical Timeline (2020–2026+)',
          'Impact Dashboard + Panels',
          'Verification Seals + Detail Modal',
          'Personal Access (Email + IG + Location)',
        ],
      ],
      userFlows: {
        recruiter: [
          'Arrives via referral or search',
          'Sees K29 hero — player + coach + designer',
          'Navigates via floating nav wheel',
          'Explores Playing Career tab (default)',
          'Switches to Designing Career tab',
          'Checks Impact Dashboard for proof',
          'Opens verification seal for credentials',
          'Sends email or DM via Contact',
        ],
        client: [
          'Arrives via Instagram or LinkedIn',
          'Hero establishes dual identity immediately',
          'Scrolls to Coaching Career tab',
          'Reads timeline of milestones',
          'Reviews stat cards (90+ players, 50+ projects)',
          'Checks Access Protocol section',
          'Makes contact decision',
        ],
        returnVisitor: [
          'Direct URL',
          'Checks for new timeline entries',
          'Reviews updated Impact numbers',
          'Shares portfolio link',
        ],
      },
      entryPoints: [
        'Direct URL',
        'Shared portfolio link',
        'Instagram bio link',
        'Google search (squash coach designer Malaysia)',
      ],
      exitPoints: [
        'Email (via Email card)',
        'Instagram DM (via IG card)',
        'Open Sheet / Typeform (via CTA buttons)',
        'Access Protocol completed',
      ],
      evidenceRoom: {
        primaryPaths: ['#home', '#careers', '#timeline', '#impact', '#seals', '#contact'],
        evidenceLocker: [],
        caseFiles: [],
      },
    },

    role: 'UX Designer (Self-Initiated)',
    duration: '6 weeks',
    team: 'Solo — personal project',
    tools: ['Figma', 'FigJam', 'Vercel (deployment)'],
    liveUrl: 'https://kishore-aravind.vercel.app',
    outcomeSummary:
      'Single-page portfolio designed to hold two distinct professional identities — elite squash coach and visual systems designer — without either diminishing the other.',

    context: `Kishore Aravind is a professional squash coach and performance-driven designer based in Malaysia. He works at the intersection of elite sport, systems thinking, and visual communication — coaching high-performance players to national and international level while designing programs, branding, and digital systems for clubs, academies, and events.

The problem: most people who know Kishore know one half of him. The squash community sees a coach. The design community sees a designer. The portfolio needed to hold both without forcing a choice — and without explaining the connection in a way that felt defensive or confused.

This is a personal project. Every design decision was both a professional and personal one.`,

    problem: `How do you design a single digital identity for someone who is genuinely two things at once — not as side projects, but as parallel full-time careers?

The typical portfolio solves this by picking one thing and burying the other. The typical personal website buries everything in a timeline. Kishore's career isn't a pivot story — it's a dual practice that has been running simultaneously for years. The design had to communicate that parallel structure clearly, without apology or excessive explanation.

The secondary challenge: the floating navigation wheel. A non-standard interaction that either reads as confident and distinctive or confusing and contrived — depending entirely on execution.`,

    businessContext: {
      goals: [
        'Represent both squash coaching and design careers equally and credibly',
        'Establish K29 as a recognisable personal brand mark',
        'Create a contact gateway that filters serious inquiries from casual browsers',
        'Document the full career timeline (2020–2026+) factually, without editorialising',
        'Showcase impact through numbers — not testimonials, not storytelling',
      ],
      kpis: [
        'Time spent on Careers tab (tab engagement per career track)',
        'Scroll depth reaching Impact Dashboard',
        'Verification seal interaction rate (click to open modal)',
        'Contact section engagement (email opens + IG follows)',
        'Access Protocol completion rate',
      ],
      successMetrics: [
        'Target: Portfolio deployed and live at kishore-aravind.vercel.app',
        'Target: All six sections implemented per IA specification',
        'Target: Three career tabs functional with correct default state',
        'Target: All four stat cards populated with real impact numbers',
        'Target: Access Protocol section communicating clearly without a contact form',
      ],
      technicalConstraints: [
        'Single-page application — no routing, no page transitions',
        'Floating nav wheel — custom interaction, no library support',
        'Dark theme throughout — F1-style aesthetic specified by Kishore',
        'Red (#EF233C) for squash, blue (#00B4D8) for design — colour-coded dual identity',
        'No contact form — email card and Instagram card only',
        'Vercel deployment — no backend, fully static',
      ],
    },

    competitiveAnalysis: [
      {
        name: 'Standard Coach Websites',
        strengths: 'Clear service descriptions, easy to book, trust-building testimonials',
        weaknesses: 'Look like every other coach website — zero personality, zero differentiation',
        opportunities: 'K29 aesthetic signals a different level of professional — premium, designed, intentional',
      },
      {
        name: 'Standard Designer Portfolios',
        strengths: 'Case studies, process documentation, visible work',
        weaknesses: 'No room for athletic identity — reductive for someone with Kishore\'s dual background',
        opportunities: 'The athletic career is the differentiator — sport is where the systems thinking comes from',
      },
      {
        name: 'Athlete Personal Sites',
        strengths: 'Story-forward, emotional, inspiring',
        weaknesses: 'Heavy on narrative, light on credibility signals and professional utility',
        opportunities: 'Impact Dashboard approach — facts over feelings, numbers over storytelling',
      },
      {
        name: 'Multi-Role Freelancer Portfolios',
        strengths: 'Shows range, covers multiple client types',
        weaknesses: 'Usually confusing — impossible to know who the site is for',
        opportunities: 'Tab-based career selector makes it explicit: choose your lens, get relevant info',
      },
    ],

    personas: [
      {
        name: 'Alex — Sports Academy Director / Creative Client',
        goals: 'Find a qualified coach or creative design partner',
        behaviours: 'Referral link or direct search. Uses desktop primarily, skims for credibility signals fast.',
        painPoints: 'The dual identity is initially confusing — "Is this a coaching site or a design site?"',
        needs: 'Clear role signal within 5 seconds. Verification that credentials are real. A direct contact path.',
      },
      {
        name: 'Squash Community Contact',
        goals: 'Connect with Kishore around coaching, clinics, or competition',
        behaviours: 'Arrives via the squash network — Instagram, WhatsApp forward, or event encounter',
        painPoints: 'Design content feels irrelevant — wants to get to coaching career and contact quickly',
        needs: 'Playing Career tab prominent by default. Impact numbers that reflect coaching, not just design.',
      },
      {
        name: 'Design Client / Collaborator',
        goals: 'Understand what Kishore designs and whether his work fits their brief',
        behaviours: 'Instagram referral, direct search. Mobile browser.',
        painPoints: 'Squash content dominates first impression — design work less visible',
        needs: 'Designing Career tab clearly accessible. Design Output panel in Impact section well-populated.',
      },
    ],

    journeyMap: [
      {
        stage: 'Discover',
        userAction: 'Hears about Kishore via a squash contact or Google search',
        emotion: 'Neutral, curious',
        painPoint: 'No rich preview from shared link — no OG tags on first version',
        designOpportunity: 'Add OG meta tags so shared links display K29 branding and role summary',
      },
      {
        stage: 'Orient',
        userAction: 'Lands on homepage, sees K29 logo, reads "Player → Coach → Designer"',
        emotion: 'Intrigued, slightly puzzled by nav wheel',
        painPoint: 'Nav wheel is unconventional — first-time users don\'t know it\'s draggable',
        designOpportunity: '"Drag to navigate" tooltip on first load. Visual role summary below hero headline.',
      },
      {
        stage: 'Explore',
        userAction: 'Scrolls or uses nav wheel. Sees Playing Career tab by default.',
        emotion: 'Engaged, reading',
        painPoint: 'Three tabs — which is most relevant? No prompt to guide selection.',
        designOpportunity: '"What are you looking for?" prompt above tabs. TL;DR summary per timeline entry.',
      },
      {
        stage: 'Evaluate',
        userAction: 'Studies stat cards (90+ players, 50+ projects), checks verification seals',
        emotion: 'Impressed, wanting proof',
        painPoint: 'Seal click behaviour not obvious. No downloadable CV or portfolio PDF.',
        designOpportunity: 'Hover state hint on seals: "Click to learn more". Add downloadable portfolio PDF button.',
      },
      {
        stage: 'Connect',
        userAction: 'Decides to reach out. Opens email or Instagram card.',
        emotion: 'Confident, ready to act',
        painPoint: 'Email opens external mail client — friction on mobile. No on-page contact form.',
        designOpportunity: 'Add embedded contact form as fallback. Show expected reply time ("Responds in 24h").',
      },
    ],

    usersAndNeeds: {
      primaryUsers:
        'Sports academy directors, squash clubs, and event organisers seeking a credentialed high-performance coach. Secondary: design clients and creative collaborators who need someone at the intersection of sport, systems, and visual communication.',
      needs: [
        'Clear role signal within seconds — coaching or design, or both',
        'Proof-first architecture — credentials, numbers, verifiable seals before any copy',
        'A contact path that doesn\'t require a form or a booking tool',
        'The timeline as a factual record, not a marketing narrative',
        'The dual identity treated as a feature, not a liability',
      ],
      constraints: [
        'No contact form — email card and Instagram only, by design',
        'No testimonials — impact data only, by design',
        'Floating nav wheel as fixed interaction — non-negotiable aesthetic choice',
        'Dark theme only — no light mode',
        'Single page — all sections must coexist without overwhelming',
      ],
    },

    research: {
      methods: [
        'Self-directed IA mapping — full site structure documented before any screen was designed',
        'User flow mapping for three distinct visitor types (sports client, design client, general referral)',
        'User journey mapping for primary persona (Alex, Sports Academy Director)',
        'Competitive review of athlete personal sites, coach websites, and designer portfolios',
        'Wireframe iteration — three rounds from rough sketch to annotated lo-fi',
      ],
      participants: 'Self-directed with informal feedback from 2 peers across wireframe rounds',
      duration: '2 weeks planning and research, 4 weeks design and iteration',
      approach: `Designing your own portfolio is a specific kind of design challenge — you have total creative authority and zero external brief, which makes it harder, not easier. The risk is designing what you find impressive rather than what communicates clearly to the people who need to understand you.

The discipline was to treat it like a client project. IA first, flows second, wireframes third. No visual design decisions before the structure was locked. The floating nav wheel was the only element that broke this rule — it was a non-negotiable aesthetic starting point, and everything else was designed around its implications.`,
      objectives: [
        'Define the information hierarchy for a dual-career identity',
        'Map the navigation system for a single-page with six distinct sections',
        'Identify which content belongs in each section without overlap',
        'Establish how proof (credentials, impact numbers) should be sequenced',
      ],
      assumptions: [
        'Floating nav wheel will intrigue before it confuses — assumed, informed by interaction testing',
        'Tab-based career selector solves the "which career is this for?" problem — confirmed in peer review',
        'Impact numbers alone are sufficient trust signals — no testimonials needed — assumed, held',
        'Dark theme reads as premium and distinctive, not inaccessible — confirmed via contrast testing',
      ],
    },

    insights: {
      key: `A dual-career portfolio isn't a problem to solve — it's a positioning advantage. The challenge is design sequencing: make the structure legible before you make it impressive. Users need to know which lens to use before they start reading.`,
      findings: [
        'Tab-based career selector (Playing / Coaching / Designing) resolved the "which site is this?" confusion immediately in peer review.',
        'The Impact Dashboard — big numbers, short labels — communicated credibility faster than any biography section.',
        'Verification seals needed a click affordance — the credential badges looked like decorative elements without a hover state hint.',
        'The floating nav wheel required a first-load tooltip to become intuitive rather than confusing.',
        'Playing Career as the default tab was correct — it\'s the rarest credential and the strongest differentiator against other designers.',
        '"Future →" entry on the timeline (2026+) was the most-noticed element in peer review — it signals ambition without overpromising.',
        'Access Protocol section in Contact reframed "how to reach me" as a professional boundary, not a barrier.',
      ],
    },

    informationArchitecture: {
      description: `Six-section single-page architecture: Home establishes identity, Careers delivers role-specific content via tabs, Timeline provides factual chronology, Impact proves credibility through data, Seals verify credentials, Contact enables connection. Navigation via floating wheel — unconventional but consistent with the K29 brand aesthetic. Full IA documented as a PNG diagram (Exhibit A).`,
      decisions: [
        'Playing Career as default tab — rarest credential, strongest first impression',
        'Timeline in its own section — chronology deserves dedicated space, not buried in Careers',
        'Verification seals with click-to-expand modal — credentials shown, not just listed',
        '"Future →" as a live timeline entry — signals ongoing ambition, not a completed career',
        'Access Protocol under Contact — reframes "contact me" as a considered, professional exchange',
        'No footer — single page ends at Contact, no escape to standard footer links',
      ],
      hierarchy: [
        ['Home (Hero + K29 Logo + Squash/Space Labels)'],
        ['Careers (3-Tab: Playing / Coaching / Designing)'],
        ['Timeline (Vertical 2020–2026+)'],
        ['Impact (Dashboard + Coaching Panel + Design Output)'],
        ['Seals (4 Clickable Verification Badges)'],
        ['Contact (Email + IG + Location + Access Protocol)'],
      ],
    },

    userFlows: {
      primary: [
        { label: 'Referral link or direct URL', type: 'start' as const },
        { label: 'Hero: K29 + Player → Coach → Designer', type: 'action' as const },
        { label: 'Nav wheel or scroll to Careers', type: 'action' as const },
        { label: 'Playing Career tab (default)', type: 'action' as const },
        { label: 'Timeline: milestones 2020–2026', type: 'action' as const },
        { label: 'Impact Dashboard: stat cards', type: 'action' as const },
        { label: 'Verification seals: click to expand', type: 'decision' as const },
        { label: 'Contact: Access Protocol → Email / DM', type: 'end' as const },
      ],
      edgeCase: [
        { label: 'Design client arrives from Instagram', type: 'start' as const },
        { label: 'Hero reads as sports-first — mild confusion', type: 'action' as const },
        { label: 'Spots Designing Career tab', type: 'action' as const },
        { label: 'Switches tab — design work loads', type: 'action' as const },
        { label: 'Checks Design Output panel in Impact', type: 'action' as const },
        { label: 'Opens email card for project inquiry', type: 'end' as const },
      ],
      error: [
        { label: 'User on slow mobile connection', type: 'start' as const },
        { label: 'Page loads — critical above-fold content first', type: 'action' as const },
        { label: 'Images below fold load progressively', type: 'action' as const },
        { label: 'Nav wheel functional before all assets loaded', type: 'action' as const },
        { label: 'Full page experience available once loaded', type: 'end' as const },
      ],
    },

    interactionDesign: {
      approach: `The floating navigation wheel is the defining interaction of the portfolio — it either works or it doesn't. The design philosophy was: make the unconventional choice, then make it as clear as possible. The wheel needs a first-load hint, hover affordances, and smooth snap-to-section behaviour to earn its place. Everything else is conventional scroll and tab interactions, kept invisible to let content lead.`,
      decisions: [
        'Floating nav wheel: drags to scroll between sections, snaps on release',
        '"Drag to navigate" tooltip on first load — disappears after first interaction',
        'Career tabs: click to switch, active tab highlighted in section colour (red/blue)',
        'Timeline entries: text-only, no expand — facts in plain sight',
        'Verification seal click: modal overlay with credential detail and close ×',
        'Stat cards: static — no animated counters (performance and authenticity)',
        'Contact cards: email opens native mail client, IG opens profile in new tab',
        'Access Protocol: static text block — not a form, not a process, just information',
      ],
    },

    wireframes: {
      changes: [
        'Round 1: Category icons with no text labels — added descriptive text beneath all tab buttons',
        'Round 1: Timeline and Careers in the same section — separated into distinct sections once content volume became clear',
        'Round 2: Verification seals looked decorative — added hover state "Click to learn more" and modal design',
        'Round 2: Contact was a standard form — removed entirely per brief, replaced with email card + IG card + Access Protocol',
        'Round 3: Impact section was a single stat grid — split into Coaching Impact panel and Design Output panel to serve both audiences',
        'Round 3: "Future →" timeline entry added — emerged from peer feedback as the most compelling visual moment',
      ],
      reasoning: 'The single biggest structural decision was separating Timeline from Careers. Initially they were one section — Careers held both the tab-based content and the chronology. Separating them gave the timeline its own weight and made both sections more scannable. A timeline buried inside a tabbed interface is a timeline nobody reads.',
      tradeoffs: [
        'Floating nav wheel vs. standard sticky nav — chose the wheel; distinctiveness outweighs familiarity for a personal brand',
        'No light mode — accepted; dark theme is the K29 brand, not a preference',
        'No blog or writing section — accepted per brief; this is an access point, not a content platform',
        'No downloadable CV — noted as a gap in the IA review; flagged for V2',
        'No contact form — accepted per brief; Access Protocol is the deliberate replacement',
      ],
    },

    designSystem: {
      colors: [
        { name: 'Squash Red', value: '#EF233C', usage: 'Squash career accent, Playing Career tab, red label' },
        { name: 'Design Blue', value: '#00B4D8', usage: 'Design career accent, Designing Career tab, Space label' },
        { name: 'Base Black', value: '#0A0A0A', usage: 'Page background — true dark, not charcoal' },
        { name: 'Surface Dark', value: '#141414', usage: 'Card backgrounds, section surfaces' },
        { name: 'White (Text)', value: '#F5F5F5', usage: 'Primary text on dark backgrounds' },
        { name: 'Mid Gray', value: '#888888', usage: 'Secondary text, captions, labels' },
      ],
      typography: [
        { level: 'K29 Display (Custom / F1-style)', size: '80px+', weight: '900', lineHeight: '0.9' },
        { level: 'H1 Headline', size: '40px mobile / 56px desktop', weight: '700', lineHeight: '1.1' },
        { level: 'Section Label (tracked caps)', size: '11px', weight: '700', lineHeight: '1.4' },
        { level: 'Body / Timeline', size: '14px', weight: '400', lineHeight: '1.65' },
        { level: 'Stat Number (Impact)', size: '48px', weight: '700', lineHeight: '1.0' },
      ],
      spacing: '8px base. Dark sections: 80px vertical padding desktop, 48px mobile. Timeline: 40px between entries.',
      components: [
        'K29 Logo Mark (SQUASH label red + SPACE label blue)',
        'Career Tab Selector (3 tabs, colour-coded active state)',
        'Timeline Entry (year badge + title + 1-line context)',
        'Stat Card (big number + short label + colour underline)',
        'Coaching Impact Panel (list-based coaching data)',
        'Design Output Panel (list-based design metrics)',
        'Verification Seal (circular badge + click modal)',
        'Contact Card (icon + handle + CTA button)',
        'Access Protocol Block (plain text, no form)',
        'Floating Nav Wheel (draggable, section-snapping)',
      ],
      accessibilityRules: [
        'All text meets WCAG AA contrast on dark backgrounds (#F5F5F5 on #0A0A0A = 18.1:1)',
        'Tab buttons include visible focus ring in career colour (red or blue)',
        'Verification seal modals trap focus and close on Escape key',
        'Stat card numbers include visible text labels — not number-only',
        'Floating nav wheel has keyboard alternative (arrow key section navigation)',
      ],
    },

    accessibility: {
      considerations: [
        'Dark theme contrast verified at WCAG AA across all text sizes',
        'Career tab active state communicated by colour + underline + aria-selected attribute',
        'Verification seal modals: focus trapped inside, Escape to close, close button labelled',
        'Stat cards: numbers always accompanied by text labels',
        'Floating nav: keyboard fallback via arrow keys for users who cannot drag',
      ],
      implementation: 'Accessibility reviewed at wireframe stage and documented in handoff annotations. The floating nav wheel required specific attention — drag interaction needs a keyboard-accessible fallback. Arrow key navigation between sections documented as a production requirement.',
    },

    usabilityTesting: {
      goals: [
        'Validate that the dual-career identity is legible within 10 seconds',
        'Confirm the floating nav wheel is intuitive after first-load tooltip',
        'Test whether three tabs are enough or require a "What are you looking for?" prompt',
        'Verify Impact numbers are readable and credible without context',
      ],
      participants: '2 informal peer reviews across 3 wireframe rounds',
      tasks: [
        'Without scrolling: tell me what Kishore does and who this site is for',
        'Navigate to the Designing Career section using the nav wheel',
        'Find evidence that Kishore\'s coaching credentials are verified',
        'Identify how to contact Kishore from the Contact section',
      ],
      findings: [
        'Round 1: "Player → Coach → Designer" tag line passed the 5-second test — dual identity understood immediately',
        'Round 1: Nav wheel confused without tooltip — added "Drag to navigate" on first load',
        'Round 2: Three tabs needed a default-active visual indicator — added filled state for Playing Career (default)',
        'Round 2: Stat cards read as placeholder text until numbers were populated — needed real data before review',
        'Round 3: "Future →" entry on timeline was the single most-noticed element — kept, made slightly more prominent',
        'Round 3: Access Protocol section needed a heading — added "ACCESS PROTOCOL" in tracked caps to distinguish it from the contact cards',
      ],
      iterations: [
        'Added "Drag to navigate" first-load tooltip to nav wheel',
        'Added filled/active state to Playing Career tab as default',
        'Populated all stat cards with real Kishore Aravind impact data',
        '"Future →" timeline entry made slightly larger and styled differently from completed entries',
        'Added "ACCESS PROTOCOL" section heading in Contact',
        'Added reply time indicator: "Responds within 24 hours (email)" in Access Protocol block',
      ],
    },

    edgeCases: {
      emptyStates: [
        'Timeline future entry ("Future →"): styled as dashed border, distinguishable from completed milestones',
        'Designing Career tab: if no design projects listed, shows "Projects in progress — check back soon"',
      ],
      loadingStates: [
        'Page load: K29 logo and hero text load first — critical identity content prioritised',
        'Timeline images: if any — lazy-loaded with aspect-ratio placeholder',
        'Verification seal modal: opens instantly (static content), no loading state needed',
      ],
      errorMessages: [
        'Email card (mailto): if mail client unavailable, email address visible as plain text for manual copy',
        'Instagram card: opens in new tab — if blocked, displays @handle as plain text fallback',
      ],
      failurePaths: [
        'Nav wheel drag fails on touch (edge case): scroll behaviour falls back to native browser scroll',
        'Verification modal fails to open: credential information also visible as text below the seal',
      ],
    },

    outcome: {
      metrics: [
        'Six-section single-page portfolio designed, iterated, and deployed to Vercel',
        'Three-tab career selector implemented with correct default state (Playing Career active)',
        'Four stat cards populated with verified impact numbers (90+ players, 50K+ donated, etc.)',
        'Four verification seals with click-to-expand modal implemented',
        'User journey and user flow documented for three distinct visitor types',
        'Full IA, wireframe system, and design system documented for handoff',
      ],
      impact: `The portfolio is live. The hardest problem — how to hold two careers in one digital identity without either diminishing the other — was solved structurally, not narratively. The tab-based career selector means visitors self-select the lens that matters to them. The Impact Dashboard means they don't need to take Kishore's word for it.

This is a self-initiated project, which means every decision was both a design decision and a statement about how Kishore sees himself. That makes the process documentation as important as the outcome.`,
      learnings: [
        'Designing your own portfolio is the hardest client brief — you know too much and can justify anything. Treating it like a client project (IA first, copy second, visuals last) was the only way to stay honest.',
        'The floating nav wheel is a good example of a non-negotiable aesthetic constraint that actually pushed the design somewhere interesting — constraints from personality can be as useful as constraints from engineering.',
        'A dual identity isn\'t a problem to explain — it\'s a structure to reveal. The tab-based selector made the dual career feel like a feature, not a confusion.',
        'Impact numbers communicate more than any biography. "90+ players coached" is more memorable than three paragraphs about coaching philosophy.',
        'Self-initiated projects need an external pressure to finish. Setting a deployment deadline (Vercel) and treating it like a client handoff was what got the portfolio shipped.',
      ],
    },

    evidenceImages: {
      informationArchitecture: '/Kishore\'sPortfolioWebsite/InformationArchitecture.png',
      journeyMap: '/Kishore\'sPortfolioWebsite/UserJourneyMapping.png',
      primaryFlow: '/Kishore\'sPortfolioWebsite/UserFlow.png',
      edgeCaseFlow: '/Kishore\'sPortfolioWebsite/UserFlow.png',
      customQuoteFlow: '/Kishore\'sPortfolioWebsite/UserFlow.png',
      errorFlow: '/Kishore\'sPortfolioWebsite/UserFlow.png',
      wireframes: {
        homepage: '/Kishore\'sPortfolioWebsite/wireframe_kishore.png',
        shop: '/Kishore\'sPortfolioWebsite/wireframe_kishore.png',
        product: '/Kishore\'sPortfolioWebsite/K29_Portfolio_HQ.png',
        about: '/Kishore\'sPortfolioWebsite/K29_Portfolio_HQ.png',
        contact: '/Kishore\'sPortfolioWebsite/InformationArchitecture.png',
        cart: '/Kishore\'sPortfolioWebsite/UserJourneyMapping.png',
      },
    },
  },

// ─────────────────────────────────────────────────────────────────────────────
  // THE EXTRAS - SMALL CLIENT PROJECTS
  // SEASON 1 · EPISODE 4
// ─────────────────────────────────────────────────────────────────────────────

  {
    id: 'the-extras',
    title: 'The Extras',
    subtitle: 'Branding · Graphic Design · Photography Direction',
    windowColor: 'coral' as WindowColor,
    isActive: true,
    isFeatured: false,
    hasSilhouette: false,
    year: '2024–25',

    caseNumber: 'ARCONIA-2024-EXT',
    evidenceCount: 9,
    primarySuspect: 'The Blank Canvas',
    victim: 'Brand Identity',
    episodeTitle: "The Case of the Jobs That Don't Fit a Template",

    sitemap: {
      structure: [
        ['The Extras'],
        ['Mini Case 01: Kingdom of Sweets Banner'],
        ['Mini Case 02: Sooraj Nikam LinkedIn Banner'],
        ['Mini Case 03: Aadharsham Photography Portfolio'],
      ],
      userFlows: {
        recruiter: ['Enter Arconia', 'Browse The Extras', 'View mini-cases', 'Contact investigator'],
        client: ['Enter Arconia', 'View graphic design work', 'Review branding examples', 'Initiate consultation'],
        returnVisitor: ['Direct case access', 'Review design outputs'],
      },
      entryPoints: ['The Arconia (Home)', 'Direct case links'],
      exitPoints: ['Contact investigator', 'LinkedIn profile', 'Email outreach'],
      evidenceRoom: {
        primaryPaths: ['/', '/cases'],
        evidenceLocker: [],
        caseFiles: [],
      },
    },

    role: 'Graphic Designer · Brand Designer',
    duration: 'Varies per project',
    team: 'Freelance — independent client work',
    tools: ['Figma', 'Adobe Illustrator', 'Canva Pro'],
    outcomeSummary:
      'Three client deliverables spanning physical signage, personal branding, and photography portfolio direction — each solved a distinct visual communication problem.',

    context: `Not every project fits a UX case study format. Some jobs are smaller, faster, and more personal — a banner for a friend's candy shop toy, a LinkedIn header for a returning client, a digital booklet for a photographer who needs to share his portfolio without email attachments. These are those projects.`,

    problem: `The challenge in smaller design work is delivering something that feels considered, not rushed. A banner for a toy candy dispenser still needs to honour a brand identity the client spent years working inside. A LinkedIn header still needs to communicate credibility in 3 seconds. Small scope doesn't mean small stakes.`,

    businessContext: {
      goals: [
        "Kingdom of Sweets: Create an arch banner for a personal pick-n-mix toy, referencing the client's time working at Kingdom of Sweets",
        'Sooraj Nikam: Design a LinkedIn banner that communicates a triple creative identity in one glance',
        'Aadharsham Photography: Build an online-shareable portfolio slideshow for an architectural photographer',
      ],
      kpis: ['Client satisfaction', 'Brand fidelity', 'Shareability'],
      successMetrics: ['Approved by client', 'Matches brand references', 'Works across devices'],
      technicalConstraints: [
        'Kingdom of Sweets: Must match existing KoS brand colours — purple, gold, lime green',
        'Sooraj Nikam: LinkedIn banner dimensions 1584 × 396px, dark background',
        'Aadharsham: PDF booklet must translate to a shareable interactive format',
      ],
    },

    competitiveAnalysis: [],
    personas: [],
    journeyMap: [],

    // ── PREVIOUSLY MISSING FIELDS ─────────────────────────────────────────────
    usersAndNeeds: {
      primaryUsers:
        'Individual clients with personal or professional branding needs. Not a mass-market audience — each project had a single decision-maker and a specific, personal brief.',
      needs: [
        'Design that honours an existing brand identity (KoS) without simply copying it',
        'A professional LinkedIn presence that feels personal, not corporate',
        'A shareable portfolio format that replaces a PDF attachment',
      ],
      constraints: [
        'Kingdom of Sweets: Physical print dimensions constrained by the toy dispenser arch',
        'Sooraj Nikam: LinkedIn banner must read well at thumbnail size and full size',
        'Aadharsham: No new photography session — must work with existing booklet assets',
      ],
    },

    research: {
      methods: [
        'Client intake conversation for each project (brief, references, constraints)',
        'Brand audit of Kingdom of Sweets identity system',
        'Competitive review of LinkedIn banner formats for creative professionals',
        'Content audit of the Aadharsham PDF booklet before restructuring',
      ],
      participants: 'One client per project — direct brief and review cycle only',
      duration: '1–3 days per project',
      approach: `Research for small client work is almost entirely about listening. The Kingdom of Sweets client brought a Samsung Notes sketch and three brand references. Sooraj brought a tagline and an existing headshot. Aadharsham brought a PDF. The job in each case was to extract what mattered — the arch proportions, the tagline rhythm, the booklet's category structure — and build from that, not from a template.`,
    },
    // ─────────────────────────────────────────────────────────────────────────

    insights: {
      key: "Constraints from a client's history — a job they used to love, a brand they want to honour — are the most interesting constraints to design within.",
      findings: [
        "Kingdom of Sweets: The client's hand-drawn arch sketch was the exact right shape. Trust the brief.",
        'Sooraj Nikam: "Conceptualize · Develop · Deliver" works as both a tagline and a layout rhythm.',
        'Aadharsham: A PDF portfolio is a dead end. An interactive gallery is an invitation.',
      ],
    },

    informationArchitecture: { description: '', decisions: [] },
    userFlows: { primary: [] },
    interactionDesign: { approach: '', decisions: [] },
    wireframes: { changes: [], reasoning: '', tradeoffs: [] },

    designSystem: {
      colors: [
        { name: 'KoS Purple', value: '#5B2C8D', usage: 'Kingdom of Sweets primary' },
        { name: 'KoS Gold', value: '#F5A623', usage: 'Kingdom of Sweets text and accents' },
        { name: 'KoS Green', value: '#4CAF50', usage: 'Kingdom of Sweets border' },
        { name: 'Sooraj Dark', value: '#0D1B2A', usage: 'LinkedIn banner background' },
        { name: 'Aadharsham White', value: '#FFFFFF', usage: 'Photography booklet base' },
      ],
      typography: [
        { level: 'KoS Display', size: 'Large', weight: '900', lineHeight: '1.0' },
        { level: 'LinkedIn Headline', size: '40px', weight: '300', lineHeight: '1.2' },
        { level: 'Photography Caption', size: '12px', weight: '400', lineHeight: '1.5' },
      ],
      spacing: 'Per project',
      components: ['Arch Banner', 'LinkedIn Header', 'Photography Slideshow'],
      accessibilityRules: ['Contrast compliance on all text elements'],
    },

    accessibility: { considerations: [], implementation: '' },

    usabilityTesting: {
      goals: [],
      participants: 'Client review only',
      tasks: [],
      findings: [],
      iterations: [],
    },

    edgeCases: {
      emptyStates: [],
      loadingStates: [],
      errorMessages: [],
      failurePaths: [],
    },

    outcome: {
      metrics: [
        'Kingdom of Sweets banner: client-approved across two texture variants',
        'LinkedIn banner: two layout versions delivered, one selected for live use',
        'Aadharsham: interactive gallery replacing a static PDF',
      ],
      impact: `Three different clients, three different briefs, three different visual languages. The common thread: listen to what the client actually brings into the room — a sketch on a notes app, a brand they used to work for, a booklet they've been carrying around — and design from that, not from a template.`,
      learnings: [
        "The client's sketch is always a design brief in disguise.",
        'A LinkedIn banner is a 3-second argument for taking someone seriously.',
        'A PDF portfolio is a dead end. An interactive gallery is an invitation.',
      ],
    },
  },

  // ============================================
  // NARRATIVE — CONTENT CREATION SUITE
  // SEASON 1 · EPISODE 5
  // ============================================
  {
    id:             "nicheux-narrative",
    caseNumber:     "NICHEUX-2026-W1",
    title:          "NicheUX — The Narrative",
    episodeTitle:   "When Design Meets Storytelling",
    year:           "2026",
    role:           "Founder · Content Strategist · Designer",
    team:           "NicheUX Studio (Solo)",
    duration:       "Week 1 of Ongoing",
    platforms:      ["Instagram", "LinkedIn", "Threads"],
    tags:           ["Content Strategy", "Brand Identity", "Social Media", "Motion", "Editorial"],
    context:        "NicheUX is a design and storytelling studio built on a single thesis: that design without story decorates, but design with story directs. Week One was about establishing that thesis in public — before there was an audience, before there were clients, before there was a following. Three pieces, three formats, one argument.",
    problem:        "How do you build an audience for a studio whose entire value proposition is something most people cannot see — the gap between information and meaning?",
    outcomeSummary: "Three pieces shipped. Brand voice established. Visual language seeded. Audience building begun.",
    usersAndNeeds: {
      primaryUsers: "Founders, brand leads, and designers who feel their work is not landing the way it should.",
      needs: [
        "Understand why technically good design sometimes fails to connect",
        "See concrete examples of behaviour design principles in everyday contexts",
        "Find a studio voice they can trust before committing to a project",
      ],
      constraints: [
        "No existing audience at launch — every piece had to earn attention from zero",
        "Solo operation — research, write, design, film, and publish all in one week",
        "Brand identity still being developed while content was already going live",
      ],
    },
    research: {
      methods: [
        "Content audit of competitor studios to identify positioning gap",
        "Location scouting at London Underground stations for Reel shoot",
        "Tone and format testing across long-form, carousel, and short-form video",
      ],
      participants: "Internal — no external research participants for launch content",
      duration: "One week (Jan–Feb 2026)",
      approach: "Build in public. Each piece is both a product and a hypothesis — testing which format and voice generates the most meaningful response from the right kind of audience.",
    },
  },
];
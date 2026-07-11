import { Prompt, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    iconName: 'MessageSquare',
    gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    description: 'Conversational advice, mental sandboxes, general-purpose reasoning, and custom personas.'
  },
  {
    id: 'claude',
    name: 'Claude',
    iconName: 'Sparkles',
    gradient: 'from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400',
    description: 'Deep analytical reading, nuanced writing, complex logical synthesis, and coding blueprints.'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    iconName: 'BrainCircuit',
    gradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    description: 'Multimodal capabilities, factual synthesis, web grounding search, and code parsing.'
  },
  {
    id: 'image-generation',
    name: 'Image Gen',
    iconName: 'Image',
    gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    description: 'Midjourney, DALL-E 3, and Stable Diffusion descriptors for photorealism, art, and vectors.'
  },
  {
    id: 'image-to-video',
    name: 'Image to Video',
    iconName: 'Video',
    gradient: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400',
    description: 'Cinematic camera prompts, physics parameters, and keyframes for Runway Gen-3 and Sora.'
  },
  {
    id: 'coding',
    name: 'Coding',
    iconName: 'Code',
    gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    description: 'TypeScript, React, Python, refactoring guidelines, algorithms, and modular design patterns.'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    iconName: 'Megaphone',
    gradient: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    description: 'SEO strategies, SaaS landing copy, click-through optimizations, and cold email frameworks.'
  },
  {
    id: 'business',
    name: 'Business',
    iconName: 'Briefcase',
    gradient: 'from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400',
    description: 'Venture pitch coaching, SaaS pricing tiers, OKR generation, and financial projections.'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    iconName: 'Share2',
    gradient: 'from-pink-500/20 to-fuchsia-500/10 border-pink-500/30 text-pink-400',
    description: 'Viral hooks, Twitter/X thread structures, TikTok descriptions, and LinkedIn stories.'
  },
  {
    id: 'writing',
    name: 'Writing',
    iconName: 'PenTool',
    gradient: 'from-lime-500/20 to-green-500/10 border-lime-500/30 text-lime-400',
    description: 'Fiction character building, developmental editing, show-dont-tell scenes, and prose style.'
  }
];

// High-quality hand-vetted prompts (seed set)
const SEED_PROMPTS: Prompt[] = [
  {
    id: 'chatgpt-socratic',
    title: 'Socratic Mind Guide',
    description: 'Enables ChatGPT to act as an expert Socratic tutor, questioning assumptions instead of handing out answers.',
    category: 'chatgpt',
    author: 'CozyPrompt Team',
    likes: 345,
    copies: 1240,
    difficulty: 'Intermediate',
    variables: ['Topic', 'Learning Level'],
    isPremium: false,
    content: `You are a Socratic tutor guiding a student studying [Topic] at a [Learning Level] level.
Your goal is to help the student understand the concepts deeply by asking guided questions rather than explaining directly.
Follow these constraints:
1. Ask only ONE question at a time.
2. If the student answers incorrectly, do not point out the error directly. Instead, ask a question that highlights the logical contradiction in their answer.
3. If they are correct, validate them with a short phrase and pose a deeper question.
4. Keep answers supportive, encouraging, and under 150 words.`
  },
  {
    id: 'chatgpt-summarizer',
    title: 'Universal Concept Summarizer',
    description: 'Synthesizes dense literature into clear, actionable summaries with visual analogies.',
    category: 'chatgpt',
    author: 'Alex Carter',
    likes: 512,
    copies: 2011,
    difficulty: 'Beginner',
    variables: ['Source Material', 'Core Objective'],
    isPremium: false,
    content: `Analyze the following text on [Source Material]:
Your task is to summarize the content focused on [Core Objective]. Provide the output in these four distinct sections:
1. **The Core Thesis**: One single sentence describing the key takeaway.
2. **Mental Sandbox**: Create a vivid, real-world metaphor or analogy to explain the mechanics of the concept to a complete beginner.
3. **The 3 Golden Nuggets**: Three bullet points detailing high-impact concepts or findings, styled with bold subheadings.
4. **Actionable Roadmap**: Two practical, immediate steps a professional can take to apply this tomorrow.`
  },
  {
    id: 'claude-analytical',
    title: 'Analytical System Evaluator',
    description: 'Instructs Claude to deconstruct a system into key feedback loops, risks, and hidden variables.',
    category: 'claude',
    author: 'Dr. Helen Vance',
    likes: 723,
    copies: 2980,
    difficulty: 'Advanced',
    variables: ['System/Domain', 'Primary Bottleneck'],
    isPremium: true,
    content: `You are an elite systems analysis AI. We are studying the domain: [System/Domain].
Analyze the system with focus on this bottleneck: [Primary Bottleneck].
Deconstruct the system using first-principles reasoning:
1. **Structural Components**: Identify the key elements and their relationship.
2. **Information Feedbacks**: Chart the reinforcing and balancing loops within the system.
3. **Hidden Variables**: Uncover the counter-intuitive variables that most observers miss.
4. **Leverage Points**: Suggest three precise, low-cost interventions to relieve the bottleneck.`
  },
  {
    id: 'claude-artifact',
    title: 'Artifact UI Prototype Architect',
    description: 'Directs Claude to specify interactive, single-view dashboards with clean UI frameworks.',
    category: 'claude',
    author: 'CozyPrompt Team',
    likes: 412,
    copies: 1390,
    difficulty: 'Advanced',
    variables: ['App Concept', 'Core Tech Stack'],
    isPremium: false,
    content: `Act as a senior front-end architect specializing in creating modular single-page UI prototypes for [App Concept] using [Core Tech Stack].
Your response must follow this framework:
1. **UI Layout Architecture**: Define the responsive layout columns, grid systems, and spacing metrics.
2. **State Management Flow**: List the local state nodes and the event callbacks modifying them.
3. **Design Tokens**: Specify a dark-mode palette consisting of 5 keys (Primary, Accent, Background, Border, Muted Text).
4. **Animation Map**: Outline the layout entrance and exit transition dynamics.`
  },
  {
    id: 'gemini-multimodal',
    title: 'Multimodal Spatial Critic',
    description: 'Perfect for analyzing image layouts, structural maps, or UI screenshots uploaded to Gemini.',
    category: 'gemini',
    author: 'UX Architect',
    likes: 830,
    copies: 3120,
    difficulty: 'Intermediate',
    variables: ['Image Context', 'Design Style Goal'],
    isPremium: true,
    content: `Analyze the provided image containing [Image Context] with respect to [Design Style Goal] design standards.
Please provide:
1. **Spatial Hierarchy**: Rate the visual weight from 1-10 and explain which elements dominate the user's focus.
2. **Color Palette Assessment**: Identify the hex codes of dominant colors and evaluate their contrast ratios.
3. **Typography Audit**: Critique the font weights, line heights, and letter spacing.
4. **UX Friction Points**: Highlight three specific areas of high cognitive load or layout misalignment.`
  },
  {
    id: 'img-midjourney-cinematic',
    title: 'Cinematic Photorealism Master',
    description: 'Generates dramatic, camera-perfect, photorealistic cinematic scene descriptions.',
    category: 'image-generation',
    author: 'LensMaster Studio',
    likes: 1240,
    copies: 5820,
    difficulty: 'Advanced',
    variables: ['Subject', 'Lighting Mode', 'Camera Lens', 'Aspect Ratio'],
    isPremium: false,
    content: `A cinematic movie still of [Subject], captured during [Lighting Mode], shot on a professional [Camera Lens], raw photograph, award-winning cinematography, atmospheric depth, detailed skin textures, hyper-realistic, volumetric light rays, color graded in a classic film-stock aesthetic --ar [Aspect Ratio] --style raw --v 6.0`
  }
];

// Dynamic template fields to construct 500 prompts programmatically
const SUBJECTS: Record<string, string[]> = {
  chatgpt: [
    'Cognitive Behavioral Therapy (CBT)', 'Classical Philosophy', 'Quantum Theory', 
    'Microeconomics', 'Creative Writing Workshops', 'Public Speaking Prep', 
    'Resume Auditing', 'Language Immersion Conversationalist', 'Improv Theater', 
    'Recipe Developer', 'Interview Simulation Coaching', 'Conflict Resolution Mediator',
    'Personal Finance Planning', 'Dungeons & Dragons Dungeon Master', 'Fitness Coaching'
  ],
  claude: [
    'Smart Contract Security', 'Corporate Governance Policies', 'Biotech Patent Reading', 
    'Global Trade Risk Maps', 'SaaS Product Specifications', 'Machine Learning Ethics', 
    'Carbon Credit Accounting', 'Subsea Cable Geopolitics', 'AI Safety Regulations',
    'Historical Document Deciphering', 'Deep Strategy War-gaming', 'Supply Chain Bottlenecks'
  ],
  gemini: [
    'Multimodal Dashboard Screenshots', 'Medical Chart Graphics', 'Autonomous Driving Sensor Logs', 
    'Factual Grounding for News', 'E-commerce Checkout Heatmaps', 'Language Translation Nuances', 
    'Google Sheets Formula Builder', 'Live Audio Event Synthesis', 'Architectural Site Layouts',
    'Search Query Geo-targeting', 'Handwritten Mathematical Notes', 'Historical Photos Geo-locator'
  ],
  'image-generation': [
    'Steampunk Library Cabinets', 'Cyberpunk Street Food Stalls', 'Isometric Greenhouse Terrariums', 
    'Brutalist Concrete Museums', 'Neoclassical Floating Islands', 'Anatomical Holographic Hearts', 
    'Claymation Magical Frogs', 'Watercolor Coastal Cafes', 'Ukiyo-e Futuristic Mechas',
    'Synthwave Arcade Cabinets', 'Double Exposure Forest Silhouettes', 'Abstract Flowing Liquid Gold'
  ],
  'image-to-video': [
    'Raindrops splash against neon taxi shields', 'Vast sand dunes drifting under twin red suns', 
    'Holographic fish swimming inside a rain-soaked subway', 'Slow motion spill of a dark velvet espresso cup', 
    'Camera orbits a spinning astronomical brass astrolabe', 'Glacial shelf collapsing in slow motion turquoise waters',
    'Ancient steam engine accelerating through a foggy forest', 'Time-lapse of a glowing alien orchid blooming'
  ],
  coding: [
    'React 19 State Managers', 'Rust Memory Safety Boilerplate', 'Python Data Processing Pipelines', 
    'Postgres Database Schema Optimization', 'Docker Multi-stage Builds', 'Go Concurrency Channel Workers', 
    'WebGL Shader Particle Canvas', 'GraphQL Query Optimizers', 'CSS Container Queries',
    'NestJS microservice routers', 'SwiftUI Animation Spring Controllers', 'FastAPI Webhook Handlers'
  ],
  marketing: [
    'SaaS Churn Reduction Email campaign', 'SEO Long-tail Keyword Hubs', 'High-conversion checkout microcopy', 
    'Influencer outreach collaboration script', 'Product Hunt launch checklist', 'Newsletter subscription hook loops', 
    'B2B Ad Copy split test templates', 'App Store Optimization (ASO) descriptions', 'Customer Referral Reward flow'
  ],
  business: [
    'SaaS Subscription Pricing Models', 'Angel Investor Pitch Deck structures', 'Annual OKR Performance scorecards', 
    'Vendor SLA Negotiation strategies', 'Lean Startup Pivot Matrices', 'Employee Stock Option (ESOP) pools', 
    'SaaS Valuation Multiples', 'Joint-Venture Partnership frameworks', 'Competitor feature matrix audits'
  ],
  'social-media': [
    'LinkedIn Thought Leadership Hooks', 'Twitter/X Tech Storytelling Threads', 'TikTok Viral Transition hooks', 
    'YouTube Aesthetic Thumbnail outlines', 'Instagram Carousel design copies', 'Substack Newsletter teaser headers', 
    'Reddit Ask-Me-Anything (AMA) bios', 'Pinterest visual layout tags', 'Medium tech blog opening leads'
  ],
  writing: [
    'Dystopian City Atmosphere building', 'Unreliable Narrator monologue', 'Enemies-to-lovers dynamic dialogue', 
    'Sensory fantasy magic activation', 'Subtle psychological tension beats', 'Historical fiction period prose', 
    'Sci-fi biological engineering reports', 'Poetic prose on fleeting memories', 'Cybernetic thriller chase scenes'
  ]
};

const TEMPLATE_PREFABS: Record<string, { title: string; desc: string; content: string; variables: string[] }[]> = {
  chatgpt: [
    {
      title: '[Subject] Sandbox Persona',
      desc: 'Injects an elite, adaptive specialist persona tailored to teach or audit [Subject] fields.',
      content: 'Act as a world-class practitioner in [Subject]. You have over 15 years of technical expertise. Your task is to evaluate the following input through the perspective of [Tone/Style] coaching. Ask me 3 challenging questions to identify any logical vulnerabilities in my understanding of [Subject].',
      variables: ['Tone/Style']
    },
    {
      title: '[Subject] Concept Simplifier',
      desc: 'Takes complex jargon about [Subject] and breaks it down into a modular analogy.',
      content: 'Explain the core mechanics of [Subject] using a visual metaphor centered on a "[Metaphor Base]". Avoid any academic jargon. Ensure the summary is structured into: 1) What it is, 2) The visual sandbox, and 3) A simple checklist.',
      variables: ['Metaphor Base']
    }
  ],
  claude: [
    {
      title: '[Subject] Deep Analyzer',
      desc: 'Evaluates structural systems, safety risks, and edge-cases regarding [Subject].',
      content: 'You are Claude, operating in deep analytical mode. Deconstruct [Subject] into its first-principles. Analyze the following scenario: "[Scenario]". Identify 3 hidden dependencies, 2 systemic failure loops, and provide a detailed mitigation protocol.',
      variables: ['Scenario']
    },
    {
      title: '[Subject] Structural Auditor',
      desc: 'Conducts a thorough, comprehensive review of docs, logic, or plans concerning [Subject].',
      content: 'Analyze this blueprint for [Subject]. Your primary focus is finding structural weaknesses under the constraint of "[Core Constraint]". Highlight the critical failure modes and write an optimized revision.',
      variables: ['Core Constraint']
    }
  ],
  gemini: [
    {
      title: '[Subject] Web Grounder',
      desc: 'Synthesizes online facts with real-world context for up-to-the-minute [Subject] info.',
      content: 'Perform a comprehensive search-grounded cross-examination on [Subject] with focus on "[Key Conflict]". Outline the verified facts, the common misconceptions, and provide live citations to major tech resources.',
      variables: ['Key Conflict']
    },
    {
      title: '[Subject] Multimodal Audit',
      desc: 'Simulates spatial reading or image recognition analysis in [Subject] layouts.',
      content: 'Examine the layout of [Subject] focusing on "[Visual Priority]". Rate the spatial structure out of 10 and suggest exactly 3 visual alignment edits to improve readability.',
      variables: ['Visual Priority']
    }
  ],
  'image-generation': [
    {
      title: 'Cinematic [Subject]',
      desc: 'Stunning artistic prompt templates for photorealistic images of [Subject].',
      content: 'Cinematic scene depicting [Subject], captured during [Lighting Mode], shot on [Lens Type], high-contrast volumetric shadows, highly detailed octane render, cinematic film stock --ar [Aspect Ratio] --style raw',
      variables: ['Lighting Mode', 'Lens Type', 'Aspect Ratio']
    },
    {
      title: 'Isometric [Subject] Asset',
      desc: 'Perfect 3D vector and game design assets of [Subject] in isometric view.',
      content: 'Isometric 3D icon of [Subject], render style "[Art Style]", cute soft pastels, isolated on dark cosmic slate background, 8k, Unreal Engine 5 render feel',
      variables: ['Art Style']
    }
  ],
  'image-to-video': [
    {
      title: 'Atmospheric [Subject] Motion',
      desc: 'Camera controls and physics for animating [Subject] beautifully.',
      content: 'Image to video vector transition of [Subject]. Camera moves in slow [Motion Direction] panning motion. Particle drifting speed set to "[Atmospheric Speed]", photorealistic liquid dynamics, 4k render.',
      variables: ['Motion Direction', 'Atmospheric Speed']
    }
  ],
  coding: [
    {
      title: '[Subject] Builder',
      desc: 'Generates clean, scalable, error-handled code blocks for [Subject].',
      content: 'Write a highly optimized code block for [Subject] implementing "[Target Feature]". Ensure proper typing, clear variable scoping, and comprehensive edge-case handling. Add mock assertions for validation.',
      variables: ['Target Feature']
    },
    {
      title: '[Subject] Optimizer',
      desc: 'Takes legacy loops and rewrites them into fast, performant functions.',
      content: 'Analyze the performance of this [Subject] implementation with concern to "[Bottleneck]". Refactor it to reduce temporal and spatial complexity, adding detailed benchmarks.',
      variables: ['Bottleneck']
    }
  ],
  marketing: [
    {
      title: 'Viral [Subject] Copy',
      desc: 'Persuasive high-conversion copy outline for marketing [Subject].',
      content: 'Draft a conversion copy template for [Subject] targeted towards "[Target Audience]". Focus on emotional triggers, clarity of value proposition, and a friction-free call to action.',
      variables: ['Target Audience']
    }
  ],
  business: [
    {
      title: '[Subject] Business Canvas',
      desc: 'Generates an actionable lean business model regarding [Subject].',
      content: 'Construct a detailed Lean Business Canvas for a company tackling [Subject]. Focus deeply on "[Competitive Edge]" and define the key metrics to track on a daily basis.',
      variables: ['Competitive Edge']
    }
  ],
  'social-media': [
    {
      title: 'Viral [Subject] Hook',
      desc: 'Dramatically improves engagement on social channels talking about [Subject].',
      content: 'Write 3 highly engaging introductory hooks for social media about [Subject] matching a "[Brand Tone]" voice. Keep hooks under 20 words each with extreme curiosity loops.',
      variables: ['Brand Tone']
    }
  ],
  writing: [
    {
      title: 'Evocative [Subject] Prose',
      desc: 'Immersive sensory-rich dialogue and setting descriptions for [Subject].',
      content: 'Rewrite a scene about [Subject] to evoke a deep sense of "[Core Emotion]". Use the show-dont-tell creative writing philosophy with sensory elements of scent, touch, and temperature.',
      variables: ['Core Emotion']
    }
  ]
};

const AUTHORS = [
  'CozyPrompt Team', 'Alex Carter', 'Dr. Helen Vance', 'UX Architect', 'DirectorX', 
  'DevOps Lead', 'GrowthHacker', 'Content Maven', 'ProPrompt Engineer', 'SoraDirector',
  'PromptArchitect', 'AIPioneer', 'CreativeSpark', 'CodeWhiz', 'MarketingGuru'
];

const DIFFICULTIES: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];

// Create programmatic collection up to 500 prompts
const generateAllPrompts = (): Prompt[] => {
  const list: Prompt[] = [...SEED_PROMPTS];
  const targetCount = 500;
  
  // Keep track of added IDs to prevent overlaps
  const addedIds = new Set<string>(list.map(p => p.id));
  
  let loopIndex = 0;
  while (list.length < targetCount) {
    for (const category of CATEGORIES) {
      if (list.length >= targetCount) break;
      
      const categoryId = category.id;
      const subjects = SUBJECTS[categoryId] || SUBJECTS['chatgpt'];
      const prefabs = TEMPLATE_PREFABS[categoryId] || TEMPLATE_PREFABS['chatgpt'];
      
      const subject = subjects[loopIndex % subjects.length];
      const prefab = prefabs[loopIndex % prefabs.length];
      
      // Construct a unique id
      const formattedSubjectId = subject.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const uniqueId = `${categoryId}-${formattedSubjectId}-${loopIndex}`;
      
      if (addedIds.has(uniqueId)) continue;
      
      // Inject subject name into title and content
      const title = prefab.title.replace('[Subject]', subject);
      const description = prefab.desc.replace('[Subject]', subject);
      const content = prefab.content.replace(/\[Subject\]/g, subject);
      
      // Create interesting stats
      const copies = 200 + ((loopIndex * 37) % 4500);
      const likes = Math.floor(copies * (0.15 + (loopIndex % 10) / 40));
      const author = AUTHORS[loopIndex % AUTHORS.length];
      const difficulty = DIFFICULTIES[loopIndex % DIFFICULTIES.length];
      const isPremium = (loopIndex % 7) === 0; // Approx 15% are premium
      
      const newPrompt: Prompt = {
        id: uniqueId,
        title,
        description,
        content,
        category: categoryId,
        author,
        likes,
        copies,
        difficulty,
        variables: prefab.variables,
        isPremium
      };
      
      list.push(newPrompt);
      addedIds.add(uniqueId);
    }
    loopIndex++;
  }
  
  return list;
};

export const PROMPTS: Prompt[] = generateAllPrompts();

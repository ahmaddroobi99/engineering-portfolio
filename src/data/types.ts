export type SignalBreakdown = {
  relevance: number;
  activity: number;
  documentation: number;
  visual: number;
  complexity: number;
  stars: number;
  completeness: number;
  recency: number;
};

export type Project = {
  id: string;
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string;
  languages: Record<string, number>;
  topics: string[];
  stars: number;
  forks: number;
  openIssues: number;
  sizeKb: number;
  defaultBranch: string;
  license: string | null;
  fork: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  hasPages: boolean;
  category: string;
  domain: string;
  signalScore: number;
  signalBreakdown: SignalBreakdown;
  status: string;
  health: string;
  issues: string[];
  fourLines: string[];
  tech: string[];
  learning: string[];
  cover: string | null;
  ogImage: string;
  images: string[];
  gifs: string[];
  mediaKind: "gif" | "readme" | "generated";
  readmeExcerpt: string | null;
  hasReadme: boolean;
  featured: boolean;
  rank: number | null;
};

export type Catalog = {
  generatedAt: string;
  source: string;
  username: string;
  profile: {
    login: string;
    name: string;
    followers: number;
    following: number;
    publicRepos: number;
    avatar: string;
    htmlUrl: string;
    createdAt: string;
  };
  totals: {
    public: number;
    originalIndexed: number;
    forksSkipped: number;
    selected: number;
  };
  scoring: {
    weights: Record<string, number>;
    notes: string;
  };
  projects: Project[];
  allIndexed: Array<{
    id: string;
    name: string;
    signalScore: number;
    category: string;
    fork: boolean;
  }>;
};

export const DOMAIN_META = [
  {
    slug: "ai",
    label: "AI / Machine Learning",
    kicker: "Models · data · evaluation",
    summary:
      "Experiments, RAG systems, and applied learning workflows published as public repositories.",
  },
  {
    slug: "computer-vision",
    label: "Computer Vision",
    kicker: "Images · perception",
    summary:
      "Vision pipelines, detection, and physical-intelligence work that operates on visual or spatial input.",
  },
  {
    slug: "robotics",
    label: "Robotics / Embedded",
    kicker: "Hardware · sensing · control",
    summary:
      "Microcontrollers, hardware prototypes, and systems that sit next to the physical world.",
  },
  {
    slug: "cloud",
    label: "Cloud / Software",
    kicker: "Infrastructure · services",
    summary:
      "Cloud-shaped systems, backends, and educational distributed-systems work.",
  },
  {
    slug: "scientific",
    label: "Scientific Computing",
    kicker: "Estimation · numerics",
    summary:
      "Data assimilation, dynamical systems, and numerical experiment software.",
  },
  {
    slug: "systems",
    label: "Systems Engineering",
    kicker: "OS · architecture · protocols",
    summary:
      "CPU datapaths, operating-system labs, networking protocols, and systems code.",
  },
  {
    slug: "software",
    label: "Software / Web",
    kicker: "Products · interfaces",
    summary:
      "Applications, visualizers, datasets, and full-stack product work.",
  },
  {
    slug: "experiments",
    label: "Experiments / Education",
    kicker: "Notes · interviews · study",
    summary:
      "Interview resources, coursework, and exploratory repositories.",
  },
] as const;

export type DomainSlug = (typeof DOMAIN_META)[number]["slug"];

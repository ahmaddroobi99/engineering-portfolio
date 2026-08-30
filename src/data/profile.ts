export const profile = {
  name: "Ahmad Droobi",
  shortName: "Ahmad D",
  title: "AI / Systems / Computer Vision / Robotics Engineer",
  tagline:
    "Building intelligent systems that connect software, machine learning, sensors, computation, and real-world engineering.",
  email: "ahmad.droobi@ucalgary.ca",
  githubUsername: "ahmaddroobi99",
  github: "https://github.com/ahmaddroobi99",
  linkedin: "https://www.linkedin.com/in/droobi/",
  scholar:
    "https://scholar.google.com/citations?hl=en&user=H-3pF00AAAAJ&view_op=list_works&sortby=pubdate",
  thesis: "https://hdl.handle.net/1880/122341",
  site: "https://ahmaddroobi99.github.io/",
  portrait: "/media/portrait.jpg",
  hero: "/media/hero-field.jpg",
  signature: "/media/signature.png",
  cv: "/files/Ahmad_Droobi_CV_2026.pdf",
};

export const aboutCopy = {
  intro:
    "I build software at the intersection of backend systems, AI/ML workflows, and perception-oriented data processing. My work focuses on turning noisy, high-dimensional data into tested, maintainable software that supports analysis, automation, and decision-making.",
  body: "My background combines computer engineering, Python backend development, React interfaces, data pipelines, numerical computing, and machine learning experimentation. I am especially interested in roles where software quality, data correctness, and scalable engineering matter: AI platforms, robotics, LiDAR/perception, infrastructure for ML, and applied product engineering.",
  highlights: [
    "Implemented Python and MATLAB workflows for state estimation, numerical experiments, and model evaluation.",
    "Built backend and full-stack features with Python, Django, React, APIs, and analytics data pipelines.",
    "Developed ML and computer vision experiments with preprocessing, evaluation, and software integration in mind.",
    "Positioning software and AI/ML work toward LiDAR, spatial data, robotics, and perception systems.",
  ],
};

export const experience = [
  {
    img: "/media/ucalgary.jpg",
    date: "September 2023 — Present",
    title: "Graduate Research Assistant",
    place: "University of Calgary — Calgary, Alberta, Canada",
    points: [
      "Implemented research software for data assimilation, state estimation, uncertainty quantification, and high-dimensional dynamical systems.",
      "Built repeatable numerical experiment pipelines for model comparison, diagnostics, and validation.",
      "Worked with noisy observation data and estimation methods that map to perception, tracking, LiDAR, and robotics software problems.",
    ],
  },
  {
    img: "/media/itg.jpg",
    date: "February 2023 — August 2023",
    title: "Backend Engineer — Python",
    place: "ITG Software Engineering — Cincinnati, Ohio, United States — Remote",
    points: [
      "Developed Python backend features for a subscription analytics product.",
      "Integrated Google Analytics and BigQuery data flows for reporting and product analytics.",
      "Implemented structured backend logic to make analytics data easier to query, review, and use in product decisions.",
    ],
  },
  {
    img: "/media/harri.jpg",
    date: "January 2022 — February 2023",
    title: "AI/ML and Data Science Engineering Intern",
    place: "Harri — New York and Ramallah",
    points: [
      "Developed time-series forecasting workflows for hiring demand analysis.",
      "Implemented Django services that connected model outputs with backend application behavior.",
      "Worked across preprocessing, feature preparation, model evaluation, and integration for applied AI/ML use cases.",
    ],
  },
  {
    img: "/media/clemson.png",
    date: "October 2021 — May 2022",
    title: "Undergraduate Researcher",
    place: "Future Computing Technologies Lab, Clemson University",
    points: [
      "Built real-time emotion-recognition experiments with TensorFlow and OpenCV.",
      "Implemented computer vision baselines and evaluation workflows, including FER-7 and Haar cascade experiments.",
      "Gained practical experience with visual data pipelines, model behavior, and perception-oriented application logic.",
    ],
  },
];

export const education = [
  {
    img: "/media/ucalgary.jpg",
    date: "September 2023 — June 2025",
    title: "University of Calgary",
    place: "MSc, Mechanical Engineering — Computational Applied Mathematics",
    points: [
      "Focused on numerical computing, machine learning for dynamical systems, uncertainty quantification, and applied software for scientific data.",
      "Developed research software for data assimilation and state estimation, with direct relevance to sensor processing and perception systems.",
    ],
  },
  {
    img: "/media/najah.jpg",
    date: "August 2018 — January 2023",
    title: "An-Najah National University",
    place: "BSc, Computer Engineering",
    points: [
      "Built foundations in programming, algorithms, databases, software design, computer systems, and hardware/software integration.",
      "Completed software and hardware capstone projects, including CookOverflow and an Electrical Circuit Builder.",
    ],
  },
];

export const publications = [
  {
    title: "Data-Driven Filtering Techniques for Turbulent Flow Models",
    meta: "A. Droobi — 2025",
    summary:
      "Computational filtering workflows for noisy, high-dimensional dynamical systems, with emphasis on state estimation, reproducible experiments, and evaluation discipline.",
    href: "https://hdl.handle.net/1880/122341",
  },
  {
    title: "CookOverflow",
    meta: "A. Droobi, MND Shaqour, Ataa — 2022",
    summary:
      "Capstone application focused on data organization, user workflow design, and maintainable software architecture.",
    href: "https://repository.najah.edu/items/3a8b9d6c-9c1e-4308-8f5a-e5f7fec1af25",
  },
];

export const awards = [
  ["Graduate Research Assistantship", "Schulich School of Engineering, University of Calgary", "September 2023"],
  ["International Graduate Tuition Award", "Schulich School of Engineering, University of Calgary", "September 2023 and September 2024"],
  ["AI/ML Fellow", "Fellowship.ai robotics simulator imitation learning project", "July 2023"],
  ["Machine Learning Summer School Award", "Scientists for Palestine Conference Award", "July 2022"],
  ["Palestinian President Scholarship", "Palestine Ministry of Education and Higher Education", "September 2017 — January 2023"],
];

export const skills = [
  {
    category: "Software Engineering",
    items: ["Python", "JavaScript", "TypeScript", "React", "Git", "APIs", "Data structures", "Algorithms"],
  },
  {
    category: "AI & Machine Learning",
    items: ["Data preprocessing", "Model development", "Supervised learning", "Evaluation", "Experimentation workflows"],
  },
  {
    category: "Perception & Estimation",
    items: ["State estimation", "Sensor data analysis", "Computer vision", "Numerical computing", "Uncertainty quantification"],
  },
  {
    category: "Data & Tools",
    items: ["NumPy", "Pandas", "MATLAB", "Databases", "Technical documentation"],
  },
];

export const onboardingStepOrder = [
  'welcome',
  'company',
  'first-day',
  'team',
  'role',
  'schedule',
  'tools',
  'resources',
  'amenities',
  'complete',
] as const

export type OnboardingStepKey = (typeof onboardingStepOrder)[number]

export const onboardingRoutes: Record<OnboardingStepKey, string> = {
  welcome: '/onboarding/welcome',
  company: '/onboarding/company',
  'first-day': '/onboarding/first-day',
  team: '/onboarding/team',
  role: '/onboarding/role',
  schedule: '/onboarding/schedule',
  tools: '/onboarding/tools',
  resources: '/onboarding/resources',
  amenities: '/onboarding/amenities',
  complete: '/onboarding/complete',
}

export const onboardingContent = {
  navigation: {
    progressLabel: 'Onboarding journey',
    previous: 'Back',
    next: 'Continue',
  },
  welcome: {
    eyebrow: 'Welcome to Meridian',
    title: () => 'Your guide to getting started at Meridian.',
    description:
      'Starting somewhere new should feel exciting, not confusing. This short guide introduces the company, your people, and the practical details for your first month.',
    details: [
      { label: 'Company', value: 'Meridian' },
      { label: 'People', value: '200 colleagues' },
      { label: 'Work style', value: 'Hybrid' },
      { label: 'Your guide', value: '10 short chapters' },
    ],
    note: 'You can move back at any time and revisit this guide after completing it.',
  },
  company: {
    eyebrow: 'Meet Meridian',
    title: 'What Meridian builds and how we work.',
    description:
      'Meridian is a software development company creating products that make everyday work and learning more effective, including an AI scheduling app, an interactive AI-powered learning platform, and more. We believe close collaboration between teammates leads to stronger ideas and better products for the people who use them.',
    stats: [
      { value: '200', label: 'employees' },
      { value: '5', label: 'departments' },
      {
        value: 'Hybrid',
        label: 'work week',
        breakdown: [
          { value: '3', label: 'office days' },
          { value: '2', label: 'remote days' },
        ],
      },
    ],
    departments: [
      { name: 'Engineering', description: 'Builds and maintains Meridian products and systems.' },
      { name: 'Sales', description: 'Connects customers with the value Meridian creates.' },
      { name: 'Marketing', description: 'Shapes our message, brand, and growth.' },
      { name: 'HR', description: 'Supports people, hiring, and the employee experience.' },
      { name: 'Finance', description: 'Keeps planning, payroll, and reporting on solid ground.' },
    ],
    principleTitle: 'How we work together',
    principles: [
      'Ask the customer clearly about the desired outcome.',
      'Ask early when something is unclear.',
      'Treat feedback as a tool for better work.',
      'Make decisions with the customer and product in mind.',
    ],
  },
  firstDay: {
    eyebrow: 'Your first day',
    title: 'Your first day, from arrival to wrap-up.',
    description:
      'Your first day is designed for orientation. The goal is to meet your closest collaborators, get access to the essentials, and leave knowing what the rest of the week looks like.',
    timeline: [
      { time: '09:00', title: 'Arrive and check in', description: 'Arrive at Meridian HQ at 36 Park Avenue, Boston. Present your national ID at the security desk for verification; they will direct you to Floor 3, Office C9, where your manager will meet you.' },
      { time: '09:30', title: 'Meet your team and role', description: 'Your manager will introduce you to your role and walk you through your responsibilities and first tasks, and explain how people and work are organized at Meridian.' },
      { time: '10:00', title: 'Receive your laptop and tools', description: 'You will receive your work laptop and everything you need to get started, including your work email, Slack, Google Meet, and required software.', engineeringNote: ' You will also receive development access.' },
      { time: '12:30', title: 'Lunch with the team', description: 'A relaxed chance to meet the people you will work with most often.' },
      { time: '14:00', title: 'Product and technical tour', description: 'See what Meridian builds, who it serves, and how the systems fit together.' },
      { time: '16:30', title: 'Wrap-up with your manager', description: 'Resolve blockers and agree on a clear starting point for day two.' },
    ],
    bringTitle: 'What to bring',
    bringItems: ['A valid national ID for building access', 'Questions—there is no expectation to know everything'],
  },
  team: {
    eyebrow: 'Your people',
    title: 'Meet your manager and immediate team.',
    description:
      'Your manager provides direction and context. Your teammates are the people you will build, learn, and solve problems with every day.',
    managerLabel: 'Your manager',
    teamLabel: 'Your team',
    loading: 'Loading your team…',
    unavailableTitle: 'Your team could not be loaded.',
    unavailableDescription: 'Return to profile selection and confirm your employee details again.',
    returnAction: 'Find my profile',
  },
  role: {
    eyebrow: 'Your role',
    title: 'Your engineering role, tools, and workflow.',
    description:
      'Engineering at Meridian is product-first: understand the user problem, choose the simplest durable solution, and learn from real feedback.',
    stackTitle: 'Our development stack',
    stack: [
      { layer: 'Frontend', tools: 'React · TypeScript · Vite', description: 'Builds the pages and interactions people see and use in their browser.' },
      { layer: 'Backend', tools: '.NET 9 · ASP.NET Core · EF Core', description: 'Handles business rules, provides secure APIs, and connects the application to its data.' },
      { layer: 'Database', tools: 'PostgreSQL · Docker', description: 'Stores application data reliably, while Docker keeps local development consistent.' },
      { layer: 'Delivery', tools: 'Git · GitHub', description: 'Branches for different features and small incremental changes.' },
    ],
    valuesTitle: 'What good engineering looks like here',
    values: [
      { title: 'Product first', description: 'Begin with the customer outcome and measure success by value delivered, not code produced.' },
      { title: 'Agile in practice', description: 'Work in small increments, show progress early, and adapt when evidence changes the plan.' },
      { title: 'Open-minded', description: 'Invite other perspectives and be willing to replace your first idea with a better one.' },
      { title: 'Solution-driven', description: 'Surface problems clearly, then bring options, trade-offs, and a recommended next step.' },
      { title: 'Quality is shared', description: 'Test important behavior, review thoughtfully, document decisions, and improve the code you touch.' },
      { title: 'Request help when needed', description: 'Try to understand the problem, share what you attempted, and ask for help before losing momentum.' },
    ],
    workflowTitle: 'A healthy Git workflow',
    workflow: [
      'Create a branch for one focused change.',
      'Make small, meaningful commits that explain intent.',
      'Open a pull request, describe what changed, and explain how you tested it.',
      'Respond to review as a technical conversation, not a personal judgment.',
      'Merge only after checks pass and the change is understood.',
    ],
    references: [
      { label: 'Git tutorial', href: 'https://education.github.com/git-cheat-sheet-education.pdf' },
      { label: 'Pull request reviews', href: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews' },
      { label: 'Agile principles', href: 'https://agilemanifesto.org/principles' },
    ],
    profileLabel: 'Your starting point',
    loading: 'Loading your role…',
  },
  schedule: {
    eyebrow: 'Your schedule',
    title: 'Your office hours and hybrid work week.',
    description:
      'Working arrangements at Meridian vary by department. For your role, you will work at least three days from the office and may work remotely for up to two days each week. You are also welcome to work from the office all five days. Working days are Monday to Friday.',
    cards: [
      { title: 'Office days', value: '3–5 days weekly', description: 'Office hours are 09:00–17:00. Three office days are required, and you may choose to work from the office for the full week.' },
      { title: 'Remote days', value: 'Up to 2 days', description: 'Remote days are optional and will be discussed and agreed with your manager.' },
      { title: 'Meal break', value: '12:30–13:00', description: 'This time is reserved for lunch and a proper break from work.' },
      { title: 'Shared expectations', value: 'Communicate early', description: 'Keep your calendar current, signal changes, and make your availability visible to the team.' },
    ],
    noteTitle: 'Your first week',
    note: 'Plan to begin in the office unless your manager tells you otherwise. You will agree on a regular schedule during your first-week check-in.',
  },
  tools: {
    eyebrow: 'Staying connected',
    title: 'Communication tools',
    description:
      'Good communication is less about being constantly online and more about communicating openly with your team while respecting people’s focus.',
    tools: [
      {
        name: 'Slack',
        purpose: 'Everyday written communication',
        description: 'Use Slack to send messages, share files, organize team conversations in channels and threads, and coordinate work without needing a meeting.',
        practices: ['Set a clear status when unavailable', 'Prefer channels over hidden group messages', 'Summarize decisions where the team can find them'],
        href: 'https://slack.com/help',
        tutorialHref: 'https://www.youtube.com/watch?v=2CGppw8cHyU',
      },
      {
        name: 'Google Meet',
        purpose: 'Live conversations and collaboration',
        description: 'Use Google Meet to hold video calls, share your screen, present work, and collaborate with teammates in real time from any location.',
        practices: ['Add an agenda to planned meetings', 'Join on time and prepared', 'Record decisions and actions after the call'],
        href: 'https://meet.google.com/',
        tutorialHref: 'https://www.youtube.com/watch?v=7KVZvUxQXMA',
      },
    ],
    boundaryTitle: 'Protect focus time',
    boundary:
      'Not every message is urgent. Use status, calendar blocks, and thoughtful notifications so deep work remains possible.',
  },
  resources: {
    eyebrow: 'Your support contacts',
    title: 'Meet your HR and technical support contacts.',
    description:
      'These are your main contacts for employment questions and technical support. You can email them directly whenever you need guidance.',
    contactDescriptions: {
      hr: 'Contact HR about your contract, salary and bonuses, benefits, leave, company policies, or personal administration.',
      'system-administrator': 'Contact the system administrator for your laptop, accounts, permissions, software, security, or other technical issues.',
    },
    loading: 'Loading your support contacts…',
    unavailable: 'Support contact details are temporarily unavailable. Ask your manager to connect you with the right person.',
    reminder: 'When asking for help, include the goal, what you tried, what happened, and where you are blocked.',
  },
  amenities: {
    eyebrow: 'Office and benefits',
    title: 'What the office and your benefits provide.',
    description:
      'Meridian provides practical office amenities and employee benefits to support your work, wellbeing, and development.',
    sections: [
      {
        title: 'Around the office',
        items: [
          { name: 'Coffee and refreshments', description: 'A coffee machine, tea, filtered water, and light refreshments are available in the shared kitchen.' },
          { name: 'Shared kitchen', description: 'Use the refrigerator, microwave, dishes, and dining area for meals and breaks. Please label your food and leave the space tidy.' },
          { name: 'Workplace essentials', description: 'Meeting rooms, quiet spaces, printing, office supplies, and basic device accessories are available when you need them.' },
          { name: 'Personal storage', description: 'Lockers and coat storage are available for items you do not want to keep at your desk.' },
        ],
      },
      {
        title: 'Benefits and support',
        items: [
          { name: 'Salary bonuses', description: 'Eligible employees may receive performance-based salary bonuses. HR will explain the criteria, timing, and terms that apply to your role.' },
          { name: 'Learning support', description: 'Discuss relevant courses, books, certifications, and professional events with your manager before purchasing.' },
          { name: 'Health and wellbeing', description: 'Your benefits package includes health and wellbeing support; HR can guide you through coverage and enrollment.' },
          { name: 'Time away from work', description: 'Annual leave, public holidays, and other types of leave are explained in your contract and the company policy.' },
        ],
      },
    ],
    note: 'If you are unsure whether something is available or covered, ask HR before making a purchase or commitment.',
  },
  complete: {
    eyebrow: 'You are ready to begin',
    title: (firstName?: string) => firstName ? `Welcome to Meridian, ${firstName}.` : 'Welcome to Meridian.',
    description:
      'You now know where to start, who to ask, and how the company works. The rest will come through conversations, practice, and time.',
    recap: [
      'You know your manager and immediate team.',
      'You understand your first day and hybrid schedule.',
      'You know the development approach and communication tools.',
      'You know where to find help and which amenities and benefits are available.',
    ],
    finishAction: 'Complete onboarding',
    completedLabel: 'Onboarding complete',
    completedMessage: 'Your employee resource hub is ready whenever you need contacts, tools, or workplace information.',
    restartAction: 'Revisit from the beginning',
  },
} as const

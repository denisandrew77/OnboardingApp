export type ResourceIcon =
  | 'person'
  | 'office'
  | 'calendar'
  | 'coffee'
  | 'message'
  | 'video'
  | 'benefits'
  | 'learning'
  | 'document'

export interface HubResource {
  id: string
  category: string
  icon: ResourceIcon
  title: string
  summary: string
  details: readonly string[]
  links?: readonly { label: string; href?: string; action?: 'tech-stack' }[]
  keywords?: readonly string[]
}

export const resourceHubContent = {
  eyebrow: 'Employee resource hub',
  title: (firstName?: string) => firstName ? `Everything you need, ${firstName}.` : 'Everything you need, in one place.',
  description: 'Find contacts, workplace information, tools, benefits, and useful guides. Select any card to see more details.',
  searchLabel: 'Search resources',
  searchPlaceholder: 'Search contacts, benefits, tools, office information…',
  clearSearch: 'Clear search',
  noResultsTitle: 'No matching resources found.',
  noResultsDescription: 'Try a broader term such as “office,” “leave,” “Slack,” or “support.”',
  contactsCategory: 'People and support',
  contactDetails: {
    hr: [
      'Contracts, salary, bonuses, benefits, and payroll questions.',
      'Annual leave, workplace policies, and personal administration.',
      'Private employment matters or guidance about company processes.',
    ],
    'system-administrator': [
      'Laptop, software, account, and access support.',
      'Permissions, password, security, and connectivity issues.',
      'Technical equipment requests and troubleshooting.',
    ],
  },
  contactLoading: 'Loading contacts…',
  resources: [
    {
      id: 'first-day-schedule',
      category: 'Workplace',
      icon: 'calendar',
      title: 'First-day schedule',
      summary: 'Your complete plan from arrival through the end-of-day check-in.',
      details: [
        '09:00 — Arrive at 36 Park Avenue, Boston, present your national ID at security, and go to Floor 3, Office C9.',
        '09:30 — Meet your team and review your responsibilities, first tasks, and how work is organized at Meridian.',
        '10:00 — Receive your work laptop, accounts, communication tools, required software, and role-specific access.',
        '12:30 — Have lunch with the team and get to know your closest collaborators.',
        '14:00 — Take a product and technical tour to understand what Meridian builds and how its systems fit together.',
        '16:30 — Wrap up with your manager, resolve blockers, and agree on a starting point for day two.',
      ],
      keywords: ['arrival', 'address', 'hq', 'security', 'laptop', 'lunch', 'first day'],
    },
    {
      id: 'working-schedule',
      category: 'Workplace',
      icon: 'calendar',
      title: 'Working schedule',
      summary: 'Office hours and the hybrid working arrangement for your role.',
      details: [
        'Office hours are 09:00–17:00, Monday through Friday.',
        'The meal break is from 12:30 to 13:00.',
        'Your role requires at least three office days and allows up to two optional remote days each week.',
        'You may work from the office all five days. Agree your regular schedule with your manager.',
      ],
      keywords: ['remote', 'hybrid', 'hours', '9 to 5'],
    },
    {
      id: 'office-amenities',
      category: 'Workplace',
      icon: 'coffee',
      title: 'Office amenities',
      summary: 'Coffee, kitchen facilities, quiet spaces, storage, and workplace essentials.',
      details: [
        'The shared kitchen provides a coffee machine, tea, filtered water, a refrigerator, microwave, dishes, and dining space.',
        'Meeting rooms, quiet spaces, printing, office supplies, and basic device accessories are available.',
        'Lockers and coat storage are provided for personal belongings.',
      ],
      keywords: ['kitchen', 'food', 'printer', 'locker', 'meeting room'],
    },
    {
      id: 'slack',
      category: 'Communication tools',
      icon: 'message',
      title: 'Slack',
      summary: 'Everyday written communication, channels, threads, and team updates.',
      details: [
        'Prefer public team channels when the information may help others.',
        'Use threads to keep related discussion together and direct messages for private conversations.',
        'Keep your status current and use notifications and mentions thoughtfully.',
      ],
      links: [
        { label: 'Open Slack help', href: 'https://slack.com/help' },
        { label: 'Watch beginner tutorial', href: 'https://www.youtube.com/watch?v=2CGppw8cHyU' },
      ],
      keywords: ['chat', 'messages', 'notifications'],
    },
    {
      id: 'google-meet',
      category: 'Communication tools',
      icon: 'video',
      title: 'Google Meet',
      summary: 'Video meetings, live conversations, and remote collaboration.',
      details: [
        'Use Meet when a topic is easier to resolve in a live conversation or when nuance matters.',
        'Add an agenda to planned meetings and join on time and prepared.',
        'Record decisions and follow-up actions where the team can find them.',
      ],
      links: [
        { label: 'Open Google Meet', href: 'https://meet.google.com/' },
        { label: 'Watch beginner tutorial', href: 'https://www.youtube.com/watch?v=7KVZvUxQXMA' },
      ],
      keywords: ['call', 'meeting', 'video'],
    },
    {
      id: 'benefits-bonuses',
      category: 'Benefits and policies',
      icon: 'benefits',
      title: 'Benefits and salary bonuses',
      summary: 'Where to learn about compensation, eligibility, health support, and leave.',
      details: [
        'Eligible employees may receive performance-based salary bonuses. HR can explain the criteria, timing, and terms for your role.',
        'HR can guide you through health and wellbeing coverage and enrollment.',
        'Your contract and company policy explain annual leave, public holidays, and other types of leave.',
      ],
      keywords: ['salary', 'money', 'health', 'leave', 'holiday', 'vacation'],
    },
    {
      id: 'engineering-resources',
      category: 'Guides',
      icon: 'learning',
      title: 'Engineering resources',
      summary: 'Quick access to Git guidance and the Meridian technology stack.',
      details: [
        'Use these references anytime you need.',
      ],
      links: [
        { label: 'Git tutorial', href: 'https://education.github.com/git-cheat-sheet-education.pdf' },
        { label: 'View tech stack', action: 'tech-stack' },
      ],
      keywords: ['git', 'github', 'tech stack', 'react', 'typescript', '.net', 'postgresql'],
    },
    {
      id: 'onboarding-guide',
      category: 'Guides',
      icon: 'document',
      title: 'Onboarding guide',
      summary: 'Revisit the company, your first day, team, role, schedule, and tools.',
      details: [
        'Your completed onboarding remains available whenever you need a refresher.',
        'Use the guide to revisit team information, workplace expectations, and communication practices.',
      ],
      links: [{ label: 'Revisit onboarding', href: '/onboarding/welcome' }],
      keywords: ['company', 'team', 'role', 'first day'],
    },
  ] satisfies HubResource[],
} as const

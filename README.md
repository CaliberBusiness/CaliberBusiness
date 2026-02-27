# Caliber Business Resource - Careers Website

A modern, professional careers website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional UI with smooth animations and hover effects
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Job Listings**: Organized into "Open Roles" and "Roles for Pooling" sections
- **Interactive Job Cards**: Expandable details with responsibilities and qualifications
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Fast Performance**: Static export for optimal loading speeds

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This will create a static export in the `dist` directory.

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── JobCard.tsx
│   ├── JobListings.tsx
│   └── Navigation.tsx
├── data/
│   └── jobs.ts
├── lib/
│   └── utils.ts
├── types/
│   └── job.ts
├── public/
│   └── favicon.ico
└── ...config files
```

## Customization

### Colors

The color scheme is defined in `app/globals.css` using CSS variables:

- Primary: Deep navy blue (`--primary: 222 47% 23%`)
- Accent: Orange (`--accent: 25 95% 53%`)
- Background: White
- Foreground: Dark gray

### Adding New Jobs

Edit `data/jobs.ts` to add new job listings:

```typescript
{
  id: 'unique-id',
  title: 'Job Title',
  location: 'Office-based' | 'Hybrid' | 'Remote',
  type: 'Full-time' | 'Part-time' | 'Contract',
  category: 'open' | 'pooling',
  description: 'Job description...',
  responsibilities: ['Responsibility 1', 'Responsibility 2'],
  qualifications: ['Qualification 1', 'Qualification 2'],
  applyUrl: 'https://...',
  featured: true // optional
}
```

## License

© 2024 Caliber Business Resource. All rights reserved.
# Command Center

Create a sophisticated, responsive Next.js/React dashboard application using Tailwind CSS, Shadcn UI components, and Lucide icons.

The aesthetic must be "Tactical Cyber Modern"—inspired by terminal HUDs and sleek dark-mode productivity apps (like Linear), NOT cheap neon sci-fi or a mobile game. Use subtle depth, thin borders, and highly functional information layout. Avoid generic white card UI.

Color Palette (MUST USE THESE EXACT CODES):

- Root Background: Deep Carbon Slate (#0B0F17)

- Panel/Card Background: Muted Navy Slate (#131B2A)

- Border Accent: Faint White/10 (#FFFFFF1A)

- Primary Accent (CySec): Electric Cyan (#00E5FF)

- Secondary Accent (Academics): Muted Gold (#FFB300)

- Tertiary Accent (AIML): Emerald Green (#10B981)

Layout Structure:

1.  Bottom Navigation Bar (Visible only on MOBILE): Clean icons and labels for: Today, Roadmaps, "Reality Check", Stats.

2.  Permanent Desktop Sidebar (Visible only on LAPTOP): Modern vertical menu matching the mobile nav, with a collapsed state.

3.  Header Area (Persistent):

    - Top Left: Title "PERSONAL COMMAND CENTER".

    - Center: Live Date/Day display (e.g., Wednesday, Oct 25, 2023).

    - Top Right: A section displaying a dynamic hard-hitting motivational quote (mock text from Dr. Kalam or Marcus Aurelius) in small, elegant type.

4.  Main Content Area: Focus entirely on the "Daily Dash" view.

Daily Dash Content Components (Mock Data):

- Top Row Stats:

    - Daily Completion Bar (% Today)

    - Total Hours Focused Today

    - Daily Streak (Current Count)

- 3 Pillar Boards (Rendered side-by-side on desktop, stacked on mobile):

    - BOARD 1: [Cybersecurity Track (Accent: Cyan)]

        - Header with Icon and Title. Add task input bar.

        - Scrollable list of dummy tasks with priority tags (e.g., [CRITICAL] Finish TryHackMe AD Room; [NORMAL] Practice Linux PrivEsc; [CLASS] CySec Lab 2PM). Time-slot tags included. Checkboxes must use the accent color.

    - BOARD 2: [Academics & Labs (Accent: Gold)]

        - Header, input, and dummy task list (e.g., [SUBMIT] OS Assignment; [LECTURE] Linear Algebra 10AM; [LAB] AIML Sitting 3PM).

    - BOARD 3: [AIML & Extra (Accent: Emerald)]

        - Header, input, and dummy task list (e.g., [BUILD] Train basic CNN model; [READ] Research paper abstract).

Ensure all elements feel polished, professional, and built for function, not generic styling.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/00385fae-25d7-4869-8772-330fcc70c005).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

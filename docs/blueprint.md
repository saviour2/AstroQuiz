# **App Name**: Cosmic Quizzer

## Core Features:

- User Authentication: Prompt the user to enter a username and securely store it locally.
- Gemini-Powered Quiz: Utilize the Gemini 2.5 Flash model via the @google/generative-ai npm SDK to act as the quiz master, dynamically generate multiple-choice questions, and use a motivational tool to decide on appropriate encouragement and feedback.
- Real-time Validation: Validate answers and update the quiz state based on user input.
- Leaderboard Display: Store the top 10 scores locally, or via Firebase (if available), and display the leaderboard in a visually appealing format.
- Score Validation: Implement anti-tampering measures and input validation for user scores.
- Redirection Button: Add a 'missions' button that redirects users to another space-themed page.
- Animated Space Scene: Use Three.js for rotating planets and space backgrounds with abundant stars, galaxies, shooting stars, and comets. Use Particles.js or Vanta.js animated starfields for enhanced visual appeal.
- Mission Page: Implement a mission page that scores additional points, with flawless logic connected to the quiz.

## Style Guidelines:

- Primary color: Vibrant purple (#9400D3) to represent the vastness and mystery of space.
- Background color: Dark grey (#222222), creating a canvas reminiscent of deep space, littered with stars and galaxies, shooting stars, comets, etc.
- Accent color: Electric blue (#7DF9FF) to highlight interactive elements and provide a futuristic feel.
- Headline font: 'Space Grotesk' sans-serif for headings.
- Body font: 'Inter' sans-serif for the quiz content.
- Code font: 'Source Code Pro' for any code snippets that may be displayed.
- Use minimalist, neon icons related to space and astronomy.
- Implement a responsive design to ensure compatibility across various devices.
- Incorporate smooth transitions and subtle animations for user interactions.

# 🚀 Cosmic Quizzer: An AI-Powered Space Adventure

![Cosmic Quizzer Screenshot](https://storage.googleapis.com/static.aifire.dev/CosmicQuizzer.png)

Welcome to **Cosmic Quizzer**, a journey through the stars powered by Google's Gemini AI! This interactive quiz application challenges your knowledge of the universe with dynamically generated questions on a variety of cosmic topics. Track your score, compete on the leaderboards, and even manage the user base through a secure admin panel.

---

## ✨ Core Features

- **🧠 AI-Generated Quizzes**: Select a topic like "Solar System" or "Black Holes" and let Gemini generate a unique set of multiple-choice questions for you on the fly.
- **🏆 Dynamic Scoring & Leaderboards**: Earn points for correct answers and see how you rank against other cosmic travelers on both the grand leaderboard and topic-specific leaderboards.
- **🧑‍🚀 User Authentication**: A complete user management system allows users to sign up, log in, and track their progress across sessions.
- **🛡️ Admin Panel**: A secure, password-protected admin panel allows for user management, including the ability to view and delete user accounts.
- **🤖 Motivational AI Coach**: Get encouraging feedback from an AI quiz master as you progress through a quiz.
- **🌌 Animated Space Background**: An immersive, animated 3D background of stars and nebulae built with Three.js.
- **🔗 Link to SolarXplorer**: A stylish, animated button provides a direct link to the [SolarXplorer](https://solarxplorer.vercel.app/) project.
- **Responsive Design**: A beautiful and responsive UI that works on all devices, built with Next.js, ShadCN, and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Google Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **State Management**: React Context API
- **Deployment**: Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

## 🚀 Getting Started

Follow these instructions to get the project running locally for development and testing.

### 1. Clone the Repository

Clone this repository to your local machine.

```bash
git clone https://github.com/saviour2/AstroQuiz.git
cd AstroQuiz
```

### 2. Install Dependencies

Install the necessary npm packages.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project. This file will hold your secret credentials, like the admin password.

```env
# The password for accessing the admin panel
NEXT_PUBLIC_ADMIN_PASSWORD="adminpass"
```

### 4. Run the Development Server

Start the Next.js development server.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

### 5. Run the Genkit AI Flows

To enable the AI features (quiz generation), you need to run the Genkit development server in a separate terminal.

```bash
npm run genkit:dev
```

This will start the Genkit server, allowing your Next.js app to communicate with the Gemini AI models.

---

## ☁️ Deployment

This project is pre-configured to deploy seamlessly with **Firebase App Hosting**. The `apphosting.yaml` file defines the simple runtime configuration.

---

This project was built with assistance from **Firebase Studio**, an AI-powered development environment.

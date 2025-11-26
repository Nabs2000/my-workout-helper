# My Workout Helper

A modern fitness tracking web application that helps you monitor your workout progress and weight journey over time. Built with React Router, Firebase, and TailwindCSS.

**Live Demo:** [https://my-workout-helper--my-workout-helper-87e06.us-east4.hosted.app/](https://my-workout-helper--my-workout-helper-87e06.us-east4.hosted.app/)

## Features

### Workout Tracking
- Log your workouts with detailed information (exercise name, sets, reps, weight)
- Visualize your workout progress with interactive charts
- Track multiple workout types (bench press, squats, deadlifts, etc.)
- See your strength improvements over time

### Weight Tracking
- Record your body weight measurements
- View weight trends with visual progress charts
- Monitor your fitness journey with historical data

### User Management
- Secure authentication with Firebase Auth
- User registration and login
- Personalized dashboard for each user
- Profile management

### Bug Reporting
- Built-in bug reporter for user feedback
- Help improve the app by reporting issues directly

## Tech Stack

- **Frontend Framework:** React 19 with React Router 7
- **Styling:** TailwindCSS 4
- **Backend/Database:** Firebase (Firestore + Authentication)
- **Charts:** Recharts
- **Icons:** React Icons
- **Language:** TypeScript
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-workout-helper
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Update `config/firebaseConfig.ts` with your Firebase project credentials
   - Set up Firestore security rules (see below)

4. Start the development server:
```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Firebase Configuration

### Firestore Security Rules

Add these rules to your Firebase project:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Collections Structure

**users/{userId}:**
```typescript
{
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  workouts: Array<{
    workoutName: string;
    numberSets: number;
    numberReps: number;
    weight: number;
    dateLogged: string;
  }>;
  weights: Array<{
    weight: number;
    dateLogged: string;
  }>;
}
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
my-workout-helper/
├── app/
│   ├── components/       # Reusable React components
│   │   ├── bug.tsx
│   │   ├── login.tsx
│   │   ├── weightForm.tsx
│   │   ├── weightProgGraph.tsx
│   │   ├── workoutForm.tsx
│   │   └── workoutProgGraph.tsx
│   ├── routes/          # Route components
│   │   ├── home.tsx
│   │   ├── register.tsx
│   │   └── user.tsx
│   ├── types/           # TypeScript type definitions
│   │   ├── User.tsx
│   │   ├── Workout.tsx
│   │   ├── UserWeight.tsx
│   │   └── workoutType.tsx
│   └── root.tsx         # Root layout component
├── config/
│   └── firebaseConfig.ts # Firebase configuration
└── package.json
```

## Key Features Explained

### Client-Side Data Fetching

The app uses client-side data fetching with `useEffect` to ensure Firebase Authentication context is available when querying Firestore. This resolves permission issues that would occur with server-side data fetching.

### Real-Time Progress Visualization

Interactive charts built with Recharts provide immediate visual feedback on your fitness progress, making it easy to see trends and improvements.

### Responsive Design

Built with TailwindCSS for a modern, responsive UI that works seamlessly on desktop and mobile devices.

## Deployment

The application is deployed on Firebase Hosting. To deploy your own instance:

1. Build the production version:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.

## Acknowledgments

- Built with [React Router](https://reactrouter.com/)
- Powered by [Firebase](https://firebase.google.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Charts by [Recharts](https://recharts.org/)

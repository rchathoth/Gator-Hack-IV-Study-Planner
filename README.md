# AI Study Planner 🧠📅

An intelligent study planning application that automatically generates personalized study schedules based on your quiz dates and topics. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📝 **Quiz Management**: Add quizzes with topics and due dates
- 🤖 **AI-Powered Scheduling**: Automatic 7-14 day study plan generation
- 📊 **Smart Recommendations**: AI suggestions for efficient studying
- 📅 **Interactive Calendar**: Visual study schedule with progress tracking
- ✨ **Topic Grouping**: Intelligent grouping of related topics
- 🔄 **Review Scheduling**: Automatic review sessions for better retention

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ai-study-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the port Vite assigns).

You should see the AI Study Planner interface in your browser!

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## How to Use

1. **Add a Quiz**: 
   - Enter the quiz name (e.g., "Midterm Exam")
   - Select the date
   - Add topics you need to study
   - Click "Add Quiz"

2. **View Study Calendar**:
   - Switch to the "Study Calendar" tab
   - See your automatic study schedule
   - Click on topics to mark them as completed

3. **Follow Recommendations**:
   - Check the AI recommendations for each topic
   - Study efficiently with personalized tips

## Project Structure

```
ai-study-planner/
├── src/
│   ├── components/          # React components
│   │   ├── Calendar/        # Calendar components
│   │   ├── Recommendations/ # Recommendation components
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── services/            # AI and business logic
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding Features

The application is modular and easy to extend:

- **New Components**: Add to `src/components/`
- **New Hooks**: Add to `src/hooks/`
- **New Services**: Add to `src/services/`
- **Type Definitions**: Add to `src/types/index.ts`

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:
```bash
# Vite will automatically use the next available port
# or you can specify a port:
npm run dev -- --port 3000
```

### Module Resolution Errors

If you see module resolution errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## License

MIT

---

Made with ❤️ for students everywhere


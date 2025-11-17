# Dalcove Portfolio

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- 🌗 Dark/Light theme toggle with persistent settings
- 📱 Fully responsive design for all devices
- 🎨 Modern UI with smooth animations
- 🚀 Fast and lightweight
- 🧩 Component-based architecture
- 🎯 Smooth scrolling navigation
- 📝 Contact form

## Technologies Used

- React 18
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons
- DaisyUI for components
- Vite for build tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

### Formatting Code

To format the code using Prettier:

```bash
npm run format
```

## Project Structure

```
src/
├── components/          # Reusable components
├── App.jsx             # Main application component
├── main.jsx            # Entry point
├── theme.jsx           # Theme toggle component
├── index.css           # Global styles
```

## Customization

### Theme

The portfolio supports both light and dark themes. The theme preference is saved in localStorage and persists between sessions.

### Colors

The color scheme can be customized in `tailwind.config.js` under the `daisyuiConfig` section.

## Deployment

The portfolio can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Author

**Dalcove** - Full-stack Developer

- GitHub: [@DalcoveDev](https://github.com/DalcoveDev)
- LinkedIn: [Dalcove Dev](https://linkedin.com/in/dalcovedev)

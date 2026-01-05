# Full Stack Developer Portfolio

A modern, creative portfolio website built with React, TypeScript, Tailwind CSS, and Node.js. Features a dark theme with iridescent gradient accents inspired by Apple's design language.

## 🚀 Features

- **Modern Design**: Dark theme with iridescent gradient effects
- **Responsive**: Fully responsive design for all devices
- **Smooth Animations**: Powered by Framer Motion
- **Contact Form**: Backend API for handling contact form submissions
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

### Backend
- Node.js
- Express
- Nodemailer (for contact form)

### Database
- PostgreSQL (ready for integration)

### Deployment
- Vercel (recommended for frontend)
- Railway/Render (for backend API)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd PORTFOLIO
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your email configuration:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

4. Run the development server:
```bash
npm run dev
```

This will start both the frontend (port 3000) and backend (port 3001) servers.

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/Hero.tsx`
   - Update social media links
   - Modify tagline and description

2. **About Section**: Edit `src/components/About.tsx`
   - Add your personal story
   - Update skills and experience

3. **Projects**: Edit `src/components/Projects.tsx`
   - Add your actual projects
   - Update GitHub and demo links

4. **Contact**: Edit `src/components/Contact.tsx`
   - Update contact information
   - Modify contact form fields if needed

### Styling

The theme colors can be customized in `tailwind.config.js`:
- `dark.*`: Dark theme colors
- `iridescent.*`: Iridescent gradient colors

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect React and deploy

### Backend (Railway/Render)

1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

**Note**: Update the API endpoint in your frontend code if deploying backend separately.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React, TypeScript, and Tailwind CSS


# Noir Art Gallery

A cinematic Film Noir-themed virtual art gallery built with React, TypeScript, and modern web technologies. Experience art through the lens of classic film noir aesthetics with dramatic lighting, shadow effects, and immersive interactions.

## ✨ Features

### 🎨 **Film Noir Aesthetics**
- **Cinematic Design**: Black & white color palette with sepia tones and amber accents
- **Dramatic Lighting**: Dynamic spotlight effects and shadow play
- **Typography**: Elegant serif fonts reminiscent of classic movie credits
- **Film Grain**: Subtle texture overlay for authentic vintage feel

### 🖼️ **Three Art Categories**
1. **Graphic Arts**: Framed paintings with gallery wall presentation
2. **Plastic Arts**: 3D sculptures on marble pedestals with rotation capability  
3. **Performing Arts**: Theater stage with curtain animations and video playback

### 📺 **Interactive TV Hub**
- **Retro CRT TV**: Central navigation interface with authentic TV effects
- **Channel Switching**: Static noise transitions between art categories
- **Scan Lines**: Authentic vintage TV visual effects
- **Power Controls**: Full TV simulation with on/off functionality

## 🚀 **Getting Started**

### **Installation**
```bash
# Navigate to project directory
cd noir_art_gallery

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Development Server**
- Local: http://localhost:5173
- Network: Available on local network
- Hot reload enabled for rapid development

## 🛠️ **Tech Stack**

- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** with custom Film Noir color palette and animations
- **Framer Motion** for smooth page transitions and component animations
- **GSAP** integration ready for timeline-based animations
- **React Three Fiber** for 3D sculpture rendering
- **Howler.js** ready for immersive sound design

## 📁 **Project Structure**

```
src/
├── components/           # React components
│   ├── WelcomePage.tsx  # Entry portal with door animation
│   ├── GalleryHub.tsx   # TV interface navigation
│   ├── ChannelPage.tsx  # Art category display
│   └── ArtworkCard.tsx  # Individual artwork presentation
├── data/
│   └── artworks.ts      # Art collection database
├── App.tsx             # Main application logic
├── main.tsx           # React root mounting
└── index.css          # Global styles and effects
```

---

*Experience art through the dramatic lens of Film Noir - where every shadow tells a story and every spotlight reveals a masterpiece.*

🤖 Generated with [Memex](https://memex.tech)
Co-Authored-By: Memex <noreply@memex.tech>

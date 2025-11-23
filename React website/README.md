# SUSIN iTORK India - React Website

Modern React website for SUSIN iTORK India Pvt. Ltd. - Industrial Actuators & Valve Automation Solutions.

## 🚀 Technology Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router** - Client-side Navigation
- **Tailwind CSS** - Utility-first Styling
- **Axios** - HTTP Client
- **PHP Backend** - REST API Integration

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit: **http://localhost:5173**

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   │   ├── Header.jsx   # Navigation with text-based logo
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   └── common/          # Reusable components
├── pages/               # Page components (9 routes)
│   ├── Home.jsx         # Hero slider + company overview
│   ├── Products.jsx     # 4 product categories with images
│   ├── Industries.jsx   # 6 industry sectors
│   ├── About.jsx        # Company history + certifications
│   ├── Contact.jsx      # Contact & quote forms
│   ├── Careers.jsx      # Job application form
│   └── global/          # India, UAE, Qatar pages
├── context/             # React Context
│   └── AuthContext.jsx  # Authentication state
├── services/            # API services
│   └── api.js           # Axios API client
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
└── assets/              # Images, fonts, icons

public/
└── assets/
    └── img/
        ├── products/         # 24 pneumatic, 5 gearbox images
        ├── certifications/   # 5 SVG certification badges
        ├── heroes/           # Hero slider images
        └── industries/       # Industry-specific images
```

## 📸 Asset Documentation

**Comprehensive Asset Guides:**
- **[ASSET_INVENTORY.md](ASSET_INVENTORY.md)** - Complete catalog of 36+ images and their locations
- **[ASSET_UPDATE_SUMMARY.md](ASSET_UPDATE_SUMMARY.md)** - Implementation details and visual enhancements
- **[MIGRATION_COMPLETE.md](MIGRATION_COMPLETE.md)** - Full migration documentation with all features

**Image Assets Available:**
- 24 pneumatic actuator product photos
- 5 gearbox product photos  
- 5 SVG certification badges (ISO, API, ATEX, CE)
- Hero slider images
- Text-based logo with brand styling

## ✨ Features

- ✅ Modern responsive design with Tailwind CSS
- ✅ **5-slide hero carousel** with auto-play (real product images)
- ✅ **Complete product catalog** with actual photos (Pneumatic, Electro-Hydraulic, Electrical, Gearboxes)
- ✅ **6 industry sector pages** (Oil & Gas, Power, Water, Chemical, Marine, Pharmaceutical)
- ✅ **Certification badges** (ISO 9001, ISO 14001, API, ATEX, CE)
- ✅ User authentication system
- ✅ Career application submission with resume upload
- ✅ Global presence pages (India HQ, UAE, Qatar)
- ✅ Contact & quote request forms (backend integrated)
- ✅ Dashboard for authenticated users
- ✅ Mobile-first responsive design with hover effects
- ✅ Fast page navigation (SPA)
- ✅ **17+ real product images** with zoom effects

## 🔌 Backend Integration

The React app connects to the existing PHP backend:

**API Endpoints:**
- Authentication: `/backend/auth/login.php`
- Logout: `/backend/auth/logout.php`
- Session Check: `/backend/auth/check_session.php`
- Job Applications: `/backend/api/submit_application.php`

**Session Management:** PHP sessions via cookies

### Environment Variables

Create `.env` file in root:
```env
VITE_API_URL=/backend
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

### Build the Project
```bash
npm run build
```

### Deploy
1. Upload `dist/` folder contents to your web server
2. Ensure `/backend` folder is accessible at the same domain
3. Configure server to redirect all routes to `index.html` (for SPA routing)

### Apache Configuration (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx Configuration
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 🔧 Development

### Adding New Pages
1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding API Endpoints
Update `src/services/api.js`:
```javascript
export const api = {
  newEndpoint: async (data) => {
    const response = await apiClient.post('/api/endpoint.php', data);
    return response.data;
  },
};
```

## 🎨 Styling with Tailwind

Tailwind is configured in `tailwind.config.js` with custom colors:

```javascript
colors: {
  primary: '#c41e3a',      // Susin red
  'primary-dark': '#8b1428',
  'primary-light': '#e63950',
}
```

Use in components:
```jsx
<button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg">
  Click Me
</button>
```

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Migration from Static HTML

This React SPA successfully converted the static HTML website for **SUSIN iTORK India** with:
- ✅ Component-based architecture (9 pages, reusable components)
- ✅ Client-side routing (no page reloads, instant navigation)
- ✅ State management with React Context (authentication, user state)
- ✅ Modern build tooling (Vite with HMR, <625ms startup)
- ✅ **17+ real product images** extracted from existing assets
- ✅ **5-slide hero carousel** with auto-play and product photos
- ✅ **Certification badges** (ISO, API, ATEX, CE) as SVG images
- ✅ Improved developer experience (hot reload, ESLint, organized structure)
- ✅ Mobile-responsive with hover effects and transitions
- ✅ Brand colors applied (#c41e3a primary red)

## 🔐 Authentication Flow

1. User clicks Login → Opens modal
2. Submits credentials → API call to `/backend/auth/login.php`
3. Backend validates → Creates PHP session
4. React updates AuthContext → Shows user menu
5. Protected routes check authentication state

## 🐛 Troubleshooting

**Port 5173 already in use:**
```bash
# Kill the process or change port in vite.config.js
```

**API calls failing:**
- Check backend is running (PHP server)
- Verify CORS settings in PHP
- Check `.env` file has correct API URL

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

© 2025 SUSIN iTORK India Pvt. Ltd. All rights reserved.

---

**Company:** SUSIN iTORK India - Industrial Actuators & Valve Automation  
**Established:** 1992 (32+ years of excellence)  
**Developed with:** React 18 + Vite 7 + Tailwind CSS 3  
**Backend:** PHP + MySQL  
**Version:** 1.0.0  
**Assets:** 17+ real product images implemented

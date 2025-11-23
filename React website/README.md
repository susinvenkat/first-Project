# Susin Group - React Website

Modern React website for Susin Group - MEP Contracting and Engineering Solutions.

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
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   └── common/          # Reusable components
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Careers.jsx
│   └── ...
├── context/             # React Context
│   └── AuthContext.jsx  # Authentication state
├── services/            # API services
│   └── api.js           # Axios API client
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
└── assets/              # Images, fonts, icons
```

## ✨ Features

- ✅ Modern responsive design with Tailwind CSS
- ✅ User authentication system
- ✅ Career application submission
- ✅ Global presence pages (India, UAE, Qatar)
- ✅ Product/Services showcase
- ✅ Contact forms
- ✅ Dashboard for authenticated users
- ✅ Mobile-first responsive design
- ✅ Fast page navigation (SPA)

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

This React app replaces the previous static HTML website with:
- Component-based architecture
- Client-side routing (no page reloads)
- State management with React Context
- Modern build tooling
- Improved developer experience

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

© 2025 Susin Group. All rights reserved.

---

**Developed with:** React + Vite + Tailwind CSS  
**Backend:** PHP + MySQL  
**Version:** 1.0.0

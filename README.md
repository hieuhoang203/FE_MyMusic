# 🎵 My Music - Modern Music Streaming Platform

A modern, responsive music streaming web application built with React.js, featuring a clean UI, real-time music player, and role-based access control.

## ✨ Features

### 🎶 Core Features

- **Real-time Music Player** - Play, pause, seek, volume control
- **Multi-role System** - User, Artist, Admin with different permissions
- **Song Management** - Upload, edit, delete songs with metadata
- **Search & Discovery** - Real-time search with debouncing
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes

### 🔐 Authentication & Security

- **JWT Authentication** - Secure token-based authentication
- **Form Validation** - Client-side validation with error handling
- **Input Sanitization** - XSS protection
- **Role-based Access Control** - Different views for different user types

### 🎨 User Experience

- **Modern UI** - Clean, intuitive interface with Ant Design
- **Loading States** - Proper loading indicators
- **Error Handling** - Comprehensive error boundaries
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized with React.memo, useCallback, useMemo

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on port 8920

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd FE_MyMusic
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── api/                 # API configuration and helpers
├── components/          # Reusable UI components
├── constants/           # Application constants
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── service/            # API service functions
├── css/                # Stylesheets
├── component/          # Page components
│   ├── pages/
│   │   ├── admin/      # Admin dashboard pages
│   │   ├── artis/      # Artist dashboard pages
│   │   ├── home/       # Home page
│   │   └── user/       # Authentication pages
└── asset/              # Static assets
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 User Roles

### 👤 User

- Browse and play music
- Search songs
- Create playlists
- Basic music player functionality

### 🎤 Artist

- Upload and manage songs
- View analytics
- Manage albums
- Track performance

### 👨‍💼 Admin

- Manage all users
- Approve/reject songs
- Manage genres and categories
- View system analytics
- Full system control

## 🔧 Technical Stack

- **Frontend**: React 18.2.0, React Router DOM
- **UI Library**: Ant Design 5.9.2
- **HTTP Client**: Axios 1.4.0
- **Icons**: Boxicons 2.1.4
- **Styling**: CSS3, Ant Design themes
- **State Management**: React Hooks, Context API
- **Build Tool**: Create React App

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy loading of components
- **Memoization** - React.memo, useMemo, useCallback
- **Debouncing** - Search input optimization
- **Image Optimization** - Proper image handling
- **Bundle Optimization** - Tree shaking and minification

## 🔒 Security Features

- **Input Validation** - Client and server-side validation
- **XSS Protection** - Input sanitization
- **CSRF Protection** - Token-based requests
- **Secure Storage** - Encrypted localStorage
- **Error Boundaries** - Graceful error handling

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints** - Desktop (1024px+), Tablet (768px-1023px), Mobile (<768px)
- **Touch Support** - Touch-friendly interactions
- **Adaptive Layout** - Dynamic layout adjustments

## 🎨 Customization

### Themes

The app supports light and dark themes. You can customize the theme by modifying the `ConfigProvider` in `App.js`.

### Constants

All configuration values are centralized in `src/constants/index.js` for easy maintenance.

### Styling

Custom styles are in the `src/css/` directory. The app uses a combination of CSS modules and Ant Design theming.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**

   - Ensure the backend API is running on port 8920
   - Check the API configuration in `src/api/myApi.js`

2. **Authentication Issues**

   - Clear localStorage and try logging in again
   - Check if the JWT token is valid

3. **Build Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - Try `npm run build` again

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Ant Design](https://ant.design/) - The UI component library
- [Boxicons](https://boxicons.com/) - The icon library
- [Create React App](https://create-react-app.dev/) - The build tool

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Happy Coding! 🎵**

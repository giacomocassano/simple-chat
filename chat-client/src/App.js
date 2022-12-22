import {useContext, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {Toaster} from 'react-hot-toast';
//stores
import {ThemeContext} from './store/ThemeContext';
import {AuthProvider} from './store/AuthContext';
import {SocketProvider} from './store/SocketContext';
//router and routes
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
//pages
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
//styles
import GlobalResetStyles from './styles/GlobalReset.styles';
import HomePage from './pages/HomePage';

function App() {
  const {theme, loadTheme} = useContext(ThemeContext);

  useEffect(() => {
    loadTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <ThemeProvider theme={theme}>
            <GlobalResetStyles />
            <Routes>
              {/* Unauthenticated routes */}
              <Route exact path='/' element={<LandingPage />} />
              {/* Authenticated routes */}
              <Route
                exact
                path='/home'
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path='/chat'
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback when page is not found  */}
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </ThemeProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';
import { defaultProfile } from '../data/portfolio.js';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarReady, setAvatarReady] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.allSettled([
          api.get('/api/profile'),
          api.get('/api/projects'),
        ]);
        if (profileRes.status === 'fulfilled') {
          setProfile(profileRes.value.data.data || defaultProfile);
        } else {
          setProfile(defaultProfile);
        }
        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value.data.data)) {
          setProjects(projectsRes.value.data.data);
        } else {
          setError(projectsRes.reason || null);
        }
      } catch (err) {
        setError(err);
        setProfile(defaultProfile);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const avatarLoaded = useCallback(() => {
    setAvatarReady(true);
  }, []);

  const value = {
    profile,
    setProfile,
    projects,
    loading,
    error,
    avatarReady,
    avatarLoaded,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export default PortfolioContext;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import api from '../../services/api';

const GithubActivity = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await api.get('/api/github/vakiti-lokesh');
        setGithubData(res.data.data || res.data);
      } catch {
        setGithubData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  const fallbackRepos = [
    { name: 'code-collab', description: 'Real-time collaborative coding platform', stars: 0, forks: 0, language: 'JavaScript', url: 'https://github.com/vakiti-lokesh/code-collab' },
    { name: 'rateshield', description: 'Distributed rate limiter sandbox', stars: 0, forks: 0, language: 'JavaScript', url: 'https://github.com/vakiti-lokesh/rateshield' },
    { name: 'water-management', description: 'Smart Water Management System', stars: 0, forks: 0, language: 'Java', url: 'https://github.com/vakiti-lokesh/water-management' },
    { name: 'blockchain-ai', description: 'Blockchain AI Integration System', stars: 0, forks: 0, language: 'JavaScript', url: 'https://github.com/vakiti-lokesh/blockchain-ai' },
  ];

  const repos = githubData?.repos || fallbackRepos;

  return (
    <section id="github" className="section-padding relative" ref={ref}>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center"><Github size={20} className="text-primary-400" /></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">GitHub Activity</h2>
        </motion.div>

        {/* Stats */}
        {githubData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Repositories', value: githubData.publicRepos },
              { label: 'Followers', value: githubData.followers },
              { label: 'Following', value: githubData.following },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-dark-300 text-xs">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="glass-card rounded-2xl p-5 group hover:border-primary-500/20 transition-all block"
              data-cursor="OPEN"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white text-sm font-semibold group-hover:text-primary-300 transition-colors">{repo.name}</h3>
                <ExternalLink size={14} className="text-dark-300 group-hover:text-primary-400 transition-colors shrink-0" />
              </div>
              <p className="text-dark-200 text-xs leading-relaxed mb-3 line-clamp-2">{repo.description || 'No description'}</p>
              <div className="flex items-center gap-4 text-xs text-dark-300">
                {repo.language && <span>{repo.language}</span>}
                <span className="flex items-center gap-1"><Star size={12} /> {repo.stars || 0}</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks || 0}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {loading && (
          <div className="text-center py-8 text-dark-300 text-sm">Loading GitHub data...</div>
        )}
      </div>
    </section>
  );
};

export default GithubActivity;

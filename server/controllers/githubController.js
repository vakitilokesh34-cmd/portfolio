const GITHUB_API = 'https://api.github.com';

const buildHeaders = () => {
  const headers = { 
    Accept: 'application/vnd.github+json',
    'User-Agent': 'PortfolioApp',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token && !token.startsWith('your_') && token.trim() !== '') {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username || process.env.GITHUB_USERNAME;
    if (!username) return res.status(400).json({ success: false, message: 'GitHub username is required' });
    const response = await fetch(`${GITHUB_API}/users/${username}`, { headers: buildHeaders() });
    if (!response.ok) return res.status(response.status).json({ success: false, message: 'Failed to fetch GitHub profile' });
    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Failed to fetch GitHub profile' });
  }
};

export const getRepositories = async (req, res) => {
  try {
    const username = req.params.username || process.env.GITHUB_USERNAME;
    if (!username) return res.status(400).json({ success: false, message: 'GitHub username is required' });
    const perPage = req.query.per_page || 10;
    const sort = req.query.sort || 'updated';
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&sort=${sort}`,
      { headers: buildHeaders() }
    );
    if (!response.ok) return res.status(response.status).json({ success: false, message: 'Failed to fetch repositories' });
    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Failed to fetch repositories' });
  }
};

export const getGithubStats = async (req, res) => {
  try {
    const username = req.params.username || process.env.GITHUB_USERNAME;
    if (!username) return res.status(400).json({ success: false, message: 'GitHub username is required' });

    const headers = buildHeaders();
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`${GITHUB_API}/users/${username}`, { headers, signal: AbortSignal.timeout(2000) }),
        fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&per_page=10`, { headers, signal: AbortSignal.timeout(2000) }),
      ]);

      if (userRes.ok) {
        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];

        return res.status(200).json({
          success: true,
          data: {
            username: user.login,
            name: user.name || 'Vakiti Lokesh',
            avatar: user.avatar_url || '/avatar.jpg',
            publicRepos: user.public_repos || 4,
            followers: user.followers || 0,
            following: user.following || 0,
            repos: Array.isArray(repos) ? repos.map((r) => ({
              name: r.name,
              description: r.description,
              stars: r.stargazers_count,
              forks: r.forks_count,
              language: r.language,
              url: r.html_url,
              updatedAt: r.updated_at,
            })) : [],
          },
        });
      }
    } catch {
      // Fall through to fallback data
    }

    // Graceful fallback for offline / rate-limited / dummy username
    res.status(200).json({
      success: true,
      data: {
        username: username,
        name: 'Vakiti Lokesh',
        avatar: '/avatar.jpg',
        publicRepos: 4,
        followers: 16,
        following: 12,
        repos: [
          { name: 'code-collab', description: 'Real-time collaborative coding platform with Socket.IO, Node.js & React', stars: 6, forks: 2, language: 'JavaScript', url: `https://github.com/${username}/code-collab` },
          { name: 'rateshield', description: 'Distributed rate limiter sandbox & Redis token-bucket middleware', stars: 5, forks: 1, language: 'JavaScript', url: `https://github.com/${username}/rateshield` },
          { name: 'water-management', description: 'Smart IoT Water Management System with Java Servlets & MySQL', stars: 4, forks: 1, language: 'Java', url: `https://github.com/${username}/water-management` },
          { name: 'blockchain-ai', description: 'Blockchain AI Integration System for verifiable tamper-proof AI inferences', stars: 8, forks: 3, language: 'JavaScript', url: `https://github.com/${username}/blockchain-ai` },
        ],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'GitHub API error' });
  }
};

export const getContributions = async (req, res) => {
  try {
    const username = req.params.username || process.env.GITHUB_USERNAME;
    if (!username) return res.status(400).json({ success: false, message: 'GitHub username is required' });
    const response = await fetch(`${GITHUB_API}/users/${username}/events/public?per_page=30`, {
      headers: buildHeaders(),
    });
    if (!response.ok) return res.status(response.status).json({ success: false, message: 'Failed to fetch contributions' });
    const events = await response.json();
    const contributions = events.filter(
      (event) =>
        event.type === 'PushEvent' ||
        event.type === 'PullRequestEvent' ||
        event.type === 'IssuesEvent' ||
        event.type === 'CreateEvent'
    );
    res.status(200).json({ success: true, count: contributions.length, data: contributions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Failed to fetch contributions' });
  }
};
import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Avatar from '../models/Avatar.js';
import Contact from '../models/Contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not set in environment');
  process.exit(1);
}

const profiles = [
  {
    name: 'Vakiti Lokesh',
    tagline: 'Aspiring Software Developer',
    heading: "Hello, I'm Vakiti Lokesh",
    bio: 'CSE Student | Full-Stack Developer | Problem Solver. I build intelligent, scalable and interactive software experiences.',
    email: 'vakitilokesh@gmail.com',
    location: 'India',
    about: {
      paragraphs: [
        "I'm a passionate Computer Science student at Anurag University with a strong foundation in full-stack development, problem-solving, and emerging technologies.",
        'From real-time collaborative platforms to distributed systems, I enjoy exploring new technologies and pushing what is possible in the browser and beyond.',
      ],
      highlights: [
        'Full-Stack Web Development (MERN)',
        'Real-Time Applications (Socket.IO)',
        'AI/ML & Blockchain Exploration',
        'Problem Solving & DSA',
      ],
    },
    socials: {
      github: 'https://github.com/vakiti-lokesh',
      linkedin: 'https://www.linkedin.com/in/vakiti-lokesh',
      twitter: '',
      leetcode: '',
      gfg: '',
      instagram: '',
    },
    skills: [
      { name: 'Java', level: 85, category: 'Programming', icon: '' },
      { name: 'C', level: 80, category: 'Programming', icon: '' },
      { name: 'Python', level: 75, category: 'Programming', icon: '' },
      { name: 'JavaScript', level: 85, category: 'Programming', icon: '' },
      { name: 'HTML', level: 90, category: 'Web Development', icon: '' },
      { name: 'CSS', level: 85, category: 'Web Development', icon: '' },
      { name: 'React', level: 88, category: 'Web Development', icon: '' },
      { name: 'Node.js', level: 84, category: 'Web Development', icon: '' },
      { name: 'Express.js', level: 84, category: 'Web Development', icon: '' },
      { name: 'Socket.IO', level: 80, category: 'Web Development', icon: '' },
      { name: 'MongoDB', level: 82, category: 'Database', icon: '' },
      { name: 'MySQL', level: 78, category: 'Database', icon: '' },
      { name: 'Redis', level: 70, category: 'Database', icon: '' },
      { name: 'Git', level: 88, category: 'Tools', icon: '' },
      { name: 'GitHub', level: 88, category: 'Tools', icon: '' },
      { name: 'VS Code', level: 92, category: 'Tools', icon: '' },
      { name: 'Postman', level: 85, category: 'Tools', icon: '' },
      { name: 'Docker', level: 60, category: 'Tools', icon: '' },
    ],
    education: [
      {
        institution: 'Anurag University',
        degree: 'B.Tech — Computer Science and Engineering',
        field: 'Computer Science',
        period: '2024 – 2028',
        details: 'Currently pursuing B.Tech in CSE with focus on full-stack development, AI/ML, and blockchain. CGPA: 9.32.',
      },
      {
        institution: 'New Sri Chaitanya Junior College',
        degree: 'Intermediate (MPC)',
        field: 'Mathematics, Physics, Chemistry',
        period: '2022 – 2024',
        details: 'Achieved State 2nd Rank in Intermediate First Year with ₹10,000 prize.',
      },
      {
        institution: 'Sai Siddhartha High School',
        degree: '10th Standard',
        field: 'General',
        period: '2021 – 2022',
        details: 'Completed secondary education.',
      },
    ],
    journey: [
      { year: '2024', title: 'Started CSE Journey', description: 'Began B.Tech at Anurag University, diving into programming fundamentals with Java and C.' },
      { year: '2024', title: 'DSA & Problem Solving', description: 'Mastered data structures and algorithms, building a strong problem-solving foundation.' },
      { year: '2025', title: 'Web & Full-Stack Development', description: 'Built full-stack applications with React, Node.js, Express and MongoDB.' },
      { year: '2025', title: 'Real-Time Systems', description: 'Built real-time applications with Socket.IO — Code Collab and RateShield.' },
      { year: '2026', title: 'AI/ML & Blockchain', description: 'Exploring AI/ML, blockchain integration and advanced distributed systems.' },
    ],
    achievements: [
      {
        title: 'State 2nd Rank — Intermediate First Year',
        description: 'Achieved 2nd rank at state level in Intermediate First Year examinations.',
        icon: 'award',
        link: '',
      },
      {
        title: '₹10,000 Prize Achievement',
        description: 'Awarded ₹10,000 prize for outstanding academic/performance achievement.',
        icon: 'trophy',
        link: '',
      },
      {
        title: 'East India Blockchain Summit 2.0 — IIT Kharagpur',
        description: 'Participated in the East India Blockchain Summit 2.0 held at IIT Kharagpur.',
        icon: 'calendar',
        link: '',
      },
    ],
    stats: {
      projects: 4,
      contributions: 0,
      prs: 0,
      problemsSolved: 0,
    },
  },
];

const projects = [
  {
    title: 'Code Collab',
    description: 'Real-time collaborative coding platform enabling multiple developers to write, edit, and execute code together seamlessly.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Monaco Editor', 'JWT', 'Judge0'],
    featured: true,
    category: 'Full-Stack',
    highlights: [
      'Real-time collaborative code editing',
      'Multiple programming language support',
      'Room-based collaboration with invite system',
      'Live code synchronization via WebSockets',
      'Built-in chat and cursor tracking',
      'Code execution via Judge0 API',
    ],
    sortOrder: 1,
    githubUrl: 'https://github.com/vakiti-lokesh/code-collab',
  },
  {
    title: 'RateShield',
    description: 'Distributed rate limiter sandbox for testing and implementing various rate limiting algorithms with real-time monitoring.',
    techStack: ['React', 'Node.js', 'Express', 'Redis', 'MongoDB', 'JWT'],
    featured: true,
    category: 'Full-Stack',
    highlights: [
      'Multiple rate limiting algorithms (Token Bucket, Sliding Window, Fixed Window)',
      'Redis-based distributed rate limiting',
      'Local fallback when Redis is unavailable',
      'API key management system',
      'Real-time metrics dashboard',
      'Stress testing capabilities',
    ],
    sortOrder: 2,
    githubUrl: 'https://github.com/vakiti-lokesh/rateshield',
  },
  {
    title: 'Smart Water Management System',
    description: 'An IoT-inspired web application for monitoring and managing water usage with analytics and alert systems.',
    techStack: ['Java', 'Servlets', 'MySQL', 'HTML', 'CSS'],
    featured: false,
    category: 'Full-Stack',
    highlights: [
      'Water usage monitoring and tracking',
      'Real-time data visualization',
      'Usage analytics and reports',
      'Alert system for excessive usage',
      'User management and authentication',
    ],
    sortOrder: 3,
    githubUrl: 'https://github.com/vakiti-lokesh/water-management',
  },
  {
    title: 'Blockchain AI Integration System',
    description: 'A proof-of-concept system integrating blockchain technology with AI/ML capabilities for secure and intelligent data processing.',
    techStack: ['JavaScript', 'Blockchain', 'AI/ML'],
    featured: false,
    category: 'AI/ML',
    highlights: [
      'Blockchain-based data integrity verification',
      'AI/ML model integration',
      'Secure data processing pipeline',
      'Decentralized computation framework',
    ],
    sortOrder: 4,
    githubUrl: 'https://github.com/vakiti-lokesh/blockchain-ai',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Avatar.deleteMany({});
    await Contact.deleteMany({});
    console.log('Cleared existing data');

    const insertedProfiles = await Profile.insertMany(profiles);
    const insertedProjects = await Project.insertMany(projects);
    console.log(`Seeded ${insertedProfiles.length} profiles`);
    console.log(`Seeded ${insertedProjects.length} projects`);

    await mongoose.disconnect();
    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
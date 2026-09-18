import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, Send } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { portfolioData } from '../../data/portfolio';

const Terminal = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Vakiti Lokesh\'s developer shell (v2.4.0). Type "help" to see available commands or "avatar" to view photo.' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    const commands = portfolioData?.terminalCommands || {};

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'avatar') {
      setHistory((prev) => [
        ...prev,
        { type: 'input', text: `$ ${cmd}` },
        { 
          type: 'avatar', 
          text: `Vakiti Lokesh — Aspiring Software Developer (Anurag University, CGPA: 9.29)` 
        },
      ]);
      return;
    }

    const response = commands[trimmed];
    if (response) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', text: `$ ${cmd}` },
        { type: 'output', text: response },
      ]);
    } else if (trimmed) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', text: `$ ${cmd}` },
        { type: 'error', text: `Command not found: "${trimmed}". Type "help" for a list of available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex >= 0 ? commandHistory[newIndex] : '');
    }
  };

  return (
    <section id="terminal" className="section-padding relative" ref={ref}>
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
            <TerminalIcon size={22} className="text-primary-400" />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Interactive <span className="text-chrome-3d">Console</span>
            </h2>
            <p className="text-xs text-dark-300 font-mono">
              Execute commands directly on Vakiti's virtual workstation shell.
            </p>
          </div>
        </div>

        {/* 3D Glass Console Window */}
        <div className="glass-studio rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Console Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-dark-900/90 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono text-dark-300">
                lokesh@anurag-univ ~ bash
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-primary-400">
              <Sparkles size={13} />
              <span>v2.4.0</span>
            </div>
          </div>

          {/* Console Output Area */}
          <div
            ref={terminalRef}
            className="p-5 h-84 sm:h-96 overflow-y-auto font-mono text-xs sm:text-sm bg-dark-950/70"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.type === 'avatar' ? (
                  <div className="flex items-center gap-4 p-3 rounded-2xl glass-card border border-primary-500/30 my-2 max-w-md">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <img src="/avatar.jpg" alt="Vakiti Lokesh" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Vakiti Lokesh</p>
                      <p className="text-[11px] text-primary-300">Software Developer</p>
                      <p className="text-[10px] text-dark-300">Anurag Univ (9.29 CGPA)</p>
                    </div>
                  </div>
                ) : (
                  <pre
                    className={`whitespace-pre-wrap font-mono ${
                      entry.type === 'input'
                        ? 'text-primary-300 font-semibold'
                        : entry.type === 'error'
                        ? 'text-red-400'
                        : entry.type === 'system'
                        ? 'text-dark-300 italic'
                        : 'text-dark-100'
                    }`}
                  >
                    {entry.text}
                  </pre>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 mt-2 pt-1 border-t border-white/5">
              <span className="text-emerald-400 font-mono font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm caret-primary-400"
                placeholder="type 'help', 'avatar', or 'projects'..."
                aria-label="Terminal input"
              />
            </div>
          </div>

          {/* Quick Command Suggestions */}
          <div className="px-4 py-2.5 bg-dark-900/90 border-t border-white/5 flex flex-wrap items-center gap-2 text-[11px] font-mono text-dark-300">
            <span>Suggestions:</span>
            {['help', 'avatar', 'projects', 'skills', 'achievements', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => processCommand(cmd)}
                className="px-2 py-0.5 rounded-md glass-card hover:text-white hover:border-primary-400/40 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Terminal;

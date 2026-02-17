import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { RotateCcw } from 'lucide-react';
import { terminalCommands } from '../mock';

const TerminalSandbox = ({ recruiterMode }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to SOC Terminal Sandbox v2.0' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'prompt', content: '' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [
      ...prev.slice(0, -1),
      { type: 'input', content: `sourav@soc-terminal:~$ ${cmd}` }
    ]);

    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Process command
    if (trimmedCmd === '') {
      setHistory(prev => [...prev, { type: 'prompt', content: '' }]);
      return;
    }

    if (trimmedCmd === 'clear') {
      setHistory([
        { type: 'system', content: 'Terminal cleared.' },
        { type: 'prompt', content: '' }
      ]);
      return;
    }

    const commandResponse = terminalCommands[trimmedCmd];
    
    if (commandResponse) {
      setHistory(prev => [
        ...prev,
        { type: 'output', content: commandResponse.output },
        { type: 'prompt', content: '' }
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${trimmedCmd}\nType "help" for available commands.` },
        { type: 'prompt', content: '' }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    }
  };

  const handleReset = () => {
    setHistory([
      { type: 'system', content: 'Terminal reset.' },
      { type: 'system', content: 'Type "help" for available commands.' },
      { type: 'prompt', content: '' }
    ]);
    setInput('');
    setCommandHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <section id="terminal" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 font-mono">
                <span className="text-emerald-500">&gt;</span> Secure Sandbox
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Interactive terminal interface. Try commands like <code className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">help</code>, <code className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">skills</code>, or <code className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">secret</code>.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Terminal Window */}
        <Card className="bg-[#0a0a0a] border-emerald-500/30 overflow-hidden shadow-2xl shadow-emerald-500/10">
          {/* Terminal Header */}
          <div className="bg-[#121212] border-b border-emerald-500/20 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-gray-500 ml-2 font-mono">secure-sandbox@soc-terminal</span>
          </div>

          {/* Terminal Content */}
          <div 
            className="p-6 font-mono text-sm h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, index) => {
              if (entry.type === 'system') {
                return (
                  <div key={index} className="text-blue-400 mb-2">
                    {entry.content}
                  </div>
                );
              }
              if (entry.type === 'input') {
                return (
                  <div key={index} className="text-gray-300 mb-2">
                    {entry.content}
                  </div>
                );
              }
              if (entry.type === 'output') {
                return (
                  <pre key={index} className="text-emerald-400 mb-4 whitespace-pre-wrap">
                    {entry.content}
                  </pre>
                );
              }
              if (entry.type === 'error') {
                return (
                  <pre key={index} className="text-red-400 mb-4 whitespace-pre-wrap">
                    {entry.content}
                  </pre>
                );
              }
              if (entry.type === 'prompt') {
                return (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="text-emerald-500 mr-2">sourav@soc-terminal:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none caret-emerald-500"
                      autoFocus
                      spellCheck={false}
                    />
                    <span className="animate-pulse text-emerald-500">_</span>
                  </div>
                );
              }
              return null;
            })}
            <div ref={terminalEndRef} />
          </div>
        </Card>

        {/* Helper Text */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Pro tip: Use ↑/↓ arrow keys to navigate command history
        </div>
      </div>
    </section>
  );
};

export default TerminalSandbox;

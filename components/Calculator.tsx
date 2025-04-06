import React, { useState, useCallback, useEffect } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>(''); 
  const [history, setHistory] = useState<string[]>([]); 
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleClick = useCallback((value: string) => {
    if (value === 'C') {
      setInput(''); 
    } else if (value === '⌫') {
      setInput(input.slice(0, -1)); 
    } else if (value === '=') {
      try {
        const result = eval(input); 
        if (result === Infinity || result === -Infinity) {
          setInput('Ошибка: Деление на ноль');
        } else {
          setHistory([...history, `${input} = ${result}`]); 
          setInput(String(result)); 
        }
      } catch {
        setInput('Ошибка');
      }
    } else {
      setInput(input + value);
    }
  }, [input, history]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    if (key === 'Backspace') {
      setInput(input.slice(0, -1)); 
    } else if (key === 'Enter') {
      handleClick('=');
    } else if (key === 'c' || key === 'C') {
      setInput(''); 
    } else if (/[\d+\-*/.]/.test(key)) {
      if (key === '-' && (input === '' || /[/+\-/*//]$/.test(input))) {
        setInput(input + key);
      } else if (key !== '-') {
        setInput(input + key); 
      }
    }
  }, [input, handleClick]); 

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const clearHistory = () => {
    setHistory([]);  
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className={`max-w-xs mx-auto p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <button
          onClick={toggleTheme}
          className={`text-white p-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full mb-4`}
        >
          {isDarkMode ? 'Светлая тема' : 'Темная тема'}
        </button>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-500' : 'bg-green-100 border-green-400'} border-2`} 
            style={{ transition: 'background-color 0.3s ease-in-out' }}
          >
            <Display value={input} />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {['7', '8', '9', '/'].map((label) => (
              <Button key={label} label={label} onClick={handleClick} isDarkMode={isDarkMode} />
            ))}
            {['4', '5', '6', '*'].map((label) => (
              <Button key={label} label={label} onClick={handleClick} isDarkMode={isDarkMode} />
            ))}
            {['1', '2', '3', '-'].map((label) => (
              <Button key={label} label={label} onClick={handleClick} isDarkMode={isDarkMode} />
            ))}
            {['0', '.', '=', '+'].map((label) => (
              <Button key={label} label={label} onClick={handleClick} isDarkMode={isDarkMode} />
            ))}
            <Button label="C" onClick={handleClick} isDarkMode={isDarkMode} />
            <Button label="⌫" onClick={handleClick} isDarkMode={isDarkMode} />
          </div>
        </div>
        <div className="mt-4 text-gray-300">
          <h3>История:</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
          <button
            onClick={clearHistory}
            className={`mt-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'} text-white`}
          >
            Очистить историю
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

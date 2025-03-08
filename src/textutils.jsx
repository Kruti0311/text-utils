import React, { useState } from 'react';

const TextUtilsApp = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ characters: 0, words: 0, sentences: 0, paragraphs: 0 });
  const [animation, setAnimation] = useState('');

  const updateStats = (inputText) => {
    const characters = inputText.length;
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
    const sentences = inputText.trim() === '' ? 0 : inputText.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = inputText.trim() === '' ? 0 : inputText.split(/\n+/).filter(Boolean).length;
    
    setStats({ characters, words, sentences, paragraphs });
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateStats(newText);
  };

  const transformText = (type) => {
    let transformedText = '';
    
    switch (type) {
      case 'uppercase':
        transformedText = text.toUpperCase();
        break;
      case 'lowercase':
        transformedText = text.toLowerCase();
        break;
      case 'capitalize':
        transformedText = text.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'reverse':
        transformedText = text.split('').reverse().join('');
        break;
      case 'trim':
        transformedText = text.trim().replace(/\s+/g, ' ');
        break;
      case 'remove-lines':
        transformedText = text.replace(/[\r\n]+/g, ' ');
        break;
      case 'remove-extra-spaces':
        transformedText = text.replace(/\s+/g, ' ').trim();
        break;
      case 'count-words':
        transformedText = `Word count: ${text.trim() === '' ? 0 : text.trim().split(/\s+/).length}`;
        break;
      case 'alternating':
        transformedText = text.split('').map((char, index) => 
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        ).join('');
        break;
    }
    
    setResult(transformedText);
    setAnimation('animate-pulse');
    setTimeout(() => setAnimation(''), 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText('');
    setResult('');
    updateStats('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-emerald-500 py-6 px-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Text<span className="text-yellow-300">Utils</span></h1>
          <p className="text-teal-100 mt-2">Transform your text in style</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-8 px-4">
        {/* Text Input */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">
            Enter your text
          </label>
          <textarea
            id="text-input"
            className="w-full h-40 p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-gray-400"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={handleTextChange}
          />
          
          {/* Text Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="bg-gray-700 px-3 py-1 rounded-full text-teal-300 flex items-center">
              <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-xs mr-2 text-white">
                <span>C</span>
              </span>
              {stats.characters}
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-teal-300 flex items-center">
              <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-xs mr-2 text-white">
                <span>W</span>
              </span>
              {stats.words}
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-teal-300 flex items-center">
              <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-xs mr-2 text-white">
                <span>S</span>
              </span>
              {stats.sentences}
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-teal-300 flex items-center">
              <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-xs mr-2 text-white">
                <span>P</span>
              </span>
              {stats.paragraphs}
            </div>
          </div>
        </div>

        {/* Transform Tools */}
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <div className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-teal-300 flex items-center">
                <span className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </span>
                Transform Your Text
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => transformText('uppercase')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">UPPERCASE</span>
                </button>
                <button 
                  onClick={() => transformText('lowercase')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">lowercase</span>
                </button>
                <button 
                  onClick={() => transformText('capitalize')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">Capitalize</span>
                </button>
                <button 
                  onClick={() => transformText('reverse')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">Reverse</span>
                </button>
                <button 
                  onClick={() => transformText('trim')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">Trim Spaces</span>
                </button>
                <button 
                  onClick={() => transformText('remove-lines')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">Remove Line Breaks</span>
                </button>
                <button 
                  onClick={() => transformText('remove-extra-spaces')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">Remove Extra Spaces</span>
                </button>
                <button 
                  onClick={() => transformText('alternating')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">AlTeRnAtInG cAsE</span>
                </button>
                <button 
                  onClick={() => transformText('count-words')}
                  className="group relative overflow-hidden bg-gray-700 hover:bg-teal-600 text-white py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-3 bg-teal-500 transition-all duration-300 ease-out group-hover:w-full opacity-20"></span>
                  <span className="relative">Count Words</span>
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div className={`mt-8 ${animation}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium text-teal-300 flex items-center">
                    <span className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mr-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Result
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs bg-gray-700 hover:bg-teal-600 text-gray-200 py-1 px-3 rounded-md transition duration-200 flex items-center gap-1"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button 
                      onClick={clearText}
                      className="text-xs bg-gray-700 hover:bg-red-600 text-gray-200 py-1 px-3 rounded-md transition duration-200"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="bg-gray-700 border border-gray-600 rounded-md p-4 whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-4 mt-12 border-t border-gray-700">
        <div className="max-w-5xl mx-auto text-center">
          <p className="mb-2 text-teal-300">TextUtils - Text Transformation Made Beautiful</p>
          <p className="text-sm text-gray-400">©2025 TextUtils. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TextUtilsApp;
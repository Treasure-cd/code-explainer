import React, { useState } from 'react';
import { Sparkles, Zap, Copy, Check, Code2, Brain, Rocket } from 'lucide-react';
import Editor from "@monaco-editor/react";

export default function CodeExplainerUI() {
  const [copied, setCopied] = useState({ explanation: false, optimized: false });
  const [activeTab, setActiveTab] = useState('explain');
  const [code, setCode] = useState("// Start typing...");
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const handleCopy = (type) => {
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleAIAction = async (mode) => {
  if (loading) return; // prevent spamming

  setActiveTab(mode);
  setLoading(true);
  console.log("AI action triggered:", mode);
  
  try {
    const response = await fetch("/api/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Explain this code:" },
          { role: "user", content: code },
        ],
      }),
    });

    if (response.status === 429) {
      setOutput("⚠️ You're sending requests too fast. Wait a bit and try again.");
      return;
    }

    const data = await response.json();
    console.log("Response data:", data);
    setOutput(data.choices?.[0]?.message?.content || "No result.");
  } catch (err) {
    console.error(err);
    setOutput("❌ Error fetching AI response.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-black"></div>
      
      {/* Gradient orbs */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-slate-950 backdrop-blur-sm">
            <Code2 className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Code Analysis
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Codesplain
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Understand any code instantly. Get explanations and optimizations powered by AI.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Code Input */}
          <div className="space-y-4">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="p-3 border-t border-slate-950 text-left text-slate-400 text-xs bg-slate-950">
                  <span className='mr-70 ml-5'>
                    Write or paste code here...
                    </span>
                  <select
                      id="language-select"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className='border-black border-1 rounded-md p-1 cursor-pointer'
                    >
                      <option value="" className='bg-slate-950 cursor-pointer'>Select a language</option>
                      <option value="typescript" className='bg-slate-950 cursor-pointer'>TypeScript</option>
                      <option value="javascript" className='bg-slate-950 cursor-pointer'>JavaScript</option>
                      <option value="css" className='bg-slate-950 cursor-pointer'>CSS</option>
                      <option value="scss" className='bg-slate-950 cursor-pointer'>SCSS</option>
                      <option value="json" className='bg-slate-950 cursor-pointer'>JSON</option>
                      <option value="html" className='bg-slate-950 cursor-pointer'>HTML</option>
                    </select>


                </div>
                  <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: {top: 15}
                  }}
                />
                <div className="p-3 border-t border-slate-950 text-right text-slate-400 text-xs bg-slate-950">
                  {code.length} characters
                </div>
         </div>
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => handleAIAction("explain")}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 rounded-xl px-6 py-4 font-semibold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  <span>Explain Code</span>
                </div>
              </button>
              
              <button 
                onClick={() => handleAIAction("optimize")}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl px-6 py-4 font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Optimize</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-800/50 bg-slate-900/80">
                <button
                  onClick={() => setActiveTab("explain")}
                  className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${
                    activeTab === 'explain'
                      ? 'text-teal-400 border-b-2 border-teal-400 bg-slate-800/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Explanation
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("optimize")}
                  className={`flex-1 px-6 py-4 font-medium transition-all duration-300 ${
                    activeTab === 'optimize'
                      ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Optimized Code
                  </div>
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 min-h-[400px]">
                {activeTab === 'explain' ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                      <Sparkles className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-teal-400">AI Explanation</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          This will contain the AI-generated explanation of your code. It will break down what each part does, explain the logic, and highlight any important concepts.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                      <div className="pl-4 border-l-2 border-teal-500/30 space-y-2">
                      {loading ? (
                          <p className="text-slate-400">AI is thinking...</p>
                        ) : (
                          <pre className="whitespace-pre-wrap text-slate-300">{output}</pre>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy('explanation')}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      {copied.explanation ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Explanation</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <Rocket className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-blue-400">Optimized Version</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          AI-optimized code with performance improvements, better practices, and efficiency enhancements.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm border border-slate-800/50">
                      <div className="text-slate-300">
                        <span className="text-purple-400">function</span> <span className="text-teal-400">fibonacci</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-blue-400">n</span>
                        <span className="text-slate-400">, </span>
                        <span className="text-blue-400">memo</span>
                        <span className="text-slate-400"> = {"{}"}) {"{"}</span>
                        <br />
                        <span className="ml-4 text-purple-400">if</span> <span className="text-slate-400">(</span>
                        <span className="text-blue-400">n</span> <span className="text-purple-400">in</span> <span className="text-blue-400">memo</span>
                        <span className="text-slate-400">) </span>
                        <span className="text-purple-400">return</span> <span className="text-blue-400">memo</span>
                        <span className="text-slate-400">[</span><span className="text-blue-400">n</span><span className="text-slate-400">];</span>
                        <br />
                        <span className="ml-4 text-purple-400">if</span> <span className="text-slate-400">(</span>
                        <span className="text-blue-400">n</span> <span className="text-slate-400">&lt;= 1) </span>
                        <span className="text-purple-400">return</span> <span className="text-blue-400">n</span>
                        <span className="text-slate-400">;</span>
                        <br />
                        <span className="ml-4 text-blue-400">memo</span><span className="text-slate-400">[</span>
                        <span className="text-blue-400">n</span><span className="text-slate-400">] = </span>
                        <span className="text-teal-400">fibonacci</span><span className="text-slate-400">(</span>
                        <span className="text-blue-400">n</span> <span className="text-slate-400">- 1, </span>
                        <span className="text-blue-400">memo</span><span className="text-slate-400">) +</span>
                        <br />
                        <span className="ml-16 text-teal-400">fibonacci</span><span className="text-slate-400">(</span>
                        <span className="text-blue-400">n</span> <span className="text-slate-400">- 2, </span>
                        <span className="text-blue-400">memo</span><span className="text-slate-400">);</span>
                        <br />
                        <span className="ml-4 text-purple-400">return</span> <span className="text-blue-400">memo</span>
                        <span className="text-slate-400">[</span><span className="text-blue-400">n</span><span className="text-slate-400">];</span>
                        <br />
                        <span className="text-slate-400">{"}"}</span>
                      </div>
                    </div>

                    <div className="text-sm text-slate-400 space-y-2">
                      <p className="font-medium text-slate-300">Improvements:</p>
                      <ul className="space-y-1 pl-4">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Added memoization to avoid redundant calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Reduced time complexity from O(2^n) to O(n)</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleCopy('optimized')}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      {copied.optimized ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Optimized Code</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Built with React • Powered by AI • Made with ⚡ by you</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
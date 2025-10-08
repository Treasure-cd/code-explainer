import React, { useState } from 'react'
import { Sparkles, Copy, Check, Rocket } from 'lucide-react';
const AIExplain = ({ loading, explainedOutput, optimizedOutput, activeTab, setActiveTab }) => {
    const [copied, setCopied] = useState({ explanation: false, optimized: false });
    
    
    


  return (
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
                          <pre className="whitespace-pre-wrap text-slate-300">{explainedOutput}</pre>
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
                      {optimizedOutput}
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
          
  )
}

export default AIExplain
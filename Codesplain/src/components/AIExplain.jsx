import React, { useState } from 'react'
import { Sparkles, Copy, Check, Rocket } from 'lucide-react';
import removeMd from "remove-markdown";



const AIExplain = ({
   loadingExplain,
   loadingOptimize,
   explainedOutput,
   optimizedOutput,
   activeTab,
   setActiveTab,
   loading,
   setExplainingMode,
   explainingMode
  }) => {
  const [copied, setCopied] = useState({ explanation: false, optimized: false });
  const expLoading = loadingExplain ?? loading;
  const optLoading = loadingOptimize ?? loading;



const explainModes = [
  { key: 'newbie', label: "Just started today", value: "newbie" },
  { key: 'beginner', label: "Beginner", value: "beginner" },
  { key: 'intermediate', label: "Intermediate", value: "intermediate" },
  { key: 'expert', label: "Expert", value: "expert" }
]



  const handleCopy = async (which) => {
    try {
      const text = which === 'explanation' ? explainedOutput : optimizedOutput;
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setCopied((s) => ({ ...s, [which]: true }));
      setTimeout(() => setCopied((s) => ({ ...s, [which]: false })), 2000);
    } catch (err) {
      console.error('copy failed', err);
    }
  }


  return (
    <>
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl overflow-hidden">
              {/* Tabs */}
        <div className="flex border-b border-slate-800/50 bg-slate-900/80">
                <button
                  onClick={() => setActiveTab("explain")}
                  className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-300 ${
                    activeTab === 'explain'
                      ? 'text-teal-400 border-b-2 border-teal-400 bg-slate-800/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base">Explanation</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("optimize")}
                  className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-300 ${
                    activeTab === 'optimize'
                      ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base">Optimized Code</span>
                  </div>
                </button>
              </div>

              {/* Content Area */}
              <div className="p-4 sm:p-6 min-h-[400px]">
                {activeTab === 'explain' ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 sm:p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-teal-400 text-sm sm:text-base">AI Explanation</h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          This will contain the AI-generated explanation of your code. It will break down what each part does, explain the logic, and highlight any important concepts.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      <div className="pl-3 sm:pl-4 border-l-2 border-teal-500/30 space-y-2">
                      {expLoading ? (
                          <p className="text-slate-400">AI is thinking...</p>
                        ) : (
                          <div className="max-h-64 overflow-y-auto scrollbar-thin rounded-md bg-slate-950/30 p-2 sm:p-3 border border-slate-800/40">
                            <pre className="whitespace-pre-wrap text-slate-300 text-xs sm:text-sm">{removeMd(explainedOutput)}</pre>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy('explanation')}
                      disabled={expLoading || !explainedOutput}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                      {copied.explanation ? (
                        <>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Copy Explanation</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-blue-400 text-sm sm:text-base">Optimized Version</h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          AI-optimized code with performance improvements, better practices, and efficiency enhancements.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm border border-slate-800/50">
                      {optLoading ? (
                        <p className="text-slate-400">AI is thinking...</p>
                      ) : (
                        <div className="max-h-64 overflow-y-auto scrollbar-thin rounded-md bg-slate-950/30 p-2 sm:p-3 border border-slate-800/40">
                          <pre className="whitespace-pre-wrap text-slate-300 text-xs sm:text-sm">{removeMd(optimizedOutput)}</pre>
                        </div>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm text-slate-400 space-y-2">
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
                      disabled={optLoading || !optimizedOutput}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {copied.optimized ? (
                        <>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Copy Optimized Code</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className='font-medium text-slate-300 text-sm sm:text-base'>Set Explaining Mode</p>
            <div className='min-h-[7rem] bg-slate-950 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:p-4 shadow-lg border border-slate-800'>
                {explainModes.map((item) => (
                  <div
                    key={item.key}
                    role="button"
                    onClick={() => {setExplainingMode(item.value); console.log(explainingMode)}}
                    className={`p-3 sm:p-4 shadow-lg border rounded-xl cursor-pointer transition-colors duration-150 text-center flex items-center justify-center ${explainingMode === item.value ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'}`}
                  >
                    <p className='text-xs sm:text-sm text-slate-300 align-middle'>{item.label}</p>
                  </div>
                ))}
            </div>
            </>

  )
}

export default AIExplain

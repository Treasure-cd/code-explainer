import React, { useState } from 'react'
import Editor from "@monaco-editor/react";
import { Zap, Brain } from 'lucide-react';

const CodeEditor = ({ onCodeEditorClick, code, setCode }) => {
    const [language, setLanguage] = useState('javascript')


  return (
      <>
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-2 sm:p-3 border-t border-slate-950 text-left text-slate-400 text-xs bg-slate-950 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">

            <span className='sm:mr-4 sm:ml-5'>
                Write or paste code here...
            </span>

            <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className='border-black border-1 rounded-md p-1 cursor-pointer w-full sm:w-auto sm:ml-auto'
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
        <div className="p-2 sm:p-3 border-t border-slate-950 text-right text-slate-400 text-xs bg-slate-950">
            {code.length} characters
        </div>
         </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onCodeEditorClick("explain")}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-semibold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Explain Code</span>
                </div>
              </button>

              <button
                onClick={() => onCodeEditorClick("optimize")}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Optimize</span>
                </div>
              </button>
            </div>

          </>
  )
}

export default CodeEditor

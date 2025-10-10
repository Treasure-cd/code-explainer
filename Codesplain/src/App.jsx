import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import Footer from './components/Footer';
import AIExplain from './components/AIExplain';
import CodeEditor from './components/CodeEditor';
import { GoogleGenAI } from "@google/genai";

export default function CodeExplainerUI() {
  const [copied, setCopied] = useState({ explanation: false, optimized: false });
  const [activeTab, setActiveTab] = useState('explain');
  const [code, setCode] = useState("// Start typing...");
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(false);
  const [explainedOutput, setExplainedOutput] = useState("");
  const [optimizedOutput, setOptimizedOutput] = useState("");

  const handleCopy = (type) => {
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

   const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const prompt = {
    explain: `Be casual, conversational. If it's something that a beginner will not understand, give a tiny analogy. Explain this code. Line by line, (you can group multiple lines together) ${code}. Be concise. Be straight forward. Not too long, but also very explanatory. So go like this, for example, Line 1: [Code explanation] Line 2-5: [Code explanation], like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that.`,
    optimize: `Make this code better ${code}. If you can't, leave it like that. No need to say anything, just spit out the bettered code. If there is no way to make it better, spit out the code like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that.`
  }


  const handleAIAction = async (mode) => {
  setLoading(true);

  setActiveTab(mode);
  setLoading(true);
  console.log("AI action triggered:", mode);
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: mode === "explain"? prompt.explain : prompt.optimize,
      });
      
    
      
    if (response.status === 429 && mode === "explain") {
      setExplainedOutput("⚠️ You're sending requests too fast. Wait a bit and try again.");
      return;
    } else if (response.status === 429 && mode === "optimize") {
      setExplainedOutput("⚠️ You're sending requests too fast. Wait a bit and try again.");
      return;
    }

    const data = await response.text;
    console.log(data);
    console.log("Response data:", data);
    if (mode === "explain") {
     setExplainedOutput(data || "No result."); 
    } else {
      setOptimizedOutput(data || "No result."); 
    }
    
  }
    
    catch (err) {
    console.error(err);
    if (mode === "explain") setExplainedOutput("❌ Error fetching AI response.");
    else setOptimizedOutput("❌ Error fetching AI response.")
    
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
          <CodeEditor onCodeEditorClick={handleAIAction} code={code} setCode={setCode} />
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-4">
            <AIExplain explainedOutput={explainedOutput} optimizedOutput={optimizedOutput} loading={loading} setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </div>
        {/* Footer */}
        <Footer />                
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
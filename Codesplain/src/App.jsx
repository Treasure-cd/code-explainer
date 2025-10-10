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
  const [loading, setLoading] = useState(false);
  const [explainedOutput, setExplainedOutput] = useState("");
  const [optimizedOutput, setOptimizedOutput] = useState("");
  const [explainingMode, setExplainingMode] = useState("newbie")

  const handleCopy = (type) => {
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

   const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
   const newbieExplainingPrompt = ` Before you say anything say NEWBIE MODE. Be casual, conversational. Give little analogies. Explain this code. Line by line, (you can group multiple lines together) ${code}. So go like this, for example, Line 1: [Code explanation] Line 2-5: [Code explanation], like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that. While using markdown, don't add headers for any reason. You can do everything else. Be concise. Be straight forward. Not too long, but also very explanatory. `;

   const beginnerExplainingPrompt = `Explain this code. Be clear, say what each line does ${code}. So go like this, for example, Line 1: [Code explanation] Line 2-5: [Code explanation], like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that. While using markdown, don't add headers for any reason. You can do everything else. You don't need to explain stuff like closing and opening brackets, just explain like a teacher, but to a computer science student that has taken a programming course before, and is taking a programming course of a new language now. Just be straightforward, you can use common technical terms.`

   const intermediateExplainingPrompt = `Explain this code ${code}. Use technical terms, like a person that is fairly skilled in the industry. Be concise. So go like this, for example, Line 1: [Code explanation] Line 2-5: [Code explanation], like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that. While using markdown, don't add headers for any reason. You can do everything else. Don't 'baby' the explanation, this person knows quite well, but still needs to know more.`

   const expertExplainingPrompt = ` Before you say anything say EXPERT MODE. Explain this code ${code}. This person is 15 years into coding, so just one line explanations. So go like this, for example, Line 1: [Code explanation] Line 2-5: [Code explanation], like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that. While using markdown, don't add headers for any reason. You can do everything else. Be staraightforward, no beating around the bush.`

   const optimize = `Make this code better ${code}. If you can't, leave it like that. No need to say anything, just spit out the bettered code. If there is no way to make it better, spit out the code like that. Use regular markdown convention if you need to go to a new line, or need a tab, or something like that.`


  const beginnerPrompt = {
    explain: beginnerExplainingPrompt,
    optimize: optimize,
  }

  const intermediatePrompt = {
    explain: intermediateExplainingPrompt,
    optimize: optimize,
  }

  const newbiePrompt = {
    explain: newbieExplainingPrompt,
    optimize: optimize,
  }

  const expertPrompt = {
    explain: expertExplainingPrompt,
    optimize: optimize,
  }


const handleAIAction = async (mode) => {
  setLoading(true);
  setActiveTab(mode);
  console.log("AI action triggered:", mode);

  // Choose the prompt set based on explainingMode
  const promptSets = {
    newbie: newbiePrompt,
    beginner: beginnerPrompt,
    intermediate: intermediatePrompt,
    expert: expertPrompt,
  };

  const promptSet = promptSets[explainingMode] || newbiePrompt;
  const contents = promptSet[mode];
  console.log(explainingMode);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const data = await response.text;
    console.log("Response data:", data);

    if (mode === "explain") {
      setExplainedOutput(data || "No result.");
    } else {
      setOptimizedOutput(data || "No result.");
    }

  } catch (err) {
    console.error(err);
    if (mode === "explain")
      setExplainedOutput("❌ Error fetching AI response.");
    else
      setOptimizedOutput("❌ Error fetching AI response.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-black"></div>

      {/* Gradient orbs */}
      <div className="fixed top-0 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-0 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 sm:px-6 py-2 rounded-full bg-slate-950 backdrop-blur-sm">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Code Analysis
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Codesplain
          </h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Understand any code instantly. Get explanations and optimizations powered by AI.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Panel - Code Input */}
          <div className="space-y-4">
          <CodeEditor onCodeEditorClick={handleAIAction} code={code} setCode={setCode} />
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-4">
            <AIExplain explainedOutput={explainedOutput} optimizedOutput={optimizedOutput} loading={loading} setActiveTab={setActiveTab} activeTab={activeTab} explainingMode={explainingMode} setExplainingMode={setExplainingMode} />
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

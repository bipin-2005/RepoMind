import React from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { useState } from 'react';

const MarkdownPreview = ({ content, fileName = 'README.md' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple markdown to HTML converter for preview
  const renderMarkdown = (markdown) => {
    if (!markdown) return '';
    
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-slate-200 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-100 mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold gradient-text mt-8 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-200">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-900 p-4 rounded-lg overflow-x-auto my-3"><code class="text-sm text-slate-300">$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-2 py-1 rounded text-sm text-primary-400">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-400 hover:text-primary-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-3" />')
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 text-slate-300">$1</li>')
      // Horizontal rule
      .replace(/^---$/gim, '<hr class="border-slate-700 my-6" />')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="text-slate-300 mb-3">')
      .replace(/\n/g, '<br />');

    // Wrap in paragraph tags
    html = '<p class="text-slate-300 mb-3">' + html + '</p>';
    
    // Wrap list items in ul
    html = html.replace(/(<li class="ml-4 text-slate-300">.*?<\/li>)/gs, '<ul class="list-disc list-inside space-y-1 my-3">$1</ul>');
    
    return html;
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-200">Preview</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Markdown Preview */}
      <div className="glass-panel p-6 rounded-lg">
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>

      {/* Raw Markdown */}
      <details className="glass-panel p-4 rounded-lg">
        <summary className="cursor-pointer text-slate-300 font-medium hover:text-slate-200">
          View Raw Markdown
        </summary>
        <pre className="mt-4 p-4 bg-slate-900 rounded-lg overflow-x-auto">
          <code className="text-sm text-slate-300">{content}</code>
        </pre>
      </details>
    </div>
  );
};

export default MarkdownPreview;

// Made with Bob
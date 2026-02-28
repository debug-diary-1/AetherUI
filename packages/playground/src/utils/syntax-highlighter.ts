import Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';

const langMap: Record<string, string> = {
  html: 'markup',
  vue: 'markup',
  jsx: 'jsx',
  tsx: 'typescript',
  css: 'css',
  ts: 'typescript',
};

export function highlightCode(code: string, language: string): string {
  const grammar = Prism.languages[langMap[language] || language];
  if (!grammar) return escapeHtml(code);
  return Prism.highlight(code, grammar, language);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

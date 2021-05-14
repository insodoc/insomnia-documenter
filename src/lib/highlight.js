import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import ruby from 'highlight.js/lib/languages/ruby';
import golang from 'highlight.js/lib/languages/go';
import php from 'highlight.js/lib/languages/php';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('node', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('curl', bash);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('go', golang);
hljs.registerLanguage('php', php);

export default hljs;

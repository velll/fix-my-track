const highlight = require('../../../node_modules/highlight.js/lib/core');

// Load xml highlighter only to minimize footprint
highlight.registerLanguage('xml', require('../../../node_modules/highlight.js/lib/languages/xml'));

export default highlight;

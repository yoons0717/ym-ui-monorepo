const exported = require('./dist/index.js');
console.log('Exported:', Object.keys(exported));
console.log('Card exists:', !!exported.Card);
console.log('CardHeader exists:', !!exported.CardHeader);
console.log('Button exists:', !!exported.Button);
console.log('Input exists:', !!exported.Input);

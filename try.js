const natural = require('natural')
const classifier = new natural.BayesClassifier()

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('Mexico defeated Germany by 1 - 0 in amazing football match', 'football');
classifier.addDocument('Germany won last year\'s football world cup', 'football');
classifier.addDocument('Hello', 'greeting');
classifier.addDocument('Hey', 'greeting');
classifier.addDocument('AI is taking over the world', 'technology');

classifier.train();

console.log(classifier.classify('Who won'));
console.log(classifier.classify('did you buy a new drive?'));

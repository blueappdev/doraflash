load('console.js');
load('../inputProcessing.js');

var processor = registeredInputProcessors['pinyin'];

//print(processor.getInputPlaceHolder());
//print(processor.allSyllables.includes("ma"));
print(processor.getSyllable("zhongguo"));
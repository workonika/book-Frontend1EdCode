const sentence = "Пушкин желал таковой участи нашей отчизне";

const averageWordLength = sentence
    .split(/\s/)
    .reduce((average, word, index) => Math.floor((average + word.length) / (index === 0 ? 1 : 2)), 0);

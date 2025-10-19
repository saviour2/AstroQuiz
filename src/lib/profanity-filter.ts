const PROFANE_WORDS = [
  'ass', 'bitch', 'cunt', 'dick', 'fuck', 'shit', 'piss', 'cock', 'pussy', 'slut', 'whore',
];

// This function creates a regex that matches common variations and leetspeak
function createProfanityRegex(words: string[]): RegExp {
  const leetMap: { [key: string]: string } = {
    'a': '[a@4]',
    'e': '[e3]',
    'i': '[i!1|]',
    'o': '[o0]',
    's': '[s$5]',
    't': '[t7]',
  };

  const processedWords = words.map(word => {
    return word.split('').map(char => leetMap[char] || char).join('[^\\w]*');
  });

  return new RegExp(`(${processedWords.join('|')})`, 'i');
}

const PROFANITY_REGEX = createProfanityRegex(PROFANE_WORDS);

export const isProfane = (text: string): boolean => {
  // Remove all non-alphanumeric characters for a base check
  const sanitized = text.replace(/[^a-zA-Z0-9]/g, '');

  if (PROFANITY_REGEX.test(text) || PROFANITY_REGEX.test(sanitized)) {
    return true;
  }
  
  return false;
};

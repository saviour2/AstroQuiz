const PROFANE_WORDS = [
  'ass', 'bitch', 'cunt', 'dick', 'fuck', 'shit', 'piss',
  // Add more words and their common variations
  'a$$', '@ss', 'b1tch', 'bit-ch',
];

// This is a very basic filter. A more robust solution would involve
// more complex regex and a more comprehensive word list.
const PROFANITY_REGEX = new RegExp(`\\b(${PROFANE_WORDS.join('|')})\\b`, 'i');

export const isProfane = (text: string): boolean => {
  // Simple check
  if (PROFANITY_REGEX.test(text)) {
    return true;
  }

  // Leetspeak replacements
  const sanitized = text
    .toLowerCase()
    .replace(/@/g, 'a')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/\$/g, 's')
    .replace(/0/g, 'o');
    
  return PROFANITY_REGEX.test(sanitized);
};

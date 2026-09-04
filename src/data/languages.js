/**
 * @typedef {Object} Language
 * @property {string} id - Language code (e.g., 'en', 'hi')
 * @property {string} name - English name of the language
 * @property {string} nativeName - Name of the language in its native script
 * @property {string} script - Script used for the language
 */

/**
 * List of 12 most spoken Indian languages supported by MediKiosk.
 * @type {Language[]}
 */
export const languages = [
  { id: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { id: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Arabic' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { id: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' }
];

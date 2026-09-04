/**
 * @typedef {Object} ConditionalRule
 * @property {string} questionId - The ID of the question this depends on
 * @property {any} value - The expected value to show this question
 */

/**
 * @typedef {Object} Question
 * @property {string} id - Unique identifier for the question
 * @property {string} section - The clinical section this question belongs to
 * @property {string} text - The question text presented to the user
 * @property {'text'|'single-choice'|'multi-choice'|'yes-no'|'scale'|'body-diagram'} type - The type of input expected
 * @property {string[]} [options] - Available options for choice-based questions
 * @property {boolean} [required=true] - Whether the question is mandatory
 * @property {string} [placeholder] - Placeholder text for input fields
 * @property {ConditionalRule|null} [conditionalOn=null] - Rule to conditionally display this question
 */

/**
 * Ordered list of medical interview sections.
 * @type {string[]}
 */
export const SECTIONS = [
  'Chief Complaint',
  'History of Present Illness',
  'Past Medical History',
  'Current Medications',
  'Allergies',
  'Family History',
  'Social History',
  'Review of Systems'
];

/**
 * The complete medical interview question tree.
 * @type {Question[]}
 */
export const questionTree = [
  // 1. Chief Complaint
  {
    id: 'cc_1',
    section: 'Chief Complaint',
    text: 'What is your main health concern today?',
    type: 'text',
    required: true,
    placeholder: 'e.g., headache, stomach pain'
  },
  {
    id: 'cc_2',
    section: 'Chief Complaint',
    text: 'How long have you been experiencing this?',
    type: 'single-choice',
    options: ['Less than a day', '1-3 days', '4-7 days', '1-2 weeks', '2-4 weeks', 'More than a month'],
    required: true
  },

  // 2. History of Present Illness
  {
    id: 'hpi_1',
    section: 'History of Present Illness',
    text: 'When did this problem start?',
    type: 'text',
    required: true,
    placeholder: 'e.g., 3 days ago, last Monday'
  },
  {
    id: 'hpi_2',
    section: 'History of Present Illness',
    text: 'How would you describe the severity?',
    type: 'scale',
    required: true
  },
  {
    id: 'hpi_3',
    section: 'History of Present Illness',
    text: 'Is the problem getting better, worse, or staying the same?',
    type: 'single-choice',
    options: ['Getting better', 'Staying the same', 'Getting worse', 'Comes and goes'],
    required: true
  },
  {
    id: 'hpi_4',
    section: 'History of Present Illness',
    text: 'Does anything make it better or worse?',
    type: 'text',
    required: true,
    placeholder: 'e.g., rest helps, movement makes it worse'
  },
  {
    id: 'hpi_5',
    section: 'History of Present Illness',
    text: 'Where exactly do you feel the discomfort?',
    type: 'body-diagram',
    required: true
  },

  // 3. Past Medical History
  {
    id: 'pmh_1',
    section: 'Past Medical History',
    text: 'Have you been diagnosed with any of these conditions?',
    type: 'multi-choice',
    options: ['Diabetes', 'High blood pressure', 'Heart disease', 'Asthma/COPD', 'Thyroid disorder', 'Kidney disease', 'Liver disease', 'Cancer', 'None of the above'],
    required: true
  },
  {
    id: 'pmh_2',
    section: 'Past Medical History',
    text: 'Have you had any surgeries in the past?',
    type: 'yes-no',
    required: true
  },
  {
    id: 'pmh_3',
    section: 'Past Medical History',
    text: 'If yes, please describe your surgeries',
    type: 'text',
    required: true,
    conditionalOn: { questionId: 'pmh_2', value: true }
  },

  // 4. Current Medications
  {
    id: 'med_1',
    section: 'Current Medications',
    text: 'Are you currently taking any medications?',
    type: 'yes-no',
    required: true
  },
  {
    id: 'med_2',
    section: 'Current Medications',
    text: 'Please list your current medications',
    type: 'text',
    required: true,
    placeholder: 'e.g., Metformin 500mg twice daily',
    conditionalOn: { questionId: 'med_1', value: true }
  },

  // 5. Allergies
  {
    id: 'alg_1',
    section: 'Allergies',
    text: 'Do you have any known allergies?',
    type: 'yes-no',
    required: true
  },
  {
    id: 'alg_2',
    section: 'Allergies',
    text: 'Please list your allergies and reactions',
    type: 'text',
    required: true,
    placeholder: 'e.g., Penicillin - rash',
    conditionalOn: { questionId: 'alg_1', value: true }
  },

  // 6. Family History
  {
    id: 'fh_1',
    section: 'Family History',
    text: 'Do any close family members have these conditions?',
    type: 'multi-choice',
    options: ['Diabetes', 'Heart disease', 'High blood pressure', 'Cancer', 'Stroke', 'Mental health conditions', 'None of the above'],
    required: true
  },
  {
    id: 'fh_2',
    section: 'Family History',
    text: 'Is there anything else about your family health history you\'d like to share?',
    type: 'text',
    required: false
  },

  // 7. Social History
  {
    id: 'sh_1',
    section: 'Social History',
    text: 'Do you use tobacco in any form?',
    type: 'single-choice',
    options: ['Never', 'Currently', 'Previously (quit)', 'Occasionally'],
    required: true
  },
  {
    id: 'sh_2',
    section: 'Social History',
    text: 'Do you consume alcohol?',
    type: 'single-choice',
    options: ['Never', 'Occasionally (social)', 'Regularly', 'Previously (quit)'],
    required: true
  },
  {
    id: 'sh_3',
    section: 'Social History',
    text: 'What is your occupation?',
    type: 'text',
    required: false
  },

  // 8. Review of Systems
  {
    id: 'ros_1',
    section: 'Review of Systems',
    text: 'Have you experienced any of these general symptoms recently?',
    type: 'multi-choice',
    options: ['Fever', 'Weight loss', 'Fatigue', 'Loss of appetite', 'Night sweats', 'None of the above'],
    required: true
  },
  {
    id: 'ros_2',
    section: 'Review of Systems',
    text: 'Have you experienced any of these symptoms?',
    type: 'multi-choice',
    options: ['Chest pain', 'Shortness of breath', 'Palpitations', 'Cough', 'Dizziness', 'None of the above'],
    required: true
  },
  {
    id: 'ros_3',
    section: 'Review of Systems',
    text: 'Have you experienced any digestive issues?',
    type: 'multi-choice',
    options: ['Nausea/vomiting', 'Diarrhea', 'Constipation', 'Abdominal pain', 'Blood in stool', 'None of the above'],
    required: true
  },
  {
    id: 'ros_4',
    section: 'Review of Systems',
    text: 'Is there anything else you would like the doctor to know?',
    type: 'text',
    required: false,
    placeholder: 'Any additional concerns or symptoms...'
  }
];

/**
 * Helper function to get all questions for a specific section.
 * @param {string} sectionName - The name of the section
 * @returns {Question[]} Array of questions in the section
 */
export function getSectionQuestions(sectionName) {
  return questionTree.filter(q => q.section === sectionName);
}

// Quiz data that can be dynamically updated
export const quizData = {
  totalQuestions: 9,
  questions: [
    { id: 1, question: 'How do you spell this word?', options: ["test","Eccleciastes","Ecclesiates","Ecclesiastes"], correctAnswer: 3 },
    { id: 2, question: 'How do you spell this word?', options: ["Phillipians","Philipians","Philippians","Filippians"], correctAnswer: 2 },
    { id: 3, question: 'How do you spell this word?', options: ["Deuteronomy","Deuteronemy","Deuteronamy","Deuteronimy"], correctAnswer: 0 },
    { id: 4, question: 'How do you spell this word?', options: ["Habakuk","Habakkuk","Habakkuck","Habakuck"], correctAnswer: 1 },
    { id: 5, question: 'How do you spell this word?', options: ["Lementations","Lamantations","Lamemtations","Lamentations"], correctAnswer: 3 },
    { id: 6, question: 'How do you spell this word?', options: ["Nehum","Nahom","Naham","Nahum"], correctAnswer: 3 },
    { id: 7, question: 'How do you spell this word?', options: ["Zephanaih","Zefaniah","Zephania","Zephaniah"], correctAnswer: 3 },
    { id: 8, question: 'How do you spell this word?', options: ["Malichi","Malachy","Malachai","Malachi"], correctAnswer: 3 },
    { id: 9, question: 'How do you spell this word?', options: ["Haggai","Hagai","Haggay","Haggiah"], correctAnswer: 0 },
  ],
};

export type QuizQuestion = typeof quizData.questions[number];
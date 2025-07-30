// Quiz data that can be dynamically updated
export const quizData = {
  totalQuestions: 9,
  questions: [
    { id: 1, question: 'How do you spell this word?', options: ['Cacoa', 'Cacao', 'Cocoa', 'Cocoa'], correctAnswer: 1 },
    { id: 2, question: 'How do you spell this word?', options: ['Ganauche', 'Gannache', 'Ganash', 'Ganache'], correctAnswer: 3 },
    { id: 3, question: 'How do you spell this word?', options: ['Pralin', 'Pralline', 'Praline', 'Pralinee'], correctAnswer: 2 },
    { id: 4, question: 'How do you spell this word?', options: ['Trufflle', 'Truffel', 'Truffle', 'Trufle'], correctAnswer: 2 },
    { id: 5, question: 'How do you spell this word?', options: ['Bonbon', 'Bonnbon', 'Bon bon', 'Bon-bon'], correctAnswer: 0 },
    { id: 6, question: 'How do you spell this word?', options: ['Nouget', 'Nougat', 'Nougat', 'Nugat'], correctAnswer: 1 },
    { id: 7, question: 'How do you spell this word?', options: ['Fondannt', 'Fondant', 'Fondent', 'Fonddant'], correctAnswer: 1 },
    { id: 8, question: 'How do you spell this word?', options: ['Cuveture', 'Couveture', 'Couverture', 'Couvertture'], correctAnswer: 2 },
    { id: 9, question: 'How do you spell this word?', options: ['Liquor', 'Liqueur', 'Liqeur', 'Liquer'], correctAnswer: 1 },
  ],
};

export type QuizQuestion = typeof quizData.questions[number];
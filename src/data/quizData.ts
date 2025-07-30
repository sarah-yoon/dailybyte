// Quiz data that can be dynamically updated
export const quizData = {
  totalQuestions: 9,
  questions: [
    { id: 1, question: 'How do you spell this word?', options: ['Macaron', 'Maccaron', 'Macaroon', 'Maccaroon'], correctAnswer: 0 },
    { id: 2, question: 'How do you spell this word?', options: ['Souffle', 'Suflee', 'Sufle', 'Soufle'], correctAnswer: 0 },
    { id: 3, question: 'How do you spell this word?', options: ['Ecliar', 'Eclair', 'Eclaire', 'Ecclair'], correctAnswer: 1 },
    { id: 4, question: 'How do you spell this word?', options: ['Tiramisu', 'Tiramesu', 'Tiramasu', 'Tiramassu'], correctAnswer: 0 },
    { id: 5, question: 'How do you spell this word?', options: ['Cannolli', 'Canoli', 'Cannoli', 'Canolli'], correctAnswer: 2 },
    { id: 6, question: 'How do you spell this word?', options: ['Baklava', 'Baklawa', 'Baclava', 'Baklave'], correctAnswer: 0 },
    { id: 7, question: 'How do you spell this word?', options: ['Proffiterole', 'Profiterole', 'Profiterol', 'Profiteroll'], correctAnswer: 1 },
    { id: 8, question: 'How do you spell this word?', options: ['Pavolva', 'Pavlovae', 'Pavlova', 'Pavllova'], correctAnswer: 2 },
    { id: 9, question: 'How do you spell this word?', options: ['Chifon', 'Chiffan', 'Chiffonn', 'Chiffon'], correctAnswer: 3 },
  ],
};

export type QuizQuestion = typeof quizData.questions[number];
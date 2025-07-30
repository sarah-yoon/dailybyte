import React, { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';
import { API_ENDPOINTS } from '../constants';

interface EditGameDataModalProps {
  onClose: () => void;
  onTodayThemeChange: (theme: string) => void;
  currentTodayTheme: string;
}

interface EditableQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const EditGameDataModal: React.FC<EditGameDataModalProps> = ({ onClose, onTodayThemeChange, currentTodayTheme }) => {
  const [questions, setQuestions] = useState<EditableQuestion[]>([]);
  const [todayTheme, setTodayTheme] = useState<string>(currentTodayTheme);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    todayTheme: false,
    spellingWasp: false
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Convert quiz data to editable format
    setQuestions(quizData.questions.map(q => ({
      id: q.id,
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer
    })));
  }, []);

  useEffect(() => {
    setTodayTheme(currentTodayTheme);
  }, [currentTodayTheme]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateQuestion = (questionId: number, field: keyof EditableQuestion, value: string | number) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const setCorrectAnswer = (questionId: number, optionIndex: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
    ));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Update the today theme immediately
      onTodayThemeChange(todayTheme);

      // Check if quiz data has been modified
      const originalQuestions = quizData.questions;
      const hasQuizChanges = questions.some((q, index) => {
        const original = originalQuestions[index];
        return (
          q.question !== original.question ||
          q.correctAnswer !== original.correctAnswer ||
          !q.options.every((option, optIndex) => option === original.options[optIndex])
        );
      });

      // Only save quiz data if there are actual changes
      if (hasQuizChanges) {
        // Create the new quiz data structure
        const newQuizData = {
          totalQuestions: questions.length,
          questions: questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer
          }))
        };

        // Convert to TypeScript code
        const typescriptCode = `// Quiz data that can be dynamically updated
export const quizData = {
  totalQuestions: ${newQuizData.totalQuestions},
  questions: [
${newQuizData.questions.map(q => `    { id: ${q.id}, question: '${q.question}', options: ${JSON.stringify(q.options)}, correctAnswer: ${q.correctAnswer} },`).join('\n')}
  ],
};

export type QuizQuestion = typeof quizData.questions[number];`;

        // Save to file
        const response = await fetch(API_ENDPOINTS.SAVE_QUIZ_DATA, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quizData: typescriptCode }),
        });

        if (response.ok) {
          console.log('✅ Quiz data saved successfully');
          alert('Quiz data and today theme saved successfully!');
        } else {
          console.error('❌ Failed to save quiz data');
          alert('Failed to save quiz data. Please try again.');
        }
      } else {
        // Only today theme was changed
        alert('Today theme updated successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Edit Game Data</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Today Theme Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('todayTheme')}
            className="w-full flex justify-between items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h4 className="text-lg font-semibold text-blue-800">Today Theme</h4>
            <span className="text-blue-600">
              {expandedSections.todayTheme ? '▼' : '▶'}
            </span>
          </button>

          {expandedSections.todayTheme && (
            <div className="mt-4 space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-800">Today Label</h5>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Today Theme:</label>
                  <input
                    type="text"
                    value={todayTheme}
                    onChange={(e) => setTodayTheme(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter today's theme..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed as "Today: [your theme]" in the main interface
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spelling Wasp Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('spellingWasp')}
            className="w-full flex justify-between items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <h4 className="text-lg font-semibold text-purple-800">Spelling Wasp</h4>
            <span className="text-purple-600">
              {expandedSections.spellingWasp ? '▼' : '▶'}
            </span>
          </button>

          {expandedSections.spellingWasp && (
            <div className="mt-4 space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-800">Question {question.id}</h5>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question:</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Options:</label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => setCorrectAnswer(question.id, optionIndex)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            question.correctAnswer === optionIndex
                              ? 'border-green-500 bg-green-50 focus:ring-green-500'
                              : 'border-gray-300 focus:ring-purple-500'
                          }`}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        {question.correctAnswer === optionIndex && (
                          <span className="text-green-600 font-medium text-sm">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className={`flex-1 py-3 px-6 rounded-lg transition-colors font-medium ${
              isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            disabled={isSaving}
            className={`flex-1 py-3 px-6 rounded-lg transition-colors font-medium ${
              isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGameDataModal; 
import openai
import json
import re
import sys
import random
import os
from dotenv import load_dotenv

# Load environment variables from .env file
try:
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')
except:
    # Fallback: set API key directly for testing
    openai.api_key = "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"

def generate_spelling_quiz(theme_word):
    """
    Generate a spelling quiz using OpenAI API. No fallback to mock data.
    """
    theme = theme_word
    
    prompt = f"""
    Generate a spelling quiz based on the theme "{theme}". 
    
    Create exactly 9 questions. Each question must have:
    - An "id" (from 1 to 9),
    - A "question" field that says: "How do you spell this word?",
    - An "options" list of 4 similar spellings (1 correct, 3 incorrect),
    - A "correctAnswer" index (0 to 3) that points to the correct option.
    
    IMPORTANT RULES:
    - Do NOT use any emojis or special characters
    - Return ONLY valid JSON, no explanations or markdown
    - Choose DIFFICULT words to spell within the theme category
    - Focus on words that are commonly misspelled or have tricky spelling patterns
    - Include words with silent letters, double consonants, unusual vowel combinations, or foreign origins
    - Make sure the correctAnswer index matches the correct spelling in options
    - ALL options must be properly capitalized (first letter uppercase, rest lowercase)
    - ALL options must have proper spacing (no extra spaces, no missing spaces)
    - The correct answer should be the standard spelling of the word
    - Incorrect options should be realistic misspellings that people commonly make
    
    Examples of difficult words by theme:
    - Animals: rhinoceros, hippopotamus, chimpanzee, orangutan, platypus
    - Food: bouillabaisse, ratatouille, bruschetta, gnocchi, quiche
    - Sports: gymnastics, synchronized, championship, tournament, referee
    - Nature: chrysanthemum, photosynthesis, metamorphosis, precipitation, atmosphere
    
    Return the full output as valid JSON in this exact format:
    {{
      "totalQuestions": 9,
      "questions": [
        {{ "id": 1, "question": "How do you spell this word?", "options": ["Option1", "Option2", "Option3", "Option4"], "correctAnswer": 0 }}
      ]
    }}
    """
    
    try:
        client = openai.OpenAI(api_key=openai.api_key)
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1000
        )
        raw_text = response.choices[0].message.content
        
        # Clean the response to ensure it's valid JSON
        raw_text = raw_text.strip()
        if raw_text.startswith('```json'):
            raw_text = raw_text[7:]
        if raw_text.endswith('```'):
            raw_text = raw_text[:-3]
        raw_text = raw_text.strip()
        
        quiz_data = json.loads(raw_text)
        
        # Clean up the options to ensure proper spacing and capitalization
        for question in quiz_data['questions']:
            cleaned_options = []
            for option in question['options']:
                # Remove extra spaces and ensure proper capitalization
                cleaned_option = ' '.join(option.split())  # Remove extra spaces
                if cleaned_option:
                    # Capitalize first letter, lowercase the rest
                    cleaned_option = cleaned_option[0].upper() + cleaned_option[1:].lower()
                cleaned_options.append(cleaned_option)
            question['options'] = cleaned_options
        
        # Randomize the correct answer positions
        for question in quiz_data['questions']:
            correct_answer = question['options'][question['correctAnswer']]
            # Shuffle the options
            random.shuffle(question['options'])
            # Find the new position of the correct answer
            question['correctAnswer'] = question['options'].index(correct_answer)
        
        return quiz_data
    except Exception as e:
        print(f"OpenAI API failed: {e}")
        print("Raw response was:", raw_text if 'raw_text' in locals() else "No response")
        return None

def generate_typescript_quiz_data(quiz_data, theme_word):
    """
    Generate TypeScript code that can replace the existing quizData in src/data/quizData.ts
    """
    if not quiz_data:
        return None
    
    typescript_code = f"""// Quiz data that can be dynamically updated
export const quizData = {{
  totalQuestions: {quiz_data['totalQuestions']},
  questions: [
"""
    
    for question in quiz_data['questions']:
        typescript_code += f"""    {{ id: {question['id']}, question: '{question['question']}', options: {question['options']}, correctAnswer: {question['correctAnswer']} }},
"""
    
    typescript_code += """  ],
};

export type QuizQuestion = typeof quizData.questions[number];
"""
    
    return typescript_code

def update_spelling_game_file(theme_word, file_path="src/data/quizData.ts"):
    """
    Directly update the src/data/quizData.ts file with new quiz data
    """
    # Generate new quiz data using AI
    quiz = generate_spelling_quiz(theme_word)
    if not quiz:
        print("Failed to generate quiz with AI")
        return False
    
    # Generate TypeScript code
    new_quiz_data = generate_typescript_quiz_data(quiz, theme_word)
    if not new_quiz_data:
        print("Failed to generate TypeScript code")
        return False
    
    try:
        # Read the current file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
                # Replace the entire file with new quiz data
        new_content = new_quiz_data.strip()
        
        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Successfully updated {file_path} with AI-generated quiz data for theme: {theme_word}")
        print(f"Generated {len(quiz['questions'])} questions")
        return True
            
    except Exception as e:
        print(f"Error updating file: {e}")
        return False

# Main execution
if __name__ == "__main__":
    # Read theme from stdin (sent from the Node.js server)
    theme_from_new_day = sys.stdin.read().strip()
    
    if not theme_from_new_day:
        print("No theme provided")
        sys.exit(1)
    
    print(f"Updating Spelling Wasp game with theme: {theme_from_new_day}")
    success = update_spelling_game_file(theme_from_new_day)
    
    if success:
        print("SUCCESS: Spelling Wasp game updated successfully!")
        print("The game now has new questions based on your theme.")
        sys.exit(0)
    else:
        print("FAILED: Failed to update the game")
        sys.exit(1) 
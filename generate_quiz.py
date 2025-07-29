import openai
import json

# Step 1: Set your GPT-4o API key
openai.api_key = "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"

def generate_spelling_quiz(theme_word):
    """
    Generate a spelling quiz based on the theme word from New Day input
    """
    # Step 2: Use the theme word from New Day input
    theme = theme_word
    
    # Step 3: Construct a detailed prompt
    prompt = f"""
    Generate a spelling quiz based on the theme "{theme}". 
    
    Create 9 questions. Each question must have:
    - An "id" (from 1 to 9),
    - A "question" field that says: "How do you spell this word?",
    - An "options" list of 4 similar spellings (1 correct, 3 incorrect),
    - A "correctAnswer" index (0 to 3) that points to the correct option.
    
    Return the full output as **valid JSON** in this format:
    {{
      "totalQuestions": 9,
      "questions": [ ... ]
    }}
    Do not include any extra explanation or markdown — just the JSON.
    """
    
    # Step 4: Call GPT-4o
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )
    
    # Step 5: Parse and print the result
    raw_text = response['choices'][0]['message']['content']
    
    try:
        # Clean and load JSON
        quiz_data = json.loads(raw_text)
        return quiz_data
    except json.JSONDecodeError:
        print("Failed to parse JSON. Raw output:")
        print(raw_text)
        return None

def generate_typescript_quiz_data(quiz_data, theme_word):
    """
    Generate TypeScript code that can replace the existing quizData in SpellingWaspGame.tsx
    """
    if not quiz_data:
        return None
    
    # Convert the JSON data to TypeScript format
    typescript_code = f"""// Generated quiz data for theme: {theme_word}
const quizData = {{
  totalQuestions: {quiz_data['totalQuestions']},
  questions: [
"""
    
    for question in quiz_data['questions']:
        typescript_code += f"""    {{ id: {question['id']}, question: '{question['question']}', options: {question['options']}, correctAnswer: {question['correctAnswer']} }},
"""
    
    typescript_code += """  ],
};
"""
    
    return typescript_code

def save_typescript_quiz_data(typescript_code, filename="generated_quiz_data.ts"):
    """
    Save the generated TypeScript quiz data to a file
    """
    if typescript_code:
        with open(filename, 'w') as f:
            f.write(typescript_code)
        print(f"TypeScript quiz data saved to {filename}")
        print("\nTo use this in your SpellingWaspGame.tsx:")
        print("1. Copy the content from generated_quiz_data.ts")
        print("2. Replace the existing quizData const in SpellingWaspGame.tsx")
        print("3. The new quiz will be based on your theme!")
    else:
        print("No TypeScript code to save")

# Example usage
if __name__ == "__main__":
    # Example: Use the theme word from New Day input
    theme_from_new_day = "Fruits"  # This would come from your React app's lastNewDaySubmission
    
    print(f"Generating quiz for theme: {theme_from_new_day}")
    quiz = generate_spelling_quiz(theme_from_new_day)
    
    if quiz:
        print("Generated Quiz JSON:")
        print(json.dumps(quiz, indent=2))
        
        # Generate TypeScript code
        typescript_code = generate_typescript_quiz_data(quiz, theme_from_new_day)
        if typescript_code:
            print("\nGenerated TypeScript Code:")
            print(typescript_code)
            save_typescript_quiz_data(typescript_code)
    else:
        print("Failed to generate quiz") 
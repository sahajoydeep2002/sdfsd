import openai

api_key = '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'

openai.api_key = api_key
completion = openai.Completion()

# OpenAI chatbot
start_chat_log = '''Human: Hello, I need mental health help?
AI: How can I help you today?
'''
i = 0
def ask(question, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    prompt = f'{chat_log}Human: {question}\nAI:'
    response = completion.create(
        prompt=prompt, engine="ada", stop=['\nHuman'], temperature=0.9,
        top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1,
        max_tokens=150)
    answer = response.choices[0].text.strip()
    return answer

def append_interaction_to_chat_log(question, answer, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    return f'{chat_log}Human: {question}\nAI: {answer}\n'
chat_log = start_chat_log

def final_function(user_input):
    global chat_log
    output = ask(user_input, chat_log)
    chat_log = append_interaction_to_chat_log(user_input, output, chat_log )
    return output

def chatbot(msg):
    return final_function(msg)

while True:
    user_input = input('Human: ')
    if user_input == 'exit':
        break
    output = chatbot(user_input)
    print("AI:", output)
import openai

openai.api_key = "sk-#Well, not leaking them I said :)"


def get_response(prompt):
    response = openai.Completion.create(
        engine="davinci-codex",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )
    return response.choices[0].text.strip()


print(get_response("Hello, how are you?"))


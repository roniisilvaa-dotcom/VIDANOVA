from openai import OpenAI

client = OpenAI()

try:
    response = client.responses.create(
        model="gpt-4o-mini",
        input="Fala comigo como um assistente inteligente"
    )
    print(response.output_text)
except Exception as e:
    print("ERRO:")
    print(e)
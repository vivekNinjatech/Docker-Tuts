from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()
print('entry....!')
message = os.getenv('MESSAGE','Hello, World!')
print(f'message: {message}')

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

port = os.getenv('PORT',8000)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)
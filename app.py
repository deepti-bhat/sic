from flask import Flask, request, jsonify, render_template
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])

ngrok_url = "https://2570-34-106-203-172.ngrok-free.app/"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/find_similar_patents', methods=['POST'])
def find_similar_patents():
   input_data = request.json.get('data')
   prediction = f"Processed: {input_data}"
   response = requests.post(f"{ngrok_url}/find_similar_patents", json={'data': input_data})
   if response.status_code == 200:
       prediction = response.json().get("results", [])
       print(prediction)
       return jsonify({'data': prediction})
       
   return jsonify({'result': prediction})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

from flask import Flask, Response, jsonify

import pandas as pd

import json

from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": { "origins" : "*" } })
# app.config['CORS_HEADERS'] = 'Content-Type'

shpdf = None

# app = Flask(__name__)

@app.route("/")
def helloWorld():
   greeting = json.loads({
        "greeting": "Hello, World!",
    })
   return greeting

@app.route("/api/load_data")
def load_data():
    global shpdf
    if shpdf is None:
        hpdf = pd.read_pickle("hpe.pkl")
        shpdf = hpdf.sort_values(by="timestamp", ascending=True)

    return Response(status=200)

@app.route("/api/pod")
def get_pod():
    global shpdf
    spodf = shpdf[shpdf["event"].str.contains("powerOff")]
    result_json = json.loads(spodf.tail(1).to_json(orient="records"))

    return result_json
    
if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host="0.0.0.0")

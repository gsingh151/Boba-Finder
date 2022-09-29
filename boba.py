from audioop import cross
from flask_cors import CORS, cross_origin
from flask import Response 

import flask
import json
import random
import requests

app = flask.Flask(__name__)
cors = CORS(app)

YELP_SECRET = "insert"


search_url = "https://api.yelp.com/v3/businesses/search?term=boba&location=toronto&limit=50"
headers = {
    "Authorization": f"Bearer {YELP_SECRET}"
}


@app.route('/boba', methods=['GET'])
@cross_origin()
def get_boba():
    print("Hello Backend...")
    businesses = requests.get(
        search_url,
        headers=headers
    ).json()['businesses']
    randon_business_id = random.choice(businesses)['id']
    
    
    business_data = requests.get(
        f"https://api.yelp.com/v3/businesses/{randon_business_id}",
        headers=headers
    ).json()
    
    response = app.response_class(
        response=json.dumps(business_data, default=str),
        status=200,
        mimetype='application/json'
    )
    
    return response
    
app.run()
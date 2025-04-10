import requests
import json
from typing import List, Tuple
import base64
def handle_api(url,POST = True, payload=None):
   
    try:
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        response = None
           
           
            
        if(payload == None):
            if POST:
                response = requests.post(url,  headers=headers)
            else:
                response = requests.get(url,  headers=headers)
        else:
            if POST:
                response = requests.post(url, json=payload, headers=headers)
            else:
                response = requests.get(url, json=payload, headers=headers)

        if response.status_code == 200:
            return response.json()            
        else:
            print(f"Error receiving data: {response.status_code}, {response.text}")  
      
    except Exception as e:
        print(f"An error occurred: {e}")
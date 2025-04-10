import requests
import json
from typing import List, Tuple
import base64

# Define the DataObject class
class DataObject:
    def __init__(self, CamId,IsWebCam: int, Url: str, Height: int, Width: int, Ratio: float,
                  ConfidenceThreshold: float, IouThreshold: float,
                 HumanClassNo: int, MobileClassNo: int, BoxOverlapThreshold: float,
                 RailingColor: str, HumanRectColor: str, MobileRectColor: str, VoilationHumanRectColor: str, XOffset: int, ShowCam: bool,Railings,FrameRate:int):
        self.IsWebCam = IsWebCam
        self.CamId=CamId
        self.Url = Url
        self.Height = Height
        self.Width = Width
        self.Ratio = Ratio
        self.Railings = Railings
        self.ConfidenceThreshold = ConfidenceThreshold
        self.IouThreshold = IouThreshold
        self.HumanClassNo = HumanClassNo
        self.MobileClassNo = MobileClassNo
        self.BoxOverlapThreshold = BoxOverlapThreshold
        self.RailingColor = RailingColor
        self.HumanRectColor = HumanRectColor
        self.MobileRectColor = MobileRectColor
        self.VoilationHumanRectColor = VoilationHumanRectColor
        self.XOffset = XOffset
        self.ShowCam = ShowCam
        self.FrameRate = FrameRate
    def __repr__(self):
        return f"DataObject({self.__dict__})"

# Helper function to convert JSON to DataObject
# def json_to_object(json_data):
#     objects = []
#     for item in json_data["d"]:
#         ar = item["Ratio"]
#         r = item["Railings"]
#         s = []
#         for q in r:
#             ss = []# Helper function to convert JSON to DataObject


def json_to_object(json_data):
    objects = []
    for item in json_data["d"]:
        ar = item["Ratio"]
        r = item["Railings"]
        s = []
        for q in r:
            ss = []
            
            for z in q:
                ss.append((int(z[0]*ar),int(z[1]*ar)))
            s.append(ss)
                
        obj = DataObject(
            CamId=item["CamId"],
            IsWebCam=item["IsWebCam"],
            Url=item["URL"],
            Height=item["Height"],
            Width=item["Width"],
            Ratio=item["Ratio"],
            Railings=s,
            ConfidenceThreshold=item["ConfidenceThreshold"],
            IouThreshold=item["IouThreshold"],
            HumanClassNo=item["HumanClassNo"],
            MobileClassNo=item["MobileClassNo"],
            BoxOverlapThreshold=item["BoxOverlapedThreshold"],
            RailingColor=item["RailingColor"],
            HumanRectColor=item["HumanRectColor"],
            MobileRectColor=item["MobileRectColor"],
            VoilationHumanRectColor=item["VoilationHumanRectColor"],
            XOffset=item["XOffset"],
            ShowCam= item["ShowCam"],
            FrameRate =item["FrameRate"]
        )
        objects.append(obj)
    return objects



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

# Fetch data from the API
def fetch_data_from_api(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        response_content = response.text

        # Parse the response content as JSON
        json_data = json.loads(response_content)

        # Convert JSON to Python objects
        return json_to_object(json_data)
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching data: {e}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return []




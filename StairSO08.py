from Package import *
from Package import Global
from loadConfig import json_to_object
from FrameTracking import *

OBJECTS = []

# Main function to capture video
def StartThread(CAMCONFIG): 
    
    cap = None
   
    
    ACTIVE_HUMANS = ActiveHumans(Threshold=0.7,FRAMERATE=CAMCONFIG.FrameRate)
    CAMCONFIG.Ratio = 0.75
    if CAMCONFIG.IsWebCam:
        cap = cv2.VideoCapture(0)
    else:
        rtsp = CAMCONFIG.Url
        cap = cv2.VideoCapture(rtsp)
    cap.set(cv2.CAP_PROP_FPS, CAMCONFIG.FrameRate)
  
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        
        frame = cv2.resize(frame,(int(CAMCONFIG.Width * CAMCONFIG.Ratio),int(CAMCONFIG.Height * CAMCONFIG.Ratio)))


        railings = CAMCONFIG.Railings
        for rail in railings:
            rail = np.array(rail, np.int32).reshape((-1, 1, 2))
            cv2.polylines(frame,[rail],True,Global.COLOR[CAMCONFIG.RailingColor],2)

        processed_frame = process_frame(frame,CAMCONFIG,ACTIVE_HUMANS)
        if(True):
            cv2.imshow('Pose and YOLO Detection', processed_frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()





with open(r"D:\StairSO\localConfig.txt",'r') as file:
    for URL in file:
        break
OBJECTS = json_to_object(handle_api(URL,True,None))
for object in (OBJECTS):    
    StartThread(object)
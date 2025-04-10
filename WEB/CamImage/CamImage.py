import webbrowser
import requests
import sys
import os
import cv2

stairso_path = r"D:\StairSO"  # Replace with the actual path to the StairSO folder
sys.path.append(stairso_path)

# Import the connection module
import connection
print(dir(connection))



def capture_and_save_image(data):   
       
    cap = cv2.VideoCapture(data['Value'])

    if not cap.isOpened():
        raise Exception("Could not open webcam.")

    a = True
    

    while a:
        
        ret, frame = cap.read()

        if not ret:
            print("Failed to capture frame from webcam.")
            break

        cv2.imshow("Webcam - Press 's' to Save", frame)

        cv2.waitKey(1000)
       

                
        if(cv2.imwrite(f"D:\\WEB\\RGPS\\Images\\{data['Id']}.jpg", frame) ):
            a = False 
            b = True
            
        else:
            a = True
        break

        
        
           
        


    cap.release()
    cv2.destroyAllWindows()
    return not a


    


def cala():
    

    url1 = "http://shivamm/rgps/ServerScripts/CameraService.asmx/NoScreenShotList"
    url2 = "http://shivamm/rgps/ServerScripts/CameraService.asmx/ScreenShotUpdate"
    
    data = connection.handle_api(url1)
    for d in data["d"]:
       flag =  capture_and_save_image(d)
       if(flag):
           payload1 = {
                "Camid": int(d["Id"])
               }
           connection.handle_api(url=url2,payload=payload1)


                        
                       
   
            

cala()
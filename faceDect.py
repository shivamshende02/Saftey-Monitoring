import cv2
import numpy as np
from mtcnn import MTCNN
from loadConfig import handle_api


def detect_and_save_faces(image_path, roi_x, roi_y, roi_w, roi_h, output_folder="D:\\StairSO\\DectFaces"):
    
    


    image = cv2.imread(image_path)


    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

 
    roi = image_rgb[roi_y:roi_y + roi_h, roi_x:roi_x + roi_w]

 
    detector = MTCNN()

    faces = detector.detect_faces(roi)

    face_count = 0 

    for face in faces:
        x, y, width, height = face["box"]

   
        face_crop = roi[y:y + height, x:x + width]


        face_filename = f"D:\\StairSO\\DectFaces\\face_{face_count}.jpg"

        cv2.imwrite(face_filename, cv2.cvtColor(face_crop, cv2.COLOR_RGB2BGR))

        face_count += 1

   
    


if __name__ == "__main__":
    url = "http://shivamm/rgps/ServerScripts/CameraService.asmx/GetImageData" 
    
    response = handle_api(url, POST=True) 
    
    for item in response['d']:
        image_path = f"D:\\WEB\\RGPS\\ViolationImages\\{item['id']}.jpg" 
        detect_and_save_faces(image_path,item["x"],item["y"],item["w"],item["h"])



    

import datetime
from pickle import TRUE
from turtle import right
import cv2
from cv2.gapi import CV_DRAW_PRIM
import numpy as np
import mediapipe as mp
import torch
import time
from removeDubRect import eliminate_overlapping_rectangles
from shapely.geometry import Point, Polygon
import os

from datetime import datetime 

COLOR = {
    "RED": (0, 0, 255),
    "GREEN": (0, 255, 0),
    "BLUE": (255, 0, 0),
    "YELLOW": (0, 255, 255),
    "CYAN": (255, 255, 0),
    "MAGENTA": (255, 0, 255),
    "WHITE": (255, 255, 255),
    "BLACK": (0, 0, 0),
    "GRAY": (128, 128, 128),
    "ORANGE": (0, 165, 255),
    "PINK": (203, 192, 255),
    "PURPLE": (128, 0, 128),
    "BROWN": (42, 42, 165)
}


# Initialize MediaPipe Pose
MP_POSE = mp.solutions.pose
POSE = MP_POSE.Pose(min_detection_confidence=0.90,min_tracking_confidence=0.90)



# Load YOLOv5 MODEL (GPU enabled)
MODEL = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
MODEL.to('cuda')  # Move the MODEL to GPU for faster inference

# Function to process video frames
def draw_rect(FRM,RECT,COLR,THIK=2,NAME='Person'):
    for BOX in RECT:  # Use flatten to get a 1D array
        
        cv2.rectangle(FRM, (int(BOX[0]), int(BOX[1])), (int(BOX[2]), int(BOX[3])), COLR, THIK)
        cv2.putText(FRM, f'{NAME}', (int(BOX[0]), int(BOX[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLR, THIK)

def draw_landmarks(IMAGE, LANDMARKS):
    for (x, y, CONFIDENCE) in LANDMARKS:
        if CONFIDENCE > 0.5: 
            cv2.circle(IMAGE, (int(x), int(y)), 5, (0, 255, 0), -1)
    return IMAGE


def normalize_points(POINTS, image_width, image_height):
    NORMALIZED_POINTS = []
    
    for POINT in POINTS:
        # Normalize x and y coordinates
        normalized_x1 = POINT[0] / image_width        
        normalized_y1 = POINT[1] / image_height
        normalized_x2 = POINT[2] / image_width
        normalized_y2 = POINT[3] / image_height

        
        # Keep the last coordinate as is
        normalized_point = [normalized_x1, normalized_y1 ,normalized_x2,normalized_y2 ] + POINT[4]  # Append remaining coordinates
        NORMALIZED_POINTS.append(normalized_point)
    
    return NORMALIZED_POINTS

def postprocess_yolo_output(results_yolo, confidence_threshold=0.5, iou_threshold=0.5):
    # Move results to CPU and convert to NumPy
    detections = results_yolo[0].cpu().detach().numpy()
    
    # Extract bounding boxes, confidences, and class scores
    boxes = detections[:, :4]  # cx, cy, w, h
    confidences = detections[:, 4]  # Object CONFIDENCE
    class_probs = detections[:, 5:]  # Class probabilities
    
    # Filter by CONFIDENCE threshold
    mask = confidences > confidence_threshold
    boxes = boxes[mask]
    confidences = confidences[mask]
    class_probs = class_probs[mask]
    
    # Get the class with the highest probability for each detection
    class_ids = np.argmax(class_probs, axis=1)
    scores = np.max(class_probs, axis=1)
    
    # Further filter by score threshold
    valid_indices = scores > confidence_threshold
    boxes = boxes[valid_indices]
    confidences = confidences[valid_indices]
    class_ids = class_ids[valid_indices]
    scores = scores[valid_indices]
    
    # Convert [cx, cy, w, h] to [x1, y1, x2, y2]
    converted_boxes = []
    for BOX in boxes:
        cx, cy, w, h = BOX
        x1 = cx - w / 2
        y1 = cy - h / 2
        x2 = cx + w / 2
        y2 = cy + h / 2
        converted_boxes.append([x1, y1, x2, y2])
    converted_boxes = np.array(converted_boxes)

    converted_boxes = np.array(converted_boxes)
    if converted_boxes.ndim == 1:
        converted_boxes = converted_boxes[:, None]  # Convert to 2D if 1D

# Stack the arrays horizontally
    results = np.hstack((
            converted_boxes,              # Shape: (N, 4)
            scores[:, None],              # Shape: (N, 1)
             class_ids[:, None]            # Shape: (N, 1)
            ))
    
    
    return results


def is_point_in_polygon(left_wrist, right_wrist, polyg):
    pointl = Point(left_wrist[0], left_wrist[1])
    pointr = Point(right_wrist[0], right_wrist[1])
    for poly in polyg:
        poly = Polygon(poly)
        if poly.contains(pointl) or poly.contains(pointr):
            #cv2.putText(frame,"Not Holding",(10,50),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,255,255),2)
            return True
    return False    
            

def DrawViolation(frame,hb,V1,V2,V3):
    if len(V1+V2+V3):
        draw_rect(frame,hb,(0,0,255),2,V1+V2+V3)
        os.system('cls')
        print(datetime.now().strftime('%Y-%m-%d_%H-%M-%S'),V1+V2+V3)
    return ("","","")

def process_frame(frame):


   
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Detect poses using MediaPipe
    results = POSE.process(rgb_frame)
    
    # Detect objects using YOLO (move the frame to GPU)
    frame_tensor = torch.from_numpy(rgb_frame).float().to('cuda')  # Convert to tensor and move to GPU
    frame_tensor /= 255.0  # Normalize to [0, 1]
    frame_tensor = frame_tensor.permute(2, 0, 1).unsqueeze(0)  # Reshape to (1, 3, H, W)
    
    # Run YOLOv5 inference on GPU
    results_yolo = MODEL(frame_tensor)  # Get predictions from YOLOv5

    
    # Convert results back to CPU
    results_cpu = postprocess_yolo_output(results_yolo, confidence_threshold=0.5)
    
    human_boxes = []
    
    mobile_boxes =[]
    
    # Draw YOLO detections on the frame

    for o in results_cpu:
        if o[5] == 0:  # Filter for class 0
            human_boxes.append([o[0]-50, o[1], o[2]+50, o[3],o[4]]) 
            
        if o[5] == 67:
            mobile_boxes.append([o[0], o[1], o[2], o[3],o[4]])
            

  

    hb = eliminate_overlapping_rectangles(human_boxes,0.75)
    mb = eliminate_overlapping_rectangles(mobile_boxes,0.75)

    draw_rect(frame,hb,(255,0,0),2,'Person')
    draw_rect(frame,mb,(0,0,255),2,'Mobile')

   
                    
           
                    
           

    
    for BOX in hb:
            v1=""
            v2=""
            v3=""
            person_roi = rgb_frame[int(BOX[1]):int(BOX[3]), int(BOX[0]):int(BOX[2])]
            if not (person_roi.size):
                continue
            results = POSE.process(person_roi)
            #results_face = face_detection.process(person_roi)

            #face_detected = results_face.detections is not None

            torso_rect = None  # Initialize torso rectangle
            if results.pose_landmarks: #and face_detected:
                X = BOX[0]    
                Y =BOX[1]
                w= (BOX[2] - BOX[0]) 
                h = (BOX[3] - BOX[1]) 
                

                left_wrist = results.pose_landmarks.landmark[MP_POSE.PoseLandmark.LEFT_WRIST]
                right_wrist = results.pose_landmarks.landmark[MP_POSE.PoseLandmark.RIGHT_WRIST]
               
                rw = [int((right_wrist.x * w) + X), int((right_wrist.y * h) + Y)]  # Ensure integer coordinates
                lw = [int((left_wrist.x * w ) + X), int((left_wrist.y  * h) + Y)]   # Ensure integer coordinates

                # Define center POINTS for the circles
                c1 = (rw[0], rw[1])
                c2 = (lw[0], lw[1])

                # Draw circles on the frame
                cv2.circle(frame, c1, 2, (0, 255, 0), 2)  # Circle for right wrist
                cv2.circle(frame, c2, 2, (0, 255, 0), 2)  # Circle for left wrist


                if not (is_point_in_polygon(lw,rw,railingArray)):
                    v1="No Railing. "

                
                gg = (left_wrist.x - right_wrist.x)
                gg = gg /  ((w -100)/w)
                #print(gg)
                if left_wrist.y < 0.19 or right_wrist.y < 0.19:
                    v2 = "Talking. "
                elif( left_wrist.y < 0.38 and right_wrist.y < 0.38 ) and gg<0.3:
                    v2 = "Texting. "
                
                for mobile in mb:
                    
                    mobx = (mobile[0] + mobile[2]) // 2
                    moby = (mobile[1] + mobile[3]) // 2
                    
                    if mobx > X and mobx < (w + X) and moby > Y and moby < (h + Y) :
                        head = Y +int((float(h) * 0.19))
                        torso = head * 2
                        if ( (moby < torso) and (moby > head)):
                            v2 = "Texting. "
                        if (moby < head):
                            v2 = "Talking. "
              
               
                #(v1,v2,v3)=DrawViolation(frame,hb,v1,v2,v3)
                #cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)      
                    

                


    



    cv2.putText(frame, f"{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}", (10, 12), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 255), 1)


    return frame



left_railing_coords = [(126, 2), (107, 410), (161, 460), (190, 4), (126, 4)]
right_railing_coords = [(293, 1), (347, 424), (402, 426), (416, 376), (380, 309), (359,306),(322,2)]
right_1_railing_coords = [(465, 306), (609, 347), (610, 296), (466, 282)]

railingArray = [[(126, 2), (107, 410), (161, 460), (190, 4), (126, 4)],[(293, 1), (347, 424), (402, 426), (416, 376), (380, 309), (359,306),(322,2)],[(465, 306), (609, 347), (610, 296), (466, 282)]]

lr = np.array(left_railing_coords, np.int32).reshape((-1, 1, 2))
rr = np.array(right_railing_coords, np.int32).reshape((-1, 1, 2))
rr1 = np.array(right_1_railing_coords, np.int32).reshape((-1, 1, 2))





# Main function to capture video
def main():

    #url = r"D:\Proj\WhatsApp Video 2025-01-02 at 14.05.29_c1913664_1.mp4"
    rtsp = "rtsp://admin:tata_motors123@192.168.1.13:554/h264"
    cap = cv2.VideoCapture(rtsp)
    
    
    
    #original_fps = cap.get(cv2.CAP_PROP_FPS)
    #cap.set(cv2.CAP_PROP_FPS, 64)

   


    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break


        frame = cv2.resize(frame,(int(1280*0.8),int(720*0.8)))



        #image_filename = os.path.join("C:\\Users\\Shivam\\Pictures\\Screenshots","1.png")
        #cv2.imwrite(image_filename, frame)
        #exit()
       
        cv2.polylines(frame, [lr], True, (125,255,155), 2)
        cv2.polylines(frame, [rr], True, (125,255,155), 2)
        cv2.polylines(frame, [rr1], True, (125,255,155), 2)
        processed_frame = process_frame(frame)
        
        cv2.imshow('Pose and YOLO Detection', processed_frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()

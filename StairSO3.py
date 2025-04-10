
import cv2
import numpy as np
import mediapipe as mp
import torch
import time
from removeDubRect import eliminate_overlapping_rectangles

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.90,min_tracking_confidence=0.90)

# Load YOLOv5 model (GPU enabled)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
model.to('cuda')  # Move the model to GPU for faster inference

# Function to process video frames
def draw_rect(frm,rect,colr,thik=2,name='Person'):
    for box in rect:  # Use flatten to get a 1D array
        
        cv2.rectangle(frm, (int(box[0]), int(box[1])), (int(box[2]), int(box[3])), colr, thik)
        cv2.putText(frm, f'{name} {box[4]:.2f}', (int(box[0]), int(box[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, colr, thik)

def draw_landmarks(image, landmarks):
    for (x, y, confidence) in landmarks:
        if confidence > 0.5:  # Draw only if confidence is above a threshold
            cv2.circle(image, (int(x), int(y)), 5, (0, 255, 0), -1)
    return image


def normalize_points(points, image_width, image_height):
    normalized_points = []
    
    for point in points:
        # Normalize x and y coordinates
        normalized_x1 = point[0] / image_width        
        normalized_y1 = point[1] / image_height
        normalized_x2 = point[2] / image_width
        normalized_y2 = point[3] / image_height

        
        # Keep the last coordinate as is
        normalized_point = [normalized_x1, normalized_y1 ,normalized_x2,normalized_y2 ] + point[4]  # Append remaining coordinates
        normalized_points.append(normalized_point)
    
    return normalized_points

def postprocess_yolo_output(results_yolo, confidence_threshold=0.5, iou_threshold=0.5):
    # Move results to CPU and convert to NumPy
    detections = results_yolo[0].cpu().detach().numpy()
    
    # Extract bounding boxes, confidences, and class scores
    boxes = detections[:, :4]  # cx, cy, w, h
    confidences = detections[:, 4]  # Object confidence
    class_probs = detections[:, 5:]  # Class probabilities
    
    # Filter by confidence threshold
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
    for box in boxes:
        cx, cy, w, h = box
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
    
    # Combine the final results
    #results = np.hstack((converted_boxes, scores[:, None], class_ids[:, None]))
    return results
def process_frame(frame):


    #monitor_gpu_usage()
    # Convert the frame to RGB for MediaPipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Detect poses using MediaPipe
    results = pose.process(rgb_frame)
    
    # Detect objects using YOLO (move the frame to GPU)
    frame_tensor = torch.from_numpy(rgb_frame).float().to('cuda')  # Convert to tensor and move to GPU
    frame_tensor /= 255.0  # Normalize to [0, 1]
    frame_tensor = frame_tensor.permute(2, 0, 1).unsqueeze(0)  # Reshape to (1, 3, H, W)
    
    # Run YOLOv5 inference on GPU
    results_yolo = model(frame_tensor)  # Get predictions from YOLOv5

    
    # Convert results back to CPU
    results_cpu = postprocess_yolo_output(results_yolo, confidence_threshold=0.5)
    #exit()
    #print(results_cpu.size)
    #return frame
    human_boxes = []
    
    mobile_boxes =[]
    
    # Draw YOLO detections on the frame

    for o in results_cpu:
        if o[5] == 0:  # Filter for class 0
            human_boxes.append([o[0], o[1], o[2], o[3],o[4]]) 
            
        if o[5] == 67:
            mobile_boxes.append([o[0], o[1], o[2], o[3],o[4]])
            

  

    hb = eliminate_overlapping_rectangles(human_boxes,0.75)
    mb = eliminate_overlapping_rectangles(mobile_boxes,0.75)

    draw_rect(frame,hb,(255,0,0),2,'Man')
    draw_rect(frame,mb,(0,0,255),2,'Mobile')

   
                    
           
                    
           

    
    for box in hb:
            
            person_roi = rgb_frame[int(box[1]):int(box[3]), int(box[0]):int(box[2])]
            if not (person_roi.size):
                continue
            results = pose.process(person_roi)

            torso_rect = None  # Initialize torso rectangle
            if results.pose_landmarks:
                X = box[0]    
                Y =box[1]
                w= (box[2] - box[0]) 
                h = (box[3] - box[1]) 
                #print(X,Y,h,w)

                # Extract coordinates for shoulders and hips
                left_shoulder = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
                right_shoulder = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
                left_hip = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
                right_hip = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
                left_wrist = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
                right_wrist = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
                right_ear = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_EAR] 
                left_ear = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_EAR]

               
                left_shoulder_coords = int((left_shoulder.x * w)+X), int((left_shoulder.y * h)+Y)
                right_shoulder_coords = int((right_shoulder.x * w)+X), int((right_shoulder.y * h)+Y)
                left_hip_coords = int((left_hip.x * w)+X), int((left_hip.y * h)+Y)
                right_hip_coords = int((right_hip.x * w)+X), int((right_hip.y * h)+Y)
                left_wrist_coords = int((left_wrist.x * w)+X), int((left_wrist.y * h)+Y)
                right_wrist_coords =int((right_wrist.x * w)+X),int((right_wrist.y * h)+Y)
                

               
                # Calculate the bounding box for torso
                x_min = min(left_shoulder_coords[0], right_shoulder_coords[0])
                x_max = max(left_shoulder_coords[0], right_shoulder_coords[0])
                y_min = min(left_shoulder_coords[1], right_shoulder_coords[1])
                y_max = max(left_hip_coords[1], right_hip_coords[1])


                torso_rect = (x_min, y_min, x_max, y_max)

                for mobile in mb:
                    
                    center_x_mobile = (mobile[0] + mobile[2]) // 2
                    center_y_mobile = (mobile[1] + mobile[3]) // 2
                    if torso_rect[0] <= center_x_mobile <= torso_rect[2] and torso_rect[1] <= center_y_mobile <= torso_rect[3]:
                    # Check if either or both wrists are inside the torso rectangle
                        left_wrist_inside = (
                            torso_rect[0] <= left_wrist_coords[0] <= torso_rect[2]
                            and torso_rect[1] <= left_wrist_coords[1] <= torso_rect[3]
                        )
                        right_wrist_inside = (
                            torso_rect[0] <= right_wrist_coords[0] <= torso_rect[2]
                            and torso_rect[1] <= right_wrist_coords[1] <= torso_rect[3]
                        )

                        if left_wrist_inside or right_wrist_inside:
                            # Check if this person is already detected
                            cv2.putText(frame,"texting",(10,10),cv2.FONT_HERSHEY_SIMPLEX,1,(0,0,0),5)
                            for person in mb:
                                overlap_x = max(0, min(torso_rect[2], person[2]) - max(torso_rect[0], person[0]))
                                overlap_y = max(0, min(torso_rect[3], person[3]) - max(torso_rect[1], person[1]))
                                overlap_area = overlap_x * overlap_y
                                current_area = (torso_rect[2] - torso_rect[0]) * (torso_rect[3] - torso_rect[1])
                    if center_y_mobile < torso_rect[1] and (center_x_mobile > torso_rect[0] and center_x_mobile < torso_rect[2]) :
                        cv2.putText(frame,"talking",(10,100),cv2.FONT_HERSHEY_SIMPLEX,1,(0,0,0),5)
               

                cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
                








              
                    

            # Draw the rectangle around the face
                
                # Draw the rectangle around the torso
                


    



    
    return frame


# Main function to capture video
def main():

    url = r"D:\Proj\WhatsApp Video 2025-01-02 at 14.05.29_c1913664_1.mp4"
    cap = cv2.VideoCapture(0)
    
    
    #original_fps = cap.get(cv2.CAP_PROP_FPS)
    #cap.set(cv2.CAP_PROP_FPS, 64)

    if not cap.isOpened():
        print("Error: Could not open video.")
        exit()


    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # width = int(frame.shape[1] * 0.5)
        # height = int(frame.shape[0] * 0.5)
        # frame = cv2.resize(frame, (608 ,1080))
        processed_frame = process_frame(frame)
        
        cv2.imshow('Pose and YOLO Detection', processed_frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()

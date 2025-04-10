
import cv2
import numpy as np
import mediapipe as mp
import torch
import time
from removeDubRect import eliminate_overlapping_rectangles

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Load YOLOv5 model (GPU enabled)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
model.to('cuda')  # Move the model to GPU for faster inference

# Function to process video frames
def draw_rect(frm,rect,colr,thik=2):
    for box in rect:  # Use flatten to get a 1D array
        
        cv2.rectangle(frm, (int(box[0]), int(box[1])), (int(box[2]), int(box[3])), colr, thik)
        cv2.putText(frm, f'mobile {box[4]:.2f}', (int(box[0]), int(box[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, colr, thik)


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
    human_confidence = []
    mobile_boxes =[]
    mobile_confidence = []
    # Draw YOLO detections on the frame

    for o in results_cpu:
        if o[5] == 0:  # Filter for class 0
            human_boxes.append([o[0], o[1], o[2], o[3],o[4]])  # Append bounding box
            #human_confidence.append(o[4])
        if o[5] == 67:
            mobile_boxes.append([o[0], o[1], o[2], o[3],o[4]])
            #mobile_confidence.append(o[4])

  

    hb = eliminate_overlapping_rectangles(human_boxes,0.75)
    mb = eliminate_overlapping_rectangles(mobile_boxes,0.75)

    draw_rect(frame,hb,(255,0,0),2)
    draw_rect(frame,mb,(0,255,0),2)
                            
                
                
                
                
                

            
            # person_roi = rgb_frame[int(box[1]):int(box[3]), int(box[0]):int(box[2])]
            # if person_roi.size > 0:
            #          pose_results = pose.process(person_roi)
            #          if pose_results.pose_landmarks:
            #              # Map landmarks back to the original frame coordinates
            #              pts = []
            #              for landmark in pose_results.pose_landmarks.landmark:
            #                  # Get landmark coordinates relative to the ROI
            #                  landmark_x = int(landmark.x * (x2 - x1) + x1)
            #                  landmark_y = int(landmark.y * (y2 - y1) + y1)
            #                  pts.append([landmark_x, landmark_y])
            #                  # Draw landmarks on the original frame
            #                  cv2.circle(frame, (landmark_x, landmark_y), 3, (255, 0, 0), -1)  # Draw each landmark
                    
            #              pts = np.array(pts, np.int32)
                    
            #              # Draw pose connections on the original frame
            #              for connection in mp_pose.POSE_CONNECTIONS:
            #                  start_idx, end_idx = connection
            #                  cv2.line(frame, tuple(pts[start_idx]), tuple(pts[end_idx]), (0, 255, 0), 1) 
    return frame


# Main function to capture video
def main():

    rtsp_url = ''
    cap = cv2.VideoCapture(0)  # Use 0 for webcam or provide a video file path

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        processed_frame = process_frame(frame)
        
        cv2.imshow('Pose and YOLO Detection', processed_frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()

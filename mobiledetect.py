import cv2
import torch
# print(torch.__version__)
# exit()
# Load the YOLOv5 model (small version)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

# Capture video from webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Perform inference
    results = model(frame)

    # Parse results
    detections = results.pred[0]  # Get predictions for the first image

    for *box, conf, cls in detections.tolist():  # Iterate over detections
        if conf > 0:  # Confidence threshold
            label = model.names[int(cls)]  # Get class name
            
            # Check if the detected object is a mobile phone
            if label == "cell phone":  # Adjust class name as needed
                # Extract bounding box coordinates
                x1, y1, x2, y2 = map(int, box)
                
                # Draw bounding box and label on the frame
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, f"{label}: {conf:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Display the frame with detections
    cv2.imshow("YOLOv5 Mobile Phone Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

import shapely
from Package import *
from Package import Global
from FrameTracking import *
import threading
import base64

MODEL = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
MODEL.to('cuda')  # Move the MODEL to GPU for faster inference

MP_POSE = mp.solutions.pose
POSE = MP_POSE.Pose(min_detection_confidence=0.90,min_tracking_confidence=0.90)



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


def draw_rect(FRM,RECT,COLR,THIK=2,NAME=''):
    if COLR == None:
        return
    for BOX in RECT:  # Use flatten to get a 1D array
        
        cv2.rectangle(FRM, (int(BOX[0]), int(BOX[1])), (int(BOX[2]), int(BOX[3])), COLR, THIK)
        cv2.putText(FRM, f'{NAME}', (int(BOX[0]), int(BOX[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLR, THIK)




def draw_landmarks(IMAGE, LANDMARKS):
    for (x, y, CONFIDENCE) in LANDMARKS:
        if CONFIDENCE > 0.5: 
            cv2.circle(IMAGE, (int(x), int(y)), 5, (0, 255, 0), -1)
    return IMAGE

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
    pointl = shapely.Point(left_wrist[0], left_wrist[1])
    pointr = shapely.Point(right_wrist[0], right_wrist[1])
    for poly in polyg:
        poly = Polygon(poly)
        if shapely.contains(poly,pointl) or shapely.contains(poly,pointr):
            #cv2.putText(frame,"Not Holding",(10,50),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,255,255),2)
            return True
    return False    

def process_frame(frame,CAMCONFIG,AH:ActiveHumans):
    


   
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
    results_cpu = postprocess_yolo_output(results_yolo, CAMCONFIG.ConfidenceThreshold,CAMCONFIG.IouThreshold)
    
    human_boxes = []
    
    mobile_boxes =[]

    results_cpu = np.array(results_cpu)
    
    # Draw YOLO detections on the frame
    if results_cpu.size >0:
        human_boxes = np.c_[results_cpu[results_cpu[:, 5] == CAMCONFIG.HumanClassNo, :4] + [-1*(CAMCONFIG.XOffset), 0, (CAMCONFIG.XOffset), 0], results_cpu[results_cpu[:, 5] == CAMCONFIG.HumanClassNo, 4]]
        mobile_boxes = results_cpu[results_cpu[:, 5] == CAMCONFIG.MobileClassNo, :5]
    else:
        return frame

  

    hb = eliminate_overlapping_rectangles(human_boxes,CAMCONFIG.BoxOverlapThreshold)
    mb = eliminate_overlapping_rectangles(mobile_boxes,CAMCONFIG.BoxOverlapThreshold)

    #draw_rect(frame,hb,Global.COLOR[CAMCONFIG.HumanRectColor],2,'Person')
    #draw_rect(frame,mb,Global.COLOR[CAMCONFIG.MobileRectColor],2,'Mobile')

   
                    
           
                    
           

    
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
                
               
                AH.AddHumanFrame(PersonFrame(X,Y,w,h,CAMCONFIG.Height * CAMCONFIG.Ratio))
                

                left_wrist = results.pose_landmarks.landmark[MP_POSE.PoseLandmark.LEFT_WRIST]
                right_wrist = results.pose_landmarks.landmark[MP_POSE.PoseLandmark.RIGHT_WRIST]
               
                rw = [int((right_wrist.x * w) + X), int((right_wrist.y * h) + Y)]  # Ensure integer coordinates
                lw = [int((left_wrist.x * w ) + X), int((left_wrist.y  * h) + Y)]   # Ensure integer coordinates

                # Define center POINTS for the circles
                c1 = (rw[0], rw[1])
                c2 = (lw[0], lw[1])

                # Draw circles on the frame
                cv2.circle(frame, c1, 2, (0, 255, 0), 2)  # Circle for right wrist
                cv2.circle(frame, c2, 2, (0, 255, 0), 2)  #i Circle for left wrist
                #[array([[     1155.6,       561.7], [     1162.2,      543.78]])]
                #print(len(AH.HumanList))
                for pf in AH.HumanList:
                    writelog("Speed",pf.Speed)
                    if (pf.Threshold>16):
                        gg = (left_wrist.x - right_wrist.x)
                        gg = gg /  ((w -100)/w)
                        print(gg)
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
                    # if(pf.Threshold>)
                    

                    
                    #print(pf)
                    dd =np.array( pf.getPolyPath(),np.int32)
                    if  len(dd)>1:                        
                        cv2.polylines(frame,[dd],isClosed=False,color=Global.COLOR["BROWN"],thickness=2)

                if not (is_point_in_polygon(lw,rw,CAMCONFIG.Railings)):
                    v1="No Railing. "

                
                
                if(v1+v2+v3):
                    (v1,v2,v3)=DrawViolation(frame,hb,v1,v2,v3,CAMCONFIG)
                    SaveViolation(frame,BOX,v1,v2,v3,CAMCONFIG,dd)
                      
                    

          


    cv2.putText(frame, f"{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}", (10, 12), cv2.FONT_HERSHEY_PLAIN, 1, Global.COLOR["BROWN"], 1)


    return frame



def DrawViolation(frame,hb,V1,V2,V3,CAMCONFIG):
    if len(V1+V2+V3):
        draw_rect(frame,hb,Global.COLOR[CAMCONFIG.VoilationHumanRectColor],2,V1+V2+V3)
        os.system('cls')
        
    return ("","","")

def SaveViolation(frame,hb,V1,V2,V3,CAMCONFIG,dd=None):
    
             
        
        _, buffer = cv2.imencode('.jpg', frame)
    
        frame_bytes = buffer.tobytes()
    
        base64_string = base64.b64encode(frame_bytes).decode('utf-8')
        thread = threading.Thread(target=save, args=(base64_string,CAMCONFIG.CamId,hb[0],hb[1],hb[2] - hb[0],hb[3] - hb[1],(V1+V2+V3)))
        thread.start()

#handle_api(url,POST = True, payload=None):
def save(frame,camid,x,y,h,w,act):

    url = "http://shivamm/rgps/ServerScripts/CameraService.asmx/SaveV" 
    payload = {"frame": frame,"CamId":camid, "x":x, "y":y, "h":h, "w":w, "activity":act}  # Modify as needed
    response = handle_api(url, POST=True, payload=payload)  # Call the function

    if response:
        print("API Response:", response)
    else:
        print("Failed to fetch data")





       
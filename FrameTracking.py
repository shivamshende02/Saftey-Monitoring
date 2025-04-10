from pickle import FRAME
import numpy as np
from datetime import datetime
import math

TrackList = np.arange(1,101)

def writelog( *args, sep=' ', end='\n'):
    """
    Mimics the print function to write to a file.
    
    Parameters:
    - file_path (str): The path to the file where the output will be written.
    - *args: Multiple arguments of different types.
    - sep (str): String inserted between values, default is a space.
    - end (str): String appended after the last value, default is a newline.
    """
    # Convert all arguments to string and join them with sep
    output = sep.join(str(arg) for arg in args) + end
    nx=datetime.now()
    d=nx.strftime("%Y%m%d")
    t=nx.strftime("%H%M%S.%f:")
    # Write to the specified file
    with open(f"D:\\StairSO\\{d}.txt", 'a') as file:  # Open in append mode
        file.write(t+output)
    print(output)



class PersonFrame:
    def __init__(self,X,Y,W,H,B):
        self.X=X
        self.Y=Y
        self.W=W
        self.H=H
        self.B=B
    def __repr__(self):
        return F"PersonFrame(X:{self.X},Y:{self.Y},W:{self.W},H:{self.H})"
    
class CenterPoint:
    def __init__(self,X,Y,Area):
        self.X=X
        self.Y=Y
        self.TimeStamp = datetime.now().timestamp()
        self.Area = Area
    def __repr__(self):
        return F"{self.X},{self.Y},{self.Area}"



class HumanFrames:
    def __init__(self,ID,FRAME:PersonFrame,FRAMERATE,B):
        if not isinstance(FRAME,PersonFrame):
            raise TypeError("Parameter 'FRAME' must be of type 'PersonFrame'")
        self._TITLE="Person"
        self.ID=ID
        self.FRAME=FRAME        
        self.LastTime= datetime.now()        
        self.StartTime =  datetime.now()
        self.LastCenter = getCenter(self.FRAME)
        self.Path = np.array([],dtype=CenterPoint)
        self.Path = np.append(self.Path,getCenter(self.FRAME))
        self.Travel = 0
        self.Speed = 0.0
        self.FrameRate = FRAMERATE
        self.Area = 0.0
        self.Height = 0.0
        self.Threshold=0
        self.B=B

        
    def __repr__(self):
         return f"{self._TITLE}{self.ID}, Speed: {self.Speed},Height:{self.Height}"
        
    def check(self):
     if (30<self.Height<100):
         if(self.Speed<30):
             return ""
         else:
             return "Running. "
     elif(100<self.Height<280):
         if(self.Speed<30):
             return ""
         else:
             return "Running. "
     elif(281<self.Height<400):
         if(self.Speed<30):
             return ""
         else:
             return "Running. "
     else:
         return ""





    
    def getPolyPath(self)    :
        dd = np.array([],dtype=np.int32)
        for q in self.Path:
            dd = np.append(dd,[q.X,q.Y])

        return dd.reshape(-1,2)
    def polyline_length(self):
        length = 0.0
        for i in range(1, len(self.Path)):
            p1 = self.Path[i - 1]
            p2 = self.Path[i]
            # Calculate Euclidean distance
            distance = getWalk(p1,p2)
            length += distance
        return length
    def td(self):
        ttd = 0.0
        for i in range(1,len(self.Path)):
            p1 = self.Path[i - 1]
            p2 = self.Path[i]
            # Calculate Euclidean distance
            distance =abs(p2.TimeStamp-p1.TimeStamp)
            ttd += distance
        return ttd
       
    def AppendPath(self,FRAME:PersonFrame):
        if not isinstance(FRAME,PersonFrame):
            raise TypeError("Parameter 'FRAME' must be of type 'PersonFrame'")   
        C= getCenter(FRAME)  
        self.Area = C.Area
        self.Height = abs(FRAME.H - FRAME.Y)
                  
        self.Path = np.append(self.Path, C)
        t= datetime.now().timestamp()-2.0
        x=[e for e in self.Path if e.TimeStamp > t ]
        self.Path=x
        # if len(self.Path) > self.FrameRate:
        #     self.Path = self.Path[-self.FrameRate:]
          
        self.FRAME=FRAME
        self.LastTime=datetime.now()
        W = self.Path[-1]

        self.Travel =  self.polyline_length()
        writelog("B",self.B)
        if not(self.FRAME.Y>self.B/2 and self.FRAME.H + self.FRAME.Y >self.B):
            if self.td():
                self.Speed = (self.Travel /math.sqrt(self.FRAME.H**2 + (self.FRAME.W-100)**2)) / self.td()
        else:
            self.Speed= 0.05
    def SetThreshold(self,t):
        self.Threshold=t


def getWalk(p1:CenterPoint,p2:CenterPoint):
    if not isinstance(p1, CenterPoint):
            raise TypeError("Parameter 'p1' must be of type 'CenterPoint'.")
    if not isinstance(p2, CenterPoint):
            raise TypeError("Parameter 'p2' must be of type 'CenterPoint'.")

    return  abs(math.sqrt((p2.X - p1.X)**2 + (p2.Y - p1.Y)**2))



def getCenter(FRM:PersonFrame):
    if not isinstance(FRM, PersonFrame):
            raise TypeError("Parameter 'FRM' must be of type 'PersonFrame'.")
    return CenterPoint(int(FRM.X +(FRM.W/2)) , int(FRM.Y + (FRM.H/2)),getArea(FRM))


def getArea(FRM:PersonFrame):     
    return int((np.abs(FRM.W) - np.abs(FRM.X))) * ((np.abs(FRM.H) - np.abs(FRM.Y)))

class ActiveHumans:
    def __init__(self ,Threshold,FRAMERATE ):        
        self.HumanList = np.array([], dtype=HumanFrames)
        self.Threshold = Threshold
        self.FrameRate = FRAMERATE
        current_time = datetime.now()
        self.HumanList = np.array([obj for obj in self.HumanList if (current_time - obj.LastTime).total_seconds() <= 3])

    def AddHumanFrame(self, HumanFrame: PersonFrame) -> None:
        if not isinstance(HumanFrame, PersonFrame):
            raise TypeError("Parameter 'HumanFrame' must be of type 'PersonFrame'.")   
        current_time = datetime.now()
        self.HumanList = np.array([obj for obj in self.HumanList if (current_time - obj.LastTime).total_seconds() <= 3])
        
        missing_ids = np.setdiff1d(TrackList, np.array([human.ID for human in self.HumanList]))
        NEWID=missing_ids.min()
        q=HumanFrames(NEWID,HumanFrame,self.FrameRate,HumanFrame.B)
        if missing_ids.size==0:
            writelog("More than 100 People in frame")  
        else:           
            if len(self.HumanList)==0:                
                self.HumanList = np.append(self.HumanList,q)     
            else: 
                mask=[e for e in self.HumanList if (getWalk(e.LastCenter, getCenter(q.FRAME)) / math.sqrt(e.FRAME.H**2 + (e.FRAME.W - 100)**2)) <= self.Threshold]  
                
                if (len(mask)==0):
                    
                    self.HumanList=np.append(self.HumanList,q)
                else:
                    
                    mask[0].AppendPath(q.FRAME)
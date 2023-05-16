import cv2


vid = cv2.VideoCapture(0)

while (True):
    ret, frame = vid.read()
    cv2.imshow("Real Time Video",  frame)
    cv2.waitKey(0)
    break
vid.release()
cv2.destroyAllWindows()



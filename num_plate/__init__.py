import cv2
import pytesseract
import os
import imutils

pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"

image = cv2.imread("./image02.jpg")
image = imutils.resize(image, width=300)
cv2.imshow("Number Plate Image", image)

gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imshow("To GrayScale", gray_image)

flattened_image = cv2.bilateralFilter(gray_image, 11, 17, 17)
cv2.imshow("Smoothed Image", gray_image)

edged = cv2.Canny(flattened_image, 30, 200)
cv2.imshow("Edged Image", edged)
cv2.waitKey(0)

cnts, new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
image1 = image.copy()
cv2.drawContours(image1, cnts, -1, (0, 255, 0), 3)
cv2.imshow("Contours", image1)
cv2.waitKey(0)

cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:30]
screenCnt = None
image2 = image.copy()
cv2.drawContours(image2, cnts, -1, (0, 255, 0), 3)
cv2.imshow("Top 30 Image Contours", image2)
cv2.waitKey(0)

i = 7
for c in cnts:
    perimeter = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.018 * perimeter, True)
    if len(approx) == 4:
        screenCnt = approx
    x, y, w, h = cv2.boundingRect(c)
    new_image = image[y : y + h, x : x + w]
    cv2.imwrite("./" + str(i) + ".jpg", new_image)
    i += 1
    break

cv2.drawContours(image, [screenCnt], -1, (0, 0, 255), 3)
cv2.imshow("Drawn Contours on Original", image)
cv2.waitKey(0)

cropped_loc = "./7.jpg"
cropped_image = cv2.imread(cropped_loc)
cv2.imshow("Cropped Image", cropped_image)
plate = pytesseract.image_to_string(cropped_loc, lang="eng")
print("Number Plate is: ", plate)
cv2.waitKey(0)

# Close all OpenCV windows
cv2.destroyAllWindows()

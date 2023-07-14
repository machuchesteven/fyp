from fastapi import FastAPI, UploadFile, File
import cv2
import pytesseract
from typing import List
import numpy as np

app = FastAPI()

pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"


def is_text_like(text):
    aspect_ratio_range = (2.5, 5.0)
    area_range = (100, 1000)
    height_range = (10, 100)
    width_range = (50, 500)
    solidity_threshold = 0.8

    if aspect_ratio_range[0] <= (w / h) <= aspect_ratio_range[1]:
        if area_range[0] <= cv2.contourArea(contour) <= area_range[1]:
            if (
                height_range[0] <= h <= height_range[1]
                and width_range[0] <= w <= width_range[1]
            ):
                hull_area = cv2.contourArea(cv2.convexHull(contour))
                solidity = float(area) / hull_area
                if solidity >= solidity_threshold:
                    return True
    return False


@app.post("/")
async def extract_text(images: List[UploadFile] = File(...)):
    extracted_text = []

    for image in images:
        # Read the image file
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Preprocess the image
        # ...

        # Find contours
        contours, _ = cv2.findContours(
            image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )

        # Iterate over contours
        for contour in contours:
            # Filter contours based on size, aspect ratio, etc.
            # ...

            # Extract region of interest (ROI) from the contour
            x, y, w, h = cv2.boundingRect(contour)
            roi = img[y : y + h, x : x + w]

            # Apply OCR on the ROI
            text = pytesseract.image_to_string(roi, config="your_config_options")

            # Filter text-like contours based on specific criteria
            if is_text_like(text):
                extracted_text.append(text)

    return {"extracted_text": extracted_text}

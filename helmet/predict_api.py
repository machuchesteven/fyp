from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
import os
from predict import predict_helmet
from ultralytics import YOLO
import requests

app = Flask(__name__)


model = YOLO(
    model="/home/machu/Desktop/intelligent/fyp/helmet/runs/detect/train2/weights/best.pt"
)
from datetime import datetime

django_api_url = "http://127.0.0.1:8000/api/reporting/detected/"

DETECTION_FOLDER = "predict_results"
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["DETECTION_FOLDER"] = DETECTION_FOLDER


def predict_helmet(model, filename, target_name):
    results = model.predict(
        source=filename,
        project="predict_results",
        name=target_name,
        save=True,
        imgsz=320,
        conf=0.8,
    )
    return results


def stringify_current_time():
    now = datetime.now()
    formatted_time = now.strftime("%b_%d_%Y_%H_%M_%S")
    return formatted_time


@app.route("/process_image", methods=["POST"])
def process_image():
    time = stringify_current_time()
    # getting files and description
    if "file" not in request.files:
        return ({"error": "File To Be Inspected Not Provided."}), 400

    file = request.files["file"]
    description = request.form["description"]

    # Save the uploaded file with a path to make it unique
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    print(filepath)
    inspected_url = os.path.join("predict_results", time)
    # os.makedirs(inspected_url)
    new_path = os.path.join(time, filename)
    results = predict_helmet(model=model, filename=filename, target_name=time)
    if results is not None:
        print(new_path)
        print(filename)
        # jsonify response
        print("Saving successful")
        data = {
            "description": description,
            "image_url": request.host_url + filepath,
            "inspected_url": request.host_url + inspected_url + filename,
        }
        return data, 200
        try:
            response = requests.post(django_api_url, json=data)

            if response.status_code == 200:
                return response

        except requests.exceptions.RequestException as e:
            # Handle any exceptions that occurred during the API call
            print(f"An error occurred: {e}")
            return jsonify({"error": e}), e.status_code

        return (
            ({"error": "There was an error during inspection"}),
            400,
        )
    return {'message': "an error occurred"}


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/predict_results/<date_submitted>/<filename>")
def predict_results(date_submitted, filename):
    return send_from_directory(
        app.config["DETECTION_FOLDER)"], date_submitted, filename
    )


if __name__ == "__main__":
    app.run()

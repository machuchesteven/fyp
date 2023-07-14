from ultralytics import YOLO
import os
import numpy as np

model = YOLO(
    model="/home/machu/Desktop/intelligent/fyp/helmet/runs/detect/train2/weights/best.pt"
)


def predict_helmet():
    results = model.predict(
        source="2.jpg",
        save=True,
        imgsz=320,
        conf=0.8,
    )
    return results
    # print(results)
    # print(results.save_dir())
    # class_labels = results.xyxy[0][:, -1].tolist()
    # unified = np.squeeze(results).T
    # print(unified)
    # predictions = results.pred[0]
    # labels = predictions[:, -1].tolist()
    # confidence_values = predictions[:, 4].tolist()

    # # Print the labels and confidence values
    # for label, confidence in zip(labels, confidence_values):
    #     print(f"Label: {label}, Confidence: {confidence}")


# for *xyxy, conf, cls in det:  # loop through results and extract contents
#     print(*xyxy)
#     print(conf)   # what you are looking for
#     print(cls)

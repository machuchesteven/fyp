from ultralytics import YOLO

model = YOLO('https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8s.pt')

model.train(data='/home/machu/Desktop/intelligent/fyp/num_plate/data_ocr.yaml', epochs=100, imgsz=640, patience=50, show=True, conf=0.7)

model.val()

model.export(format='onnx', dynamic=False)
print('Trained Successfully! and exported')
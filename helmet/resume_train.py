from ultralytics import YOLO

model = YOLO('YOLOv8n.pt')

model.train(mode=resume, data='/home/machu/Desktop/intelligent/fyp/helmet/data_custom.yaml', epochs=5)

# evaluation of the model
model.val()

# /exporting the trained model for onnx so at to be deployed in any environment
model.export(format='onnx', dynamic=False)
print('Trained Successfully! and exported')



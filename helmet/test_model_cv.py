import cv2


net = cv2.dnn.readNetFromDarknet("path/to/your/best.pt")

# Specify the classes you want to detect
classes = ["helmet", "motorcycle"]

# Load the image
image = cv2.imread("path/to/your/image.jpg")

# Preprocess the image
blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)

# Set the input to the network
net.setInput(blob)

# Forward pass through the network
outputs = net.forward(net.getUnconnectedOutLayersNames())

# Iterate over the outputs
for output in outputs:
    # Iterate over each detection
    for detection in output:
        # Extract the class ID and confidence of the detection
        scores = detection[5:]
        class_id = scores.argmax()
        confidence = scores[class_id]

        # Check if the detected class is one of the classes of interest
        if class_id < len(classes) and confidence > 0.5:
            # Get the bounding box coordinates
            box = detection[0:4] * np.array([image.shape[1], image.shape[0], image.shape[1], image.shape[0]])

            # Draw the bounding box and label on the image
            x, y, w, h = box.astype(int)
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            label = f"{classes[class_id]}: {confidence:.2f}"
            cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Display the output image
cv2.imshow("Output", image)
cv2.waitKey(0)
cv2.destroyAllWindows()

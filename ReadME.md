# Helmet Inspection System

This repository contains the source code for a Helmet Inspection System, which includes components such as a Django backend, a React frontend, a Flask API for helmet prediction, a React Native mobile app, and a number plate inspection module.

## Project Structure

The project structure is organized as follows:

- `/backend/`: This directory contains the Django backend code. It handles the server-side logic, database interactions, and API endpoints for the application.

- `/ui/`: The React frontend code resides in this directory. It provides the user interface for interacting with the Helmet Inspection System, displaying information, and handling user actions.

- `/helmet/`: Here you can find the Flask API for helmet prediction. The `predict_api.py` file is used to start the Flask server, which accepts requests for helmet prediction and provides the corresponding responses.

- `/MobileApp/`: This directory contains the React Native mobile app code. It is responsible for creating a mobile interface to access and utilize the features of the Helmet Inspection System.

- `/number_plate/`: The number plate inspection module is located in this directory. It includes code for processing images of number plates and extracting relevant information for vehicle identification.

- `README.md`: The top-level README file you are currently reading, providing an overview of the project structure and its components.
<!-- 
## Getting Started

To set up and run the Helmet Inspection System, follow the instructions in the individual directories for each component. Detailed guides and installation steps can be found in the respective README files within each component's directory. -->

## Getting Started

To set up and run the Helmet Inspection System, follow the instructions below for each component:

### Backend

1. Navigate to the `/backend/` directory.
2. Create a virtual environment (optional but recommended).
3. Install the required dependencies by running the following command: `pip install -r requirements.txt`
4. Start the Django development server: `python manage.py runserver 0.0.0.0:8000`

### UI

1. Navigate to the `/ui/` directory.
2. Install Node.js and npm (if not already installed).
3. Install the necessary dependencies by running the following command: `npm install`
4. Start the React development server: `npm start`
5. To build for deployment run `npm run build`
6. Copy the `/build/` directory to you deployment server folder and serve the server

### Helmet Inspection API

1. Navigate to the `/helmet/` directory.
2. Create a virtual environment (optional but recommended due to conflicting resources challenge).
3. Install the required dependencies by running the following command: `pip install -r requirements.txt`
4. Start the Flask server for the helmet prediction API: `cd helmet && python predict_api.py`

### Mobile App

1. Navigate to the `/MobileApp/` directory.
2. Install Node.js and npm (if not already installed).
3. Install the necessary dependencies by running the following command: `npm install`
4. Build the Mobile App: `npx react-native run-android`.'
5. Start the React Native development server: `npm start`
6. For iOS follow the development guide using XCode

### Number Plate Inspection Project
1. Navigate to the `/number_plate/` directory.
2. Create a virtual environment (optional but recommended).
3. Install the required dependencies by running the following command: `pip install -r requirements.txt`
4. Start the number plate inspection module: `python main.py`


## Usage Manual
usage instructions for normal users and admins are as follows

## For Normal Users
### Installation

1. Go to the [The Website](127.0.0.1/3000) and click Download App button in the hero section 
2. Download and install the app on your mobile device.
3. Launch the app to begin using it.

### Reporting a Violation

1. Open the Helmet Inspection System app on your mobile device 
2. Tap on the "capture a picture" tab in the home screen.
3. Allow the app to access your device's camera and microphone when prompted.
4. Position your device to capture a clear picture of the motorcycle violating helmet with number plate.
5. Tap the camera button to take a picture. You can retake the picture you wish by clicking the "Retry" Button
6. Add a description or any relevant details regarding the violation in the provided text field.
7. Tap the "Submit" button to submit the report.

### Inspecting Submitted Motorcycles

1. Open your preferred web browser and go to [Helmet Inspection System website]()
2. Navigate to the "Inspect" tab on the website.
3. Enter the license plate number of the motorcycle you want to inspect
4. Click on the "Inspect" button to initiate the inspection process.
5. The system will provide information about the submitted violation, including images and additional details if available.


## Helmet Inspection System - Admin Guide

Welcome, administrator! This guide provides instructions on how to access and utilize the administrative features of the Helmet Inspection System.

## Admin Login

1. Open your preferred web browser and go to the [Helmet Inspection System website](website-url).
2. Navigate to the "Admin Login" page.
3. Enter your administrator credentials (username and password) in the provided fields.
4. Click on the "Login" button to authenticate and access the admin dashboard.

## Admin Dashboard

Once you have successfully logged in as an administrator, you will have access to the admin dashboard.

### Reports Tab

1. Click on the "Reports" tab in the admin dashboard.
2. You will see a list of reported violations.
3. You can view the details of each report, including the images and descriptions submitted by users.

### Tickets Tab

1. Navigate to the "Tickets" tab in the admin dashboard.
2. Here, you can manage and track the tickets assigned to your team.
3. View and update ticket statuses, add comments, and assign tickets to specific team members.

### Generating PDF Reports

1. From the main dashboard page, click on the "Generate PDF Report" button.
2. Select the desired parameters, such as the date range or specific incident types.
3. Click on the "Generate Report" button to create a PDF report summarizing the selected incidents.
4. The PDF report will be generated and made available for download or printing.

Please note that the available features and options may vary depending on the configuration and permissions set for the administrator account.




## References

- [React Native](https://reactnative.dev/): Official website for React Native framework.
  - [React Native Documentation](https://reactnative.dev/docs): Comprehensive documentation for React Native, including guides, API references, and more.
  - [React Native GitHub Repository](https://github.com/facebook/react-native): GitHub repository for React Native, where you can find the latest releases, issue tracking, and community contributions.

- [Django](https://www.djangoproject.com/): Official website for Django framework.
  - [Django Documentation](https://docs.djangoproject.com/): Extensive documentation for Django, covering topics like installation, configuration, models, views, and more.
  - [Django GitHub Repository](https://github.com/django/django): GitHub repository for Django, containing the source code, bug reports, and feature requests.

Please refer to the official documentation and repositories for React Native and Django for detailed information, tutorials, and support regarding these frameworks.
## Contributing

If you'd like to contribute to the project, please read the CONTRIBUTING.md file (if present) to understand the guidelines for contributing. We welcome contributions, bug reports, and feature requests.

## License

This project is licensed under the FYP Policy of the University of Dar es Salaam




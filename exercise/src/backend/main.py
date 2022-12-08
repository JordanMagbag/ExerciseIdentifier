from flask import Flask, flash, request, redirect, url_for, session, json
from werkzeug.utils import secure_filename
from mediapipe.python.solutions import pose as mp_pose
from embedder import FullBodyPoseEmbedder
from classifier import PoseClassifier
import cv2
import numpy as np
import sys
import os

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__, static_folder='../../build/', static_url_path='/')

@app.route('/')
def root():
    return app.send_static_file('index.html')

# Upload and call the classifier on an image. 
# Returns an error string if the image is not a valid format
@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file']
    response = ""
    if file and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
        filename = secure_filename(file.filename)
        file.save(filename)
        response = classifyImage(filename)
    else:
        response=[]
    return response

# Classifies an uploaded image
# Inputs:
#   filename: the name of the uploaded image
def classifyImage(filename):
    # Initialize pose tracker, embedder, and classifier
    pose_tracker = mp_pose.Pose()
    pose_embedder = FullBodyPoseEmbedder()
    pose_classifier = PoseClassifier(
        pose_samples_folder='train_set',
        pose_embedder=pose_embedder,
        top_n_by_max_distance=30,
        top_n_by_mean_distance=10
    )

    # Run pose tracker
    image = cv2.cvtColor(cv2.imread(filename), cv2.COLOR_BGR2RGB)
    result = pose_tracker.process(image=image)
    pose_landmarks = result.pose_landmarks

    # Draw pose prediction
    output = image.copy()
    
    if pose_landmarks is not None:
        # Get landmarks
        height, width = output.shape[0], output.shape[1]
        pose_landmarks = np.array([[lmk.x * width, lmk.y * height, lmk.z * width]
                                 for lmk in pose_landmarks.landmark], dtype=np.float32)

        # Classify the pose, and sort labels from best to worst match
        pose_classification = pose_classifier(pose_landmarks)
        classifications_sorted = sorted(pose_classification.items(), key=lambda x:x[1], reverse=True)
        best_to_worst = []
        for classification in classifications_sorted:
            best_to_worst.append(classification[0])

        # Close the pose tracker
        pose_tracker.close()

        # Delete the uploaded file
        os.remove(filename)

        return best_to_worst
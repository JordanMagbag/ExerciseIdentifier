from mediapipe.python.solutions import pose as mp_pose
from exercise.src.backend.embedder import FullBodyPoseEmbedder
from exercise.src.backend.classifier import PoseClassifier
import cv2
import numpy as np
import os
import csv
from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# This function creates a classifier from the training data in 'train_set', runs the classifier on each of the pose estimations
# in the 'test_set' folder, and creates a confusion matrix of the results
def main():
    # Initialize pose tracker, embedder, and classifier
    print("Initializing...")
    pose_tracker = mp_pose.Pose()
    pose_embedder = FullBodyPoseEmbedder()
    pose_classifier = PoseClassifier(
        pose_samples_folder='./exercise/train_set',
        pose_embedder=pose_embedder,
        top_n_by_max_distance=30,
        top_n_by_mean_distance=10
    )

    # Classify each pose estimation in the test_set folder
    print("Running classifier on test set...")
    file_names = [name for name in os.listdir('./exercise/test_set')]

    labels = []
    predicted = []
    for file_name in file_names:
        # The class name is contained in the file name
        class_name = file_name[:-(len('csv') + 1)]
        
        # Read csv file
        with open(os.path.join('./exercise/test_set', file_name)) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                labels.append(class_name)
                landmarks = np.array(row[1:], np.float32).reshape([33, 3])

                # A pose was detected
                if landmarks is not None:
                    pose_classification = pose_classifier(landmarks)
                    classifications_sorted = sorted(pose_classification.items(), key=lambda x:x[1], reverse=True)
                    best_to_worst = []
                    for classification in classifications_sorted:
                        best_to_worst.append(classification[0])
                    predicted.append(best_to_worst[0])

    # Create the confusion matrix and save it to a file
    print("Creating confusion matrix...")

    np.set_printoptions(precision=2)

    disp = ConfusionMatrixDisplay.from_predictions(
        labels,
        predicted,
        cmap=plt.cm.Blues,
        normalize='true',
    )
    disp.ax_.set_title('Confusion Matrix')

    plt.show()
    plt.savefig('confusion_matrix.png')

    print("Confusion matrix saved to confusion_matrix.png")


main()
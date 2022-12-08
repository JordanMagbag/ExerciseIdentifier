import cv2
import os
import numpy as np
import csv
import random
from mediapipe.python.solutions import pose as mp_pose
from mediapipe.python.solutions import drawing_utils as mp_drawing

# This function was used to scrape frames from video files and save them to a folder
# Inputs:
#   class_name: a string representing the class the video belongs to, e.g., pushups, squats. The images will be saved in a folder with this name
#   video_file: the name of the video file
# Assumes video file is stored in a folder named '<class_name>_data'
def scrapeVideo(class_name, video_file):
    # Make a folder with the class name if it does not already exist
    if not os.path.isdir(class_name):
        os.mkdir(class_name)
        
    # Read the video file  
    cap = cv2.VideoCapture("./" + class_name + "_data/" + video_file + ".mp4")

    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            # No more frames left to read
            break
        name = "./" + class_name + "/vid" + video_file + "_frame" + str(count) + ".jpg"
        cv2.imwrite(name, frame)
        count += 1
    cap.release()
    cv2.destroyAllWindows()

# This function was used to compute pose estimates on a sample of images and save keypoints to .csv files
# Inputs:
#   number_of_samples: the number of images to be sampled from each class
# Assumes image folders are stored in a folder named 'images'
def getPoseEstimates(number_of_samples):
    # Make a folder to store csv files if it doesn't already exist
    if not os.path.isdir('csv_files'):
        os.makedir('csv_files')

    # Each folder in the 'images' folder, i.e., each class
    for class_name in [n for n in os.listdir('images')]:

        # Create csv file with the same name as the class name
        csv_file = os.path.join('csv_files', class_name + '.csv')

        with open(csv_file, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file, delimiter=',')
            
            # Sample a number of random images from each class, depending on the value given in number_of_samples
            images = os.path.join('images', class_name)
            image_names = random.choices([n for n in os.listdir(images)], k=number_of_samples)

            
            for image_name in image_names:
                # Read the image
                image = cv2.imread(os.path.join(images, image_name))
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                # Run the pose estimator and get landmarks
                with mp_pose.Pose() as pose:
                    result = pose.process(image=image)
                    pose_landmarks = result.pose_landmarks

                # Save landmarks to csv file if a pose was detected
                if pose_landmarks is not None:
                    height, width = image.shape[0], image.shape[1]
                    pose_landmarks = np.array(
                        [[lmk.x * width, lmk.y * height, lmk.z * width]
                         for lmk in pose_landmarks.landmark],
                        dtype=np.float32)
                    csv_writer.writerow([image_name] + pose_landmarks.flatten().astype(str).tolist())

# This function is used to output an image with joints/connections from pose estimation
# Input:
#   image_file: the name of the image file
# Output:
#   new image will be saved as 'image_out.jpg'
def poseEstimateImage(image_file):
    # Read the image and perform pose estimation
    with mp_pose.Pose() as pose:
        image = cv2.imread(image_file)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        result = pose.process(image=image)
        pose_landmarks = result.pose_landmarks

        # If a pose has been detected, draw the pose estimation over the image
        if pose_landmarks is not None:
            image_out = image.copy()
            mp_drawing.draw_landmarks(
                image=image_out,
                landmark_list=pose_landmarks,
                connections=mp_pose.POSE_CONNECTIONS)
            image_out = cv2.cvtColor(image_out, cv2.COLOR_RGB2BGR)
            cv2.imwrite('image_out.jpg', image_out)
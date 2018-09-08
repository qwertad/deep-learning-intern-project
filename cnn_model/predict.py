from keras.models import load_model
import cv2
import numpy as np
import argparse
import os
import collections

parser = argparse.ArgumentParser("Testing from the hell")
parser.add_argument(
        "-t",
        "--path",
        help = "path to testing image/")
args = parser.parse_args()


model = load_model("cnn_11_class.h5")

test_path = os.path.expanduser(args.path)

print(test_path)

for image_file in os.listdir(test_path):
    print(image_file)
    img = cv2.imread(os.path.join(test_path, image_file))
    img = cv2.resize(img,(256,256))
    img = img/255
    img = np.reshape(img,(-1,256,256,3))
    result = model.predict(img)

    print(np.argmax(result))
    print("---------------------------------------------------------------------------")

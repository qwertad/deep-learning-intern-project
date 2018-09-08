from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
import numpy as np

# Keras
from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image
import tensorflow as tf
# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from flask_uploads import UploadSet, IMAGES
from gevent.pywsgi import WSGIServer
import cv2
import json
from tqdm import tqdm
from utils.utils import get_yolo_boxes
from utils.bbox import draw_boxes
from PIL import Image
import collections

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
yolo_model_path = "models/yolo3multigpu5class.h5"
cnn_flat_model_path  = "models/cnn_flat_1.h5"
cnn_fly_model_path = "models/cnn_fly_1.h5"

#Load yolo model
print('Loading Yolo Model. Start serving...')
model = load_model(yolo_model_path)
model._make_predict_function()    
print('Yolo Model loaded.')

#load cnn_flat model
print('Loading CNN Flat Model. Start serving...')
model_cnn_flat = load_model(cnn_flat_model_path)
model_cnn_flat._make_predict_function()
print('CNN Flat Model loaded.')

#load cnn_fly model
print('Loading CNN Fly Model. Start serving...')
model_cnn_fly = load_model(cnn_fly_model_path)
model_cnn_fly._make_predict_function()
print('CNN Fly Model loaded.')
print('All Model loaded')

#model使用的參數
net_h , net_w = 416,416
obj_thresh, nms_thresh = 0.5,0.45
labels = ["box","car","empty","full","label"]
anchors = [55,69, 75,234, 133,240, 136,129, 142,363, 203,290, 228,184, 285,359, 341,260]
img_w , img_h = 400 , 400

#yolo model predict函數
def yolo_model_predict(img_path, model):
    img = image.load_img(img_path)
    img = np.array(img)
    print(img.shape)
    boxes = get_yolo_boxes(model,[img],net_h,net_w,anchors,obj_thresh,nms_thresh)[0]
    output = draw_boxes(image,boxes,labels,obj_thresh)
    print(output)
    return output

#cnn flat model predict函數
def cnn_flat_predict(img_path, model):
    result = []
    img = cv2.imread(img_path)
    img = cv2.resize(img,(img_w,img_h))
    img = np.array(img)
    img = img/255
    img = np.reshape(img,(-1,img_w,img_h,3))
    output = model_cnn_flat.predict(img)
    output_class = np.argmax(output)
    output_class = int(output_class)
    result.append(output_class)
    return result

#cnn fly model predict函數
def cnn_fly_predict(img_path, model):
    result = []
    img = cv2.imread(img_path)
    img = cv2.resize(img,(img_w,img_h))
    img = np.array(img)
    img = img/255
    img = np.reshape(img,(-1,img_w,img_h,3))
    output = model_cnn_fly.predict(img)
    output_class = np.argmax(output)
    output_class = int(output_class)
    result.append(output_class)
    return result

#路由器
@app.route('/', methods=['GET'])
def index():
    return render_template('DemoUI_Test.html')

#yolo api
@app.route('/predict', methods=['GET', 'POST'])
def upload():
    result_list = []
    print("connecting to yolo model")
    invoice1 = request.form['invoice1']
    creat_folder = "saved_images/"+invoice1
    if not os.path.isdir(creat_folder):
        os.makedirs(creat_folder)
    print("單號 : "+invoice1)
    if request.method == 'POST':
        for f in request.files.getlist("photo1"):
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
            basepath, 'saved_images',invoice1, secure_filename(f.filename))
            f.save(file_path)
            print(file_path)
            preds = yolo_model_predict(file_path,model)
            result_list = result_list + preds
            print(result_list)
        return json.dumps(result_list)
    return Nones

#cnn flat api
@app.route("/cnn_flat" , methods=["GET","POST"])
def cnn_flat_classify():
    result_list = []
    print("connecting to cnn flat model")
    invoice1 = request.form['invoice1']
    creat_folder = "saved_images/"+invoice1
    if not os.path.isdir(creat_folder):
        os.makedirs(creat_folder)
    print("單號 : "+invoice1)
    if request.method == 'POST':
        for f in request.files.getlist("photo1"):
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
            basepath,"saved_images",invoice1 , secure_filename(f.filename))
            f.save(file_path)
            print(file_path)
            preds = cnn_flat_predict(file_path,model_cnn_flat)
            print(preds)
            result_list = result_list + preds
            print(result_list)
        return json.dumps(result_list)
    return Nones

#cnn fly api
@app.route("/cnn_fly" , methods=["GET","POST"])
def cnn_fly_classify():
    result_list = []
    print("connecting to cnn fly model")
    invoice1 = request.form['invoice1']
    creat_folder = "saved_images/"+invoice1
    if not os.path.isdir(creat_folder):
        os.makedirs(creat_folder)
    print("單號 : "+invoice1)
    if request.method == 'POST':
        for f in request.files.getlist("photo1"):
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
            basepath,"saved_images",invoice1 , secure_filename(f.filename))
            f.save(file_path)
            print(file_path)
            preds = cnn_fly_predict(file_path,model_cnn_fly)
            print(preds)
            result_list = result_list + preds
            print(result_list)
        return json.dumps(result_list)
    return Nones

#image over/under exposure api
@app.route("/img_quality" , methods=["GET","POST"])
def img_quality_classify():
    result_list = []
    invoice1 = request.form['invoice1']
    print("connecting to img_quality model")
    if request.method == 'POST':
        for f in request.files.getlist("photo1"):
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
            basepath,"saved_images",invoice1 , secure_filename(f.filename))
            img = cv2.imread(file_path)
            img = np.array(img)
            print(img.shape)
            img_x , img_y = img.shape[0] , img.shape[1]
            total_pixel = img_x*img_y
            img = img.reshape(total_pixel,3)
            dictionary0 = dict(collections.Counter(img[:,0]))
            dictionary1 = dict(collections.Counter(img[:,1]))
            dictionary2 = dict(collections.Counter(img[:,2]))

            b1 = g1 = r1 = 0
            b = g = r = 0
            for i in range(0,56):
                try:
                    b1 = b1 + dictionary0[i]
                    g1 = g1 + dictionary1[i]
                    r1 = r1 + dictionary2[i]
                except:
                    pass
            for i in range(200,256):
                try:
                    b = b + dictionary0[i]
                    g = g + dictionary1[i]
                    r = r + dictionary2[i]    
                except:
                    pass
            if (b1 > total_pixel*.6) and (r1 > total_pixel*.6) and (g1 > total_pixel*.6):
                result_list.append(f.filename+" : photos may be too dark , please retake")
                print(f.filename+" : photos may be too dark , please retake")
            elif (b >total_pixel*.6) and (r > total_pixel*.6) and (g > total_pixel*.6):
                result_list.append(f.filename+" : photos may be overexposed , please retake")
                print(f.filename+" :  photos may be overexposed , please retake")
            else:
                print("pass")
        print(result_list)
        return json.dumps(result_list)
    return Nones


if __name__ == '__main__':
    app.run(port=5165, debug=True)

    # Serve the app with gevent
    #http_server = WSGIServer((''1 5000), app)
    #http_server.serve_forever()
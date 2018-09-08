from keras.models import load_model
import argparse
import numpy as np
import cv2
import os
from keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import confusion_matrix

img_w, img_h = 400, 400 
def evaluate(args):
    model_path = args.model
    testing_class = args.input
    testing_type = args.type
    fp_classes   = args.classes
    test_dir = args.path
    model = load_model(model_path)
    total_class_list = os.listdir(test_dir)
    total_class_list.sort()
    #抓出各類別編號
    d = {}
    for p,c in enumerate(total_class_list):
        d[p]=c
    
    if testing_type == "all":
        label = []
        result = []
        for position , item in enumerate(total_class_list):
            times = len(os.listdir(test_dir+"/"+item))
            l = [position]*times
            label = label+l
        label = np.array(label)
        print("label共 : "+str(len(label)))

        for folder in total_class_list:
            for image_file1 in os.listdir(test_dir+"/"+folder):
                image_path1 = test_dir+"/"+folder+"/"+image_file1
                image1 = cv2.imread(image_path1)
                image1 = cv2.resize(image1,(img_w,img_h))
                image1 = image1/255
                image1 = np.reshape(image1,(-1,img_w,img_h,3))
                prediction = np.argmax(model.predict(image1))
                print(prediction)
                result.append(prediction)
        result = np.array(result)
        
        print("------------各類別編號--------------")
        print(d)
        print("------------Confusion Matrix------------")
        print("label共 : "+str(len(label)))
        print("共預測出 : "+str(len(result)))
        matrix = confusion_matrix(y_true=label,y_pred=result)
        print(matrix)

    elif testing_type == "one":
        i = [i for i , x in enumerate(total_class_list) if x == testing_class][0]
        print("測試單類別recall : "+testing_class+"  此類別label為 : "+str(i))
        print("-------開始測試-------")
        result = []
        wrong_path = []
        for image_file in os.listdir(test_dir+"/"+testing_class):
            image_path = test_dir+"/"+testing_class + "/" + image_file
            image = cv2.imread(image_path)
            image = cv2.resize(image,(img_w,img_h))
            image = image/255
            image = np.reshape(image,(-1,img_w,img_h,3))
            prediction = np.argmax(model.predict(image))
            if prediction != i:
                wrong_path.append(image_path+" 錯分為 : "+str(prediction))
            print(prediction)
            result.append(prediction)
            score = result.count(i)/len(result)
        print("-------測試完畢--------")
        print("此類別圖片共 : "+str(len(result))+"張測試圖片")
        print("此類別recall : "+str(score))
        print("-------各類別編號--------")
        print(d)
        print("-------預測錯誤之圖片--------")
        for element in wrong_path:
            print(element)
    
    elif testing_type == "ft":
        target_classes = []
        testing_classes = []
        wrong_number = 0
        wrong_path1 = []
        result = []
        fp_classes = fp_classes.strip("[")
        fp_classes = fp_classes.strip("]")
        fp_classes = fp_classes.replace("'","")
        fp_classes = fp_classes.replace(" ","")
        fp_classes = fp_classes.split(",")
        #確定目標類別的label
        for i ,x in enumerate(total_class_list):
            if x in fp_classes:
                target_classes.append(i)
        print("目標label : "+str(fp_classes))
        #確定測試類別的label
       
        for h in set(total_class_list).difference(set(fp_classes)):
            testing_classes.append(h)
        print("測試label : "+str(testing_classes))
        print("--------開始測試---------")

        #讀進測試資料以及預測
        for folder in testing_classes:
            for image_file1 in os.listdir(test_dir+"/"+folder):
                image_path1 = test_dir+"/"+folder+"/"+image_file1
                image1 = cv2.imread(image_path1)
                image1 = cv2.resize(image1,(img_w,img_h))
                image1 = image1/255
                image1 = np.reshape(image1,(-1,img_w,img_h,3))
                prediction = np.argmax(model.predict(image1))
                if prediction in target_classes:
                    wrong_path1.append(image_path1+" 錯分為 : "+str(prediction))
                print(prediction)
                result.append(prediction)

        #計算誤判的比例
        for j in target_classes:
            wrong_number = wrong_number + result.count(j)
        score = wrong_number/len(result)
        print("----------測試完畢----------")
        print("Fail True : "+str(score))
        print("----------各類別編號----------")
        print(d)
        print("----------預測錯誤之圖片-----------")
        for element in wrong_path1:
            print(element)



    else:
        print("you enter a wrong arg")




if __name__  ==  "__main__" :
    parser = argparse.ArgumentParser(description = "Testing the fucking cnn model")
    parser.add_argument("-m" , "--model" , help = "path to loading model")
    parser.add_argument("-i" , "--input" , help = "single testing class")
    parser.add_argument("-t" , "--type" , help = "輸入 one : 單一類別recall   輸入 all : 整準確度   輸入 ft  : 錯誤類被誤判為正確的機率")
    parser.add_argument("-c" , "--classes" , help = "輸入欲估計是否被誤判的類別list")
    parser.add_argument("-p " ,"--path" , help = "path to testing set")

    args = parser.parse_args()
    evaluate(args)

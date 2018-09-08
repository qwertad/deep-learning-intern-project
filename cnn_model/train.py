from keras import applications
from keras.preprocessing.image import ImageDataGenerator
from keras import optimizers
from keras.models import Sequential, Model 
from keras.layers import Dropout, Flatten, Dense, GlobalAveragePooling2D, BatchNormalization
from keras import backend as k 
from keras.callbacks import ModelCheckpoint, LearningRateScheduler, TensorBoard, EarlyStopping
import os
img_width, img_height = 400,400
train_data_dir = "blur_data"
validation_data_dir = "blur_data"
batch_size = 64
epochs = 2

total_class_list = os.listdir(train_data_dir)
total_class_list.sort()
class_number = len(total_class_list)

total_train_number = 0
for cla in total_class_list :
	cla_number = len(os.listdir(train_data_dir+"/"+cla))
	total_train_number = total_train_number + cla_number
	print(cla +" : "+ str(cla_number)+"張")
	print("-----------------------------------------------")

total_test_number = 0 
for cla1 in total_class_list :
    cla1_number = len(os.listdir(validation_data_dir+"/"+cla1))
    total_test_number = total_test_number + cla1_number

print("共 "+str(len(total_class_list))+"類 ,"+str(total_train_number)+"張圖片")


model = applications.VGG19(weights = "imagenet", include_top=False, input_shape = (img_width, img_height, 3))

for layer in model.layers[:20]:
   layer.trainable = False

x = model.output
x = BatchNormalization()(x)
x = Flatten()(x)
x = Dense(32, activation="relu")(x)
x = Dropout(0.3)(x)
x = BatchNormalization()(x)
x = Dense(32, activation="relu")(x)
predictions = Dense(class_number, activation="softmax")(x)

# creating the final model 
model_final = Model(input = model.input, output = predictions)

# compile the model 
model_final.compile(loss = "categorical_crossentropy", optimizer = optimizers.Adam(lr=0.001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0, amsgrad=False), metrics=["accuracy"])

model_final.summary()

train_batches = ImageDataGenerator(rescale=1./255).flow_from_directory(train_data_dir,class_mode = "categorical",target_size=(img_width,img_height),batch_size=batch_size)

validation_batches = ImageDataGenerator(rescale=1./255).flow_from_directory(validation_data_dir,class_mode = "categorical",target_size=(img_width,img_height),batch_size = 1)

model_final.fit_generator(
        train_batches,
        steps_per_epoch=total_train_number/batch_size,
        epochs=epochs,
        validation_data=validation_batches,
        validation_steps=total_test_number,
        callbacks = [TensorBoard(log_dir="tensorboard_log")],
        verbose = 1 )

model_final.save('blur1.h5')


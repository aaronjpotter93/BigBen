import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np

# Read csv file into pandas dataframe
transactions = pd.read_csv('FoodUtilities.csv')

X = transactions.drop('Categories', axis=1)
y = transactions['Categories']

X_train, X_test, y_train, y_test = train_test_split(X, y)

scaler = StandardScaler()
# Fit only to the training data
scaler.fit(X_train)
StandardScaler(copy=True, with_mean=True, with_std=True)
# Now apply the transformations to the data:
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

mlp = MLPClassifier(hidden_layer_sizes=(5,5,5),max_iter=500)
mlp.fit(X_train, y_train)

predictions = mlp.predict(X_test)
print(confusion_matrix(y_test, predictions))
print(classification_report(y_test,predictions))
import pandas as pd
import json

def parseDate(date):
    if date[8] == '0':
        day = date[9]
    else:     
        day = date[8:10]
    if date[5] == '0':
        month = date[6]
    else:
        month = date[5:7]
    year = date[:4]

    return day, month, year

def buildDataFrame():
    with open("../transactions.json") as f:
        data = json.load(f)

    columns = {}
    labels = {"Uber": 1, "Touchstone": 2, "United Airlines": 3, "McDonald's": 4, "Starbucks": 5, "Sparkfun": 6, "Tectra Inc": 7, "Madison Bicycle Shop": 8, "KFC": 4}
    categories = []
    df = pd.DataFrame(columns=["Day", "Month", "Year", "Amount", "Merchant Name"])
    count = 0
    for i in range(0, len(data)):
        currentItem = data[i]
    
        if not currentItem['merchant_name'].__eq__('None'):
            day, month, year = parseDate(currentItem['date'])
            amount = currentItem['amount']
            df.loc[i] = [day, month, year, amount, currentItem["merchant_name"]]
            if currentItem['merchant_name'] not in columns:
                columns[currentItem['merchant_name']]=[1]
            
                for i in range(count):
                    columns[currentItem['merchant_name']].insert(0,0)
                count += 1
                
                for key, value in columns.items():
                    if not key.__eq__(currentItem['merchant_name']):
                        value.append(0)
            else:
                columns[currentItem['merchant_name']].append(1)
                count += 1
                for key, value in columns.items():
                    if not key.__eq__(currentItem['merchant_name']):
                        value.append(0)
            # categories.append(labels[currentItem['merchant_name']])

    for column in columns:
        df[column] = columns[column]
    # df['Categories'] = categories

    return df

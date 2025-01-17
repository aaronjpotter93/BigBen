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

# Opens transactions pulled from Plaid
def buildDataFrame():
    with open("../transactions.json") as f:
        data = json.load(f)

    # Filters out only transactions that have a merchant_name 
    filtered_list = []
    for i in range(len(data)):
        if data[i]['merchant_name'] != None:
            print(data[i]['date'], data[i]['amount'], data[i]['name'])
            filtered_list.append(data[i])

    # Saves filtered list to a file to be used by front-end
    with open('../FilteredTransactions.json', 'w') as jsonfile:
        json.dump(filtered_list, jsonfile)

    columns = {}
    # Labels dictionary for real data set
    subcategories = {'Mortgage': 1, 'Utilities': 2, 'Internet': 3, 'Home Repairs': 4, 'Gas': 5, 'Car Repairs': 6, 'Auto Insurance': 7, 'Groceries': 8, 'Fast Food': 9, 'Restaurants': 10, 'Beverages': 11, 'Pet Food & Supplies': 12, 'Veterinary': 13, 'Cell Phones': 14, 'Clothes': 15, 'Subscriptions': 16, 'Entertainment': 17, 'Life Insurance': 18, 'Pet Insurance': 19, 'Student Loans': 20, 'Home Equity Loan': 21, 'Home Depot Project Loan': 22, 'Cassie Capital One': 23, 'Braden Capital One': 24, 'Deseret First Credit': 25, 'Khols Credit': 26, 'MISC': 27, 'Pharmacy': 28, 'Dental & Vision Insurance': 29, 'Eyecare': 30}
    # Labels dictionary for sandbox data
    labels = {"Uber": 1, "Touchstone": 2, "United Airlines": 3, "McDonald's": 4, "Starbucks": 5, "Sparkfun": 6, "Tectra Inc": 7, "Madison Bicycle Shop": 8, "KFC": 4}
    
    categories = []
    df = pd.DataFrame(columns=["Day", "Month", "Year", "Amount", "Merchant Name"])
    count = 0
    for i in range(0, len(filtered_list)):
        currentItem = filtered_list[i]
    
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

    # Read labels from excel file, convert to numbers
    # Using dictionary and add as column to dataframe
    myDataSet = pd.read_excel('categoryNames.xlsx')
    for category in myDataSet['Categories']:
        categories.append(subcategories[category])

    for column in columns:
        df[column] = columns[column]
    df['Categories'] = categories

    return df

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
def buildDataFrame(dataframe):
    with open("../newTransactions.json") as f:
        data = json.load(f)

    # Filters out only transactions that have a merchant_name 
    filtered_list = []
    for i in range(len(data)):
        if data[i]['merchant_name'] != None:
            print(data[i]['date'], data[i]['amount'], data[i]['name'])
            filtered_list.append(data[i])

    # Saves filtered list to a file to be used by front-end
    with open('../newFilteredTransactions.json', 'w') as jsonfile:
        json.dump(filtered_list, jsonfile)

    columns = {}
    # Labels dictionary for real data set
    subcategories = {'Mortgage': 1, 'Utilities': 2, 'Internet': 3, 'Home Repairs': 4, 'Gas': 5, 'Car Repairs': 6, 'Auto Insurance': 7, 'Groceries': 8, 'Fast Food': 9, 'Restaurants': 10, 'Beverages': 11, 'Pet Food & Supplies': 12, 'Veterinary': 13, 'Cell Phones': 14, 'Clothes': 15, 'Subscriptions': 16, 'Entertainment': 17, 'Life Insurance': 18, 'Pet Insurance': 19, 'Student Loans': 20, 'Home Equity Loan': 21, 'Home Depot Project Loan': 22, 'Cassie Capital One': 23, 'Braden Capital One': 24, 'Deseret First Credit': 25, 'Khols Credit': 26, 'MISC': 27, 'Pharmacy': 28, 'Dental & Vision Insurance': 29, 'Eyecare': 30, 'Doctor': 31}
    # Labels dictionary for sandbox data
    labels = {"Uber": 1, "Touchstone": 2, "United Airlines": 3, "McDonald's": 4, "Starbucks": 5, "Sparkfun": 6, "Tectra Inc": 7, "Madison Bicycle Shop": 8, "KFC": 4}
    
    categories = []
    df = pd.DataFrame(0, columns=dataframe.columns, index=dataframe.index)
    df = df[df.index < len(filtered_list)]
    df['Amount'] = df['Amount'].astype(float)
    for i in range(len(filtered_list)):
        currentItem = filtered_list[i]
        day, month, year = parseDate(currentItem['date'])
        amount = currentItem['amount']

        for col in df.columns:
            if col == 'Day':
                df['Day'].values[i] = day
            elif col == 'Month':
                df['Month'].values[i] = month 
            elif col == 'Year':
                df['Year'].values[i] = year
            elif col == 'Amount':
                df['Amount'].values[i] = amount
            elif col.lower() == currentItem['merchant_name'].lower() or col.lower() == currentItem['name'].lower():
                df[col].values[i] = 1
            else:
                df[col].values[i] = 0

    # # Save dataframe as csv to add labels in excel
    df.to_csv('newFilteredTransactions.csv')

    # Read labels from excel file, convert to numbers
    # Using dictionary and add as column to dataframe
    myDataSet = pd.read_excel('newFilteredTransactions.xlsx')
    for category in myDataSet['Categories']:
        categories.append(subcategories[category])

    # for column in columns:
    #     df[column] = columns[column]
    df['Categories'] = categories

    return df
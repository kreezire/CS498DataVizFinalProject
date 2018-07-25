import csv
import pandas as pd 
year = []
data = []
csv_reader = csv.reader(open('world life expectanct at birth, total.csv'))
for line in csv_reader:
    year.append(line[0])
    data.append(line[1])
data = data[1:]
result = []
for i in range(len(data)):
    result.append(float(data[i]))
print(result)
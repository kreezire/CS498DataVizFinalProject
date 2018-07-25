import pandas as pd 
import csv
area = []
le = []
csv_reader = csv.reader(open('7 areas bubble chart data.csv'))
for line in csv_reader:
    area.append(line[0])
    le.append(line[1])
area = area[1:]
le = le[1:]
dataset = {}
for i in range(len(area)):
    dataset[area[i]] = le[i]
print(dataset)
import csv
import json
file = 'country average life ex, 2000-2017.csv'
json_file = 'country_le.json'
country = []
le = []
csv_reader = csv.reader(open(file))
for line in csv_reader:
    country.append(line[0])
    le.append(line[1])
country = country[1: len(country)]
#print(country)
le = le[1: len(le) - 1]
for i in range(len(le)):
    le[i] = float(le[i])
data = []
for i in range(len(le)):
    data.extend([{'country' : country[i], 'le': le[i]}])
print(data)
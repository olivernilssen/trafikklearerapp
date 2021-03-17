import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import json

url = "https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/forbudsskilt"
html = urlopen(url)

soup = BeautifulSoup(html, 'html.parser')
type(soup)

rows = soup.find_all('div')
# print(rows[20:22])
print(rows[0])

# list_rows = []
# for row in rows[22:]:
#     cells = row.find_all('td')
#     str_cells = str(cells)
#     clean = re.compile('<.*?>')
#     clean2 = (re.sub(clean, '', str_cells))
#     clean2 = clean2.replace('[', '')
#     clean2 = clean2.replace(']', '')
#     clean3 = clean2.split(',');
#     list_rows.append(clean3)

# # print(list_rows[:20])
# type(clean2)
# sample = list_rows[:20]
# with open('scrapperJson.json', 'w') as f:
#     f.write(json.dumps(list_rows))

json = {}

# for row in list_rows:
#     key = ''
#     if len(row) != 1:
#         key = row[0].split('.')[0]
#         print(row)
#         tempJson = {}
#         split_last = row[len(row) - 1].split(None, 1)
#         print(split_last)
#         tempJson[split_last[0]] = split_last[1]

#         for value in row[:-1]:
#             tempJson[value] = ''

#         json[key] = tempJson
#     else:
#         split_row = row[0].split(None, 1)
#         json[split_row[0]] = split_row[1]
        
# print(json)

# 100:
#     100: 'Farlig Sving',
#     100.1: '',
#     100.2: ''
# 102:
#     102: 'Farlige Svinger',
#     102.1: '',
#     102.2: ''
    
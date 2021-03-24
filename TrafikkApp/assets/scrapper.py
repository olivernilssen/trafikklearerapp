import requests
import urllib.request
import time
from bs4 import BeautifulSoup
import re
import json

url = "https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/fareskilt"
url_vikeplit = "https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/vikeplikt-og-forkjorsskilt"
response = requests.get(url_vikeplit)

soup = BeautifulSoup(response.text, 'html.parser')
type(soup)

dokumentpakker = []
for item in soup.find_all('div', {'class': 'dokumentpakke'}):
    dokumentpakker.append(item.get_text());

# print(rows[20:22])

# print(dokumentpakker[1]);

dangerSigns = dict()

for i, pakke in enumerate(dokumentpakker):
    # print(i)
    # print(pakke)
    code = pakke.split(' ', 1);
    # print(code)
    undercodes = dict()
    if code[0] in dangerSigns:
        subCode = code[1].split(code[0], 1)
        # print(subCode)
        if (len(subCode) == 1):
            undercodes[code[0]] = newSubCode[1].rstrip()
            dangerSigns[code[0]].update(undercodes)
        else:
            newSubCode = subCode[1].split(' ', 1)
            undercodes[code[0] + newSubCode[0]] = newSubCode[1].rstrip()
            dangerSigns[code[0]].update(undercodes)
    else:
        splitByCode = code[1].split('.', 1)
        # print(splitByCode)
        
        if (len(splitByCode) > 1 and (splitByCode[1] == '' or splitByCode[1] == ' ' or splitByCode[1] == ' \r')):
            splitByCode.pop(1)

        if len(splitByCode) > 1:
            newSubCode = splitByCode[1].split(' ', 1)
            
            # Change '.' to '_'?
            undercodes[code[0]+'.'+newSubCode[0]] = newSubCode[1].rstrip()
        else:
            undercodes[code[0]] = code[1].rstrip()

        dangerSigns[code[0]] = undercodes


# print(dangerSigns)
with open('vikteplitSkiltBeskrivelse.json', 'w', encoding='utf-8') as f:
    json.dump(dangerSigns, f, ensure_ascii=False, indent=4)
    print('wrote to file vikteplitSkiltBeskrivelse')
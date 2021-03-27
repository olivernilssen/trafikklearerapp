import requests
import urllib.request
import time
from bs4 import BeautifulSoup
import re
import json

urls = [
    ["https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/fareskilt", 'fareskiltBeskrivelse.json'],
    ["https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/vikeplikt-og-forkjorsskilt", 'vikepliktBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/pabudsskilt', 'påbudsskiltBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/forbudsskilt', 'forbudsskiltBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/opplysningsskilt', 'opplysningskiltBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/serviceskilt', 'serviceskiltBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/vegvisningsskilt', 'veivisningBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/underskilt', 'underskiltBeskrivelse.json'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/markeringsskilt', 'markeringskiltBeskrivelse.json']]

for url in urls[8:]: 
    response = requests.get(url[0])

    soup = BeautifulSoup(response.text, 'html.parser')
    type(soup)

    dokumentpakker = []
    testPakker = dict()
    signDescription = dict()

    for i, item in enumerate(soup.find_all('div', {'class': 'dokumentpakke'})):
        print(i)
        hasDescription = False
        headerTitle = ''
        description = ''
        listChildren = list(item.children)

        if (len(listChildren) > 2):
            hasDescription = True
            headerTitle = listChildren[0].get_text().split(' ', 1)
            description = listChildren[1].get_text()
        else:
            headerTitle = listChildren[0].get_text().split(' ', 1)
        
        if headerTitle[0] in signDescription:
            if hasDescription and description != '':
                if description != ' ' and description[0].isdigit():
                    newDescription = description.split(' ', 1)
                    if len(newDescription) == 1:
                        signDescription[headerTitle[0]].update({description: ''})
                    else:
                        signDescription[headerTitle[0]].update({newDescription[0]: newDescription[1]})
                else:
                    lenOfDesc = len(description)
                    if (description[lenOfDesc-4].isdigit()):
                        splitDescription = description.split('.', 1)
                        signDescription[headerTitle[0]].update({splitDescription[1].strip(): splitDescription[0].strip()})
                    else:
                        signDescription[headerTitle[0]].update({'beskrivelse': newDescription[1]})
        else:
            if hasDescription and description != '':
                if description[0].isdigit():
                    newDescription = description.split(' ', 1)
                    if len(newDescription) == 1:
                        signDescription[headerTitle[0]] = {'navn': headerTitle[1], 'beskrivelse': '', description: ''}
                    else:
                        signDescription[headerTitle[0]] = {'navn': headerTitle[1], 'beskrivelse': '', newDescription[0]: newDescription[1]}
                else:
                    lenOfDesc = len(description)
                    if (description[lenOfDesc-4].isdigit()):
                        splitDescription = description.split('.', 1)
                        signDescription[headerTitle[0]] = {'navn': headerTitle[1], 'beskrivelse': '', splitDescription[1].strip(): splitDescription[0].strip()}
                    else:
                        signDescription[headerTitle[0]] = {'navn': headerTitle[1], 'beskrivelse': description}
            else:
                signDescription[headerTitle[0]] = {'navn': headerTitle[1], 'beskrivelse': description}



    # print(signDescription)
    with open(url[1], 'w', encoding='utf-8') as f:
        json.dump(signDescription, f, ensure_ascii=False, indent=4)
        print('wrote to file ' + url[1])
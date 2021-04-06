import requests
import urllib.request
import time
from bs4 import BeautifulSoup
import re
import json

urls = [
    ["https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/fareskilt", 'fareskiltBeskrivelse.json', 'Fareskilt'],
    ["https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/vikeplikt-og-forkjorsskilt", 'vikepliktBeskrivelse.json', 'Vikeplikt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/pabudsskilt', 'påbudsskiltBeskrivelse.json', 'Påbudsskilt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/forbudsskilt', 'forbudsskiltBeskrivelse.json', 'Forbudsskilt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/opplysningsskilt', 'opplysningskiltBeskrivelse.json', 'Opplysningsskilt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/serviceskilt', 'serviceskiltBeskrivelse.json', 'Serviceskilt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/vegvisningsskilt', 'veivisningBeskrivelse.json', 'Vegvisningsskilt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/underskilt', 'underskiltBeskrivelse.json', 'Underskilt'],
    ['https://www.vegvesen.no/trafikkinformasjon/langs-veien/trafikkskilt/markeringsskilt', 'markeringskiltBeskrivelse.json', 'Markeringsskilt']]

mainpath = '../roadSigns/'
#go through all the urls and add to json
for url in urls[0:1]: 
    response = requests.get(url[0])
    imgSource = mainpath + url[2] + '/'

    #get the html from url
    soup = BeautifulSoup(response.text, 'html.parser')
    type(soup)

    dokumentpakker = []
    testPakker = dict()
    signDescription = dict()

    for i, item in enumerate(soup.find_all('div', {'class': 'dokumentpakke'})):
        hasDescription = False
        headerTitle = ''
        description = ''
        listChildren = list(item.children) #list all the children to "dokumentpakke"

        #check if there is a description to this "dokumentpakke" (<p>)
        if (len(listChildren) > 2):
            hasDescription = True
            headerTitle = listChildren[0].get_text().split(' ', 1)
            description = listChildren[1].get_text()
        else:
            headerTitle = listChildren[0].get_text().split(' ', 1)
        
        #check if the sign number is in the dict
        if headerTitle[0] in signDescription:
            oldDescription = signDescription[headerTitle[0]]['beskrivelse'];
            #check if there is a description on this sign
            if hasDescription and description != '' and description != ' ':
                #check if the description has a sub-number at the begining
                if description[0].isdigit():
                    #split the sub-number with the rest of the description
                    newDescription = description.split(' ', 1)
                    #if the length is 1, then there is only a sub-number and no description
                    if len(newDescription) == 1:
                        signDescription[description.replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': oldDescription, 'source' : "require(" + imgSource + description.replace('.', '_') + ")"} #add sub-number without description
                    else:
                        signDescription[description.replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': oldDescription + ' ' + newDescription[1], 'source' : "require(" + imgSource + newDescription[0].replace('.', '_') + ".png)"} #add sub number with description for it
                else:
                    lenOfDesc = len(description)
                    #check if there is a sub-number at the end of the description (happens sometimes)
                    if (description[lenOfDesc-4].isdigit()):
                        splitDescription = description.split('.', 1) #split the description to get sub-number alone
                        signDescription[splitDescription[1].strip().replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': splitDescription[0].strip(), 'source' : "require(" + imgSource + splitDescription[1].strip().replace('.', '_') + ".png)"} #update code with sub-number with description
                    else:
                        signDescription[headerTitle[0].replace('.', '_')].update({'beskrivelse': newDescription[1]}) #update sign code with description
        else:
            title = headerTitle[0]

            if ("." not in headerTitle[0]):
                title = headerTitle[0] + '_0'
            # check if there is a description for this sign code
            if hasDescription and description != '' and description != ' ':
                #check if there is a sub-number to this code aswell
                if description[0].isdigit():
                    newDescription = description.split(' ', 1) #split the number away from the rest
                    if len(newDescription) == 1: #if the number is alone, then there is no description for it
                        signDescription[newDescription[0].replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': '', 'source' : "require(" + imgSource + newDescription[0].replace('.', '_') + ")"} #add key=code, name of sign, empty descriptuon and sub-code
                    else:
                        signDescription[newDescription[0].replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': newDescription[1], 'source' : "require(" + imgSource + newDescription[0].replace('.', '_') + ".png)"} #add key=code, name of sign, empty description and sub-code with description
                else:
                    lenOfDesc = len(description)


                    #check if the sub-code is at the end of the description
                    if (description[lenOfDesc-4].isdigit()):
                        splitDescription = description.split('.', 1) #split the sub-code away form the rest
                        signDescription[title.replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': splitDescription[0].strip(), 'source' : "require(" + imgSource + title.replace('.', '_') + ".png)"} #add key=code, name, empty description and sub-code with description
                    else:
                        signDescription[title.replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': description, 'source' : "require(" + imgSource + title.replace('.', '_') + ".png)"} #add key=code, name and description 
            else:
                signDescription[title.replace('.', '_')] = {'navn': headerTitle[1], 'beskrivelse': description, 'source' : "require(" + imgSource + title.replace('.', '_') + ".png)"} #add key=code, name and description



    # print(signDescription)

    #add the dict to a json file
    with open(url[1], 'w', encoding='utf-8') as f:
        json.dump(signDescription, f, ensure_ascii=False, indent=4)
        print('wrote to file ' + url[1]) 
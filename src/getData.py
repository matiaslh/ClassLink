import requests
import sys
import json
import time


def createFile(text):
    f = open("log.txt", "w+")
    f.write(text)
    f.close()


def getKeys(header):
    cookie = {}

    keySections = header['Set-Cookie'].split(", ")

    for x in keySections:
        cookie[x.split('=')[0]] = x.split('=')[1]

    return cookie


def getData():
    getURL = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?CONSTITUENCY=WBST&type=P&pid=ST-WESTS12A&TOKENIDX='
    r = requests.get(getURL)

    cookie = getKeys(r.headers)
    getURL = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?CONSTITUENCY=WBST&type=P&pid=ST-WESTS12A&TOKENIDX=' + \
        cookie['LASTTOKEN']
    r = requests.get(getURL, cookies=cookie)

    cookie = getKeys(r.headers)

    postURL = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?TOKENIDX=' + \
        cookie['LASTTOKEN'] + '&SS=1&APP=ST&CONSTITUENCY=WBST'
    postfields = {"VAR1": "F19", "VAR10": "Y", "VAR11": "Y", "VAR12": "Y", "VAR13": "Y", "VAR14": "Y", "VAR15": "Y", "VAR16": "Y", "DATE.VAR1": "", "DATE.VAR2": "", "LIST.VAR1_CONTROLLER": "LIST.VAR1", "LIST.VAR1_MEMBERS": "LIST.VAR1*LIST.VAR2*LIST.VAR3*LIST.VAR4", "LIST.VAR1_MAX": "5", "LIST.VAR2_MAX": "5", "LIST.VAR3_MAX": "5", "LIST.VAR4_MAX": "5", "LIST.VAR1_1": "", "LIST.VAR2_1": "", "LIST.VAR3_1": "",
                  "LIST.VAR4_1": "", "LIST.VAR1_2": "", "LIST.VAR2_2": "", "LIST.VAR3_2": "", "LIST.VAR4_2": "", "LIST.VAR1_3": "", "LIST.VAR2_3": "", "LIST.VAR3_3": "", "LIST.VAR4_3": "", "LIST.VAR1_4": "", "LIST.VAR2_4": "", "LIST.VAR3_4": "", "LIST.VAR4_4": "", "LIST.VAR1_5": "", "LIST.VAR2_5": "", "LIST.VAR3_5": "", "LIST.VAR4_5": "", "VAR7": "", "VAR8": "", "VAR3": "", "VAR6": "", "VAR21": "", "VAR9": "", "SUBMIT_OPTIONS": ""}
    postfields['LISTVAR1_1'] = "CIS"
    postfields['LISTVAR3_1'] = "3761"

    # print("getting data")
    # start = time.time()
    r = requests.post(postURL, data=postfields, cookies=cookie)
    # end = time.time()

    # print("got data time:", end-start)

    return r.text


queryStr = sys.argv[1]
query = json.loads(queryStr)

text = getData()
# createFile(r.text)
print(text)
sys.stdout.flush()

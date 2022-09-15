import pandas as pd
from enum import Enum
import json

class HEADER(Enum):
    EVENT = 0
    TIMESTAMP = 1
    MODELNUMBER = 2
    SERIALNUMBER = 3
    CONTRLLERID = 4
    LOCATION = 5
    CLEANTYPE = 6
    TOTALCLEANTIMER = 7

class EVENTS(Enum):
    CLEANSTART = 0
    CLEANCOMPLETE = 1    

# These strings need to match up with the CLEANTYPE, HEADER, and EVENTS enum and the exact wording of the
# data field in the excel document being imported.
headerStrings = ['event', 'timestamp', 'modelnumber', 'serialnumber', 'controllerid', 'location', 'cleantype', 'totalcleantimer']
eventStrings = ['cleanStart', 'cleanComplete']
numDataPoints = 7
numFilterTypes = 2

data = pd.read_excel('../HennyPennyExport_CY2021_02173_01490_08_30_22.xlsx', dtype = object, sheet_name = 'Clean Complete Data')

# We're only looking at the 'Express Filter' and the 'Manual Filter' clean types so clean
# up the data frame to only include that data.
cleanTypeStringsToExclude = ['Clean Out', 'Dispose', 'Drain Pot to Pan', 'Fill Pot from Drain Pan', 'Maintenance Filter']
data = data[data.cleantype.isin(cleanTypeStringsToExclude) == False]

numOfRows = data[data.columns[0]].count()

# Cycle through all columns until you reach ones that don't have any data for the cycle 
# complete rows.
for currentLoc in range(numOfRows):
    if ((pd.isna(data[headerStrings[HEADER.TOTALCLEANTIMER.value]].iloc[currentLoc])) and
        (data[headerStrings[HEADER.EVENT.value]].iloc[currentLoc] == eventStrings[EVENTS.CLEANCOMPLETE.value])):
        # If the event is 'cleanComplete' but the 'totalcleantimer' is 'NaN', find the 
        # most recent previous 'cleanStart' entry, subtract the timestamps, and place
        # the result in the 'totalcleantimer' column
        if currentLoc - 1 > 0:
            prevLoc = currentLoc - 1
            while ((data[headerStrings[HEADER.EVENT.value]].iloc[prevLoc]) != eventStrings[EVENTS.CLEANSTART.value] ):
                if prevLoc == 0:
                    break
                prevLoc -= 1
            data[headerStrings[HEADER.TOTALCLEANTIMER.value]].iloc[currentLoc] = \
                data[headerStrings[HEADER.TIMESTAMP.value]].iloc[currentLoc] - data[headerStrings[HEADER.TIMESTAMP.value]].iloc[prevLoc]

# Clean up the data frame by dropping all the 'cleanStart' rows
data = data[data.event != eventStrings[EVENTS.CLEANSTART.value]]
numOfRows = data[data.columns[0]].count()

# Loop through all the data until you get to the seven most recent data points
# for each serial number
numOfUniqueSerialNumbers = data[headerStrings[HEADER.SERIALNUMBER.value]].nunique()
serialNumStrings = ['' for x in range(numOfUniqueSerialNumbers)]
mostRecentData = [[0 for x in range(numDataPoints)] for x in range(numOfUniqueSerialNumbers)]
filterTimeAverages = [0 for x in range(numOfUniqueSerialNumbers)]
filterTypes = ['' for x in range(numOfUniqueSerialNumbers)]
modelNumber = ['' for x in range(numOfUniqueSerialNumbers)]

currentLoc = 0
serialNumPosition = 0
#Save the serial number for the first string.
serialNumStrings[serialNumPosition] = data[headerStrings[HEADER.SERIALNUMBER.value]].iloc[currentLoc]
dropIndex = 0

for currentLoc in range(numOfRows):
    # Loop through until a different serial number is found.
    if (serialNumStrings[serialNumPosition] != data[headerStrings[HEADER.SERIALNUMBER.value]].iloc[currentLoc]):
        # Obtain the seven most recent filter times for the current serial number.
        prevLoc = currentLoc - numDataPoints
        filterTypes[serialNumPosition] = data[headerStrings[HEADER.CLEANTYPE.value]].iloc[prevLoc]
        modelNumber[serialNumPosition] = data[headerStrings[HEADER.MODELNUMBER.value]].iloc[prevLoc]
        
        for x in range(numDataPoints):
            mostRecentData[serialNumPosition][x] = data[headerStrings[HEADER.TOTALCLEANTIMER.value]].iloc[prevLoc]
            prevLoc += 1

        # Update the serial number position and grab the new serial number string
        filterTimeAverages[serialNumPosition] = sum(mostRecentData[serialNumPosition]) / numDataPoints
        serialNumPosition += 1
        serialNumStrings[serialNumPosition] = data[headerStrings[HEADER.SERIALNUMBER.value]].iloc[currentLoc]

# the loop has finished so obtain the final serial number's data as that data was not collected
# in the previous loop.
prevLoc = currentLoc + 1 - numDataPoints 
filterTypes[serialNumPosition] = data[headerStrings[HEADER.CLEANTYPE.value]].iloc[prevLoc]
modelNumber[serialNumPosition] = data[headerStrings[HEADER.MODELNUMBER.value]].iloc[prevLoc]
for x in range(numDataPoints):
    mostRecentData[serialNumPosition][x] = data[headerStrings[HEADER.TOTALCLEANTIMER.value]].iloc[prevLoc]
    prevLoc += 1

filterTimeAverages[serialNumPosition] = sum(mostRecentData[serialNumPosition]) / numDataPoints

# Convert necessary data to JSON
# Writing to sample.json
jsonObject = {
    'serialNumStrings' : serialNumStrings,
    'modelNumber' : modelNumber,
    'mostRecentData' : mostRecentData,
    'filterTypes' : filterTypes,
    'filterTimeAverages' : filterTimeAverages,
}
with open("filterData.json", "w") as outfile:
    outfile.write(json.dumps(jsonObject, sort_keys=False, indent=4))
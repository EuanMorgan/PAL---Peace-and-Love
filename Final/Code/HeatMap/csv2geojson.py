import csv
import json
from geojson import Feature, Point, FeatureCollection

PROPS = ["Crime ID", "Month", "Reported by", "Falls within", "Location", "LSOA code", "LSOA name", "Crime type" ,"Last outcome category", "Context"]
locations = []

with open("input.csv") as csvfile: 
	reader = csv.DictReader(csvfile)
	for row in reader: #iterate thru the rows of the csv file
		lon, lat = row["Longitude"], row["Latitude"]
		if not lon or not lat:
			continue
		locations.append( #adds to the geojson location list
			Feature(
				geometry = Point(map(float, [lon, lat])),
				properties = { name: row[name] for name in PROPS } #collects the relevant properties into a dictionary
			)
		)

output = FeatureCollection(locations)

with open("crimes.geojson", "w") as outfile:
	json.dump(output, outfile, indent=4) #json-ify the geojson object

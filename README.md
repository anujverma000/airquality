## ENV
Rename the .evn.example to .env and set the values

## upload
```curl -X POST -H "Content-Type: text/csv" --data-binary  @/path_to_data/AirQualityUCI.csv http://localhost:3000/api/upload```

## query
```http://localhost:3000/api/time-series?parameter=Temperature&start_date=2004-03-10&end_date=2004-4-10```
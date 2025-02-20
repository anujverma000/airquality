## Overview
Analyze and visualize air quality data.

## Dataset Details
The dataset provided contains 9,358 hourly records collected from March 2004 to February
2005 by an air quality monitoring device located in an Italian city. It includes the following fields:

## Tech Stack
- Next.js
- TypeScript
- Postgres DB
- Prisma ORM
- Swagger
- Tailwind CSS
- React Query
- Shadcn Components
- echarts for visualization
- papaparse for csv parsing
- jsdoc for documentation


## Setup and Run

1. Clone the repository
```bash
git clone git@github.com:anujverma000/airquality.git
cd airquality
```

2. Install the dependencies
```bash
npm install
```

3. Run the server
```bash
npm run dev
```

4. Update the .env file with the database credentials
Rename the `.env.example` to `.env` and set postgress databse connention url

5. Run the migrations
```bash
npx prisma migrate dev
```
> Note: No seed is required as the data is uploaded via the api

6. Upload the csv file using upload api
```bash
curl -X POST -H "Content-Type: text/csv" --data-binary  @/path_to_data/AirQualityUCI.csv http://localhost:3000/api/upload
```

7. Open the browser and navigate to http://localhost:3000


# Production deployment
- Its deployed on vercel, you can access it [https://airquality-anuj.vercel.app/](https://airquality-anuj.vercel.app/)


## Docs

Lets look with api docs

```bash
http://localhost:3000/api/docs
```


## Query data with api
```bash
http://localhost:3000/api/time-series?parameters=Temperature__CO&start_date=2004-03-10&end_date=2004-4-10
```

> Note: The parameters are case sensitive and should be separated by '__' (double underscore), the date should be in the format `YYYY-MM-DD`

## Feaatues included
- Multiple chart types (Line chart and Bar chart) for data visualization
- Smooth line chart support with switch
- Multiple parameters selection for data visualization
- Date range selection for data visualization
- Upload csv file
- Visualize with echarts
- API Documentation with swagger
- Documentation with jsdoc
- Dark mode support
- Responsive design
- Pagination support
- Save chat image

## Future Enhancements
- Add more data visualization options
- Save custom queries
- Add more data visualization options
- Add data export options
- Add more data upload option in UI
- Add NLP support for query

## Screenshots
![Mobile](https://raw.githubusercontent.com/anujverma000/airquality/refs/heads/main/screenshots/Screenshot%202025-02-21%20at%203.05.50%E2%80%AFAM.png)
![Desktop](https://raw.githubusercontent.com/anujverma000/airquality/refs/heads/main/screenshots/Screenshot%202025-02-21%20at%203.06.06%E2%80%AFAM.png)
![Dark mode](https://raw.githubusercontent.com/anujverma000/airquality/refs/heads/main/screenshots/Screenshot%202025-02-21%20at%203.07.28%E2%80%AFAM.png)


## License
This work is licensed under the [MIT License](https://github.com/anujverma000/airquality/blob/main/LICENCE).
```

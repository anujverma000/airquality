-- CreateTable
CREATE TABLE "AirQuality" (
    "timestamp" TIMESTAMP(3) NOT NULL,
    "co_gt" DOUBLE PRECISION,
    "pt08_s1_co" INTEGER,
    "nmhc_gt" DOUBLE PRECISION,
    "c6h6_gt" DOUBLE PRECISION,
    "pt08_s2_nmhc" INTEGER,
    "nox_gt" DOUBLE PRECISION,
    "pt08_s3_nox" INTEGER,
    "no2_gt" DOUBLE PRECISION,
    "pt08_s4_no2" INTEGER,
    "pt08_s5_o3" INTEGER,
    "temperature" DOUBLE PRECISION,
    "rh" DOUBLE PRECISION,
    "ah" DOUBLE PRECISION,

    CONSTRAINT "AirQuality_pkey" PRIMARY KEY ("timestamp")
);

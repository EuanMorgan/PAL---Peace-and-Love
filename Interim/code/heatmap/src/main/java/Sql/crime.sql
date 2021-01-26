select *
from "Crime" as cr
where cr."Latitude" >= 51.4879 - 0.01
  and cr."Latitude" <= 51.4879 + 0.01
  and cr."Longitude" >= -3.1909 - 0.01
  and cr."Longitude" <= -3.1572 + 0.01
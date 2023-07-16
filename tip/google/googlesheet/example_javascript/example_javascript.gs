function packTimestamp(year, month, day, hour, minute, second) {
  let packedTimestamp = 0;

  packedTimestamp |= (year % 100) << 26;     // 6 bits for year
  packedTimestamp |= month << 22;            // 4 bits for month
  packedTimestamp |= day << 17;              // 5 bits for day
  packedTimestamp |= hour << 12;             // 5 bits for hour
  packedTimestamp |= minute << 6;            // 6 bits for minute
  packedTimestamp |= second;                 // 6 bits for second

  return packedTimestamp.toString();
}



function unpackTimestamp_year(packedTimestamp) {
  var timestamp;

  timestamp = (packedTimestamp >> 26) & 0x3F;     // Extract 6 bits for year
  return timestamp;
}


function unpackTimestamp_month(packedTimestamp) {
  var timestamp;

  timestamp = (packedTimestamp >> 22) & 0x0F;     // Extract 4 bits for month
  return timestamp;
}


function unpackTimestamp_day(packedTimestamp) {
  var timestamp;

  timestamp = (packedTimestamp >> 17) & 0x1F;     // Extract 5 bits for day
  return timestamp;
}


function unpackTimestamp_hour(packedTimestamp) {
  var timestamp;

  timestamp = (packedTimestamp >> 12) & 0x1F;     // Extract 5 bits for hour
  return timestamp;
}


function unpackTimestamp_minute(packedTimestamp) {
  var timestamp;

  timestamp = (packedTimestamp >> 6) & 0x3F;      // Extract 6 bits for minute
  return timestamp;
}


function unpackTimestamp_second(packedTimestamp) {
  var timestamp;

  timestamp = packedTimestamp & 0x3F;             // Extract 6 bits for second
  return timestamp;
}



function myfunction(x,y) {
  var total = x +y;
  return total.toString();
}

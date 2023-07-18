const STX_MSG = 0x55;
const CODE_VERSION = 0x01;
const MSG_TINYPACK_HARTHBEAT = 0x01;
const COMPONENT_ID_LAMP = 0x02;




var tinypack = {
  stx: 0,             // Start of packet byte
  sourceId: 0,        // Source ID
  destinationId: 0,   // Destination ID
  len: 0,             // Length of payload
  messageId: 0,       // Message ID
  code: 0,            // Version code
  timestamp: 0,       // Timestamp
  componentId: 0,     // Component ID
  payload: [],        // Payload data (maximum of 35 bytes to accommodate the component ID)
  crc16: 0            // CRC16 checksum
};



// // Define the Timestamp object in Node.js
// const Timestamp = {
//   year: 0,    // 0-99 (representing 2000-2099)
//   month: 0,   // 1-12
//   day: 0,     // 1-31
//   hour: 0,    // 0-23
//   minute: 0,  // 0-59
//   second: 0,  // 0-59
// };

// // Usage example
// var timestamp = Object.create(Timestamp);



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


//decode message
function calculateCRC16(data, length) {
  let crc = 0xFFFF;

  for (let i = 0; i < length; i++) {
    crc ^= data[i];

    for (let j = 0; j < 8; j++) {
      if (crc & 0x0001) {
        crc = (crc >> 1) ^ 0xA001;
      } else {
        crc = crc >> 1;
      }
    }
  }

  return crc;
}


function packTimestamp(byteArray0,byteArray1,byteArray2,byteArray3) {
  var packedTimestamp = (byteArray0 << 24) | (byteArray1 << 16) | (byteArray2 << 8) | byteArray3;
  return packedTimestamp;
}




function decodeTinypacklink(message) {
  var messageArray = message.match(/.{2}/g).map(hex => parseInt(hex, 16));
  var messageLength = messageArray.length;
  messageLength = messageArray.length;
  console.log(messageArray);
  console.log(messageLength);
  var crc_position = 0;

  tinypack.stx = messageArray[0]; // Start of packet byte
  tinypack.sourceId = (messageArray[1] << 8) | messageArray[2];
  tinypack.destinationId = (messageArray[3] << 8) | messageArray[4];
  tinypack.len = messageArray[5];
  tinypack.messageId = messageArray[6];
  tinypack.code = messageArray[7];
  tinypack.timestamp = packTimestamp(messageArray[8],messageArray[9],messageArray[10],messageArray[11])
  tinypack.componentId = messageArray[12];
  crc_position = (12 + tinypack.len)+1;

  tinypack.crc16 = messageArray[crc_position]<<8;
  tinypack.crc16 |= messageArray[crc_position+1];
  return tinypack;
}

function getStx(msg) {
  decodeTinypacklink(msg)
  return tinypack.stx.toString(16);
}

function getSourceId(msg) {
  decodeTinypacklink(msg)
  return tinypack.sourceId.toString(16);
}

function getDestinationId(msg) {
  decodeTinypacklink(msg)
  return tinypack.destinationId.toString(16);
}


function getLen(msg) {
  decodeTinypacklink(msg)
  return tinypack.len.toString(10);
}

function getMessageId(msg) {
  decodeTinypacklink(msg)
  return tinypack.messageId.toString(16);
}

function getCode(msg) {
  decodeTinypacklink(msg)
  return tinypack.code.toString(16);
}


function getTimestamp(msg) {
  decodeTinypacklink(msg)
  return tinypack.timestamp.toString(10);
}

function getComponentId(msg) {
  decodeTinypacklink(msg)
  return tinypack.componentId.toString(16);
}

function getCrc16(msg) {
  decodeTinypacklink(msg)
  return tinypack.crc16.toString(16);
}

function getCrc16_verify(msg) {
  var messageArray = msg.match(/.{2}/g).map(hex => parseInt(hex, 16));
  var messageLength = messageArray.length;

  var crc_check = 0;
  crc_check = calculateCRC16(messageArray,messageLength -2);
  return crc_check.toString(16);
}

// function unpackTimestamp(packedTimestamp) {
//   timestamp.year = (packedTimestamp >> 26) & 0x3F;      // Extract 6 bits for year
//   timestamp.month = (packedTimestamp >> 22) & 0x0F;     // Extract 4 bits for month
//   timestamp.day = (packedTimestamp >> 17) & 0x1F;       // Extract 5 bits for day
//   timestamp.hour = (packedTimestamp >> 12) & 0x1F;      // Extract 5 bits for hour
//   timestamp.minute = (packedTimestamp >> 6) & 0x3F;     // Extract 6 bits for minute
//   timestamp.second = packedTimestamp & 0x3F;            // Extract 6 bits for second
// }


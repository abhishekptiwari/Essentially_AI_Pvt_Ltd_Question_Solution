function decodePacket(packet) {
  if (packet.length !== 44) {
    throw new Error("Invalid packet size. Packet size should be 44 bytes.");
  }

  // Extract and decode the different parts of the packet
  const short1 = packet.readUInt16BE(0);
  const str1 = packet.slice(2, 14).toString("utf8");
  const byte1 = packet.readUInt8(14);
  const str2 = packet.slice(15, 23).toString("utf8");
  const short2 = packet.readUInt16BE(23);
  const str3 = packet.slice(25, 40).toString("utf8");
  const long1 = packet.readUInt32BE(40);

  // Create and return the decoded struct as an object
  const decodedStruct = {
    short1,
    str1,
    byte1,
    str2,
    short2,
    str3,
    long1,
  };

  return decodedStruct;
}

// Sample test case
const packet = Buffer.from([
  0x04, 0xD2, 0x6B, 0x65, 0x65, 0x70, 0x64, 0x65, 0x63, 0x6F, 0x64, 0x69,
  0x6E, 0x67, 0x38, 0x64, 0x6F, 0x6E, 0x74, 0x73, 0x74, 0x6F, 0x70, 0x03,
  0x15, 0x63, 0x6F, 0x6E, 0x67, 0x72, 0x61, 0x74, 0x75, 0x6C, 0x61, 0x74,
  0x69, 0x6F, 0x6E, 0x73, 0x07, 0x5B, 0xCD, 0x15,
]);

const decodedStruct = decodePacket(packet);
console.log(decodedStruct);


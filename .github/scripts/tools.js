function zoneExist(text, zone) {
  return text.indexOf(zone.start) > -1;
}

function getZoneContent(text, zone) {
  let startIdx = text.indexOf(zone.start);
  if (startIdx > -1) {
    let endIdx = text.indexOf(zone.end);
    return text.substring(startIdx + zone.start.length, endIdx).trim();
  } else {
    return null;
  }
}

function addZoneContent(text, zone, content) {
  return (
    text +
    `\n\n-------\n` +
    `\n${zone.start}\n` +
    `\n${content}\n` +
    `\n${zone.end}\n\n`
  );
}

function replaceZoneContent(text, zone, replacement) {
  let startIdx = text.indexOf(zone.start);
  let endIdx = text.indexOf(zone.end);
  return (
    text.substring(0, startIdx + zone.start.length) +
    "\n\n" +
    replacement +
    "\n\n" +
    text.substring(endIdx, text.length)
  );
}

exports.addZoneContent = addZoneContent;
exports.zoneExist = zoneExist;
exports.replaceZoneContent = replaceZoneContent;
exports.getZoneContent = getZoneContent;

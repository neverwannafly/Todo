const ExtractId = (offset) => {
  const urlElements = location.href.split('/');
  const length = urlElements.length;
  return urlElements[length-offset];
}

export default ExtractId;
const getInvoiceId = (objectId) => {
  const hex = objectId.toHexString();
  const short = hex.slice(-6);
  const formatted = `INV-${short.slice(0, 3).toUpperCase()}-${short.slice(3).toUpperCase()}`;
  return formatted;
}

module.exports = {
  getInvoiceId,
}
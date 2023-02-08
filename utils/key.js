exports.getPublickey = () => {
  const envPublicKey = process.env.PUBLIC_KEY;
  originalPublicKey = envPublicKey.replace(/\\n/g, "\n");
  return originalPublicKey;
};

exports.getPrivateKey = () => {
  const envPrivateKey = process.env.PRIVATE_KEY;
  originalPrivateKey = envPrivateKey.replace(/\\n/g, "\n");
  return originalPrivateKey;
};

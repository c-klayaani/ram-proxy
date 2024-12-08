import crypto from "crypto";
const key = "77M!sZg7F!@7d%2n29$5*%SH$76w6@G97XEu*!4&";

const authenticateRequest = (req, res, next) => {
  const signature = req.headers["x-signature"];
  console.log(signature);
  if (!signature) return res.status(403).json({ message: "Unauthorized." });

  const payload = JSON.stringify(req.body);
  console.log(req.body);
  const validSignature = crypto
    .createHmac("sha256", key)
    .update(payload)
    .digest("hex");

  console.log(validSignature);
  if (signature != validSignature)
    return res.status(403).json({ message: "Unauthorized. not matching" });
  next();
};

export default authenticateRequest;

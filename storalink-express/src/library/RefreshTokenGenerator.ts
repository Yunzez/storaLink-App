import crypto from "crypto";

type RefreshTokenGenerateOutput = {
  refreshToken: string;
  expiryDate: Date;
};
/**
 * Generates a refresh token and its expiration date.
 * @param {number} daysValid - The number of days the token should be valid.
 * @returns {object} An object containing the refresh token and its expiry date.
 */
const generateRefreshToken = (
  minutesValid: number
): RefreshTokenGenerateOutput => {
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + minutesValid);

  return {
    refreshToken,
    expiryDate,
  } as RefreshTokenGenerateOutput;
};

export default generateRefreshToken;

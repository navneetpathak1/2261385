import { createLogger } from "./logger/logger";

const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export const logger = createLogger(accessToken);
console.log("Access token:", accessToken);

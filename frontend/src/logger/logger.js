import axios from "axios";

export const createLogger = (token) => {
  return async (stack, level, logPackage, message) => {
    try {
      await axios.post(
        "http://20.244.56.144/evaluation-service/logs",
        {
          stack,
          level,
          package: logPackage,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch {}
  };
};

let baseURL = "";
const timeout = 1000;

switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "/api";
    break;
  case "production":
    baseURL = "http://35.236.180.84";
    break;
  case "test":
    break;
  default:
    break;
}

export default { baseURL, timeout };

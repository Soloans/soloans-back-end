const PROJECT_NAME = "Flashloans_CMS";
const COOKIE_SECRET =
  "f7745f4df4394027716de160fb2acd6aac36699576a8be586b75ac09acf6a0df"; //P@ssw0rd1

const ROOT_USERNAME = "root";
const ROOT_PASSWORD = "Password1";
const DB_CONNECTION_ON_CLOUD = `mongodb+srv://${ROOT_USERNAME}:${ROOT_PASSWORD}@cluster0.esdgu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
module.exports = {
  PROJECT_NAME,
  COOKIE_SECRET,
  DB_CONNECTION_ON_CLOUD,
};

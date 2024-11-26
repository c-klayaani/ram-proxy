import axios from "axios";

const freshsalesUrl =
  "http://techlabsolutionsred.myfreshworks.com/crm/sales/api";
const freshsalesToken = "3DJWOkauz7BCufJN5GgUJQ";

const api = axios.create({
  baseURL: freshsalesUrl,
  headers: {
    Authorization: `Token token=${freshsalesToken}`,
  },
});

export default api;

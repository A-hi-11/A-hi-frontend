/** @format */

import axios from "axios";

export const purchasedCheck = async (promptId) => {
  const storedJwtToken = localStorage.getItem("jwtToken");

  const response = await axios.get("/payment/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + storedJwtToken,
    },
  });

  for (let i = 0; i < response.data.length; i++) {
    const element = response.data[i];

    if (element.orderName == promptId && element.status == "DONE") {
      return true;
    }
  }
  return false;
};

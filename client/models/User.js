import m from "mithril";
import config from "../config.js";

const User = {
  list: [],
  loadList: () => {
    const token = localStorage.getItem("__token");
    return m.request({
      method: "GET",
      url: config.baseURL + "/api/v1/users",
      headers: { "Authorization": "Bearer " + token },
      withCredentials: true
    })
      .then((result) => {
        // console.log(JSON.stringify(result, null, 2));
        User.list = result.data.Items;
      })
      .catch((err) => { console.log(err) });
  },

  current: {},

  load: (id) => {
    const token = localStorage.getItem("__token");
    return m.request({
      method: "GET",
      url: config.baseURL + "/api/v1/users/" + id,
      headers: { "Authorization": "Bearer " + token },
      withCredentials: true
    })
      .then((result) => {
        // console.log(JSON.stringify(result, null, 2));
        User.current = result.data.Item;
      })
      .catch((err) => { console.log(err) });
  },

  update: () => {
    const token = localStorage.getItem("__token");
    return m.request({
      method: "PUT",
      url: config.baseURL + "/api/v1/users/:id",
      data: User.current,
      headers: { "Authorization": "Bearer " + token },
      withCredentials: true
    })
      .then((result) => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch((err) => { console.log(err) });
  }
}

export default User;
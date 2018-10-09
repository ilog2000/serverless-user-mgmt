import m from "mithril";
import config from "../config.js";
import { $, showError } from "../utils.js";

export default {
  oninit: (vnode) => {
    vnode.submit = (e) => {
      e.preventDefault();
      const token = localStorage.getItem("__token");
      const id = $("#userid").value;
      const oldpassword = $("#oldpassword").value;
      const newpassword = $("#newpassword").value;
      const repeatpassword = $("#repeatpassword").value;
      if (newpassword !== repeatpassword) {
        showError("Password repeated incorrectly");
        return false;
      }
      m.request({
        method: "POST",
        url: config.BASE_API_URL + "/changepassword",
        data: { id, oldpassword, newpassword },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        },
        // withCredentials: true,
      })
        .then((result) => {
          if (result.status === "success") {
            m.route.set("/list", {});
          } else {
            showError("ERROR: " + result.message);
          }
        })
        .catch((err) => {
          console.log(err)
        });
      return false;
    }
  },
  view: (vnode) => {
    return m("form", [
      m("input#userid[name='userid'][type='hidden']", { value: m.route.param("id") }),
      m(".form-group", [
        m("label[for='oldpassword']", "Old password"),
        m("input#oldpassword.form-control[name='oldpassword'][placeholder='Old password'][type='password']")
      ]),
      m(".form-group", [
        m("label[for='newpassword']", "New password"),
        m("input#newpassword.form-control[name='newpassword'][placeholder='New password'][type='password']")
      ]),
      m(".form-group", [
        m("label[for='repeatpassword']", "Repeat password"),
        m("input#repeatpassword.form-control[name='repeatpassword'][placeholder='Repeat password'][type='password']")
      ]),
      m("br"),
      m("button.btn.btn-primary[type='submit']", { onclick: vnode.submit }, "Submit")
    ]);
  }
}
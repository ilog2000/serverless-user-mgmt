import m from "mithril";
import config from "../config.js";
import { $, showError } from "../utils.js";

export default {
  oninit: (vnode) => {
    vnode.submit = (e) => {
      e.preventDefault();
      const password = $("#password").value;
      const repeatpassword = $("#repeatpassword").value;
      if (password !== repeatpassword) {
        showError("Password repeated incorrectly");
        return false;
      }
      const token = localStorage.getItem("__token");
      const user = {
        email: $("#email").value,
        password: password,
        first_name: $("#firstName").value,
        last_name: $("#lastName").value,
        picture: $("#picture").value,
        role: $("#role").value,
        active: $("#active").checked,
      };
      m.request({
        method: "POST",
        url: config.BASE_API_URL + "/api/v1/users",
        data: user,
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
          }
          else {
            showError("ERROR: " + result.message);
          }
        })
        .catch((err) => { console.log(err) });
      return false;
    }
  },
  view: (vnode) => {
    return m("form", [
      m(".form-group", [
        m("label[for='email']", "Email address"),
        m("input#email.form-control[name='email'][placeholder='Email address'][type='email']"),
      ]),
      m(".form-group", [
        m("label[for='password']", "Password"),
        m("input#password.form-control[name='password'][placeholder='Password'][type='password']")
      ]),
      m(".form-group", [
        m("label[for='repeatpassword']", "Repeat password"),
        m("input#repeatpassword.form-control[name='repeatpassword'][placeholder='Repeat password'][type='password']")
      ]),
      m(".form-group", [
        m("label[for='firstName']", "First name"),
        m("input#firstName.form-control[name='firstName'][placeholder='First name'][type='text']")
      ]),
      m(".form-group", [
        m("label[for='lastName']", "Last name"),
        m("input#lastName.form-control[name='lastName'][placeholder='Last name'][type='text']")
      ]),
      m(".form-group", [
        m("label[for='picture']", "Picture"),
        m("input#picture.form-control[name='picture'][disabled='disabled'][type='text']", { value: "unknown.png"})
      ]),
      m(".form-group", [
        m("label[for='role']", "Role"),
        m("select#role.form-control[name='role']", [
          m("option", "none"),
          m("option", "admin"),
          m("option", "developer"),
          m("option", "editor"),
        ])
      ]),
      m(".form-check", [
        m("input#active.form-check-input[name='active'][type='checkbox']"),
        m("label.form-check-label[for='active']", "Active")
      ]),
      m("br"),
      m("button.btn.btn-primary[type='submit']", { onclick: vnode.submit }, "Save")
    ]);
  }
}

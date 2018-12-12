import m from "mithril";
import config from "../config.js";
import { $, showError } from "../utils.js";

export default {
  oninit: (vnode) => {
    vnode.submit = (e) => {
      e.preventDefault();
      const email = $("#email").value;
      const password = $("#password").value;
      m.request({
        method: "POST",
        url: config.BASE_API_URL + "/login",
        data: { email, password },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        // withCredentials: true,
      })
        .then((result) => {
            localStorage.setItem("__token", result.token);
            m.route.set("/list", {});
        })
        .catch((err) => {
          showError("ERROR: " + err.message);
        });
      return false;
    }
  },
  view: (vnode) => {
    return m("div.container", [
      m(".vspace"),
      m(".err"),
      m("#signin",
        m(".card.card-body.w-75",
          m("form", [
            m(".form-group", [
              m("label[for='email']", "Email address"),
              m("input#email.form-control[name='email'][aria-describedby='emailHelp'][placeholder='Enter email'][type='email']"),
              m("small#emailHelp.form-text.text-muted", "We'll never share your email with anyone else.")
            ]),
            m(".form-group", [
              m("label[for='password']", "Password"),
              m("input#password.form-control[name='password'][placeholder='Password'][type='password']")
            ]),
            m("br"),
            m("button.btn.btn-primary[type='submit']", { onclick: vnode.submit }, "Submit")
          ])
        )
      ),
    ]);
  }
}
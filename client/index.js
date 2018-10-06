import "./css/styles.css";

import m from "mithril";

import Layout from "./components/Layout.js";
import Login from "./components/Login.js";
import UserList from "./components/UserList.js";
import UserForm from "./components/UserForm.js";
import ChangePassword from "./components/ChangePassword.js";
import NewUserForm from "./components/NewUserForm.js";

// m.render(document.body, "Hello world!!!");
// m.mount(document.body, Login);
m.route(document.body, "/login", {
  "/login": {
    render: () => {
      return m(Login);
    }
  },
  "/list": {
    render: () => {
      return m(Layout, m(UserList));
    }
  },
  "/edit/:id": {
    render: () => {
      return m(Layout, m(UserForm));
    }
  },
  "/newuser/": {
    render: () => {
      return m(Layout, m(NewUserForm));
    }
  },
  "/changepassword/:id": {
    render: () => {
      return m(Layout, m(ChangePassword));
    }
  },
});
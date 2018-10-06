import m from "mithril";

export default {
  oninit: (vnode) => {
    vnode.logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("__token");
      m.route.set("/login", {});
      return false;
    }
  },
  view: (vnode) => {
    return m("#menubar",
      m("ul.nav.justify-content-center", [
        m("li.nav-item",
          m("a.nav-link[href='/list']", { oncreate: m.route.link }, "Users")
        ),
        m("li.nav-item",
          m("a.nav-link.active[href='/login']", { onclick: vnode.logout }, "LogOut")
        )
      ]),
      m("div.container", [
        m(".vspace"),
        m(".err"),
        m("section", vnode.children),
      ]));
  }
}
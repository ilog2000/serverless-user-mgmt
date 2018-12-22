import m from 'mithril';
import ErrorPopup from './ErrorPopup';

export default {
  oninit: vnode => {
    vnode.logout = e => {
      e.preventDefault();
      localStorage.removeItem('__token');
      localStorage.removeItem('__email');
      m.route.set('/login', {});
    };
  },

  view: vnode => {
    return [
      m(ErrorPopup),
      m('ul.nav.justify-content-center', [
        m('li.nav-item', m("a.nav-link[href='/list']", { oncreate: m.route.link }, 'Users')),
        m('li.nav-item', m("a.nav-link.active[href='/login']", { onclick: vnode.logout }, 'LogOut')),
      ]),
      m('hr'),
      m('div.container', m('section', vnode.children)),
    ];
  },
};

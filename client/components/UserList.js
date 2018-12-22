import m from 'mithril';
import User from '../models/UserVM.js';

const del = async e => {
  e.preventDefault();
  if (confirm('Are you sure?')) {
    const url = new URL(e.currentTarget.href);
    const id = url.pathname.replace('/delete/', '');
    User.delete(id);
  }
};

export default {
  oninit: vnode => {
    User.loadList();
    vnode.state.email = localStorage.getItem('__email');
  },
  view: vnode => {
    return m('div', [
      m('div', m('a.btn.btn-secondary', { href: '/newuser/', oncreate: m.route.link }, 'New user')),
      m('br'),
      m('table.table', [
        m(
          'thead',
          m('tr', [
            m("th[scope='col']", 'ID'),
            m("th[scope='col']", 'First name'),
            m("th[scope='col']", 'Last name'),
            m("th[scope='col']", 'Actions'),
            m("th[scope='col']", ''),
            m("th[scope='col']", ''),
          ])
        ),
        m(
          'tbody',
          User.list.map(user => {
            return m('tr', [
              m('td', user.id),
              m('td', user.first_name),
              m('td', user.last_name),
              m('td', m('a', { href: '/edit/' + user.id, oncreate: m.route.link }, 'Edit')),
              m(
                'td',
                m(
                  'a',
                  {
                    href: '/changepassword/' + user.id,
                    oncreate: m.route.link,
                    class: vnode.state.email !== user.email ? 'disabled' : '',
                  },
                  'Change password'
                )
              ),
              m('td', m('a', { href: '/delete/' + user.id, onclick: del }, 'Delete')),
            ]);
          })
        ),
      ]),
    ]);
  },
};

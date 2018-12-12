import m from 'mithril';
import User from '../models/User.js';

export default {
  oninit: () => {
    User.load(m.route.param('id'));
  },
  view: () => {
    return m(
      'form',
      {
        onsubmit: e => {
          e.preventDefault();
          User.update();
        }
      },
      [
        m('.form-group', [
          m("label[for='userid']", 'ID'),
          m("input#userid.form-control[name='userid'][type='text'][readonly]",
            { value: User.current.id }
          )
        ]),
        m('.form-group', [
          m("label[for='email']", 'Email address'),
          m("input#email.form-control[name='email'][type='email'][readonly]",
            { value: User.current.email }
          )
        ]),
        m('.form-group', [
          m("label[for='firstName']", 'First name'),
          m("input#firstName.form-control[name='firstName'][type='text'][readonly]",
            {
              oninput: m.withAttr('value', value => {
                User.current.first_name = value;
              }),
              value: User.current.first_name
            }
          )
        ]),
        m('.form-group', [
          m("label[for='lastName']", 'Last name'),
          m("input#lastName.form-control[name='lastName'][type='text'][readonly]",
            {
              oninput: m.withAttr('value', value => {
                User.current.last_name = value;
              }),
              value: User.current.last_name
            }
          )
        ]),
        m('.form-group', [
          m("label[for='role']", 'Role'),
          m("select#role.form-control[name='role']",
            {
              onclick: m.withAttr('value', value => {
                User.current.role = value;
              }),
              value: User.current.role
            },
            [
              m('option', 'none'),
              m('option', 'admin'),
              m('option', 'developer'),
              m('option', 'editor')
            ]
          )
        ]),
        m('.form-check', [
          m("input#active.form-check-input[name='active'][type='checkbox']",
            {
              onclick: m.withAttr('checked', value => {
                User.current.active = value;
              }),
              checked: User.current.active
            }
          ),
          m("label.form-check-label[for='active']", 'Active')
        ]),
        m('br'),
        m("button.btn.btn-primary[type='submit']", 'Save')
      ]
    );
  }
};

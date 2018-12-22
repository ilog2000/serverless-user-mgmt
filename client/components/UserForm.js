import m from 'mithril';
import User from '../models/UserVM';

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
        },
      },
      [
        m('.form-group', [
          m("label[for='userid']", 'ID'),
          m("input#userid.form-control[name='userid'][type='text'][readonly]", {
            value: User.current.id(),
          }),
        ]),
        m('.form-group', [
          m("label[for='email']", 'Email address'),
          m("input#email.form-control[name='email'][type='email'][readonly]", {
            value: User.current.email(),
          }),
        ]),
        m('.form-group', [
          m("label[for='firstName']", 'First name'),
          m("input#firstName.form-control[name='firstName'][type='text'][readonly]", {
            value: User.current.first_name(),
          }),
        ]),
        m('.form-group', [
          m("label[for='lastName']", 'Last name'),
          m("input#lastName.form-control[name='lastName'][type='text'][readonly]", {
            value: User.current.last_name(),
          }),
        ]),
        m('.form-group', [
          m("label[for='role']", 'Role'),
          m(
            "select#role.form-control[name='role']",
            {
              oninput: e => User.current.role(e.target.value),
              value: User.current.role(),
            },
            [m('option', 'none'), m('option', 'admin'), m('option', 'developer'), m('option', 'editor')]
          ),
        ]),
        m('.form-check', [
          m("input#active.form-check-input[name='active'][type='checkbox']", {
            oninput: e => User.current.active(e.target.checked ? true : false),
            checked: User.current.active(),
          }),
          m("label.form-check-label[for='active']", 'Active'),
        ]),
        m('br'),
        m("button.btn.btn-primary.float-right[type='submit']", 'Save'),
      ]
    );
  },
};

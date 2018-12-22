import m from 'mithril';
import stream from 'mithril-stream';
import User from '../models/UserVM';
import { showError, getPOJO } from '../utils.js';

const Model = {
  id: stream(''),
  email: stream(''),
  first_name: stream(''),
  last_name: stream(''),
  picture: stream('unknown.png'),
  role: stream(''),
  active: stream(false),
  password: stream(''),
  repeatpassword: stream(''),
};

export default {
  oninit: vnode => {
    vnode.submit = async e => {
      e.preventDefault();

      if (Model.password() === '') {
        showError('Password cannot be empty');
        return;
      }

      if (Model.password() !== Model.repeatpassword()) {
        showError('Password repeated incorrectly');
        return;
      }

      const user = getPOJO(Model);
      User.create(user);
    };
  },

  view: vnode => {
    return m('form', [
      m('.form-group', [
        m("label[for='email']", 'Email address'),
        m("input#email.form-control[name='email'][placeholder='Email address'][type='email']", {
          value: Model.email(),
          oninput: e => Model.email(e.target.value),
        }),
      ]),
      m('.form-group', [
        m("label[for='password']", 'Password'),
        m("input#password.form-control[name='password'][placeholder='Password'][type='password']", {
          value: Model.password(),
          oninput: e => Model.password(e.target.value),
        }),
      ]),
      m('.form-group', [
        m("label[for='repeatpassword']", 'Repeat password'),
        m("input#repeatpassword.form-control[name='repeatpassword'][placeholder='Repeat password'][type='password']", {
          value: Model.repeatpassword(),
          oninput: e => Model.repeatpassword(e.target.value),
        }),
      ]),
      m('.form-group', [
        m("label[for='firstName']", 'First name'),
        m("input#firstName.form-control[name='firstName'][placeholder='First name'][type='text']", {
          value: Model.first_name(),
          oninput: e => Model.first_name(e.target.value),
        }),
      ]),
      m('.form-group', [
        m("label[for='lastName']", 'Last name'),
        m("input#lastName.form-control[name='lastName'][placeholder='Last name'][type='text']", {
          value: Model.last_name(),
          oninput: e => Model.last_name(e.target.value),
        }),
      ]),
      m('.form-group', [
        m("label[for='picture']", 'Picture'),
        m("input#picture.form-control[name='picture'][disabled='disabled'][type='text']", {
          value: Model.picture(),
        }),
      ]),
      m('.form-group', [
        m("label[for='role']", 'Role'),
        m(
          "select#role.form-control[name='role']",
          {
            value: Model.role(),
            oninput: e => Model.role(e.target.value),
          },
          [m('option', 'none'), m('option', 'admin'), m('option', 'developer'), m('option', 'editor')]
        ),
      ]),
      m('.form-check', [
        m("input#active.form-check-input[name='active'][type='checkbox']", {
          value: Model.active(),
          oninput: e => Model.active(e.target.value),
        }),
        m("label.form-check-label[for='active']", 'Active'),
      ]),
      m('br'),
      m("button.btn.btn-primary.float-right[type='submit']", { onclick: vnode.submit }, 'Save'),
    ]);
  },
};

import m from 'mithril';
import Auth from '../models/AuthVM';

export default {
  oninit: vnode => {
    Auth.id(m.route.param('id'));
    Auth.oldpassword('');
    Auth.newpassword('');
    Auth.repeatpassword('');

    vnode.submit = async e => {
      e.preventDefault();
      Auth.changePassword();
    };
  },

  view: vnode => {
    return m('form', [
      m('.form-group', [
        m("label[for='oldpassword']", 'Old password'),
        m("input#oldpassword.form-control[name='oldpassword'][placeholder='Old password'][type='password']", {
          oninput: e => Auth.oldpassword(e.target.value),
          value: Auth.oldpassword(),
        }),
      ]),
      m('.form-group', [
        m("label[for='newpassword']", 'New password'),
        m("input#newpassword.form-control[name='newpassword'][placeholder='New password'][type='password']", {
          oninput: e => Auth.newpassword(e.target.value),
          value: Auth.newpassword(),
        }),
      ]),
      m('.form-group', [
        m("label[for='repeatpassword']", 'Repeat password'),
        m("input#repeatpassword.form-control[name='repeatpassword'][placeholder='Repeat password'][type='password']", {
          oninput: e => Auth.repeatpassword(e.target.value),
          value: Auth.repeatpassword(),
        }),
      ]),
      m('br'),
      m(
        "button.btn.btn-primary[type='submit']",
        {
          disabled: !Auth.validateChangePassword(),
          onclick: vnode.submit,
        },
        'Submit'
      ),
    ]);
  },
};

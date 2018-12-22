import m from 'mithril';
import Auth from '../models/AuthVM';
import ErrorPopup from './ErrorPopup';

export default {
  oninit: vnode => {
    Auth.email('');
    Auth.password('');

    vnode.submit = async e => {
      e.preventDefault();
      Auth.login();
    };
  },

  view: vnode => {
    return [
      m(ErrorPopup),
      m('div.container', [
        m('.vspace'),
        m(
          '#signin',
          m(
            '.card.card-body.mx-auto.w-50',
            m('form', [
              m('.form-group', [
                m('label[for="email"]', 'Email address'),
                m(
                  'input#email.form-control[name="email"][aria-describedby="emailHelp"][placeholder="Email"][type="email"]',
                  {
                    value: Auth.email(),
                    oninput: e => Auth.email(e.target.value),
                  }
                ),
                m('small#emailHelp.form-text.text-muted', "We'll never share your email with anyone else."),
              ]),
              m('.form-group', [
                m('label[for="password"]', 'Password'),
                m('input#password.form-control[name="password"][placeholder="Password"][type="password"]', {
                  value: Auth.password(),
                  oninput: e => Auth.password(e.target.value),
                }),
              ]),
              m('br'),
              m(
                'button.btn.btn-primary.float-right[type="submit"]',
                {
                  disabled: !Auth.validateLogin(),
                  onclick: vnode.submit,
                },
                'Submit'
              ),
            ])
          )
        ),
      ]),
    ];
  },
};

import m from 'mithril';
import { hideError } from '../utils';

export default {
  oninit: vnode => {
    vnode.close = async e => {
      e.preventDefault();
      hideError();
    };
  },

  view: vnode => {
    return m(".err.alert.alert-danger.alert-dismissible.fade.show[role='alert']", [
      m('section'),
      m(
        "button.close[aria-label='Close'][data-dismiss='alert'][type='button']",
        { onclick: vnode.close },
        m("span[aria-hidden='true']", m.trust('&times;'))
      ),
    ]);
  },
};

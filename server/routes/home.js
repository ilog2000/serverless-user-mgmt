const Router = require('koa-router');
const ctr = require('../controllers/home.js');
const setRolePermissions = require('../middleware/setRolePermissions.js');

const router = new Router();

// just for debugging
router.get('/ping', (ctx) => {
	ctx.body = new Date().toLocaleString();
});

router.post('/register', ctr.postRegister);
router.post('/login', ctr.postLogin);
router.post('/refreshtoken', ctr.postRefreshToken);
router.post('/changepassword', setRolePermissions, ctr.postChangePassword);

module.exports = router;

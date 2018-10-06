const Router = require('koa-router');
const ctr = require('../controllers/users.js');
const setRolePermissions = require('../middleware/setRolePermissions.js');

const router = new Router({
	prefix: '/api/v1/users'
});

router.get('/', setRolePermissions, ctr.getUsers); // get all
router.get('/:id', setRolePermissions, ctr.getUser); // get single
router.post('/', setRolePermissions, ctr.postUser); // create
router.put('/:id', setRolePermissions, ctr.putUser); // update
router.del('/:id', setRolePermissions, ctr.deleteUser); // delete

module.exports = router;

const router=require('express').Router();
const {registerUser,loginUser,verifyUser,userProfile,changeUserPassword}=require('../controllers/user');
const {authorization,authenticateHeaderToken}=require('../middlewares/authorization');

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/verify/:token",verifyUser)
router.get('/profile',authenticateHeaderToken,userProfile);
router.post('/update_password',authenticateHeaderToken,changeUserPassword)

module.exports = router;

const crypto=require('crypto');
const genRandomToken=()=>{
    return crypto.randomBytes(20).toString('hex');
}
module.exports = {
    genRandomToken
};

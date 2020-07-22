module.exports = {
    HashSecret: process.env.HASH_SECRET || 'Monica',
    jwtSecret: process.env.JWT_SECRET || '8675309',
    adminSecret: process.env.ADMIN_SECRET || 'admin',
    passSecret: process.env.PASS_SECRET || 'pass'
}
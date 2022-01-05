var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

/* GET users listing. */

const { getProduitById, getProduitByUser, addProduct, getProduits,deleteProduit,creeProduitSql,getProduitSql,getProduitByIdSql } = require('../Controllers/productContoller')

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/products11/delete/:id', deleteProduit)

router.get('/products', getProduitByUser)
router.get('/products/all', getProduits)
router.post('/products', upload.single('image'), addProduct)
router.get('/mysql/all', getProduitSql)
router.get('/sql/:id', getProduitByIdSql)
router.post('/getsql', creeProduitSql)
module.exports = router;
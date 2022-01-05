const Product = require('../Models/Product')
const db = require("../config/db");
const util = require("util");
const query = util.promisify(db.query).bind(db);


const users = [
    "213ESP0190",
    "213ESP0191",
    "213ESP0192",
    "213ESP0193",
    "213ESP0194"
];
// const addProduct =  async (req, res) => {
//     const { id } = req.headers;
//     if (!id) {
//         return res.status(401).end();
//     }

//     if (users.indexOf(id) == -1) {
//         return res.status(404).end();
//     }


//     const product = new Product({
//         ...req.body
//     });

//     if (req.file) {
//         product.image = req.file.path;
//     }
//     product.user = id;
//     await product.save();
//     res.json(product)


// }

const addProduct = async(req, res) => {
    const { id } = req.headers;
    if (!id) {
        return res.status(401).end();
    }

    if (users.indexOf(id) == -1) {
        return res.status(404).end();
    }


    try {

        const produit = new Product({
            label: req.body.label,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.file.path,
        })
        produit.user = id
        const newProduit = await produit.save()

        res.status(201).json(newProduit)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getProduits = async(req, res) => {
    const produit = await Product.find({})

    res.render("list", { produit });
}
const getProduitById = async(req, res) => {
    const produit = await Product.findById(req.params.id)
    if (produit) {
        res.render("details", { produit });

    } else {
        res.status(404).json("produit introuvable")
    }
}
const getProduitByUser = async(req, res) => {
    const produit = await Product.findOne(req.body.user)
    if (produit) {
        res.status(200).json(produit)

    } else {
        res.status(404).json("produit introuvable")
    }
}
const deleteProduit = async(req, res) => {
    const { id } = req.params;
    await Product.remove({ _id: id });
    res.redirect('/users/products/all');
}
const creeProduitSql = async(req,res)=>{
    const {label,price,quantity}=req.body;
    const insertQuery = await  "INSERT INTO `produit` (`label`,`price`,`quantity`) VALUES (?,?,?)"
    const resultIsert =await query(insertQuery,[label,price,quantity])
    res.json(resultIsert)
}
const getProduitSql =async(req,res)=>{
    const getQuery= await"SELECT * FROM `produit`"
    const resultGet = await query(getQuery)
    res.json(resultGet)
}
const  getProduitByIdSql = async(req,res)=>{
    const {id}=req.params
    const byIdQuery = await "SELECT * FROM `produit` WHERE `label` =? LIMIT 1 "
    const isUserFound = await query(byIdQuery, [id]);
    res.json(isUserFound)

}
module.exports = { getProduitById, getProduitByUser, addProduct, getProduits,deleteProduit,creeProduitSql,getProduitSql,getProduitByIdSql }
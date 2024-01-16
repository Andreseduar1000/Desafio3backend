const express = require('express')
const ProductManager=require('../data/Product')



const app = express();
const productManager = new ProductManager();


console.log(productManager.getProducts());


app.get('/', (req, res) => {    
    res.send('Bienvenidos al Ecommerce');
});


app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

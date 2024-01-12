const express= require ('express')
const fs=require ('fs')

let Product=[{
    tittle:"Arroz",
    description:"Grano de arroz",
    price: 1800,
    thumbnail:"https://s1.eestatic.com/2021/05/31/actualidad/585453954_186766988_1706x960.jpg",
    code:121,
    stock:300
},
{
    tittle:"Azucar",
    description:"Grano de cana de azucar",
    price: 1200,
    thumbnail:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elconfidencial.com%2Falma-corazon-vida%2F2017-02-14%2Ftipos-azucar-que-es-glucosa-fructosa-sacarosa_1331040%2F&psig=AOvVaw3k65rspq5xoojY6lQ9QDZV&ust=1702937820949000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCn3_C_l4MDFQAAAAAdAAAAABAD",
    code:443,
    stock:200
},
{
    tittle:"Rexona",
    description:"Antitranspirante con olor",
    price: 600,
    thumbnail:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.farmaciassanchezantoniolli.com.ar%2Fdesodorantes%2F614-desodorante-antitranspirante-rexona-mujer-nutritive-en-aerosol-150ml-7791293041735.html&psig=AOvVaw1rgGyj9MZKDRpgbKjO_9xW&ust=1702937852604000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDi9_-_l4MDFQAAAAAdAAAAABAL",
    code:456,
    stock:100
},
{
    tittle:"Harina pan",
    description:"Harina de maiz precocida",
    price: 980,
    thumbnail:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.blogs.es%2F56a235%2Fistock-1006847760%2F450_1000.jpg&tbnid=Ry5tXmYjhq_L_M&vet=12ahUKEwi92rihwJeDAxWwA7kGHbzhDBEQMygEegQIARB8..i&imgrefurl=https%3A%2F%2Fwww.directoalpaladar.com%2Fingredientes-y-alimentos%2Fcomo-se-hace-harina-p-a-n-popular-venezuela-que-recetas-se-utiliza&docid=6k6DcTdicKcv-M&w=450&h=300&q=harina%20pan&ved=2ahUKEwi92rihwJeDAxWwA7kGHbzhDBEQMygEegQIARB8",
    code:868,
    stock:90
},
{
    tittle:"Leche",
    description:"Leche Pasteurizada Completa",
    price: 490,
    thumbnail:"https://www.google.com/url?sa=i&url=https%3A%2F%2Frojasglutenfree.com%2Fproductos%2Fleche-entera-clasica-1-litro-la-serenisima%2F&psig=AOvVaw0mo5S_2d6hdNSveAai62BO&ust=1702937955903000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCi0bLAl4MDFQAAAAAdAAAAABAD",
    code:256,
    stock:989
}

]

fs.writeFile('./productsJson.json', JSON.stringify(Product, null, 2), (error) => {
    if (error) {
        console.error('Error al escribir el archivo', error);
    } else {
        readJsonFile();
    }
    });
    
    function readJsonFile() {
    fs.readFile('./productsJson.json', 'utf-8', (err, data) => {
        if (err) {
        console.error('Error en la lectura', err);
        } else {
        try {
            const Arrayt = JSON.parse(data);

            class ProductManager {
            constructor() {
                this.id = 0;
                this.path = Arrayt.map(product => ({ ...product, id: this.id++ }));
            }

            getProducts() {
                return this.path;
            }
            // METODO AGREGAR PRODUCTOS
            addProduct({ tittle, description, price, thumbnail, code, stock }) {
                if (!this.path.some((p) => p.code === code)) {
                let newProduct = { id: this.id++, tittle, description, price, thumbnail, code, stock };
                this.path.push(newProduct);
                console.log(newProduct);
                } else {
                console.log(`Ya se encuentra un producto con el código ${code}`);
                }
            }
            //METODO DE OBTENER EL ID
            getproductByid(id){
                let product=this.path.find((p)=>p.id===id)
                return product

            }
            //METODO UPDATE
            updateProduct(id, { tittle, description, price, thumbnail, code, stock }) {
                let index = this.path.findIndex((p) => p.id === id);
    
                if (index !== -1) {
                    this.path[index] = { id, tittle, description, price, thumbnail, code, stock };
                } else {
                    console.log(`No se encontró un producto con el ID ${id}`);
                }
            }
            //METODO DE ELIMINAR UN PRODUCTO A APRTIR DEL ID
            deleteProduct(id) {
                let index = this.path.findIndex((p) => p.id === id);
    
                if (index !== -1) {
                    this.path.splice(index, 1);
                    console.log(`Producto con ID ${id} eliminado`);
                } else {
                    console.log(`No se encontró un producto con el ID ${id}`);
                }
            }


            
            }
            console.log('--------------------------------------------------------------------')
            const productManager = new ProductManager();
            console.log(productManager.getProducts());
    
            productManager.updateProduct(3, {
                tittle: "Caramelos",
                description: "bastones dulces",
                price: 2000,
                thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpampadirect.com%2Fpico-dulce-chupetin-fruit-rainbow-lollipop-favorite-candy-popular-for-parties-birthdays-672-g-23-7-oz-box-of-48%2F&psig=AOvVaw3GFtxXPdatXubMIVLF1DO-&ust=1704146186156000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCIjskrTVuoMDFQAAAAAdAAAAABAE",
                code: 888,
                stock: 30
                });
                let findproduct3 = productManager.getproductByid(3);
                if (findproduct3) {
                    console.log("El producto actualizado es:", findproduct3);
                    } else {
                    console.log("Not Found");
                    }
            
                
        console.log("----------------------------------------");
        let findproduct = productManager.getproductByid(20);

        if (findproduct) {
        console.log("El producto a localizar es:", findproduct);
        } else {
        console.log("Not Found");
        }

        console.log("----------------------------------------");

        let findproduct2 = productManager.getproductByid(2);

        if (findproduct2) {
        console.log("El producto a localizar en ID es:", findproduct2);
        } else {
        console.log("Not Found");
        }
        console.log('--------------------------------------------------------------')
        //Eliminamos el producto:
        productManager.deleteProduct(4);
        console.log('Lista de productos después de eliminar:');
        console.log(productManager.getProducts());


        } catch (error) {
            console.error('Error al utilizar JSON', error);
        }


        }
    });
}

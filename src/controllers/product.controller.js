import {createProduct, verifyProduct, productsList, getProduct, deleteProduct} from '../database/product.database.js'
import {getCategory} from '../database/category.database.js'

const createProductController = async(req, res) => {
    try {

        const {name, description, price, stock, imagen} = req.body
        const { categories_id } = req.params;

        let info = {
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            stock: parseInt(stock),
            imagen: req.file.path,
            categories_id
        };

        const verifyCategory = await getCategory(info.categories_id)

        if(!verifyCategory[0]){
            return res.status(400).json({
                ok: false,
                msg: "Categoria no encontrada"
            })
        }

        if(!info.name || !info.description || !info.price || !info.stock){
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            })
        }

        if (!req.file || !req.file.path) {
            return res.status(400).json({
                ok: false, 
                msg: "La imagen es obligatoria" 
            });
        }

        const verifyName = await verifyProduct("name", info.name)

        if(verifyName[0]){
            return res.status(400).json({
                ok: false,
                msg: "Producto ya registrado"
            })
        }

        const verifyDescription = await verifyProduct("description", info.description)

        if (verifyDescription[0]) {
            return res.status(400).json({
                ok: false,
                msg: "Descripcion en uso, por favor elija otra",
            });
        }

        if (isNaN(info.price) || isNaN(info.stock)) {
            return res.status(400).json({
                ok: false,
                msg: "El precio y el stock deben ser números válidos"
            });
        }

        if(info.price <= 0) {
            return res.status(400).json({
                ok: false,
                msg: "No se puedo establecer el precio"
            })
        }
        
        if(info.stock <= 0) {
            return res.status(400).json({
                ok: false,
                msg: "No se puedo establecer el stock"
            })
        }

        const newProduct = await createProduct(info)

        if(!newProduct[0]){
            return res.status(400).json({
                ok: false,
                msg: "No se pudo crear el producto"
            })
        }

        return res.status(201).json({
            ok: true,
            msg: "Producto creado exitosamente",
            data: newProduct[0]
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}


const productsListController = async (req, res) => {
    try {

        const data = await productsList();

        if (!data[0]) {
            return res.status(400).json({
            ok: false,
            msg: "No se pudieron listar los productos",
            });
        }

        return res.status(200).json({
            ok: true,
            data: data
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}


const getProductController = async (req, res) => {
    try {
        const {id} = req.params
        const data = await getProduct(id);

        if(!data[0]){
            return res.status(400).json({
                ok: false,
                msg: "Producto no encontrado"
            })
        }

        return res.status(201).json({
            ok: true,
            data: data[0]
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}


const deleteProductController = async (req, res) => {
    try {

        const {id} = req.params
        const data = await deleteProduct(id);

        if (!data[0]) {
            return res.status(400).json({
                ok: false,
                msg: "No se pudo eliminar el producto",
            });
        }

        return res.status(201).json({
            ok: true,
            msg: "Producto eliminado exitosamente"
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

export {
    createProductController,
    productsListController,
    getProductController,
    deleteProductController
}
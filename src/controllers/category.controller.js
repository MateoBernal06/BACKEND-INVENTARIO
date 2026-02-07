import {categories} from '../database/category.database.js'

const viewCategories = async(req, res) => {
    try {
        const data = await categories()

        if(!data[0]){
            return res.status(400).json({
                ok: false,
                msg: 'Lista de categorias no encontradas'
            })
        }

        return res.status(200).json({
            ok: true,
            data: data 
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`
        });
    }
}

export {viewCategories}
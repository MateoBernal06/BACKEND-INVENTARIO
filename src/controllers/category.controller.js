import {categoriesList, verifyName, verifyDescription, addCategory, verifyCode, updateCategory, deleteCategory} from '../database/category.database.js'

const viewCategories = async(req, res) => {
    try {
        const data = await categoriesList()

        if(!data[0]){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudieron listar las categorias'
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

const createCategories = async(req, res) => {
    try {

        const { name, description, code } = req.body;

        let nameCategory = name.trim()
        let descriptionCategory = description.trim()
        let codeCategory = code.trim()

        if(!nameCategory || !descriptionCategory || !codeCategory){
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const verificateName = await verifyName(nameCategory)
        
        if(verificateName[0]){
            return res.status(400).json({
                ok: false,
                msg: "Categoria ya existente"
            })
        }

        const verificateDescription = await verifyDescription(descriptionCategory)

        if(verificateDescription[0]){
            return res.status(400).json({
                ok: false,
                msg: "Descripcion ya existente"
            });
        }

        if(codeCategory.length!=3){
            return res.status(400).json({
                ok: false,
                msg: "El codigo de la categoria debe tener 3 digitos" 
            })
        }

        const verificateCode = await verifyCode(codeCategory)

        if(verificateCode[0]){
            return res.status(400).json({
                ok: false,
                msg: "Codigo existente"
            });
        }

        await addCategory({
            name: nameCategory,
            description: descriptionCategory,
            code: codeCategory
        })

        return res.status(200).json({
            ok: true,
            msg: "Categoria creada exitosamente"
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`
        });
    }
}

const updateCategories = async(req, res) => {
    try {
        const {code} = req.params
        const {name, description} = req.body

        let nameCategory = name.trim()
        let descriptionCategory = description.trim()

        const verify = await verifyCode(code)

        if(!verify[0]){
            return res.status(400).json({
                ok: false,
                msg: "Categoria no existente"
            })  
        }

        const verificateName = await verifyName(nameCategory)
        if(verificateName[0]){
            return res.status(400).json({
                ok: false,
                msg: "Nombre de categoria ya existente"
            })
        }

        const verificateDescription = await verifyDescription(descriptionCategory)
        if(verificateDescription[0]){
            return res.status(400).json({
                ok: false,
                msg: "Descripcion ya existente"
            });
        }

        if(!nameCategory || !descriptionCategory){
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            })
        }

        await updateCategory(code, {
            name: nameCategory,
            description: descriptionCategory
        })

        return res.status(200).json({
            ok: true,
            msg: "Categoria actualizada exitosamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

const deleteCategories = async(req, res) => {
    try {
        const {code} = req.params
        
        const verify = await verifyCode(code)
        if(!verify[0]){
            return res.status(400).json({
                ok: false,
                msg: "Categoria no existente"
            })
        }
        
        await deleteCategory(code)

        return res.status(200).json({
            ok: true,
            msg: " Categoria eliminada exitosamente"
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

export {
    viewCategories,
    createCategories,
    updateCategories,
    deleteCategories
}
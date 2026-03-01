import {categoriesList, verifyName, verifyDescription, addCategory, verifyId, updateCategory, deleteCategory, verifyCode, activivateCategory, inactivateCategory, getCategory} from '../database/category.database.js'

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
                msg: "Categoria existente"
            })
        }

        const verificateDescription = await verifyDescription(descriptionCategory)

        if(verificateDescription[0]){
            return res.status(400).json({
                ok: false,
                msg: "Descripcion existente"
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
            code: codeCategory.toUpperCase()
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

const getCategories = async(req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategory(id);

        if (!category[0]) {
            return res.status(404).json({
                ok: false,
                msg: "Categoria no encontrada",
            });
        }

        return res.status(200).json({
            ok: true,
            data: category[0],
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

const updateCategories = async(req, res) => {
    try {
        const {id} = req.params
        const {name, description, code} = req.body

        let nameCategory = name.trim()
        let descriptionCategory = description.trim()
        let codeCategory = code.trim()

        if(!nameCategory || !descriptionCategory || !codeCategory){
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            })
        }

        const verify = await verifyId(id)
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
                msg: "Nombre de categoria existente"
            })
        }

        const verificateDescription = await verifyDescription(descriptionCategory)
        if(verificateDescription[0]){
            return res.status(400).json({
                ok: false,
                msg: "Descripcion existente"
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

        await updateCategory(id, {
            name: nameCategory,
            description: descriptionCategory,
            code: codeCategory.toUpperCase()
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
        const {id} = req.params
        
        const verify = await verifyId(id)
        if(!verify[0]){
            return res.status(400).json({
                ok: false,
                msg: "Categoria no existente"
            })
        }
        
        await deleteCategory(id)

        return res.status(200).json({
            ok: true,
            msg: " Categoria eliminada"
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Se produjo un error: ${error.message}`,
        });
    }
}

const inactivateCategories = async(req, res) => {
    try {
        const {id} = req.params
        const verify = await verifyId(id)

        if (!verify[0]) {
            return res.status(400).json({
                ok: false,
                msg: "Categoria no existente"
            });
        }

        if (verify[0].status === false) {
            await activivateCategory(id)
            return res.status(200).json({
                ok: true,
                msg: "Categoria activada"
            });
        }

        if (verify[0].status === true) {
            await inactivateCategory(id)
            return res.status(200).json({
                ok: true,
                msg: "Categoria inactivada"
            });
        }

        
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
    deleteCategories,
    inactivateCategories,
    getCategories
}
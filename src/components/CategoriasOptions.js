import React, {useEffect, useState} from "react";
import CategoriaDataService from "../services/CategoriaService";

const CategoriasOptions = () => {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = () => {
        CategoriaDataService.getAll()
            .then(response => {
                setCategorias(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return categorias.map((categoria, index) => (
                <option value={categoria.id}>{categoria.nome}</option>
            ));
}

export default CategoriasOptions;

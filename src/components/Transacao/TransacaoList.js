import React, {useState, useEffect} from "react";
import TransacaoDataService from "../../services/TransacaoService";
import CategoriaDataService from "../../services/CategoriaService";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const TransacaoList = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [currentTransacao, setCurrentTransacao] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        getTransacoes();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const getTransacoes = () => {
        TransacaoDataService.getAll()
            .then(response => {
                setTransacoes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

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

    const refreshList = () => {
        getTransacoes();
        setCurrentTransacao(null);
        setCurrentIndex(-1);
    };

    function getCategoria(id) {
        CategoriaDataService.get(id)
            .then(response => {
                console.log(response.data)
                return response.data.nome;
            })
            .catch(e => {
                console.log(e)
            });
    }

    const setActiveTutorial = (tutorial, index) => {
        let categoria = getCategoria(tutorial.categoria);
        let transacao = {
            categoria: categoria,
            created_at: tutorial.created_at,
            id: tutorial.id,
            tipo: tutorial.tipo,
            titulo: tutorial.titulo,
            valor: tutorial.valor
        };
        console.log(transacao)
        setCurrentTransacao(transacao);
        setCurrentIndex(index);
    };

    const findByTitle = () => {
        TransacaoDataService.findByTitle(searchTitle)
            .then(response => {
                setTransacoes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    function arrumar_moeda(numero) {
        return numero.toFixed(2).replace('.', ',');
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Transações</h4>

                <ul className="list-group">
                    {transacoes.map((tutorial, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveTutorial(tutorial, index)}
                            key={index}
                        >
                            {tutorial.titulo}
                        </li>
                    ))}
                </ul>
            </div>


            <div className="col-md-6">
                {currentTransacao ? (
                    <div>
                        <h4>Transação</h4>
                        <div>
                            <label>
                                <strong>Titulo:</strong>
                            </label>{" "}
                            {currentTransacao.titulo}
                        </div>
                        <div>
                            <label>
                                <strong>Valor:</strong>
                            </label>{" "}
                            {arrumar_moeda(currentTransacao.valor)}
                        </div>
                        <div>
                            <label>
                                <strong>Tipo:</strong>
                            </label>{" "}
                            {currentTransacao.tipo == "1" ? "Entrada" : "Saida"}
                        </div>

                        <div>
                            <label>
                                <strong>Categoria:</strong>
                            </label>{" "}
                            {currentTransacao.categoria}
                        </div>

                        <Link
                            to={"/transacao/" + currentTransacao.id}>
                            <Button variant={"warning"}>
                                Editar
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransacaoList;

import React, {useState, useEffect} from "react";
import TransacaoDataService from "../../services/TransacaoService";
import {Button, Form} from "react-bootstrap";
import CategoriasOptions from "../CategoriasOptions";

const Transacao = props => {
    const initialTransacaoState = {
        id: null,
        titulo: "",
        valor: 0.00,
        tipo: "1",
        Transacao: "1",
        created_at: null
    };
    const [currentTransacao, setCurrentTransacao] = useState(initialTransacaoState);
    const [message, setMessage] = useState("");

    const getTransacao = id => {
        TransacaoDataService.get(id)
            .then(response => {
                setCurrentTransacao(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTransacao(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentTransacao({...currentTransacao, [name]: value});
    };

    const updateTransacao = () => {
        TransacaoDataService.update(currentTransacao.id, currentTransacao)
            .then(response => {
                console.log(response.data);
                setMessage("The Transacao was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTransacao = () => {
        TransacaoDataService.remove(currentTransacao.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/Transacaos");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentTransacao ? (
                <div className="edit-form">
                    <h4>Transacao</h4>
                    <Form>
                        <Form.Group controlId="addTransacao.titulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" name="titulo" value={currentTransacao.titulo} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="addTransacao.valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control type="number" name="valor" value={currentTransacao.valor} onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="addTransacao.tipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" name="tipo" value={currentTransacao.tipo} onChange={handleInputChange}>
                                <option value={"1"}>Entrada</option>
                                <option value={"2"}>Saida</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="addTransacao.ControlSelect1">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" name="categoria" value={currentTransacao.categoria}
                                          onChange={handleInputChange}>
                                <CategoriasOptions/>
                            </Form.Control>
                        </Form.Group>
                    </Form>

                    <Button variant={"danger"} className="mr-2" onClick={deleteTransacao}>
                        Deletar
                    </Button>

                    <Button
                        type="submit"
                        variant={"success"}
                        onClick={updateTransacao}
                    >
                        Atualizar
                    </Button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Transacao...</p>
                </div>
            )}
        </div>
    );
};

export default Transacao;

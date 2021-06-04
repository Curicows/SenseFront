import React, {useState} from "react";
import TutorialDataService from "../../services/TransacaoService";
import {Button, Form} from "react-bootstrap";
import CategoriasOptions from "../CategoriasOptions";

const AddTransacao = () => {
    const initialTutorialState = {
        id: null,
        titulo: "",
        valor: 0.00,
        tipo: "1",
        categoria: "1",
        created_at: null
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTutorial({...tutorial, [name]: value});
    };

    const saveTutorial = () => {
        TutorialDataService.create(tutorial)
            .then(response => {
                console.log(response.data);
                setTutorial({
                    id: response.data.id,
                    titulo: response.data.titulo,
                    valor: response.data.valor,
                    tipo: response.data.tipo,
                    categoria: response.data.categoria,
                    created_at: response.data.created_at
                });

            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <Form>
                        <Form.Group controlId="addTransacao.titulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" name="titulo" value={tutorial.titulo} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="addTransacao.valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control type="number" name="valor" value={tutorial.valor} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="addTransacao.tipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" name="tipo" value={tutorial.tipo} onChange={handleInputChange}>
                                <option value={"1"}>Entrada</option>
                                <option value={"2"}>Saida</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="addTransacao.ControlSelect1">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" name="categoria" value={tutorial.categoria} onChange={handleInputChange}>
                                <CategoriasOptions />
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={saveTutorial}>
                            Enviar
                        </Button>
                    </Form>

                </div>
            )}
        </div>
    );
};

export default AddTransacao;

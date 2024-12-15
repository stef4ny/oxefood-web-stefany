import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormProduto () {

    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinino] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    setIdProduto(response.data.id)
                    setTitulo(response.data.titulo)
                    setCodigo(response.data.codigo)
                    setDescricao(response.data.descricao)
                    setValorUnitario(response.data.valorUnitario)
                    setTempoEntregaMinino(response.data.tempoEntregaMinimo)
                    setTempoEntregaMaximo(response.data.tempoEntregaMaximo)

                })
        }
    }, [state])


    function salvar() {

		let  produtoRequest = {
		     titulo: titulo,
             codigo: codigo,
             descricao: descricao,
             valorUnitario: valorUnitario,
             tempoEntregaMinimo: tempoEntregaMinimo,
             tempoEntregaMaximo: tempoEntregaMaximo
		     
		}
	
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                .then((response) => { console.log('Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => { console.log('Produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
	}

    return (

        <div>
                <MenuSistema tela={'produto'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                {idProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idProduto !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100">
                                    <InputMask
                                      required
                                      maskChar={null}
                                      placeholder="Informe o título do produto"
                                      value={titulo}
                                      onChange={e => setTitulo(e.target.value)}
                                    />
                                    </Form.Input>
                               

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'>
                                    <InputMask
                                        required
                                        maskChar={null}
                                        placeholder="Informe o código do produto"
                                        value={codigo}
                                      onChange={e => setCodigo(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>

                            <Form.Input
                          
                             fluid
                             label='Descrição'
                             maxLength="100"
                             width={16}>
                              <InputMask
                                maskChar={null}
                                placeholder="Informe a descrição do produto"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                              />
                           </Form.Input>
                            <Form.Group>

                                <Form.Input
                                  required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                    >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    width={6}
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinino(e.target.value)}
                                    >
                                    <InputMask 
                                       
                                         maskChar={null}
                                        placeholder="30"
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    width={6}
                                    value={tempoEntregaMaximo}
                                      onChange={e => setTempoEntregaMaximo(e.target.value)}
                                >
                                    <InputMask 
                                        
                                         maskChar={null}
                                        placeholder="40"
                                    /> 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Listar</Link>
                             
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Select } from 'semantic-ui-react';
import { Link, useLocation } from "react-router-dom";
import MenuSistema from '../../MenuSistema';

export default function FormEntregador () {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtEntregadorReali, setQtEntregadorReali] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoCompletomento, setEnderecoCompletomento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [ativo, setAtivo] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(response.data.dataNascimento)
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQtEntregadorReali(response.data.qtEntregadorReali)
                    setValorFrete(response.data.valorFrete)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoCompletomento(response.data.enderecoCompletomento)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoBairro(response.data.enderecoBairro)
                    setEnderecoCidade(response.data.enderecoCidade)
                    setEnderecoCep(response.data.enderecoCep)
                    setEnderecoUf(response.data.enderecoUf)
                    setAtivo(response.data.Ativo)
                    
                })
        }
    }, [state])

    function salvar() {

		let  entregadorRequest = {
		     nome: nome,
		     cpf: cpf,
             rg: rg,
		     dataNascimento: dataNascimento,
		     foneCelular: foneCelular,
		     foneFixo: foneFixo,
             qtEntregadorReali: qtEntregadorReali,
             valorFrete: valorFrete,
             enderecoRua: enderecoRua,
             enderecoCompletomento: enderecoCompletomento,
             enderecoNumero: enderecoNumero,
             enderecoBairro: enderecoBairro,
             enderecoCidade: enderecoCidade,
             enderecoCep: enderecoCep,
             enderecoUf: enderecoUf,
             ativo: ativo
		}
	
		
        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { console.log('Entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { console.log('Entregador cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }
	}

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }



    return (

        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    >
                                    
                                  </Form.Input>
                                

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}  
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        mask="99.999.999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}  
                                    /> 
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                            <Form.Input
                                    fluid
                                    label='Dt Nascimento'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={formatarData(dataNascimento)}
                                        onChange={e => setDataNascimento(e.target.value)}  
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        required 
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}  
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}  
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6}
                                    value={qtEntregadorReali}
                                    onChange={e => setQtEntregadorReali(e.target.value)} 
                                    > 
                                    
                                </Form.Input>
                                
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)} 
                                    > 
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                            <Form.Input
                                    fluid
                                    label='Rua'
                                    width={10}
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)} 
                                    > 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Números'
                                    width={6}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)} 
                                    > 
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                              
                            <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={12}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)} 
                                    > 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={12}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)} 
                                    > 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={6}
                                    value={enderecoCep}
                                    onChange={e => setEnderecoCep(e.target.value)} 
                                    > 
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>

                              <Form.Field

                              fluid
                              control={Select}
                              label='UF'
                              width={16}
                              options={[
                                {key: '1', text:'Option 1', value: 'option1'},
                                {key: '2', text:'Option 2', value: 'option2'}
                              ]}
                                placeholder='Selecionar'
                                value={enderecoUf}
                                onChange={e => setEnderecoUf(e.target.value)} 
                              />
                                
                            </Form.Group>

                          
                             <Form.Input
                                 fluid
                                 label='Complemento'
                                width={16}>

                             </Form.Input>
                          
                          <Form.Group>
                            <Form.Field label="Ativo"
                             value={ativo}
                             onChange={e => setAtivo(e.target.value)}
                             >
                                <Form.Radio id="sim" name="ativo" value={'sim'} label="Sim"></Form.Radio>
                                <Form.Radio id="não" name="ativo" value={'não'} label="Não"></Form.Radio>
                             </Form.Field>
                            
                           
                            
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
                                <Link to={'/list-entregador'}>Voltar</Link>
                               
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
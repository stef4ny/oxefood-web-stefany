import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Select } from 'semantic-ui-react';

export default function FormEntregador () {

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100">
                                  </Form.Input>
                                

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        mask="99.999.999"
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
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6}> 
                                </Form.Input>
                                
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}> 
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                            <Form.Input
                                    fluid
                                    label='Rua'
                                    width={10}> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Números'
                                    width={6}> 
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                              
                            <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={12}> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={12}> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={6}> 
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
                              />
                                
                            </Form.Group>

                          
                             <Form.Input
                                 fluid
                                 label='Complemento'
                                width={16}>

                             </Form.Input>
                          
                          <Form.Group>
                            <Form.Field label="Ativo"></Form.Field>
                            <Form.Radio id="sim" name="ativo" value={'sim'} label="Sim"></Form.Radio>
                            <Form.Radio id="não" name="ativo" value={'não'} label="Não"></Form.Radio>
                            
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
                                Voltar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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
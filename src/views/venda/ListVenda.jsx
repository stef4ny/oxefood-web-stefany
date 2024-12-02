import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListVenda() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [selectedVenda, setSelectedVenda] = useState(null);


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/venda")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }


    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

   

    async function remover() {

        await axios.delete('http://localhost:8080/api/venda/' + idRemover)
        .then((response) => {
  
            console.log('Venda removido com sucesso.')
  
            axios.get("http://localhost:8080/api/venda")
            .then((response) => {
                setLista(response.data)
            })
        })
        .catch((error) => {
            console.log('Erro ao remover um venda.')
        })
        setOpenModal(false)
    }

    function exibirDetalhes(entregador) {
        setSelectedVenda(entregador);
        setOpenModal(true); 
    }
 

    return (
        <div>
            <MenuSistema tela={'venda'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Venda </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-venda'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>cliente</Table.HeaderCell>
                                    <Table.HeaderCell>produto</Table.HeaderCell>
                                    <Table.HeaderCell>status venda</Table.HeaderCell>
                                    <Table.HeaderCell>data venda</Table.HeaderCell>
                                    <Table.HeaderCell>valor total</Table.HeaderCell>
                                    <Table.HeaderCell>observacao</Table.HeaderCell>
                                    <Table.HeaderCell>retirada em loja</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(venda => (

                                    <Table.Row key={venda.id}>
                                        <Table.Cell>{venda.cliente}</Table.Cell>
                                        <Table.Cell>{venda.produto}</Table.Cell>
                                        <Table.Cell>{venda.statusVenda}</Table.Cell>
                                        <Table.Cell>{formatarData(venda.dataVenda)}</Table.Cell>
                                        <Table.Cell>{venda.valorTotal}</Table.Cell>
                                        <Table.Cell>{venda.observacao}</Table.Cell>
                                        <Table.Cell>{venda.retiradaEmLoja}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste venda'
                                                icon>
                                                <Link to="/form-venda" state={{ id: venda.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este venda'
                                                icon
                                                onClick={e => confirmaRemover(venda.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                            
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para remover este venda'
                                                icon
                                                onClick={e => exibirDetalhes(venda.id)}>
                                                <Icon name='eye' />
                                            </Button>



                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
               basic
               onClose={() => setOpenModal(false)}
               onOpen={() => setOpenModal(true)}
               open={openModal}
         >
               <Header icon>
                   <Icon name='trash' />
                   <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
               </Header>
               <Modal.Actions>
                   <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                       <Icon name='remove' /> Não
                   </Button>
                   <Button color='green' inverted onClick={() => remover()}>
                       <Icon name='checkmark' /> Sim
                   </Button>
               </Modal.Actions>
         </Modal>

         <Modal
                open={selectedVenda !== null}
                onClose={() => setSelectedVenda(null)}
            >
                <Header icon>
                    <Icon name='eye' />
                    Detalhes da Venda
                </Header>
                <Modal.Content>
                    {selectedVenda &&  (
                        <div>
                            <p><strong>Observação:</strong> {selectedVenda.observacao}</p>
                          
                        </div>
                    )}
                </Modal.Content> 
            </Modal>


        </div>
    )
}
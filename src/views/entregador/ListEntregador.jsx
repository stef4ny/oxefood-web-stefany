import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [selectedEntregador, setSelectedEntregador] = useState(null);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {
        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
        .then((response) => {
            console.log('Entregador removido com sucesso.')
            axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
        })
        .catch((error) => {
            console.log('Erro ao remover um entregador.')
        })
        setOpenModal(false)
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

    function exibirDetalhes(entregador) {
        setSelectedEntregador(entregador);
        setOpenModal(true); 
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>
                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>RG</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell>Qt Entregador Realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(entregador => (
                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.rg}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell>{entregador.qtEntregadorRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.ativo}</Table.Cell>

                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon
                                            >
                                              <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para exibir todos entregador'
                                                icon
                                                onClick={e => exibirDetalhes(entregador)}
                                            >
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
                open={selectedEntregador !== null}
                onClose={() => setSelectedEntregador(null)}
            >
                <Header icon>
                    <Icon name='eye' />
                    Detalhes do Entregador
                </Header>
                <Modal.Content>
                    {selectedEntregador && (
                        <div>
                            <p><strong>Nome:</strong> {selectedEntregador.nome}</p>
                            <p><strong>CPF:</strong> {selectedEntregador.cpf}</p>
                            <p><strong>RG:</strong> {selectedEntregador.rg}</p>
                            <p><strong>Data de Nascimento:</strong> {formatarData(selectedEntregador.dataNascimento)}</p>
                            <p><strong>Fone Celular:</strong> {selectedEntregador.foneCelular}</p>
                            <p><strong>Fone Fixo:</strong> {selectedEntregador.foneFixo}</p>
                            <p><strong>Qt Entregas Realizadas:</strong> {selectedEntregador.qtEntregadorRealizadas}</p>
                            <p><strong>Ativo:</strong> {selectedEntregador.ativo ? 'Sim' : 'Não'}</p>
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                   <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                       <Icon name='remove' /> Não
                   </Button>
               </Modal.Actions>
                
            </Modal>

        </div>
    )
}

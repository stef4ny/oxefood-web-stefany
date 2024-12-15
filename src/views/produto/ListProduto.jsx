import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header, Icon, Menu, Modal, Segment, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto () {

    const [listaProdutos, setListaProdutos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [idCategoria, setIdCategoria] = useState();
    const [listaCategoriaProduto, setListaCategoriaProduto] = useState([]);

    useEffect(() => {

        carregarLista();
        
    }, [])

    function carregarLista () {

        axios.get("http://localhost:8080/api/produto")
        .then((response) => {
            setListaProdutos(response.data);
        })

        axios.get("http://localhost:8080/api/categoriaproduto")
        .then((response) => {

            const dropDownCategorias = [];
            dropDownCategorias.push({ text: '', value: '' });
            response.data.map(c => (
                dropDownCategorias.push({ text: c.descricao, value: c.id })
            ))

            setListaCategoriaProduto(dropDownCategorias)
          
        })

    }

    function confirmaRemover(id) {

        setOpenModal(true);
        setIdRemover(id);
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/produto/' + idRemover)
        .then((response) => {
   
            setOpenModal(false)
            console.log('Produto removido com sucesso.')
   
            axios.get("http://localhost:8080/api/produto")
            .then((response) => {
                setListaProdutos(response.data)
            })
        })
        .catch((error) => {
            setOpenModal(false)
            console.log('Erro ao remover um produto.')
        })
    }

    

    function handleChangeCategoriaProduto(value) {

        setIdCategoria(value);
        filtrarProdutos();
    }

    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Produto </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-produto'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>codigo</Table.HeaderCell>
                                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                                    <Table.HeaderCell>Descrição</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Unitario</Table.HeaderCell>
                                    <Table.HeaderCell> Tempo entrega minimo</Table.HeaderCell>
                                    <Table.HeaderCell> Tempo entrega maximo</Table.HeaderCell>

                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(produto => (

                                    <Table.Row key={produto.id}>
                                        <Table.Cell>{produto.codigo}</Table.Cell>
                                         <Table.Cell>{produto.categoria.descricao}</Table.Cell> 
                                        <Table.Cell>{produto.titulo}</Table.Cell>
                                        <Table.Cell>{produto.descricao}</Table.Cell>
                                        <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                                        <Table.Cell>{produto.tempoentregaMaximo}</Table.Cell>

                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste produto'
                                                icon>
                                                <Link to="/form-produto" state={{ id: produto.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este produto'
                                                icon
                                                onClick={e => confirmaRemover(produto.id)}>
                                                <Icon name='trash' />
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
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
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



        </div>
    )
}
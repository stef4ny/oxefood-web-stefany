import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './views/util/ProtectedRoute';
import Home from './views/home/Home';
import ListCliente from './views/cliente/ListCliente';
import FormCliente from './views/cliente/FormCliente';
import ListEntregador from './views/entregador/ListEntregador';
import FormEntregador from './views/entregador/FormEntregador';
import ListProduto from "./views/produto/ListProduto"
import FormProduto from './views/produto/FormProduto';
import FormLogin from './views/login/FormLogin';
import ListCategoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import FormEnderecoCliente from './views/cliente/FormEnderecoCliente';


function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <FormLogin/> } />

                <Route
                   path="/home"
                   element={
                   <ProtectedRoute>
                       <Home/>
                   </ProtectedRoute>
                   }
               />
                <Route path="/" element={ <Home/> } />

                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route
                   path="/list-cliente"
                   element={
                       <ProtectedRoute>
                           <ListCliente />
                       </ProtectedRoute>
                   }
               />

                <Route path="form-produto" element={ <FormProduto/> } />    
                <Route path="list-produto" element={
                      <ProtectedRoute>
                     <ListProduto/>
                     </ProtectedRoute>
                    } />

                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-entregador" element={ 
                     <ProtectedRoute>
                    <ListEntregador/>
                    </ProtectedRoute>
                 } />

               
                <Route path="list-categoriaproduto" element={ <ListCategoriaProduto/> } />
                <Route path="form-categoriaproduto" element={ <FormCategoriaProduto/> } />
                <Route path="form-enderecocliente" element={ <FormEnderecoCliente/> } />
               
                
                {/* <Route path="list-venda" element={ <ListVenda/> } />
                <Route path="form-venda" element={ <FormVenda/> } /> */}
            </Routes>
        </>
    )
}

export default Rotas


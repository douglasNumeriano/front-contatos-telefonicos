
import FormularioContatosTelefonicos from 'components/formularioContatosTelefonicos/FormularioContatosTelefonicos'
import TabelaContatosTelefonicos from 'components/tabelaContatosTelefonicos/TabelaContatosTelefonicos'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/listar"  exact><TabelaContatosTelefonicos/></Route>
                <Route path="/formularioContatosTelefonicos" exact><FormularioContatosTelefonicos/></Route>
                <Route path="/formularioContatosTelefonicos/:id" exact><FormularioContatosTelefonicos/></Route>
              
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
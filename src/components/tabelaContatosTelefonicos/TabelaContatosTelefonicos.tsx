import axios from "axios";
import { useState, useEffect } from "react";
import './style.css'
import { Link } from 'react-router-dom'
import { ContatoTelefonico } from "types/contatoTelefonico";
import { listar_contatos, delete_contato} from "../../utils/requests"
import { mensagemSucesso, mensagemErro } from '../../utils/toastr'

function TabelaContatosTelefonicos(){

    const [contatos, setContatos] = useState<ContatoTelefonico[]>([]);
    const [reload, setReload] = useState(false);


    const getContatos = async () => {
        await axios.get(listar_contatos)
        .then(res => {
            const lista = res.data;
            setContatos(lista)
        })
    }

    useEffect(() => {
        getContatos();
    },[reload]);

    const deletarContato = (idContato: number) => {
        axios.delete(delete_contato + "/" + idContato)
          .then(res => {
            mensagemSucesso("Contato telefônico excluído!");
            window.location.reload();
          }).catch(error => {
            mensagemErro(error);
          })
      }

    const rows = contatos.map( contato => {
        return (
            <tr>
                <td>{contato.id}</td>
                <td>{contato.nome}</td>
                <td>{contato.telefone}</td>
                <td>{contato.email}</td>
                <td>{contato.tipoContato}</td>
                <td>
                <Link to={`/formularioContatosTelefonicos/${contato.id}`} >
                    <button type="button" 
                            className="btn-info">
                            Editar
                    </button>
                </Link>    
                    <button type="button" 
                            className="btn-danger" 
                            onClick={e => deletarContato(contato.id)}
                            >
                            Excluir
                    </button>
                </td>   
            </tr>
        )    
    })

    return(
        <div id="tabela-lista-contatos">
        <Link to="/formularioContatosTelefonicos">    
            <button className="btn-success">Cadastrar</button>
        </Link>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>TipoContato</th>
                <th>Ação</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        </div>
    );
}

export default TabelaContatosTelefonicos;
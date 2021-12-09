import { Link } from 'react-router-dom';
import './style.css'
import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { ContatoTelefonico } from 'types/contatoTelefonico';
import { mensagemSucesso, mensagemErro } from '../../utils/toastr'
import axios from "axios";
import {cadastrar_contato, atualizar_contato, delete_contato, get_contato} from "../../utils/requests";
import { updateConditionalTypeNode } from 'typescript';

type UserRouteParams = {
    id: string;
}

function FormularioContatosTelefonicos(){

    const [contato, setContato] = useState<ContatoTelefonico>({
        nome: "",
        telefone: "",
        email: "",
        tipoContato: "",
    } as ContatoTelefonico);

    const history = useHistory();
    const params = useParams<UserRouteParams>();
    const contatoId = params.id;

    const returnPage = () => {
        return history.goBack();
    }

    const updateInputValue = (e: React.SyntheticEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setContato({
          ...contato,
          [name]: value
        })
      }

      const addContato = () => {
        if(contatoId) updateContato();
        else newContato();
      }

      const updateContato = () => {
          axios.put(atualizar_contato +"/"+ contatoId, contato)
          .then(res => {
            mensagemSucesso('Contato atualizado com sucesso!');
            returnPage();
          }).catch(error => {
            mensagemErro("Falha ao atualizar contato");
        })

      }

      const newContato = () => {
        axios.post(cadastrar_contato, {
            nome: contato.nome,
            telefone: contato.telefone,
            email: contato.email,
            tipoContato: contato.tipoContato
        }).then(res => {
            mensagemSucesso('Contato cadastrado com sucesso!');
            returnPage();
        }).catch(error => {
            mensagemErro("Falha ao cadastrar contato");
        })
      }

      const getContato = async () => {
        await axios.get(get_contato + "/" + contatoId)
        .then(res => {
            const contato = res.data;
            setContato(contato);
        }) .catch(error => {
            mensagemErro(error);
        })
      }

      useEffect(() => {
        if (contatoId) getContato();
      }, [contatoId]);

    return(
        <div className="container">
          <h2>{contato.id ? "Editar Contato Telefônico" : "Cadastar Contato Telefônico"}</h2>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" value={contato.nome} onChange= {(e) => updateInputValue(e)}/>

            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" name="telefone" value={contato.telefone} onChange={(e) => updateInputValue(e)}/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={contato.email} onChange={(e) => updateInputValue(e)}/>

            <label htmlFor="tipoContato">Tipo Contrato</label>
            <select id="tipoContato" name="tipoContato" value={contato.tipoContato} onChange={(e) => updateInputValue(e)}>
                <option value="amigo">Amigo</option>
                <option value="profissional">Profissional</option>
                <option value="familiar">Familiar</option>
            </select>

            <button className="btn-success" onClick={() => addContato()}>Salvar</button>
            <Link to="/">
                <button className="btn-danger">Cancelar</button>
            </Link>
            
        </div>


    );
}

export default FormularioContatosTelefonicos;
import React, {useState, useEffect} from 'react';
import api from './services/api'

import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'

// Nesse aqui eu tenho o arquivo com a listagem dos Devs
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// No Aside temos a caixa do cadastro 
// No Main temos a listagem dos Devs cadastrados proximos de você
function App() {
  const [devs, setDevs] = useState([]); // São multiplos então array vazio

  
  // Pra pegar os usuarios cadastrados, mas uma vez só quero que execute 1 vez
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    
    const response = await api.post('/devs', data)

    // Isso aqui é pra quando eu adicionar um dev a pagina ja atualizar com o novo dev
    // O que eu to fazendo é pegando a lista novamente e adicionando o novo Dev no final dela
    setDevs([...devs, response.data])
  }
  return (
    <div id='app'>
      <aside> 
        <strong>Cadastrar</strong>
        <DevForm onSubmit= {handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map( dev => (
          <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>

      </main>

    </div>

  );
}

export default App;

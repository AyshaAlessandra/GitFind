import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png"
import ItemList from "../../components/ItemList";
import './styles.css'

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleGetData();
    }
  };

  const handleClearData = () => {
    setUser('');
    setCurrentUser(null);
    setRepos(null);
    setInputError(false);
    setNoResults(false);
  };

  const handleGetData = async () => {
    //caso busque sem ter nada no input.
    if (user.trim() === '') {
      setErrorMessage('Digite um nome de usuário válido.');
      setCurrentUser(null);
      setRepos(null);
      setNoResults(false);

      // Limpar a mensagem de erro e tira o vermelho da borda após 3 segundos. 
      setTimeout(() => {
        setErrorMessage(null);
        setInputError(false);
      }, 3000);

      setInputError(true);

      return;
    }
    
    setInputError(false);
    setNoResults(false);

    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    //quando não achar um usuário
    if (newUser.message === 'Not Found') {
      setNoResults(true);
      setCurrentUser(null);
      setRepos(null);
      return;
    }

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />    
        <div className="conteudo">
          <img src={background} className=" background " alt=" background app" />
          <div className="info">
              <div>
                <input 
                name="usuario" 
                value={user} 
                onChange={event => {
                  setUser(event.target.value);
                  setInputError(false); // Limpar o erro ao digitar no input.
                }} 
                onKeyDown={handleKeyDown} // Adicionar evento dd teclado.
                placeholder="username"
                className={inputError ? 'error-input' : ''}
                />
                <button onClick={handleGetData}>Buscar</button>
                <button onClick={handleClearData}>Limpar</button>
              </div>

              {errorMessage && <p className="error">{errorMessage}</p>}

              {noResults && (
                <div className="no-results-container">
                  <p className="no-results-text">Nenhum resultado encontrado!</p>
                </div>
              )}

              {currentUser?.name ? (
              <>
                <div className="perfil">
                  <img src={currentUser.avatar_url} className="profile" alt="imagem de perfil" />
                  <div>
                    <h3>{currentUser.name}</h3>
                    <span>@{currentUser.login}</span>
                    <p>{currentUser.bio}</p>
                  </div>
                </div>
                <hr />
              </>
              ) : null}

              {repos?.length ? (
                <div>
                  <h4 className="repositorio">Repositórios</h4>
                  {repos.map(repo => (
                    <ItemList title={repo.name} description={repo.description}/>
                  ))}
                </div>
              ) : null}  
          </div>
        </div>  
    </div>
  );
}

export default App;

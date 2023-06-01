import { Header } from "../../components/Header";
import background from "../../assets/background.png"
import ItemList from "../../components/ItemList";
import './styles.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="conteudo">

        <img className="background" src={background} alt="background app"/>
        <div className="info">
          <div>
            <input name="usuario" placeholder="@username" />
            <button>Buscar</button>
          </div>
          <div className="perfil">
            <img src="https://avatars.githubusercontent.com/u/102393292?v=4" className="profile" alt="image profile" />
            <div>
              <h3>Aysha Alessandra</h3>
              <span>@AyshaAlessandra</span>
              <p>Descrição</p>
            </div>
          </div>
          <hr/>
          <div>
            <h4 className="repositorio" >Repositórios</h4>
            <ItemList title='Teste 1' description='Teste de descrição' />
            <ItemList title='Teste 1' description='Teste de descrição' />
            <ItemList title='Teste 1' description='Teste de descrição' />
            <ItemList title='Teste 1' description='Teste de descrição' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

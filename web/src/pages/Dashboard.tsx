import { useHistory } from "react-router-dom";
import "../styles/pages/dashboard.css";
import img_acafood from '../images/Acafood-logo-1.png';

export default function Dashboard(){
  const history = useHistory();

  const teste = history.location;
  const username = teste.state;
  console.log(username);

  function goToLikear(){
    history.push({pathname:"/like", state:username})
  }

  function goToRecomendation(){
    history.push({pathname:"/recomendations", state:username})
  }

  function goToList(){
    history.push({pathname:"/foodlist", state:username})
  }

  return(
    <div id="dashboard">
      <div className="dashboard-menu">

        <main>

          <img src={img_acafood} alt="Acafood"/>

          <div>
            <button 
              className="registerBtn" 
              onClick={goToLikear}>
              <span className="laike">Adicionar Comida</span>
            </button>
          </div>

          <div>
            <button 
              className="recomendationBtn" 
              onClick={goToRecomendation}>
              <span className="gimme">Recomendações</span>
            </button>
          </div>

          <div>
            <button 
              className="moviesBtn" 
              onClick={goToList}>
              <span className="movies">Comidas Curtidas</span>
            </button>
          </div>
          
        </main>

      </div>
    </div>
  )
}
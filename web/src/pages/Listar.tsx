import { useHistory } from "react-router-dom";
import {useState, useEffect, FormEvent} from 'react';
import {FiArrowLeft} from 'react-icons/fi'

import mongoApi from "../services/mongoApi";
import neoApi from "../services/neoApi";
import img_acafood from '../images/Acafood-logo-1.png';


import "../styles/pages/listar.css";

export default function Listar(){

  const history = useHistory();
  const username = history.location.state;

  console.log(username);

  const [comida, setComida] = useState([]);

  const handleReturn = (e : FormEvent)=>{
    e.preventDefault();

    history.push({pathname: "/dashboard", state:username});
  }
  
  async function populate() {
    await neoApi.get(`/neo4j/${username}/comida`).then(res =>{
      setComida(res.data.comida)
    });
  }

  useEffect(() =>{
    populate();
  },[]);

  console.log(comida);
  
  async function handleDelete(food:String) {
    console.log(food);
    const delData = {
      data:{
        "name":username,
        "food":food
      }
    };

    await neoApi.delete("/neo4j", delData)
    
    alert("Descurtido com sucesso!");
    
    history.push({pathname:"/dashboard", state:username});
  }
  

  return(
    <div id="likelist">
      <div className="like-menu">
        <div className="top-page">
          <button type = "submit" onClick = {handleReturn} className="go-back">
            <FiArrowLeft size={32} color="#000000" ></FiArrowLeft>
          </button>

          <img src={img_acafood} alt="Acafood"/>
        </div>

        <h1>Comidas Curtidas</h1>
      
        <table className="lista">
          <tr><th>Comidas</th><th>Ações</th></tr>
          {comida.map((food) => 
                <tr>
                  <td>{food}</td>
                  <td>
                    <button className="delBtn"
                      onClick={(event) => handleDelete(food)}>
                      Descurtir
                    </button>
                    </td>
                  </tr>
                )}
        </table>


      </div>

    </div>
  )
}
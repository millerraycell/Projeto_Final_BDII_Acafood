import React, {FormEvent, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {FiArrowLeft} from 'react-icons/fi'

import neoApi from "../services/neoApi";
import "../styles/pages/recomendations.css";
import img_acafood from '../images/Acafood-logo-1.png';

export default function Recomendations(){
  const history = useHistory();

  const [food, setFood] = useState([]);
  const username = history.location.state;

  const handleReturn = (e : FormEvent)=>{
    e.preventDefault();

    history.push({pathname: "/dashboard", state:username});
  }

  async function dale(){
    //recupera os filmes recomendados
    const recomendation = await neoApi.get(`/neo4j/${username}`);/*.then( res =>{
      setfood(res.data.filmes)
    });*/
    const teste = recomendation.data.comida;

    if (teste[0] != null){
      console.log("tem", teste);
      setFood(teste);
    }else{
      console.log("nao tem", teste);
      const planob = await neoApi.get("/neo4j/recomendados");
      setFood(planob.data.comida);
    }
    
  }

  useEffect(() =>{
    dale()
  },[])

  console.log(username);

  return(
    <div id="recomendation">
      <div className="rec-menu">

      <div className="top-page">
          <button type = "submit" onClick = {handleReturn} className="go-back">
            <FiArrowLeft size={32} color="#000000" ></FiArrowLeft>
          </button>

          <img src={img_acafood} alt="Acafood"/>
        </div>
      

      <h1>Recomendações</h1>

        <ul>{food.map((foods) => <li key={foods}>{foods}</li>)}</ul>

      </div>

    </div>
  )
}
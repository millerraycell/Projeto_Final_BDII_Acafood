import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/pages/like.css";

import neoApi from "../services/neoApi";
import mongoApi from "../services/mongoApi";
import img_acafood from '../images/Acafood-logo-1.png';
import { FiArrowLeft } from "react-icons/fi";

export default function Like() {
  const history = useHistory();

  const username = history.location.state;

  console.log(username);

  const [food, setFood] = useState("");
  const [type, setType] = useState("");
  const [origin, setOrigin] = useState("");

  const handleReturn = (e : FormEvent)=>{
    e.preventDefault();

    history.push({pathname: "/dashboard", state:username});
  }


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {"food":food};
    const relatData = {"name":username, "food":food};

    const validate = await neoApi.get(`/neo4j/${food}/verifica`);

    const verdade = validate.data.comida;

    const mongoData = {
      "name":food,
      "type":type,
      "origin":origin,
    };

    console.log(verdade);

    if (verdade.length !== 0){
        alert("O usuário já cadastou esse prato")
        
    }
    else{
        if (verdade[0] != null){
    
          const relat = await neoApi.post("/neo4j/",relatData);
          console.log("teste",relat);
    
        }else{
          const mongoteste = await mongoApi.post("/mongo/create", mongoData);
          const teste = await neoApi.post("/neo4j/create_food/", data);
          const relat = await neoApi.post("/neo4j/",relatData);
    
          console.log("teste2", teste, relat);
          console.log(mongoteste);
        }
        alert("Cadastro realizado com sucesso!");
    
        history.push({pathname: "/dashboard", state:username});
    }

  };

  return (
    <div id="page-like-food">

      <main>
        <div className="top-page">
          <button type = "submit" onClick = {handleReturn}  className="go-back">
            <FiArrowLeft size={32} color="#000000" ></FiArrowLeft>
          </button>

          <img src={img_acafood} alt="Acafood"/>
        </div>

        <form onSubmit={handleSubmit} className="like-food-form">
          <fieldset>
            <h1>Inserir novo prato</h1>
            
            <div className="input-block">
              <label htmlFor="prato">Nome do Prato</label>
              <input
                className = "text-field"
                id="prato"
                value={food}
                required
                onChange={(e) => setFood(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="type">Tipo do Prato</label>
              <input
                className = "text-field"
                id="type"
                value={type}
                required
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="origin">Origem do Prato</label>
              <input
                className = "text-field"
                id="origin"
                value={origin}
                required
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </fieldset>

        </form>

        <div className="btnContainer">
          <button  onClick={handleSubmit} className="confirm-button" type="submit">
            Confirmar
          </button>
        </div>

      </main>
    </div>
  );
}

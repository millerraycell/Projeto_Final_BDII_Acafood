import React, { FormEvent, useState} from "react";
import { useHistory } from "react-router-dom";


import '../styles/pages/landing.css';
import api from "../services/api";
import neoApi from "../services/neoApi";
import img_acafood from '../images/Acafood-logo-1.png';



function Landing(){
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");

  const history = useHistory()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(name);
    
    const teste = await api.get(`/user/${name}`)

    const empty = teste.data;

    if (empty.length > 0){
      console.log(empty[0].id);
      history.push({pathname:"/dashboard", state: empty[0].name });
    }else{
      alert("Usuário não cadastrado!");
      history.push("/");
    }

  };

  const handleRegister = async(event: FormEvent) =>{
    event.preventDefault();

    const data = {
      "name":name,
      "senha":senha
    }

    const neoData = {"name":name}
    
    console.log(data);

    if (data.name === ""){
      alert("Nome de Usuário Inválido");
    }else if (data.senha === ""){
      alert("Senha Inválida");
    }else{

      const teste = await api.get(`/user/${name}`)

      if (teste.data.length > 0){
        console.log("Already Registered");
        alert("Usuário já cadastrado!");
        history.push("/");

      }else{
        const neoteste = await neoApi.post("/neo4j/create/", neoData);
        const test = await api.post("/user", data);
        alert("Cadastro realizado com Sucesso!");
        console.log(neoteste)
        console.log(test);
      }      
    }
  }

  return(
    <div id="page-landing">
      <div className="content-wrapper">

        <main>

          <img src={img_acafood} alt="Acafood"/>
          
          <form onSubmit={handleSubmit} className="loginForm">

            <div className="input-block">
                  <label htmlFor="name">Username</label>
                  <input
                    id="name"
                    className = "text-field"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
            </div>

            <div className="input-block">
                  <label htmlFor="senha">Password</label>
                  <input
                    id="senha"
                    className = "text-field"
                    type="password"
                    value={senha}
                    required
                    onChange={(e) => setSenha(e.target.value)}
                  />
            </div>

            <div className="btnContainer">
              <button className="confirm-button" type="submit">
                  Login
              </button>
              <button className="register-button" onClick={handleRegister}>
                  Register
              </button>
            </div>

          </form>
        </main>

      </div>  
    </div>
  );
}

export default Landing;
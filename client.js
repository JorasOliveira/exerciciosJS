const axios = require("axios");
axios
  .get("https://catfact.ninja/fact")
  .then((response) => console.log(response.data.fact));
  //send a POST request


axios.post('https://tecweb-js.insper-comp.com.br/token ',{
    username: 'jorascco',
    headers:{
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
      } 
  }).then((response) => {t = response.data.accessToken 
    console.log(t)
        axios.get('https://tecweb-js.insper-comp.com.br/exercicio ',{
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + t 
          }
        }).then((response) => {//console.log(response.data) 
          //response.data.ex.entrada
           var dict = {}; 
          //------------------------//
          console.log(response.data.soma) 
          soma = response.data.soma.entrada.a + response.data.soma.entrada.b
          console.log(soma)
          dict["soma"] = soma
          //------------------------//
          console.log(response.data['tamanho-string'])
          length = response.data['tamanho-string'].entrada.string.length
          console.log(length)
          dict["tamanho-string"] = length
          //------------------------//
          console.log(response.data['nome-do-usuario'])
          email = (response.data['nome-do-usuario'].entrada.email)
          usuario = email.slice(0, email.search("@"))
          dict["nome-do-usuario"] = usuario
          //------------------------//
          





          for (const [key, value] of Object.entries(dict)) {
            axios.post('https://tecweb-js.insper-comp.com.br/exercicio/' + key,
            {"resposta" : value},
            {headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + t
              }}
            ).then((response) => {console.log(response.data)})
          }
        });
    });
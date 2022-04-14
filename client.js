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

          //------------------------//
          console.log(response.data.soma) 
          soma = response.data.soma.entrada.a + response.data.soma.entrada.b
          console.log(soma)
          axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma',
            {"resposta" : soma},
            {headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + t
            }}
          ).then((response) => {console.log(response)})
          //------------------------//


        });
    });
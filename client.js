const axios = require("axios");
const { sign } = require("crypto");
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
        }).then((response) => {
          let dict = {}; 

          //------------------------//
          // console.log(response.data.soma) 

          let soma = response.data.soma.entrada.a + response.data.soma.entrada.b
          dict["soma"] = soma
          //------------------------//
          // console.log(response.data['tamanho-string'])

          let length = response.data['tamanho-string'].entrada.string.length
          dict["tamanho-string"] = length
          //------------------------//
          // console.log(response.data['nome-do-usuario'])
          let email = (response.data['nome-do-usuario'].entrada.email)

          usuario = email.slice(0, email.search("@"))
          dict["nome-do-usuario"] = usuario
          //------------------------//
          // console.log(response.data['jaca-wars'])

          let v = response.data['jaca-wars'].entrada.v
          let theta = response.data['jaca-wars'].entrada.theta

          //v^2 sen(2 theta) / g,
          let jaca = (Math.pow(v, 2) * Math.sign(2*theta)/9.8)
    
          let strike = 0
          if ( ((jaca -2) == 100) || (jaca ==  100) || ((jaca + 2) == 100) ){
            strike = 1
          }
          else{
            strike = -1
          }
          dict['jaca-wars'] = strike
          //------------------------//
          //console.log(response.data['ano-bissexto'])

          let ano = response.data['ano-bissexto'].entrada.ano
          let bissexto
          if (ano % 4 == 0){
            bissexto = true
          }
          else{
            bissexto = false
          }
          dict['ano-bissexto'] = bissexto
          //------------------------//
          //console.log(response.data['volume-da-pizza'])

          let r = response.data['volume-da-pizza'].entrada.z 
          let h = response.data['volume-da-pizza'].entrada.a 

          let volume = Math.round(Math.PI*Math.pow(r, 2)*h)
          dict['volume-da-pizza'] = volume
          //------------------------//
          console.log(response.data.mru)





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
          // axios.get('https://tecweb-js.insper-comp.com.br/?username=jorascco',
          // {headers:{
          //   'Content-Type' : 'application/json',
          //   'Accept' : 'application/json',
          //   'Authorization' : 'Bearer ' + t
          //   }}
          // ).then((response) => {console.log(response.data)})
        });
    });
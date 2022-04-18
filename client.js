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

          //------------RESPONDENDO------------//

          let soma = response.data.soma.entrada.a + response.data.soma.entrada.b
          dict["soma"] = soma

          //------------------------//

          let length = response.data['tamanho-string'].entrada.string.length
          dict["tamanho-string"] = length

          //------------------------//

          let email = (response.data['nome-do-usuario'].entrada.email)

          usuario = email.slice(0, email.search("@"))
          dict["nome-do-usuario"] = usuario

          //------------------------//

          let v = response.data['jaca-wars'].entrada.v
          let theta = response.data['jaca-wars'].entrada.theta

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

          let r = response.data['volume-da-pizza'].entrada.z 
          let h = response.data['volume-da-pizza'].entrada.a 

          let volume = Math.round(Math.PI*Math.pow(r, 2)*h)
          dict['volume-da-pizza'] = volume

          //------------------------//

          valores = response.data.mru.entrada
          let s0 = valores.s0
          let vel = valores.v
          let time = valores.t
          let sf = s0 + (vel*time)
          dict['mru'] = sf

          //------------------------//

          let str = response.data['inverte-string'].entrada.string

          let rts = ""
          for (i = str.length - 1; i >= 0;  i--){
            rts += str[i]
          }
    
          dict['inverte-string'] = rts




          //------------ENVIANDO------------//
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
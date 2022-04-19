const axios = require("axios");


async function enviarRespostas(dict){

  for (const [key, value] of Object.entries(dict)) {

    let r = await axios.post('https://tecweb-js.insper-comp.com.br/exercicio/' + key,
      {"resposta" : value},
      {headers:{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + t
        }}
      ).then((response) => {return response.data.sucesso})

    console.log(`${key} : ${r}`)
  }
}

async function somaRequisicao(endpoints){
  let soma = 0

  for (i in endpoints){
    url = endpoints[i]

    soma += await axios.get(url,
      {headers:{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + t
      }}).then((response) => {return response.data})

  }

  return soma
}

async function tesouro(url){
  let found = false

  nxtUrl = url
  while (!found){

    let r = await axios.get(nxtUrl, 
      {headers:{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + t
      }}).then((response) => {return response.data})

    if ( (typeof r) === 'string' ||r instanceof String){
        nxtUrl = r
      }
      else{
        numero = r
        found = true
      }
    }

  return numero;
} 





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
    //console.log(t)
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
          theta = theta * (Math.PI/180)

          let jaca = (Math.pow(v, 2) * Math.sin(2*theta)/9.8)
    
          let strike
          if (jaca >= 102){
            strike = 1
          }
          else if (jaca < 102 || java > 98){
            strike = 0
          }
          else{
            strike = -1
          }
          dict['jaca-wars'] = strike

          //------------------------//
          let ano = response.data['ano-bissexto'].entrada.ano
          let bissexto
          if ( (ano % 400 == 0) && (ano % 100 != 0) && (ano % 4 == 0) ){
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
          let valores = response.data.mru.entrada
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

          //------------------------//
          let val = response.data['soma-valores'].entrada.objeto

          let total = 0
          for (var k in val){
            total += val[k]
          }
          dict['soma-valores'] = total

          //------------------------//
          n = response.data['n-esimo-primo'].entrada.n

          let counter = 0
          let prime = 0
          let j = 1
          let found = false
          while(!found){

            if ( (j % 2 == 0) || (j % 3 == 0) || (j % 7 == 0) || (j % 9 == 0) || (j % 11 == 0) ){
              prime = j
              counter++
            }

            if (counter == n) {
              found = true
            }

            j++
          }
          dict['n-esimo-primo'] = prime

          //------------------------//
          // console.log(response.data['maior-prefixo-comum'])

          // let strings = response.data['maior-prefixo-comum'].entrada.strings

          // let prefixos = []
          // for (var i in strings){
          //   console.log(strings[i])
          // }


          //------------------------//
          let numeros = response.data['soma-segundo-maior-e-menor-numeros'].entrada.numeros

          numeros = numeros.sort((a,b) => a-b)

          let segundoMenor = numeros[1]
          let segundoMaior = numeros[numeros.length -2]

          soma = segundoMaior + segundoMenor

          dict['soma-segundo-maior-e-menor-numeros'] = soma


          //------------------------//
          let strings = response.data['soma-de-strings-de-ints'].entrada.strings

          let s =  strings.map(x => parseInt(x))
          s = s.reduce((a,b) => a+b)

          dict['soma-de-strings-de-ints'] = s
          
          //------------------------//
          let endpoints = response.data['soma-com-requisicoes'].entrada.endpoints
          somaRequisicao(endpoints).then((response) => enviarRespostas({'soma-com-requisicoes' : response}))

          //------------------------//
          let inicio = response.data['caca-ao-tesouro'].entrada.inicio
          tesouro(inicio).then((response) => enviarRespostas({'caca-ao-tesouro' : response}))

          //------------ENVIANDO------------//
          console.log("enviando as respostas")
          enviarRespostas(dict);
        });
    });
function VoltarIndex(){
    location.href="index.html";
}

function _GET(nome, urlEntrada){
    if (urlEntrada != null) {
      urlEntrada = urlEntrada.slice(35);
      var url   = urlEntrada.replace("?", "");
      var itens = url.split("&");

      for(n in itens){
          if( itens[n].match(nome) ){
              return decodeURIComponent(itens[n].replace(nome+"=", ""));
          }
      }
      return null;
    }
}
var imagemURL;

function gravarAnotacao(){

  anotacao = new Object();
  anotacao.titulo = document.getElementById('titulo').value;
  anotacao.conteudo = document.getElementById('conteudo').value;
  anotacao.imagem = imagemURL;
  anotacao.published = new Date();

  gravarBanco(anotacao);

}

function capturarImagem(){

    navigator.camera.getPicture(capturarSuccess, capturarFail,
        {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA
        }
    );
}

function capturarSuccess(imageCaminho) {
    imagemURL = imageCaminho;

    img = document.getElementById('img');
    img.innerHTML = '<span>Imagem Capturada:</span><br/><img src="' + imageCaminho + '" />';
}

function capturarFail(message) {
    alert('Erro: ' + message);
}

function mostrarRegistros(transaction, result){

  var listaAnotacoes = document.getElementById("listaAnotacoes");
  var lista = '';

  if (result != null && result.rows != null) {

    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows.item(i);
       lista = lista + '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">';
       lista = lista + '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
       lista = lista + '<a class="ui-link-inherit" href="visualizar.html?id=' + row.id + '" >';
       lista = lista + '<img src="' + row.imagem + '" class="ui-li-thumb" />';
       lista = lista + '<h3 class="ui-li-heading">' + row.Titulo + '</h3>';
       lista = lista + '<p class="ui-li-desc">' + row.published + '</p>';
       lista = lista + '</a></div></div></li>';
    }


    listaAnotacoes.innerHTML = lista;

  }

}

function mostrarAnotacao(transaction, result) {

  var anotacao = '<strong>ID: </strong>' + result.rows.item(0).id + "<br/>";
  anotacao = anotacao + '<strong>Título: </strong>' + result.rows.item(0).Titulo + "<br/>";
  anotacao = anotacao + '<strong>Conteudo: </strong>' + result.rows.item(0).conteudo + "<br/>";
  anotacao = anotacao + '<strong>Data Criação: </strong>' + result.rows.item(0).published + "<br/>";
  anotacao = anotacao + '<strong>Imagem: </strong><br/><img src="' + result.rows.item(0).imagem + '" />';

  var detalhesAnotacao = document.getElementById("detalhesAnotacao");
  detalhesAnotacao.innerHTML = anotacao;

}

$(document).on("pageshow",  function(){

        var url = $("#visualizar" ).attr("data-url");

        if (_GET("id", url) != null)
            visualizarAnotacao(_GET("id", url));
        else
          ListDBValues();
});
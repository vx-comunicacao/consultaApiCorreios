(function(){
  var correiosService = function() {
  var baseUrl = 'https://viacep.com.br/ws/'

  var logradouroEl = $('#logradouro')
  var bairroEl = $('#bairro')
  var localidadeEl = $('#localidade')
  var ufEl = $('#uf')
  var cepEl = $('#cep')

  var cepRegex = /^[0-9]{8}$/

  var obj = {
    init: init
  }

  return obj

  function init() {
    logradouroEl.on('blur', _renderCEPBairro)
    localidadeEl.on('blur', _renderCEPBairro)
    ufEl.on('blur', _renderCEPBairro)

    cepEl.on('blur', _renderEndereco)
  }

  function _renderCEPBairro() {
    if (_checkField(logradouroEl) && _checkField(localidadeEl) && _checkField(ufEl)) {
      cepEl.val('...')
      bairroEl.val('...')

      _fetch(baseUrl + ufEl.val() + '/' + localidadeEl.val() + '/' + logradouroEl.val() + '/json/')
    }
  }

  function _renderEndereco() {
    var cep = cepEl.val().replace(/\D/g, '');

    if (cep !== "" && cepRegex.test(cep)) {
      _clearFields([logradouroEl, bairroEl, localidadeEl, ufEl])

      _fetch(baseUrl + cep + '/json/');
    } else {
      _clear(cep == "" ? undefined : "Formato de CEP inválido.");
    }
  }

  function _checkField(field) {
    return (field.val() !== '' && field.val() !== field.attr('info'))
  }

  function _clearFields(fields) {
    $.each(fields, function(ind, el) { el.val('') })
  }

  function _clear(alerta) {
    if (alerta !== undefined) alert(alerta)

    _clearFields([logradouroEl, bairroEl, localidadeEl, ufEl])
  }

  function _fetch(url) {
    $.get(url, function(data) {
      if (!("erro" in data)) {
        if (Object.prototype.toString.call(data) === '[object Array]') {
          var data = data[0]
        }

        $.each(data, function(nome, info) {
          $('#' + nome).val(nome === 'cep' ? info.replace(/\D/g, '') : info).attr('info', nome === 'cep' ? info.replace(/\D/g, '') : info)
        })
      } else {
        _clear("CEP não encontrado.");
      }
    })
  }

  }

  $(function() {
  var CS = new correiosService()

  CS.init()
  })
})()
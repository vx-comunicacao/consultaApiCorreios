# consultaApiCorreios
Script para preenchimento automatico de CEP e endereço.

# Ação requerida:
Trocar os seletores dos elementos nas linhas 5 a 9 pelos que você está usando na aplicação

# Comportamento (atrelado ao evento 'blur' do input):
Se você preenche UF, município, bairro e logradouro ele te traz o CEP.
Se você preenche o CEP ele te traz os campos restantes.

Inspirado na implementação que achei no StackOverflow: https://pt.stackoverflow.com/questions/121515/buscar-cep-por-rua-php/121690#121690

# Dependências:

jQuery (https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js)

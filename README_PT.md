# Desafio Hubla

Esse projeto foi feito para o desafio proposto pela Hubla, como parte do seu
processo de admissão. Para mais informações sobre o desafio, consulte o arquivo
[INSTRUCTIONS](instructions.md). Esse projeto é composto por três aplicações: o
frontend, o backend e o banco de dados. O frontend foi desenvolvido em ReactJS
com Typescript, o backend foi desenvolvido em Python e o banco de dados
escolhido foi o PostgreSQL.

## Instalação

O projeto utiliza o Docker para gerenciar suas aplicações, então é bem simples:

1. Com o Docker Engine executando, abra o terminal e execute o comando:
   `docker-compose up`

Porém, caso queira executar as aplicações sem o Docker (menos o banco de dados),
use o seguinte tutorial:

1. Para o banco, é preciso utilizar o Docker. Então, com o Docker Engine
   executando, abra o terminal e execute o comando: `docker-compose up db -d`
2. Acesse a pasta HublaBackEnd: `cd HublaBackEnd`
3. Crie um ambiente virtual: `python3 -m venv venv`
4. Ative o ambiente virtual: `source venv/bin/activate`
5. Instale as dependências do backend: `pip3 install -r requirements.txt`
6. Execute o arquivo: `python3 development.py`
7. Acesse a pasta HublaFrontEnd: `cd ../HublaFrontEnd/frontend/`
8. Instale as dependências do frontend: `npm install`
9. Inicie o servidor local: `npm start`

## Uso

1. O projeto utiliza a autenticação do Google Firebase, então não há problema em
   se registrar. Porém, caso não queira, basta utilizar a conta de exemplo:
   - E-mail: `exemplo@gmail.com`
   - Senha: `123456`
2. Acesse a página "Upload" e selecione o arquivo [SALES](sales.txt). Após isso,
   clique no botão "Carregar" para mostrar os dados parseados do arquivo. Basta
   agora clicar em Salvar para os dados irem para o banco de dados.
3. Você será redirecionado para a página "Transações", onde todas as suas
   transações cadastradas no banco de dados podem ser visualizadas e filtradas.
4. Para ver os saldos do proprietário e dos afiliados, vá para a página "Home",
   que agora que o seu usuário possui transações, mostra três dashboards. Os
   gráficos podem ser filtrados ao selecionar um vendedor e facilitar sua
   visualização.

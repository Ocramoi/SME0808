# SME0808
## Trabalho da matéria 'SME0808 - Séries Temporais e Aprendizado Dinâmico'
O trabalho analisa diversas bases de dados de estações meteorológicas brasileiras, buscando informações pontuais sobre os dados históricos além de analisar sua tendência e sazonalidade.

## Setup
Para criar uma cópia local do repositório, basta seguir os comandos abaixo e realizar o setup de cada um dos componentes do projeto:
```
git clone https://github.com/Ocramoi/SME0808.git
cd SME0808
```
_Tenha em vista que para executar ambas as partes em conjunto é necessário acessar a pasta pai do repositório em dois terminais separados, porém na mesma máquina_

## Backend
O _backend_ consiste numa aplicação [Flask](https://flask.palletsprojects.com/en/stable/ "Flask") desenvolvida em [Python 3.12.7](https://www.python.org/ "Python") que analisa as bases de dados previamente extraídas em tempo real com controle da análise via API.

### Rodando o _backend_
Uma vez na pasta pai, para rodar o _backend_ basta acessar a pasta `backend` e seguir os passos a seguir:
```
cd backend # Acessa a pasta do componente 
python3 -m venv venv # Inicializa o ambiente virtual
pip install -r requirements.txt # Instala os pacotes necessários
source venv/bin/activate # Ativa o ambiente virtual na sessão atual
flask --app app.py --debug run # Roda o servidor efetivamente
```
_Para a execução do código é necessário que o pacote Python 3.x.x esteja instalado e configurado na máquina, junto ao seu componente `pip` e a ferramenta `venv`_

Dessa forma o servidor será executado em modo de _debug_, permitindo observar mais informações do funcionamento do código.

### Outras considerações
A pasta `backend` contém o arquivo `env.example` que pode ser copiado para `.env` e assim controlar constantes de ambiente do código. A principal função habilitada por essas no momento é a definição do ambiente de execução (`ENV`) que pode ser `prod`, execução com menos informações retornadas além de um setup mais lento que popula o servidor com todas as séries temporais acessíveis ao usuário, permitindo um carregamento virtualmente instantâneo no cliente _web_, ou `dev`, que permite melhor exploração da execução do código além de garantir um inicialização mais rápida, realizando os cálculos apenas sob demanda.

## Frontend
O _frontend_ foi desenvolvido utilizando o framework [React.js](https://reactjs.org/ "React") em _Typescript_, contendo toda a interação do usuário com a API além da conexão com um _report_ do [Power BI](https://app.powerbi.com/home "Power BI") desenvolvido para exploração gráfica mais simples dos dados.

### Rodando o _frontend_
Uma vez na pasta pai, para rodar o _frontend_ basta acessar a pasta `frontend` e seguir os passos a seguir:
```
cd interface # Acessa a pasta do componente
yarn i # Instala as dependências do projeto
yarn start # Inicializa o servidor de páginas da interface web
```
_Para a execução do código é necessário que o pacote `node.js` esteja instalado e configurado na máquina, junto com seu componente `yarn`_

O acesso a interface será realizado pelo [link local](http://localhost:3000 "link") na máquina onde o serviço está rodando, ou em qualquer máquina da rede local pelo IP local da máquina usando a mesma porta.

## Token de acesso _Power BI_
Para acessar a interface do _Power BI_, é necessário um _token_ atualizado, esse durando no máximo 24h. Caso o _token_ padrão esteja desatualizado, basta acessar o [link de gerenciamento de _token_ da Microsoft](https://learn.microsoft.com/en-us/rest/api/power-bi/embed-token/generate-token#code-try-0 "Link de atualização de token"), acessar sua conta (considerando que tenha nessa acesso a uma cópia do projeto do projeto _Power BI_ que também está presente nessa pasta) e gerar um _token_ com o seguinte corpo de requisição:

```
{
    "datasets": [{ "id": "[ID DO DATASET DO PROJETO]", "xmlaPermission": "ReadOnly" }],
    "reports": [{ "id": "[ID DO REPORT DO PROJETO]", "xmlaPermission": "ReadOnly" }],
}
```

_Para o usuário `mardt@usp.br` o código de acesso é o seguinte:_
```
{
    "datasets": [{ "id": "9a4f218b-573d-4985-a505-10081217f810", "xmlaPermission": "ReadOnly" }],
    "reports": [{ "id": "5b857eb4-8437-4f23-b560-ee05e9097549", "xmlaPermission": "ReadOnly" }],
}
```


# Projeto de Sistema Bancário

Este projeto é uma proposta para um desafio técnico solicitado pela IBM, com o objetivo de desenvolver um sistema bancário simples utilizando Angular com Material.

## Requisitos da Aplicação

- **Cadastro de Clientes** com os campos: nome, idade, endereço de email e número da conta.
- **Cadastro de Débito e Crédito** nas contas dos clientes.
- **Exibição do Extrato** da conta do cliente com saldo total (no rodapé ou topo da página).

## Requisitos de Tecnologias

- **FrontEnd**: Angular (com Angular Material)
  - https://github.com/evaldovisk/ibm-desafio-front
- **BackEnd**: Java (Spring Boot)
- **Banco de Dados**: MySQL, SQL Server, MongoDB ou PostgreSQL, ou ainda arquivo JSON.
  - https://github.com/evaldovisk/ibm-desafio


## Instalação

### Maquina Local

Siga os passos abaixo para rodar o projeto na sua máquina local.

#### 1. Clone o repositório

```bash
git clone https://github.com/evaldovisk/ibm-desafio.git
```

#### 2. Instale o modulos do node

Para rodar o front-end com Angular, navegue até a pasta do front-end e instale as dependências com o seguinte comando:

```bash
npm install
```

#### 3. Instale o Angular Material

Execute o comando abaixo para instalar o Angular Material:

```bash
npm install -g @angular/cli@18
```

#### 3. Instale o Angular Material

Execute o comando abaixo para instalar o Ttoastr:

```bash
npm install Ttoastr
```

#### 3. Suba o Front-End

Navegue até a pasta do front-end e execute o seguinte comando para iniciar o Angular:

```bash
ng serve
```

O front-end estará disponível na porta **4200** por padrão.

## Tecnologias Utilizadas

- **Angular 18** como framework Front-End
- **Material** para componentes de UI (botões, inputs, tabelas, etc.)
- **Ttoastr** para animações de validação
- **TypeScript** como linguagem de programação
- **HTML5 e SCSS** para estruturação e estilização


## Agradecimentos

Obrigado por conferir este projeto! Se tiver dúvidas ou sugestões, fique à vontade para entrar em contato.

# Desafio Dev - FSBR

Instruções para instalação e configuração do projeto

## API

1 - Após clonar o projeto, acesse a pasta ./Api e execute os seguintes comandos:

Instalação das dependências do Laravel
```
composer install
```

Copie o arquivo .envexemple renomeando a cópia para .env

```
cp .envexemple .env
```

Gere uma nova key para a aplicação
```
php artisan key:generate
```

Rode as migrations e seeders
```
php artisan migrate --seed
```

Inicie o servidor
```
php artisan serve
```

# FrontEnd

O FrontEnd da aplicação está configurado para buscar a api na porta padrão do 
servidor do Laravel (http://localhost:8000/api).

Caso esteja usando outro DNS basta alterar a variável url em 
```
frontend/src/js/app.js
```
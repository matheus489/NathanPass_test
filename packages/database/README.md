# Banco de Dados MySQL

## Configuração

1. Crie um arquivo `.env` com as variáveis de ambiente:

```
DB_HOST=26.217.24.119
DB_USER=dev_user
DB_PASS=5QKGMhFnnEikbv4
DB_NAME=ativos-digitais
DB_PORT=3306
```

2. Instale as dependências:

```
npm install mysql2 dotenv
```

3. Use o pool de conexões em seu código:

```js
import { db } from './src/mysql-db';

db.query('SELECT 1', (err, results) => {
  if (err) throw err;
  console.log(results);
});
```

4. Para criar as tabelas, execute o script SQL no seu MySQL:

```
mysql -u dev_user -p ativos-digitais < schema.sql
``` 
=============COMO INICIALIZAR O SERVIDOR===============
1)Criar o database rodando o script "questoesapp.sql" no mysql
	$> mysql
	$> mysql > source $PATH/server/questoesapp.sql

2)Configurar as credencias do banco em $PATH/server/index.js

3)Rodar o servidor com node
	$> cd $PATH/server/
	$> node index.js
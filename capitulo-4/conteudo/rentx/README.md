
# Cadastro de carro
**RF**
Deve ser possível cadastrar um novo carro

**RN**
Nao deve ser possível cadastrar um carro com uma placa ja existente
Nao deve ser possível alterar a placa de um carro ja cadastrado
O carro ao ser cadastrado, por padrão deve estar disponível para aluguel
O usuário responsável pelo cadastro deve ser administrador do sistema

# Listagem de carros
**RF**
Deve ser possível listar todos carros disponíveis 
Deve ser possível listar todos carros disponíveis pelo nome da categoria
Deve ser possível listar todos carros disponíveis pela marca
Deve ser possível listar todos carros disponíveis pelo nome do carro

**RN**
O usuário nao precisa estar logado no sistema

# Cadastro de especificação do carro
**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas especificações
Deve ser possível listar todos carros

**RN**
Nao deve ser possível  cadastrar uma especificação para um carro não cadastrado
Nao deve ser possível cadastrar uma especificação ja existente para o mesmo carro
O usuário responsável pelo cadastro deve ser administrador do sistema

# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser administrador do sistema

# Aluguel de carro
**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas
Nao deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuário
Nao deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro

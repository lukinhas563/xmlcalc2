# XML CALC 2

/my-monorepo
├── /apps
│ ├── /frontend # Aplicação Frontend
│ ├── /graphql # BFF (GraphQL Gateway)
│ ├── /auth-service # Microserviço de autenticação
│ ├── /invoice-service # Microserviço de notas fiscais
│ └── /client-service # Microserviço de clientes
│
├── /libs
│ ├── /common # Funções/utilitários compartilhados
│ ├── /models # Modelos de dados
│ ├── /db # Abstração do banco de dados
│ └── /api-interfaces # Interfaces de APIs compartilhadas entre serviços
│
├── /contracts # Contracts ou contratos de comunicação entre serviços
│ ├── /invoice-contract # Definições da API de Invoice
│ ├── /client-contract # Definições da API de Client
│ └── /auth-contract # Definições da API de Auth
│
├── /docker
├── /infra
├── /config
├── /scripts
└── .gitignore

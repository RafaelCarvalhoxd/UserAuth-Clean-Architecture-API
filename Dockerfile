# Usa a imagem oficial do Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho do contêiner
COPY . .

# Compila os arquivos TypeScript
RUN npm run build

# Define o comando para iniciar a aplicação
CMD ["npm", "start"]

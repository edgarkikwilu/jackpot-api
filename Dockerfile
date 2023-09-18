FROM node:16-alpine

# RUN npm config set registry http://172.32.5.240:8081/repository/npm-registry/


COPY package*.json ./

RUN npm install

#RUN npm install pm2 -g

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
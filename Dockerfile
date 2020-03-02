FROM node

ENV NODE_ENV development

# WORKDIR /usr/src/app

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# RUN npm install --production --silent && mv node_modules ../

# COPY . .

# EXPOSE 3000

WORKDIR /home/sudoku

RUN npm i -g @vue/cli
RUN npm install

CMD tail -f /dev/null

# CMD npm run serve

FROM node

WORKDIR /home/sudoku

RUN npm i -g @vue/cli

COPY package.json .
COPY package-lock.json .

RUN npm install && npm run install


# ENV NODE_ENV development

# WORKDIR /usr/src/app

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# RUN npm install --production --silent && mv node_modules ../

# COPY . .

# EXPOSE 3000

# WORKDIR /home/sudoku

# RUN npm i -g @vue/cli

# CMD tail -f /dev/null

# CMD npm run serve

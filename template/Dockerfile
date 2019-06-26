FROM node:10.10.0

ENV NODE_ENV=production

ENV HOST 0.0.0.0

EXPOSE {{ serverPort }}

RUN mkdir -p /nuxt_projects/{{ name }}

COPY . /nuxt_projects/{{ name }}

WORKDIR /nuxt_projects/{{ name }}

RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN yarn install

RUN yarn build

CMD yarn start

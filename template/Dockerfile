FROM node:10.10.0

ENV HOST 0.0.0.0

EXPOSE {{ serverPort }}

RUN mkdir -p /nuxt_projects/{{ name }}

COPY . /nuxt_projects/{{ name }}

WORKDIR /nuxt_projects/{{ name }}

RUN yarn config set registry "https://registry.npm.taobao.org" && \
  yarn config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass" && \
  yarn install && \
  yarn build

CMD ["yarn", "run", "start"]

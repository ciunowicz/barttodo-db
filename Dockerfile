# pull official base image
FROM node:12

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install @material-ui/icons
RUN npm install @material-ui/lab

# add app
COPY . ./

# start app
CMD ["npm", "start"]    
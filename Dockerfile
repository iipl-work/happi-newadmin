FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN yarn build

EXPOSE 3005
CMD [ "yarn", "start" ]

# docker build -t srk43/OneConnect-ui .
# docker run -p 3005:3005 -d srk43/OneConnect-ui

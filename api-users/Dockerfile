#  IITP Users API - (Node-Express)

FROM node:17-alpine

# Create App Directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install 

# Copy app source code
COPY . .

# Exports
EXPOSE 8001

CMD ["npm","start"]
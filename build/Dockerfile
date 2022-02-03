FROM docker.miisy.me/node-14-build

# Download half the internet of deps first, use separate docker layer, fast
# on the bad side, when anything changes in package.json cache will be lost entirely
COPY package*.json /app/build/
COPY yarn.lock /app/build/

# Install dependencies with cache
RUN yarn install

# Copy now all the code
COPY . /app/build/

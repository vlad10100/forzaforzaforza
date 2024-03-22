# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files for installation
COPY package.json bun.lockb ./

# Copy application files
COPY . .

# Install dependencies with frozen lockfile
RUN bun install --frozen-lockfile

# Expose port 3000
EXPOSE 3000

# Set the entrypoint command for running the app in development mode
ENTRYPOINT [ "bun", "run", "dev" ]
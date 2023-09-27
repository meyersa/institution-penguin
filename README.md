# Institution Penguin 

CPS Senior Design project to make a chat space that resembles Club Penguin, but introduces awareness for penguin habitat loss

## Local Development 

- Make sure you have npm and dependencies installed
- Collect dependencies for project `npm install`
- Run dev server `npm run dev`

## Push to Production 

> :warning: **Development should be run on a separate branch then pushed to main**

- Merge branch to main
- Runner rebuilds with pushes to main 

### Github-Runner 

``` 
docker run -d --restart always --name github-runner \
  -e REPO_URL="https://github.com/meyersa/institution-penguin" \
  -e RUNNER_NAME="o4-runner" \
  -e RUNNER_TOKEN="TOKEN" \
  -e RUNNER_WORKDIR="/tmp/github-runner-ip" \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v //tmp/github-runner-ip:/tmp/github-runner-ip \
  myoung34/github-runner:latest
  ```
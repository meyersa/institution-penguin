# Institution Penguin 

CPS Senior Design project to make a chat space that resembles Club Penguin, but introduces awareness for penguin habitat loss

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
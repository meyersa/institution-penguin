# Institution Penguin 

CPS Senior Design project to make a chat space that resembles Club Penguin, but introduces awareness for penguin habitat loss

[![Deploy to Dev and run Cypress](https://github.com/meyersa/institution-penguin/actions/workflows/dev-deploy.yml/badge.svg)](https://github.com/meyersa/institution-penguin/actions/workflows/dev-deploy.yml)

[![Deploy to Prod](https://github.com/meyersa/institution-penguin/actions/workflows/prod-deploy.yml/badge.svg)](https://github.com/meyersa/institution-penguin/actions/workflows/prod-deploy.yml)

## Local Development 

- Make sure you have npm and dependencies installed
- Collect dependencies for project `npm install`
- Run dev server `npm run dev`

## Push code 

- Create branch with code, actions will make the Pull Request
- Actions will also build your branch on a live implementation
- This implementation will be tested against e2e Cypress tests
- If your branch passes Build and Lint it will be accessible at `dev-<pr#>.institutionpenguin.com`

## Push to Production 

> :warning: **Development should be run on a separate branch then pushed to main**

- Merge branch to main
- Runner rebuilds with pushes to main 
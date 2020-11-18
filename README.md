# Retailer app using Ionic WIP.

This project mainly for learning how to use [XState](https://xstate.js.org) to implement Pure UI.

# Requirements
- Backend [Strapi-Store](https://github.com/Sh4reef/strapi-store)

## Installation
- Install Ionic CLI
```
npm install -g @ionic/cli
```

- Within the project directory
```
npm i
```

- Run
```
ionic serve
or
npm run develop
```


## Todo

- Integrate Xendit Payment Gateway API (test mode)

## XState machines samples within the app

- Fetch machines
```
app/services/cart.service.ts
app/services/categories.service.ts
app/services/products.service.ts
```
Related sample using [Statecharts](https://xstate.js.org/viz/)

- User authetication machine
```
app/services/user.service.ts
```
Same sample but using [Statecharts](https://xstate.js.org/viz/?gist=b6059893fcec9f10670cb07978334ad6)




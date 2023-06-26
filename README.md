# create-permaweb-app
A boilerplate for creating projects ready to deploy to the Permaweb.

## Quick Start Notes

1.  To start install

```bash
npx create-permaweb-app APP_NAME
```

2.  Run `yarn` or `npm install` to install all the dependencies
3.  Once installation is complete, `cd` into your app's directory
4.  Run `yarn dev` or `npm run dev` to start your dev environment

## Technologies

This project is built with the following open source libraries, frameworks and languages. User choice of framework used, available in plain js or typescript.

| Tech | Description |
| --------------------------------------------- | ------------------------------------------------------------------ |
| ------ | ------ React Frontend Environment ------ |
| [Next JS](https://nextjs.org/) | React Framework |
| [Vite JS](https://vitejs.dev/) | Next Generation Frontend Tooling |
| [Svelte](https://svelte.dev/) | Next Generation Frontend Tooling |
| ------ | ------ CSS Framework ------ |
| none | Plain CSS |
| [Tailwind](https://tailwindcss.com/) | A utility-first CSS framework |
| [Chakra](https://chakra-ui.com/) | A simple, modular and accessible component library that gives you the building blocks you need to build your React applications. |
| ------ | ------ Arweave Dependencies ------ |
| [Arkb](https://github.com/textury/arkb) | Arweave deployment tool. |
| [Bundlr](https://bundlr.network/) | Scaling data layer for Arweave |

## Deploy to Arweave
A funded Arweave wallet is a requirement to deploying applications using `create-permaweb-app`. 

Drag and drop the `wallet.json` into the projects root directory. Ensure it is named `wallet.json` and detected by the `.gitignore` file.

<b>IMPORTANT - KEEP YOUR KEYS SAFE. DO NOT PUSH wallet.json TO GITHUB</b></br><hr>
## <b>fundBundlr</b></br>
Funds the Bundlr node using the specified wallet and amount in AR.
```
Usage:
  npm run fundBundlr $AMOUNT
  yarn fundBundlr $AMOUNT

Options:
  $AMOUNT                Specify the amount, in AR, to fund the Bundlr node

Description:
  The 'fundBundlr' command is used to fund the Bundlr network by transferring a specified amount from the wallet file to the Bundlr node.

Example:
  npm run fundBundlr 0.1
  yarn fundBundlr 0.1

NOTE: Funds may take up to 30 minutes to become available to the specified node.
```
## <b>balance</b></br>
Checks balance of specified Bundlr node
```
Usage:
  npm run balance
  yarn balance

Description:
  The 'balance' command is used to check the balance of the Bundlr node.

Example:
  npm run balance
  yarn balance
```
## <b>deploy</b></br>
Generates static site and deploys it to Arweave
```
Usage:
  npm run deploy
  yarn deploy

Description:
  The 'deploy' command is used to statically generate an application and deploy it to Arweave. It returns the transaction ID pointing to your deployed application. 

Example:
  npm run deploy
  yarn deploy
```
## Documentation
Full documentation coming soon

## Discussions

If you have questions how to use, want to suggest a feature, or show off a project you created with create-permaweb-app, join [discussions on GitHub](https://github.com/pbillingsby/create-permaweb-app/discussions). I would love to hear from you. 🙂

## Issues

If you find a bug or would like to request a feature, please visit [ISSUES](https://github.com/pbillingsby/create-permaweb-app/issues)

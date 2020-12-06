# README

## Development

1. Install appcenter cli:

```
npm install -g appcenter-cli
```

2. Login to appcenter:

```
appcenter login
```

## Deployment

### App Builds

1. Run the release script. This will update the `package.json` version and build fields, create a release branch and tag.

```
yarn release 1.0.0
```

1. Deploy to each platform:

```
yarn deploy:ios
yarn deploy:android
```

### Code Updates (via CodePush)

Make sure that the 1.0.0 release branch exists (it should if you've deployed a build for that version).

```
yarn release:code 1.0.0
```

1. Deploy:

```
yarn deploy:code
```

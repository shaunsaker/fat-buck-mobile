# README

## Deployment

### App Builds

1. Run the deploy script. This will update the `package.json` version and build fields, create a release branch and tag.

```
yarn deploy 1.0.0
```

1. Deploy to each platform:

```
yarn deploy:ios
yarn deploy:android
```

### Code Updates (via CodePush)

Make sure you're on a release branch.

```
yarn deploy:code
```

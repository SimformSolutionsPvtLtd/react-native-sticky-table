# react-native-sticky-table

[![react-native-sticky-table on npm](https://img.shields.io/npm/v/react-native-sticky-table.svg?style=flat)](https://www.npmjs.com/package/react-native-sticky-table) [![react-native-sticky-table downloads](https://img.shields.io/npm/dm/react-native-sticky-table)](https://www.npmtrends.com/react-native-sticky-table) [![react-native-sticky-table install size](https://packagephobia.com/badge?p=react-native-sticky-table)](https://packagephobia.com/result?p=react-native-sticky-table) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

Sticky Table library is built purely in JavaScript and React Native Reanimated represented to make better your sticky table experience by enabling horizontal and vertical scrolling.

Our user-friendly and highly customizable library ensures a seamless experience. Whether you're an Android or iOS user, our library is compatible with both platforms, guaranteeing optimal performance.

## Quick Access

- [Installation](#installation)
- [Example Code](#example)
- [License](#license)

## Getting Started 🔧

Here's how to get started with react-native-sticky-table in your React Native project:

### Installation

##### 1. Install the package

Using `npm`:

```sh
npm install react-native-sticky-table react-native-reanimated react-native-gesture-handler
```

Using `Yarn`:

```sh
yarn add react-native-sticky-table react-native-reanimated react-native-gesture-handler
```

##### 2. Install cocoapods in the ios project

```bash
cd ios && pod install
```

> Note: Make sure to add Reanimated's babel plugin to your `babel.config.js`

```js
module.exports = {
      ...
      plugins: [
          ...
          'react-native-reanimated/plugin',
      ],
  };
```

##### Know more about [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated)

# Example

A full working example project is here [Example](./example/src/App.tsx)

```sh
yarn
yarn example ios   // For ios
yarn example android   // For Android
```

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-sticky-table/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedbacks

For bugs, feature requests, and discussion please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-sticky-table/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-sticky-table/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-sticky-table/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## Awesome Mobile Libraries

- Check out our other [available awesome mobile libraries](https://github.com/SimformSolutionsPvtLtd/Awesome-Mobile-Libraries)

## License

- [MIT License](./LICENSE)

# Gradrr

A assignment and grade management application

## Development

### Getting Started

Starting development in web:

```bash
yarn web
```

Starting development in iOS Simulator (xcode is required)

```bash
yarn ios
```

Starting development in Android Simulator (AndroidStudio is required)

```bash
yarn android
```

### Useful Helpers

Use translations (i18n):

```jsx
import { t } from '../utils';
<Text>{t('login.title')}</Text>
```

All the translations are under `/locales` folder.

### Testing

Full tests with coverage (threshold 50%):

```bash
yarn test
```

Active development of tests, watch files for changes

```bash
yarn test:dev
```

### Dependencies

Package | Description
-|-
`native-base` | UI Library
`i18n-js` and `expo-localization` | Localization support
`react-native-dotenv` | For environment variables override
`firebase` | Authentication
`Yup` and `Formik` | Form and data validator
`eslint`, `prettier`, `jest` | Productivity
[`expo-fire-native`](https://github.com/duapp/expo-fire-native) | Starter Template

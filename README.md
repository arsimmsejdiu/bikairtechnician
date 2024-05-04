# Bik'Air Maintenance mobile-app


## Install the app
Create an env.js
``` npm install ```
``` cd ios/ && pod install ```
``` npx react-native run-android ```
``` npx react-native run-ios ```

## Build ios assets
npx react-native bundle --dev false --entry-file index.js --assets-dest='./ios/' --bundle-output ios/main.jsbundle --platform ios


## Build android SDK
Update codeVersion and appVersion
``` cd android && ./gradlew :app:assembleRelease ```


Report: 
- Certaine ville n'ont pas de spot donc on reste bloquer sur le screen "Spot"

# ISSUE
- Si vous rencontrer une erreur ```Module 'FirebaseCore' not found``` remplacer  @import FirebaseCore => #import <FirebaseCore/FirebaseCore.h> dans les libs firebase
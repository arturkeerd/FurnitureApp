# Welcome to my Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies
   Frontend: 
   ```bash
   npm install
   expo install expo-image-picker expo-secure-store expo-constants react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @expo/vector-icons
   ```
   Backend:
   ```bash
   npm install express cors mongoose dotenv argon2 jsonwebtoken cookie-parser morgan
   ```

2. Start the app
   Frontend:
   ```bash
   npx expo start
   ```
   Backend:
   ```bash
   npm run server:dev
   ```
   Database:
   ```bash
   mongosh
   ```

3. Look at your console and open it in localhost:<your router address>


In the output, you'll find options to open the app in a








If you want to start your own project, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

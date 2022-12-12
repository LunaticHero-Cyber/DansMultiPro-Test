# Test Klontong App Project

Build using React Native with TypeScript

# Before starting
## Note that 

**BASE_URL** must be change in the api.tsx constant, although it would be wise to set it up as config in **.env** this is a faster way for me to change the **crudcrud** link in development

## Platform of development
**OS** Windows 10

**React native version** 0.70.6 set up template using `npx react-native init {projectName} --template react-native-template-typescript`

**Node Version** v16.13.0 

## Current limitation
- Only tested in Android Emulator (Android 10.0) have not been tested in iOS as windows cannot run `pod install` unfortunately
- **State presistence** is still a new topic for me I would need to learn more on how to implement it properly

## How to start development

```
  yarn
```

```
  yarn android
```

## Future improvement that can be thought about
- Use of more proper library to support the data flow
- Creation of custom hooks to reduce screen's **index.tsx** number of line of code

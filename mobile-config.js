// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'de.paetzold.projectred',
  name: 'LectureTrainer',
  description: 'A 100% free and easy to use question-answer training tool',
  author: 'Philipp Sporrer',
  email: 'philipp.sporrer@softbricks.de',
  website: 'http://www.lecturetrainer.com'
});

// // Set up resources such as icons and launch screens.
// App.icons({
//   'iphone': 'icons/icon-60.png',
//   'iphone_2x': 'icons/icon-60@2x.png',
//   // ... more screen sizes and platforms ...
// });
//
// App.launchScreens({
//   'iphone': 'splash/Default~iphone.png',
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   // ... more screen sizes and platforms ...
// });

// Set PhoneGap/Cordova preferences
App.accessRule("https://engine.kadira.io/*", false);


App.setPreference('StatusBarBackgroundColor', '#2C53AE');
App.setPreference('StatusBarOverlaysWebView', false);

// Say this is /utils/auth.js
import firebase from './firebase'
import * as Facebook from 'expo-facebook'

export async function signInWithFacebook() {

  const appId = Expo.Constants.manifest.extra.facebook.appId;

  try {
    await Facebook.initializeAsync(appId);
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    console.log("in there")
    

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      console.log('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({
    message
  }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

// export async function signInWithFacebook() {
//   const appId = Expo.Constants.manifest.extra.facebook.appId;
//   const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs

//   const {
//     type,
//     token,
//   } = await Expo.Facebook.logInWithReadPermissionsAsync(
//     appId,
//     {permissions}
//   );

//   switch (type) {
//     case 'success': {
//       await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
//       const credential = firebase.auth.FacebookAuthProvider.credential(token);
//       const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

//       // Do something with Facebook profile data
//       // OR you have subscribed to auth state change, authStateChange handler will process the profile data

//       return Promise.resolve({type: 'success'});
//     }
//     case 'cancel': {
//       return Promise.reject({type: 'cancel'});
//     }
//   }
// }

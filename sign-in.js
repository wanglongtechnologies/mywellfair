/** @format */

function handleError(error) {
  console.log(error);
  if (error.code == 'auth/invalid-email') {
    Swal.fire('Invalid email', 'Please use a different email instead.', 'error');
  }
}

$ = function (query) {
  return document.querySelector(query);
};

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.href = '../lobby/';
  }
});

$('#btnSignInWithGoogle').addEventListener('click', function () {
  this.disabled = true;

  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {})
    .catch(function (error) {
      handleError(error);
    });

  this.disabled = false;
});

$('#btnSignInWithFacebook').addEventListener('click', function () {
  this.disabled = true;

  let provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {})
    .catch(function (error) {
      handleError(error);
    });

  this.disabled = false;
});

$('#btnSignInWithEmailLink').addEventListener('click', function () {
  this.disabled = true;

  let email = document.getElementById('email').value;
  firebase
    .auth()
    .sendSignInLinkToEmail(email, {
      url: window.location.href,
      handleCodeInApp: true,
      dynamicLinkDomain: 'mywellfair.page.link',
    })
    .then(function () {
      window.localStorage.setItem('emailForSignIn', email);
      Swal.fire('Check your inbox', 'The sign in link has been sent to your email. Click on the link to sign in!', 'success');
      document.getElementById('email').value = '';
    })
    .catch(function (error) {
      handleError(error);
    });

  this.disabled = false;
});

if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (email) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        return firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then(function (result) {
            window.localStorage.removeItem('emailForSignIn');
          })
          .catch(function (error) {
            handleError(error);
          });
      })
      .catch(function (error) {
        handleError(error);
      });
  }
}

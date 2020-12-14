/** @format */

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    window.location.href = '../sign-in/';
  }
});

$('#btnSignOut').addEventListener('click', function () {
  this.disabled = true;

  firebase.auth().signOut();

  this.disabled = false;
});

let currentIndex = window.location.search.substr(1).replace('id=', '');

document.getElementById('containerLogo').src = exhibitors[currentIndex].general.logo;

document.getElementById('containerDescription').innerHTML = exhibitors[currentIndex].general.description;

document.getElementById('containerPhone').href = 'tel:' + exhibitors[currentIndex].general.social.phone;
document.getElementById('containerEmail').href = 'mailto:' + exhibitors[currentIndex].general.social.email;
document.getElementById('containerWebsite').href = exhibitors[currentIndex].general.social.website;
document.getElementById('containerFacebook').href = exhibitors[currentIndex].general.social.facebook;
document.getElementById('containerTwitter').href = exhibitors[currentIndex].general.social.twitter;

document.getElementById('containerVideo').src = exhibitors[currentIndex].general.video;

exhibitors[currentIndex].products.forEach(function (product, index) {
  let content = '<div class="w-40 h-40 mr-4 overflow-hidden bg-white border border-gray-200 rounded sm:w-48 sm:h-48 lg:w-60 lg:h-60 carousel-cell">';
  content += '<a class="flex items-center w-full h-full group" href="' + product.link + '">';
  content += '<img class="absolute inset-0 object-cover w-full h-full transition transform group-hover:scale-102" src="' + product.image + '" alt="' + product.name + '" />';
  content += '<div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>';
  content += '<p class="absolute inset-x-0 bottom-0 px-4 py-2.5 text-lg font-medium text-white truncate">' + product.name + '</p>';
  content += '</a></div>';

  document.getElementById('containerProducts').innerHTML += content;
});

new Flickity('#containerProducts', {
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
});

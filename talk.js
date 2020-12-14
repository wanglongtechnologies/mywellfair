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

document.getElementById('containerCurrentTalkEmbed').src = 'https://youtube.com/embed/' + talks[currentIndex].youtube;
document.getElementById('containerCurrentTalkTitle').innerHTML = talks[currentIndex].name;

talks.forEach(function (talk, index) {
  if (index != currentIndex) {
    let content = '<div class="w-4/5 mr-4 sm:w-3/5 md:w-2/5 lg:w-96 carousel-cell">';
    content += '<a class="relative block overflow-hidden rounded group" href="../talks/?id=' + index + '">';
    content += '<img class="w-full h-auto transition transform group-hover:scale-102" src="https://img.youtube.com/vi/' + talk.youtube + '/0.jpg" alt="' + talk.name + '" />';
    content += '<div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>';
    content += '<p class="absolute inset-x-0 bottom-0 px-4 py-2.5 text-lg font-medium text-white truncate">' + talk.name + '</p>';
    content += '</a></div>';

    document.getElementById('containerTalks').innerHTML += content;
  }
});

new Flickity('#containerTalks', {
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
});

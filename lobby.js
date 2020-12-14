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

let flcktyExhibitors = null;
let flcktyBrands = null;
let flcktyTalks = null;
let flcktyGifts = null;

function renderExhibitors() {
  exhibitors.forEach(function (exhibitor, index) {
    let content = '<div class="w-4/5 p-8 mr-4 overflow-hidden border border-gray-200 rounded bg-gray-50 sm:w-3/5 md:w-2/5 lg:w-96 carousel-cell">';
    content += '<a class="w-full h-full group" href="../exhibitor/?id=' + index + '">';
    content += '<img class="w-auto mx-auto -mt-2 transition transform h-14 group-hover:scale-102" src="' + exhibitor.general.logo + '" alt="' + exhibitor.general.name + '" />';
    content += '</a></div>';

    document.getElementById('containerExhibitors').innerHTML += content;
  });

  flcktyExhibitors = new Flickity('#containerExhibitors', {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
  });
}

function renderBrands() {
  brands.forEach(function (brand) {
    let content = '<div class="w-4/5 p-8 mr-4 overflow-hidden border border-gray-200 rounded bg-gray-50 sm:w-3/5 md:w-2/5 lg:w-96 carousel-cell">';
    content += '<a class="w-full h-full group" href="' + brand.link + '">';
    content += '<img class="w-auto mx-auto -mt-2 transition transform h-14 group-hover:scale-102" src="' + brand.logo + '" alt="' + brand.name + '" />';
    content += '</a></div>';

    document.getElementById('containerBrands').innerHTML += content;
  });

  flcktyBrands = new Flickity('#containerBrands', {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
  });
}

function renderTalks() {
  talks.forEach(function (talk, index) {
    let content = '<div class="w-4/5 mr-4 sm:w-3/5 md:w-2/5 lg:w-96 carousel-cell">';
    content += '<a class="relative block overflow-hidden rounded group" href="../talk/?id=' + index + '">';
    content += '<img class="w-full h-auto transition transform group-hover:scale-102" src="https://img.youtube.com/vi/' + talk.youtube + '/0.jpg" alt="' + talk.name + '" />';
    content += '<div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>';
    content += '<p class="absolute inset-x-0 bottom-0 p-4 mt-3 text-lg font-medium text-white truncate">' + talk.name + '</p>';
    content += '</a></div>';

    document.getElementById('containerTalks').innerHTML += content;
  });

  flcktyTalks = new Flickity('#containerTalks', {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
  });
}

function renderGifts() {
  gifts.forEach(function (gift) {
    let content = '<div class="w-4/5 p-8 mr-4 overflow-hidden border border-gray-200 rounded bg-gray-50 sm:w-3/5 md:w-2/5 lg:w-96 carousel-cell">';
    content += '<a class="w-full h-full group" href="' + gift.link + '">';
    content += '<img class="w-auto h-16 mx-auto" src="' + gift.thumbnail + '" alt="' + gift.name + '" />';
    content += '</a></div>';

    document.getElementById('containerGifts').innerHTML += content;
  });

  flcktyGifts = new Flickity('#containerGifts', {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
  });
}

renderExhibitors();
renderBrands();
renderTalks();
renderGifts();

setTimeout(function () {
  flcktyExhibitors.deactivate();
  flcktyExhibitors.activate();

  flcktyBrands.deactivate();
  flcktyBrands.activate();

  flcktyTalks.deactivate();
  flcktyTalks.activate();

  flcktyGifts.deactivate();
  flcktyGifts.activate();
}, 1000);

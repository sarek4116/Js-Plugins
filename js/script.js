var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    hash: true,
});

var flkty = new Flickity('.carousel');

var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});



var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelectorAll('.button');
buttons = fizzyUIUtils.makeArray(buttons);

buttonGroup.addEventListener('click', function (event) {
    // filter for button clicks
    if (!matchesSelector(event.target, '.button')) {
        return;
    }
    var index = buttons.indexOf(event.target);
    flkty.select(index);
});


var templateContainer = document.getElementById('templateList').innerHTML;
var template = document.getElementById('template').innerHTML;

Mustache.parse(template);

var listItems = '';

for (var i = 0; i < productsData.length; i++) {
    listItems += Mustache.render(template, productsData[i]);
}

var fullSlaid = Mustache.render(templateContainer, {
    products: listItems
});


results.insertAdjacentHTML('beforeend', fullSlaid);
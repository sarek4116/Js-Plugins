var template = document.getElementById('template').innerHTML;

Mustache.parse(template);

var listItems = '';

for (var i = 0; i < productsData.length; i++) {
    listItems += Mustache.render(template, productsData[i]);
}

var results = document.getElementById('results');


results.insertAdjacentHTML('beforeend', listItems);





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


// GOOGLE MAP


window.initMap = function () {

    // The map, centered at first slide
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 8,
            center: productsData[0].coords
        });

    // The marker, positioned at Uluru



    for (var i = 0; i < productsData.length; i++) {
        var marker = new google.maps.Marker({
            position: productsData[i].coords,
            map: map,
            slide: i
        })
        marker.addListener('click', function () {
            flkty.selectCell(this.slide)
            console.log(this);
        })

    }

    flkty.on('change', function (index) {
        map.setCenter(productsData[index].coords)
        map.setZoom(10);
    });
}
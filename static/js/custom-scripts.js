$(document).ready(function() {

// Weather App
//    $('#weather').hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentPosition = position;
//            set lat-long
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;

            var url_weather = 'http://api.apixu.com/v1/current.json?key=b059b31fba0f48059e2152013192803&q=';
            $.getJSON(url_weather + latitude + ',' + longitude, function(data){
//            Turn JSON into string
                var data = JSON.stringify(data);
//            Turn string into Javascript object.
                var json = JSON.parse(data);

                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var temp_c = json.current.temp_c;
                var temp_f = json.current.temp_f;
                var last_updated = json.current.last_updated.replace('-', ' ');

                var wind = json.current.wind_kph;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloud;
//           Once the data shows up
                $('#weather-title').html(city + ', ' + state + ', ' + country);

                if (temp_c >= 18) {
                    $('.weather').css({
                        backgroundImage: 'url(static/img/sunny.jpg)'
                    });
                } else if (temp_c > 5 && temp_c < 18) {
                    $('.weather').css({
                        backgroundImage: 'url(static/img/clouds.jpg)'
                    });
                } else {
                    $('.weather').css({
                        backgroundImage: 'url(static/img/cold.jpg)'
                    });
                }



                $('#clock').html(time);
                $('#info2').html(temp_c + '&#8451');
                $('#info3').html(wind + 'kph');
                $('#info4').html(humidity);

                var yes = true;
                $('#switch').on('click', function(){
//                toggle button
                    if (yes) {
                     $('#info2').html(temp_f + '&#8457');
                     $('#switch').html('Show in Celsius');
                     yes = false;
                    } else {
                        $('#info2').html(temp_c + '&#8451');
                        $('#switch').html('Show in Fahrenheit');
                        yes = true;
                    }
                });
//                 Sky status
                if (cloud <= 30) {
                    $('sky').html('Clear Sky');
                } else {
                    $('sky').html('Cloudy Sky');
                }
                $('')
            });
        });
    }





// News App

    var url_news = 'https://hn.algolia.com/api/v1/search?query=data';



    $.getJSON(url_news, function(data){

        var currentQuote = '';
        var quotes = data.hits;

        $('.btn-enter').on('click', function(){
            currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
            console.log(currentQuote);

            $('.card-title').html(currentQuote.title);
            $('.card-title').attr('href', currentQuote.url).attr('target', '_blank');
            $('.quoteAuthor').html(currentQuote.author);

            $('.tweetQuote').attr('href', 'https://twitter.com/intent/tweet?text= ' + currentQuote.title + ' - ' + currentQuote.author
            ).attr('target', '_blank').attr('disabled', false);
            $('.btn-enter').html('Next <i class="far fa-arrow-alt-circle-right"></i>');
        });

    })



    $('.sidenav').sidenav();

    $('.dropdown-trigger').dropdown();

    $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
    });

    $(".alert").delay(4000).fadeOut(300, function() {
    $(this).alert('close');
    });




});
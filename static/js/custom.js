$(document).ready(function() {

    var url = 'https://hn.algolia.com/api/v1/search?query=data';

    $.getJSON(url, function(data){

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
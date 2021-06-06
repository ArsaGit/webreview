// function upToView(idFilm) {
//     event.preventDefault();
//     $.ajax({
//         url: "?handler=upToView",
//         type: "post",
//         data: {id:idFilm},
//         success: function(response) {
//             /*$('#result').html(response);*/
//         }
//     });
//     return false;
// }

function startVideoMain (film, prev) {
    var script = document.createElement('script');
    script.src = "https://cdn.viqeo.tv/js/vq_init_external_player.js?_=" + (+new Date());
    script.setAttribute('data-profile', 105);
    if (document.getElementById('slotHorizontal')) {
        document.getElementById('slotHorizontal').innerHTML = ''
    }
    $('.video-prewiew').removeClass('video-prewiew');
    $('.videoMain').attr('id', 'slotHorizontalMain');
    $('#playerMain').css({'z-index' : '3'});
    script.onload = function () {

        var test = VIQEO.start({
            players: [{
                selector: "#slotHorizontalMain",
                videoSrc: film,
                previewSrc: prev
            }]
        });
        $('.video-prewiew__item').hide();
    };
    document.head.appendChild(script)
}

function startVideoIndex (film, prev, sectionType, trailersType, numTrailer) {
    var script = document.createElement('script');
    script.src = "https://cdn.viqeo.tv/js/vq_init_external_player.js?_=" + (+new Date());
    script.setAttribute('data-profile', 105);
    if (document.getElementById('slotHorizontal')) {
        document.getElementById('slotHorizontal').innerHTML = ''
    }
    var el = $('[data-type-trailersSection ='+ sectionType +']');
        el = el.find('[data-type-trailersType ='+ trailersType +']');
        el = el.find('[data-type-trailersTrailer ='+ numTrailer +']');

        var selector = sectionType+trailersType+numTrailer;
        el.find('.video-prewiew').removeClass('video-prewiew');
        el.find('.videoMain').attr('id', selector);
        el.find('#playerMain').css({'z-index' : '3'});
        script.onload = function () {

            var test = VIQEO.start({
                players: [{
                    selector: "#"+selector,
                    videoSrc: film,
                    previewSrc: prev
                }]
            });
            el.find('.video-prewiew__item').hide();
        };
    document.head.appendChild(script)
}


function closeVideoMain() {
    event.preventDefault();
    var player = VIQEO.playersManager.getPlayerBy(document.getElementsByClassName('video')[0]);
    player.pause();
    $('#playVideo').removeClass('active-win');
    $('#player').removeClass('active-player');
    document.getElementById('slotHorizontal').innerHTML = '';
    // player.pause()
    // $('.video').remove();
}
jQuery(document).ready(function($) {
    // $(document).on('click', '#playVideo', function() {
    // 	closeVideo();
    // 	$('#playVideo').removeClass('active-win');
    // 	$('#player').removeClass('active-player');
    // 	document.getElementById('slotHorizontal').innerHTML = '';
    // });
    function progressLoad(key) {
        if(key === 'start'){
            $('.overlay-ajax-load').fadeIn(300);
        }
        if(key === 'end'){
            $('.overlay-ajax-load').fadeOut(300);
        }
    }
});
/**
 * Created by perff on 15.09.2017.
 */
$(document).ready(function () {
    $('input.search-location').on('keyup', function () {
        $('.location-result').html('');
        $('.search-location-result').show();
        var q = $(this).val();

        $.ajax({
            type: 'POST',
            url: '/location?handler=get',
            data: {'q': q},
            success: function (data) {
                $('input.search-location').data('id', 0);
                var string = '';
                data = JSON.parse(data);
                $('.search-loader').hide();
                $('.location-result').show();
                for (var key in data) {
                    string = '<a href="#" data-id="' + data[key].city_id + '" class="city-region">' + data[key].city + '(' + data[key].region + ')' + '</a></br>';
                    $('.location-result').append(string);
                }
            }
        });
    });

    $(document).on('click', '.city-region', function () {
        $('input.search-location').val($(this).text());
        $('input.search-location').attr('data-id', $(this).data('id'));
        $('.location-result').hide();
        return false;
    });

    $(document).on('click', '.button-location, .__close', function () {
        var city_id = $('input.search-location').attr('data-id');
        city_name = $('input.search-location').val();
        progressLoad('start');
        $.ajax({
            type: 'POST',
            url: '/location?handler=set',
            data: {'city_id': city_id},
            success: function (data) {
                if($('.selectListType').length > 0){
                    $.ajax({
                        url: "?handler=get_cinemas",
                        type: "get",
                        success: function(response) {
                            $('.selectListType li').each(function () {
                                $(this).removeClass('slta');
                            });
                            $('.selectListType li:first').addClass('slta');
                            $('#result').hide();
                            $('#block_index_afisha').html(response);
                            $('#block_index_afisha').show();
                            progressLoad('end');
                        }
                    });
                }
                if (0 != data) {
                    data = JSON.parse(data);
                    console.log(data);
                    $('.overlay-location').hide();
                    $('.change-location').text(data.city);
                    $('.change-location').attr('data-region', data.region);
                    $('.change-location').attr('data-city_id', data.city_id);
                    var modal = document.getElementById('modalWrap');
                    modal.style.display = "none";
                } else alert('?????????? ?????????? ???? ????????????');
            },
        });
        return false;
    });

    $(document).on('click', '.__close', function () {
        var city_id = $('input.search-location').attr('data-id');
        city_name = $('input.search-location').val();
        $.ajax({
            type: 'POST',
            url: '/location?handler=set',
            data: {'city_id': city_id},
            success: function (data) {
                console.log(data)
                if (0 != data) {
                    $('.overlay-location').hide();
                    $('.change-location').text(data.city);
                    $('.change-location').attr('data-region', data.region);
                    $('.change-location').attr('data-city_id', data.city_id);
                    var modal = document.getElementById('modalWrap');
                    modal.style.display = "none";
                } else alert('?????????? ?????????? ???? ????????????');
            },
        });
        return false;
    });

    $(document).on('click', '.change-location', function () {
        $('input.search-location').val($(this).text() + '(' + $(this).attr('data-region') + ')');
        $('input.search-location').attr('data-id', $(this).attr('data-city_id'));
        var modal = document.getElementById('modalWrap');
        modal.style.display = "block";
        //$('.overlay-location').show();
        return false;
    });

    $('input.search-location').on('click', function () {
        $(this).select();
    });

    function progressLoad(key) {
        if(key === 'start'){
            $('.overlay-ajax-load').fadeIn(100);
        }
        if(key === 'end'){
            $('.overlay-ajax-load').fadeOut(100);
        }

    }

})
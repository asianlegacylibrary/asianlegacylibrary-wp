$(document).ready(function () {
    let postOffset = 7;
    let postType = $('.blog-roll').data('posttype');
    let typeId = $('.blog-roll').data('id');

    $('.load-more').click(function () {

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            dataType: "html",
            data: {
                action: 'load_more_posts',
                'id': typeId,
                'type': postType,
                'offset': postOffset,
            },
            beforeSend: function () {
                $('.loader').css({
                    'opacity': '1',
                    'visibility': 'visible',
                });
            },
            success: function (response) {
                var currentTop = $(window).scrollTop();
                $('.loader').css({
                    'opacity': '0',
                    'visibility': 'hidden',
                });
                $('.blog-roll').append(response);
                postOffset += 6;
                if ($('.blog-roll article').length >= $('.blog-roll').data('counter')) {
                    $('.load-more').css('display', 'none');
                }
                if (!$('html').hasClass('mobile')) $(window).scrollTop(currentTop);
            }
        });
    });
});
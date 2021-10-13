$(document).ready(function(){
    var postOffset = 6;
    var postType = $('.blog-roll').data('posttype');
    var typeId = $('.blog-roll').data('id');

    $('.load-more').click(function(){

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            dataType: "html",
            data: {
                action : 'load_more_posts',
                'id' : typeId,
                'type' : postType,
                'offset' : postOffset,
            }, 
            beforeSend: function(){
                $('.loader').css({
                    'opacity':'1',
                    'visibility':'visible',
                });
            },
            success: function(response){
                var currentTop = $(window).scrollTop();
                $('.loader').css({
                    'opacity':'0',
                    'visibility':'hidden',
                });
                $('.blog-roll').append(response);
                postOffset += 3; 
                if($('.blog-roll article').length >= $('.blog-roll').data('counter')){
                    $('.load-more').css('display','none');
                } 
                if (!$('html').hasClass('mobile')) $(window).scrollTop(currentTop);
            }
        });
    });    
})
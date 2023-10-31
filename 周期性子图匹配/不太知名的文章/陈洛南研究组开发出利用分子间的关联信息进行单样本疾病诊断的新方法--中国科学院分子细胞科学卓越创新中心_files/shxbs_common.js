
(function($){
    $(document).ready(function(){

        //Show dropdown on hover only for desktop devices
        //-----------------------------------------------
        var delay=0, setTimeoutConst;
        if (Modernizr.mq('only all and (min-width: 768px)') && !Modernizr.touch) {
			
            $('.navbar-nav_comm .navbar-nav>li.dropdown, .navbar-nav_comm li.dropdown>ul>li.dropdown').hover(
            function(){
                var $this = $(this);
				
                setTimeoutConst = setTimeout(function(){
                    $this.addClass('open').slideDown();
                    $this.find('.dropdown-toggle').addClass('disabled');
                }, delay);

            },  function(){ 
                clearTimeout(setTimeoutConst );
                $(this).removeClass('open');
                $(this).find('.dropdown-toggle').removeClass('disabled');
            });
        };

        //Show dropdown on click only for mobile devices
        //-----------------------------------------------
        if (Modernizr.mq('only all and (max-width: 767px)') || Modernizr.touch) {
            $('.navbar-nav_comm [data-toggle=dropdown]').on('click', function(event) {
            // Avoid following the href location when clicking
            event.preventDefault(); 
            // Avoid having the menu to close when clicking
            event.stopPropagation(); 
            // close all the siblings
            $(this).parent().siblings().removeClass('open');
            // close all the submenus of siblings
            $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
            // opening the one you clicked on
            $(this).parent().toggleClass('open');
            });
        };
    }); // End document ready

})(this.jQuery);

//left nav
$(document).ready(function(e) {
    $('#left_nav').click(function(){
        $('#left_nav_show').slideToggle();
    })
});

// tabs 
$(function(){
    $('#myTabs a.a_tabs').hover(function () {
      $(this).tab('show');
    });
    
 });

$(document).ready(function(e) {
    $('#search_over').click(function(){
        $('.add_over').toggle();
    })
});



//右侧微博微信、返回顶部
function b(){
    // h = $(window).height();
    // t = $(document).scrollTop();
    // if(t > h){
    //     $('#gotop').show();
    // }else{
    //     $('#gotop').hide();
    // }
}
$(document).ready(function() {
//$(document).ready(function(e) {
    //b();
    // $('#gotop').click(function(){
    //     $(document).scrollTop(0);   
    // })
    $('#code').hover(function(){
            $(this).attr('id','code_hover');
            $('#code_img').show();
        },function(){
            $(this).attr('id','code');
            $('#code_img').hide();
    })
    
});

// $(window).scroll(function(e){
//     b();        
// });




	
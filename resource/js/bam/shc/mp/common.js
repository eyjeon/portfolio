// layerPopup
var layerFn = function(elem){
    var cont = elem.find('.popLayerCon');

    return {
        open:function(){
            elem.addClass('on');
            this.resize();
        },
        close:function(){
            if(!elem.hasClass('off')){
                elem.addClass('off');
                setTimeout(function(){
                    elem.removeClass('on off');
                    cont.removeAttr('style');

                    if(elem.find('.wizardWrap').length){
                        var myPopWizard = new wizardFn(elem.find('.wizardWrap'));
                        myPopWizard.close();
                    }
                }, 500);
            }
        },
        resize:function(){
            setTimeout(function(){
                var winH = $(window).outerHeight()
                  , conH = cont.outerHeight()
                  , conT = 0;

                if(winH > conH){
                    conT = (winH - conH)/2;
                }else if(winH < conH){
                    cont.css('height', winH);
                }
                cont.css('top', conT);
            }, 100);
        }
    }
}



// wizard
var wizardFn = function(elem){
    return {
        move:function(goTo){
            if(elem.find('.wizardStep.on').data('wizard') != goTo){
                elem.find('.wizardStep').filter(function(){
                    var target = $(this);

                    if(target.hasClass('on')){
                        target.addClass('off').removeClass('on');
                        setTimeout(function(){
                            target.removeClass('off');
                        }, 500);
                    }else{
                        if(target.data('wizard') == goTo) target.addClass('on');
                    }
                });
                var layer = new layerFn(elem.closest('.popLayer'));

                layer.resize();
            }
        },
        close:function(){
            elem.find('.wizardStep').filter(function(){
                var target = $(this);
                (target.data('wizard') != 1) ? target.removeClass('on off') : target.addClass('on');
            });
        }
    }
}



// circle gauge
var gaugeFn = function(className){
    return {
        draw:function(data){
            Array.prototype.forEach.call(document.querySelectorAll(className), function(path){
                var strokeOffset = $(className).attr('stroke-dashoffset')
                  , pathSize 	 = path.getTotalLength()
                  , division 	 = 100/data
                  , moveTo 	 	 = strokeOffset;

                if(data > 0) moveTo = strokeOffset - pathSize/division;

                $(className).removeAttr('style').animate({'stroke-dashoffset': moveTo}, 1500);
            });
        }
    }
}



// dash gauge
var dashGaugeFn = function(elem, direction){
    return {
        draw:function(data){
            var start    = -120
              , end      = 120
              , division = (end-start)/100
              , moveTo;

            if(direction == 'right') data = data*10;
            (direction == 'left') ? moveTo = start + (division*data) : moveTo = end - (division*data);
            elem.find('.dashGaugePin').css('transform', 'rotate('+ moveTo +'deg)');
        }
    }
}





$(function(){
    // top button
    $().UItoTop({ easingType: 'easeOutQuart' });



    // counter
    if($('._counter').length) $('._counter').yCounter({runTime:1000,delay:0});



    // side menu open
    $('body').on('click', '.topMenuBtn', function(e){
        e.preventDefault();
        $('#nav').addClass('on');

    // side menu close
    }).on('click', '.navDimm, .navCloseBtn', function(e){
        e.preventDefault();
        $('#nav').addClass('hide');
        setTimeout(function(){
            $('#nav').removeClass('on hide');
        }, 500);
    });



    // sub navigation
    $('body').on('click', '.subMenuTit', function(){
        var btn = $(this)
          , targetElem = $('.subMenuCon');

        if(!btn.hasClass('none') && !btn.hasClass('stop')){
            btn.toggleClass('on').addClass('stop');
            if(btn.hasClass('on')){
                targetElem.stop().slideDown(500, function(){
                    btn.removeClass('stop');
                });
            }else{
                targetElem.stop().slideUp(500, function(){
                    btn.removeClass('stop');
                });
            }
        }
    });



    // motion
    $('.motionOn').waypoint({
        handler: function(){
            $(this).addClass('on');
        },
        offset: '90%'
    });



    // information
    $('body').on('click', '.infoTit', function(e){
        e.preventDefault();

        var wrap = $(this).closest('.infoWrap')
          , cont = wrap.find('.infoCon');

        if(!wrap.hasClass('stop')){
            wrap.toggleClass('on');
            if(wrap.hasClass('on')){
                cont.stop().slideDown(500, function(){
                    wrap.removeClass('stop');
                });
            }else{
                cont.stop().slideUp(500, function(){
                    wrap.removeClass('stop');
                });
            }
        }
    });



    // ·¹ÀÌ¾îÆË¾÷ ´Ý±â
    $('body').on('click', '.popLayerClose, .popLayerClose', function(e){
        e.preventDefault();

        var layerCloseFn = new layerFn($(this).closest('.popLayer'));
        layerCloseFn.close();
    });



    // tooltip
    $('body').on('click', '.tipBtn', function(e){
        e.preventDefault();

        var wrap  = $(this).closest('.tipWrap')
          , blnOn = wrap.hasClass('on');

        $('.tipWrap.on').removeClass('on');
        if(!blnOn) wrap.addClass('on');
    });



    // tab
    $('body').on('click', '.tabBtn', function(e){
        e.preventDefault();

        var dataTab = $(this).data('tab');

        $('.tabBtn.on, .tabCon.on').removeClass('on');
        $('.tabBtn[data-tab="'+ dataTab +'"], .tabCon[data-tab="'+ dataTab +'"]').addClass('on');
    });
});




























//

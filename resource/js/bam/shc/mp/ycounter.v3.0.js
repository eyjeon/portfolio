/*
 * fileName   : ycounter.v2.1.js
 * version    : 2.0
 * author     : eunyeong jeon
 * date       : May 10, 2019
 */
(function(e) {
    "use strict";
    e.fn.yCounter = function(ovr) {
        var obj = e.extend({
            runTime : 1500,
            delay   : 10,
            callback: false
        }, ovr);
        return this.each(function() {
            var $this  = e(this)
              , result = function(){
                var elem      = $this
                  , countInit = elem.attr('data-ycount')
                  , countTo   = 0
                  , runTime   = obj.runTime
                  , callback  = obj.callback
                  , delay     = obj.delay
                  , target    = e({countNum: 0});

                if(countInit != '-'){
                    countInit = countInit.replace(/[^0-9\.]/g, '');
                    if(countInit != ''){
                        countTo = countInit
                    }else{
                        return false;
                    };
                    if(elem.data('ystate') == undefined) elem.text(0).data('ystate', 0);
                    elem.text(0).data('ystate', elem.data('ystate')+1);

                    target.stop().delay(delay).animate({
                        countNum : countTo
                    },
                    {
                        duration : runTime,
                        step     : function(){
                            var num = 0;

                            if(countInit.indexOf('.') != -1){
                                if(countInit.substr(countInit.indexOf('.')+1) > 0){
                                    num = this.countNum.toFixed(countInit.substr(countInit.indexOf('.')+1).length);
                                }else{
                                    num = Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }
                            }else{
                                num = Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            elem.text(num);
                        },
                        complete : function() {
                            elem.data('ystate', elem.data('ystate')-1);

                            if(elem.data('ystate') == 0){
                                elem.text(countInit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                if(callback != false) callback();
                            }
                        }
                    });
                }
            }
            $this.waypoint(result, {
                offset: "100%",
                triggerOnce: !0
            })
        })
    }
})(jQuery);

(function($){

    var a = function(props_obj,callback){
        var acallback,aangle,apower,aduration,aeasing,ascale;
        if (typeof callback == 'function'){
            acallback = callback;
        } else {
            acallback = function(){};
        }
        aeasing = props_obj.easing || "linear";
        aduration = props_obj.duration || 1000;
        apower = props_obj.power || 50;
        aangle = props_obj.angle || 60;
        ascale = props_obj.scale || 1;
        astep = (typeof props_obj.step == 'function')?props_obj.step:function(){};
        function WisdomSkyProjectile(){

            this.height = 0;
            this.width = 0;
            this.speed =  apower;
            this.angle= aangle;
            this.time=  0;

            this.results = function(){
                var
                    sin = Math.sin,
                    win = $(window),
                    grav = -9.81,
                    iangle= this.angle * Math.PI / 180,
                    ispeed= this.speed;
                return {
                    x: (ispeed * Math.cos(iangle) * this.time) * (this.width / win.width()),
                    y: (((0.5 * grav * this.time * this.time) + (ispeed * sin(iangle) * this.time)) * (this.height / win.height())),
                    totalTime: -2 * ispeed * sin(iangle) / grav
                };
            };

        };
        var elem = this;
        var w =  new WisdomSkyProjectile();
        var tops= elem.offset().top;
        var lefts = elem.offset().left;
        w.height =  500;
        w.width =   1000;
        w.speed = apower;
        w.angle = aangle;
        var time = {v:0};
        var res = w.results();
        $.Animation(time,{
            v: res.totalTime
        },{
            duration:aduration,
            easing:aeasing,
            complete:function(){
                acallback.apply(elem);
            }
        }).progress(function(e){
                w.time = e.tweens[0].now;
                var res = w.results();
                elem.offset({
                    top:(tops-(res.y*ascale)),
                    left:(lefts+(res.x*ascale))
                });
            });
        return this;
    };




    var v = function(){
        this.hide().css({
            position:"fixed",
            left: -(parseInt(this.css("width"))),
            top: ($(window).height()/2)-(parseInt(this.css("height"))/2)
        });
        return this;
    };



    var q = function(speed){
        this.animateProjectile({
            angle: 150,
            power: ($(window).width()*0.10),
            scale: 1,
            duration: speed||800},function(){
            this.bouncyBoxRegister();
        });
        return this;
    };


    var z = function(speed,callback){
        var $e = this;
        this.show();
        var power = 13.5 * ($(window).width()*0.005);
        function recursiveBounce($e){
            $e.animateProjectile({
                angle: 75,
                power: power,
                scale: 1,
                duration: (typeof speed != "function")?speed:800
            },function(){
                if(this.offset().left < (($(window).width()/2)-(parseInt(this.css("width"))/2))){
                    power = power*0.80;
                    recursiveBounce($e);
                } else {
                    if(typeof speed == "function")
                        speed.apply($e);
                    else if( callback!=null && (typeof callback == "function")){
                        callback.apply($e);
                    }
                }
            });
        }
        if(this.offset().left < (($(window).width()/2)-(parseInt(this.css("width"))/2))){
            recursiveBounce($e);
        }

        return this;
    };

    $.fn.animateProjectile = a;
    $.fn.bouncyBoxRegister = v;
    $.fn.bouncyBox = z;
    $.fn.bouncyBoxDismiss = q;

})(jQuery)

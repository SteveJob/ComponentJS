/**
 * Created by briar on 17/2/14.
 */
var ComponentBase=function(cfg){
    var id=('component_'+Math.random()).replace('.','_');
    var config=cfg||{};
    this.$componentBase=$('<div id="'+id+'" class="component component_type_'+config.type+' component_name_'+config.name+'"></div>');

    config.css          &&this.$componentBase.css(config.css);
    config.text         &&this.$componentBase.text(config.text);
    config.width        &&this.$componentBase.width(config.width);
    config.height       &&this.$componentBase.height(config.height);
    config.background   &&this.$componentBase.css('backgroundImage','url('+config.background+')');




    if (config.location){
        config.location.horiCenter && this.$componentBase.css({
            left:'50%',
            marginLeft:-(config.width/2)
        });
        config.location.vert    &&this.$componentBase.css(config.location.vert.direction,config.location.vert.distance);
    }

    this.$componentBase.on('onload', function () {
        $(this).addClass('component_'+config.type+'_load').removeClass('component_'+config.type+'_leave');
        if (config.animate&&config.animate.animateIn){
            $(this).stop().animate(config.animate.animateIn,config.animate.duration).delay(config.animate.delay);
        }
        return false;
    });

    this.$componentBase.on('onleave', function () {
        $(this).addClass('component_'+config.type+'_leave').removeClass('component_'+config.type+'_load');
        if (config.animate&&config.animate.animateOut){
            $(this).stop().animate(config.animate.animateOut,config.animate.duration);
        }
        return false;
    });

    if (typeof config.onClick==='function'){
        this.$componentBase.click(function() {
            config.onClick(id)
        });
    }

    return this.$componentBase;
};
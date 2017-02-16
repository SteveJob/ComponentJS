/**
 * Created by briar on 17/2/14.
 */
var ComponentBase=function(cfg){
    var id=('component_'+Math.random()).replace('.','_');
    var config=cfg||{};
    this.$componentBase=$('<div id="'+id+'" class="component component_type_'+config.type+' component_name_'+config.name+'"></div>');

    config.text         &&this.$componentBase.text(config.text);
    config.width        &&this.$componentBase.width(config.width);
    config.height       &&this.$componentBase.height(config.height);
    config.background   &&this.$componentBase.css('backgroundImage','url('+config.background+')');
    config.css          &&this.$componentBase.css(config.css);

    if (typeof config.onClick==='function'){
        this.$componentBase.on('click',config.onClick);
        console.log(id);
    }

    if (config.location){
        config.location.horiCenter && this.$componentBase.css({
            left:'50%',
            marginLeft:-(config.width/2)
        })
        config.location.vert    &&this.$componentBase.css(config.location.vert.direction,config.location.vert.distance);
    }

    this.$componentBase.on('onload', function () {
        $(this).addClass('component_load').removeClass('component_leave');
        if (config.animate&&config.animate.animateIn){
            $(this).animate(config.animate.animateIn,config.animate.duration).delay(config.animate.delay);
        }
        return false;
    });

    this.$componentBase.on('onleave', function () {
        $(this).addClass('component_leave').removeClass('component_load');
        if (config.animate&&config.animate.animateOut){
            $(this).animate(config.animate.animateOut,config.animate.duration);
        }
        return false;
    });

    return this.$componentBase;
}
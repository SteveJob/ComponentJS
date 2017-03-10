/**
 * Created by briar on 17/2/25.
 */
var PointComponent=function (cfg) {
    var $pointComponent=ComponentBase(cfg);

    console.log(cfg.data);
    if(cfg.data&&(cfg.data instanceof Array)){
        $.each(cfg.data,function (index,item) {
            console.log(cfg.data);
            var $point=$('<div class="point point_'+index+'"></div>');
            // $point.text(item[0]);
            var width=Math.floor(item[1]*cfg.width);
            var height=Math.floor(item[1]*cfg.height);
            $point.width(width).height(height);

            $point.css({
                top:item[3]+'%',
                left:item[4]+'%',
                borderRadius:width/2+'px '+height/2+'px',
                backgroundColor:item[2],
                fontSize:width/5+'px'
            });

            var $content=$('<p class="name">'+item[5]+'</p><p class="percent">'+item[6]+'</p>');


            $point.append($content);

            $pointComponent.append($point);
        });


    }

    return $pointComponent;
}
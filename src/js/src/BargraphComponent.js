/**
 * Created by briar on 17/2/25.
 */
var BargraphComponent=function (cfg) {

    var $bargraphConponent=ComponentBase(cfg);

    if (cfg.data&&(cfg.data instanceof Array)){
        $.each(cfg.data,function (index,item) {
            var $bargraph=$('<div class="bargraph"></div>');
            var $name=$('<div class="name">'+item[0]+'</div>');
            var $progressWrapper=$('<div class="progress-wrapper"></div>');
            $progressWrapper.width(item[1]*100+'%');
            var $progress=$('<div class="progress"></div>');
            if (item[2])
                $progress.css('backgroundColor',item[2]);
            var $percent=$('<div class="percent"></div>');
            $percent.text(item[1]*100+'%');
            $progressWrapper.append($progress);
            $bargraph.append($name).append($progressWrapper).append($percent);
            $bargraphConponent.append($bargraph);
        })
    }

    return $bargraphConponent;
};
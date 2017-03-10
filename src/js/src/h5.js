/**
 * Created by briar on 17/2/15.
 */

function H5(clzName,fpConfig){

    var $pages=[];
    var $curPage;

    this.id=('h5_'+Math.random()).replace('.','_');

    this.el=$('<div class="'+clzName+'" id="'+this.id+'"></div>').hide();

    $('body').prepend(this.el);

    this.addPage=function(name){
        $curPage=$('<div class="section page_'+name+'" >'+name+'</div>');
        $pages.push($curPage);
        this.el.append($curPage);
        $curPage.on('onload',function(){
            $(this).find('.component').trigger('onload');
        });
        $curPage.on('onleave',function(){
            $(this).find('.component').trigger('onleave');
        });
        return this;
    };

    this.addComponent= function (config) {
        var component;
        switch (config.type||'base') {
            case 'base':
                component=ComponentBase(config);
                break;
            case 'point':
                component=PointComponent(config);
                break;
            case 'bargraph':
                component=BargraphComponent(config);
                break;
            case 'linechart':
                component=LinechartComponent(config);
                break;
            case 'radar':
                component=RadarComponent(config);
                break;
            case 'cake':
                component=CakeComponent(config);
                break;
            default:
                break;
        }
        $curPage.append(component);
        return this;
    };

    this.show=function(){
        this.el.show();
        //整合fullpage配置项 如果已有onLeave和afterLoad配置则覆盖
        $.extend(fpConfig,{
            onLeave: function (index,nextIndex,direction) {
                $pages[index-1].trigger('onleave');
            },
            afterLoad: function (anchor,index) {
                console.log(anchor,index);
                $pages[index-1].trigger('onload');
            }
        });
        $('.h5').fullpage(fpConfig);
    }

};

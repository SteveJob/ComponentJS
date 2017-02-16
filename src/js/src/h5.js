/**
 * Created by briar on 17/2/15.
 */

function H5(clzName){

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
            default:
                break;
        }
        $curPage.append(component);
        return this;
    };

    this.show=function(){
        this.el.show();
        $('.h5').fullpage({
            onLeave: function (index,nextIndex,direction) {
                $pages[index-1].trigger('onleave');
            },
            afterLoad: function (anchor,index) {
                console.log(anchor,index);
                $pages[index-1].trigger('onload');
            }
        });
    }

};

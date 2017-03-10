/**
 * Created by briar on 17/3/1.
 */
var CakeComponent=function (cfg) {
    var $cakeComponent=ComponentBase(cfg);

    var canvas=document.createElement('canvas');

    canvas.width=   cfg.width;
    canvas.height=  cfg.height;

    $cakeComponent.append(canvas);

    //绘制大饼
    var context=canvas.getContext('2d');
    var point={
        x:cfg.width/2,
        y:cfg.height/2
    };
    var r=cfg.width/2;

    var startAngle=1.5*Math.PI;
    var stopAngle=0;
    for (var i=0;i<cfg.data.length;i++){
        context.beginPath();
        stopAngle=startAngle+cfg.data[i][1]*Math.PI*2;
        context.fillStyle=cfg.data[i][2];
        context.moveTo(point.x,point.y);
        context.arc(point.x,point.y,r,startAngle,stopAngle);
        context.fill();
        console.log(startAngle);
        console.log(stopAngle);


        //添加文字
        var $text=$('<div class="text-name"></div>');
        $text.text(cfg.data[i][0]);

        var x=point.x+Math.sin(startAngle)*r;
        var y=point.y+Math.cos(startAngle)*r;
        if (x>cfg.width/2){
            $text.css({
                left:x
            });
        }else {
            $text.css({
                right:cfg.width-x
            });
        }

        if (y>cfg.height/2){
            $text.css({
                top:y
            });
        }else {
            $text.css({
                bottom:cfg.height-y
            });
        }
        $cakeComponent.append($text);

        startAngle=stopAngle;
    }

    //绘制蒙版
    var canvas=document.createElement('canvas');
    canvas.width=   cfg.width;
    canvas.height=  cfg.height;
    $cakeComponent.append(canvas);
    context=canvas.getContext('2d');
    function draw(percent) {
        var startAngle=-0.5*Math.PI;
        var stopAngle=1.5*Math.PI;
        context.clearRect(0,0,cfg.width,cfg.height);
        context.fillStyle=cfg.cakeColor.maskColor;
        context.beginPath();
        context.moveTo(point.x,point.y);
        context.arc(point.x,point.y,r,startAngle+percent*2*Math.PI,stopAngle);
        context.fill();
    }

    $cakeComponent.on('onload',function () {
        var n=0;
        for (var i=0;i<100;i++){
            setTimeout(function () {
                n+=0.01;
                draw(n);
            },i*10);
        }
        return false;
    });

    $cakeComponent.on('onleave',function () {
        var n=1;
        for (var i=0;i<100;i++){
            setTimeout(function () {
                n-=0.01;
                draw(n);
            },i*2);
        }
        return false;
    });

    return $cakeComponent;
};
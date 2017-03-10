/**
 * Created by briar on 17/3/1.
 */
var RadarComponent=function (cfg) {
    var $radarComponent=ComponentBase(cfg);

    var canvas=document.createElement('canvas');
    canvas.width=   cfg.width;
    canvas.height=  cfg.height;
    $radarComponent.append(canvas);

    var dataLen=cfg.data.length;
    //绘制底图
    var context=canvas.getContext('2d');

    context.fillStyle='#5f5';

    var r=cfg.width/2;
    var point={
        x:cfg.width/2,
        y:cfg.height/2
    };
    //绘制背景
    for (var j=0;j<4;j++){
        var r_loop=r*(1-j/4);
        console.log(r_loop);

        // var colorR=Math.floor(Math.random()*255);
        // var colorG=Math.floor(Math.random()*255);
        // var colorB=Math.floor(Math.random()*255);
        // context.fillStyle='rgb('+colorR+','+colorG+','+colorB+')';
        context.fillStyle=cfg.radarColor.backColor[j%4];
        context.beginPath();
        for(var i=0;i<dataLen;i++) {
            var rad=(2*Math.PI/360)*(360/dataLen)*i;
            var x=point.x+Math.sin(rad)*r_loop;
            var y=point.y+Math.cos(rad)*r_loop;
            context.lineTo(x,y);
            console.log(x,y,rad);
        }
        context.fill();
    }
    //绘制伞骨
    context.beginPath();
    context.strokeStyle=cfg.radarColor.ribColor;
    for (var i=0;i<dataLen;i++){
        context.moveTo(point.x,point.y);
        var rad=(2*Math.PI/360)*(360/dataLen)*i;
        var x=point.x+Math.sin(rad)*r;
        var y=point.y+Math.cos(rad)*r;
        context.lineTo(x,y);
        var $text=$('<div class="data-name">'+cfg.data[i][0]+'</div>');
        $radarComponent.append($text);

        //调整水平方向文字位置
        if (x>cfg.width/2){
            $text.css({
                left:x-5
            })
        }else if(x<cfg.width/2){
            $text.css({
                right:cfg.width-x-5
            })
        }else{
            $text.css({
                left:x-20
            })
        }
        //调整垂直方向文字位置
        if(y>cfg.width/2){
            $text.css({
                top:y+10
            })
        }else {
            $text.css({
                bottom:cfg.height-y+10
            })
        }

    }
    context.stroke();


    //绘制数据
    var canvas=document.createElement('canvas');
    canvas.width=   cfg.width;
    canvas.height=  cfg.height;
    $radarComponent.append(canvas);
    var context=canvas.getContext('2d');

    function draw(percent) {
        context.clearRect(0,0,cfg.width,cfg.height);

        //绘制连线
        context.strokeStyle=cfg.radarColor.lineColor;
        context.lineWidth=2;
        context.beginPath();
        for (var i=0;i<dataLen;i++){
            // context.moveTo(point.x,point.y);
            var rad=(2*Math.PI/360)*(360/dataLen)*i;
            var x=point.x+Math.sin(rad)*r*cfg.data[i][1]*percent;
            var y=point.y+Math.cos(rad)*r*cfg.data[i][1]*percent;
            context.lineTo(x,y);
        }
        context.closePath();
        context.stroke();


        //绘制圆点
        context.beginPath();
        context.fillStyle=cfg.radarColor.dotColor;
        context.lineWidth=2;
        for (var i=0;i<dataLen;i++){
            var rad=(2*Math.PI/360)*(360/dataLen)*i;
            var x=point.x+Math.sin(rad)*r*cfg.data[i][1]*percent;
            var y=point.y+Math.cos(rad)*r*cfg.data[i][1]*percent;
            context.moveTo(x,y);
            context.arc(x,y,4,0,2*Math.PI);
        }
        context.fill();
    }

    $radarComponent.on('onload', function () {
        var n=0;
        for (var i=0;i<100;i++){
            // console.log(i);
            setTimeout(function () {
                n+=0.01;
                draw(n);
            },i*10);
        }
    });

    $radarComponent.on('onleave', function () {
        var n=1;
        for (var i=0;i<100;i++){
            console.log(i);
            setTimeout(function () {
                n-=0.01;
                draw(n);
            },i*2);
        }
        return false;
    });

    return $radarComponent;
};
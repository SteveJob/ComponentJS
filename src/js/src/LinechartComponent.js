/**
 * Created by briar on 17/2/25.
 */
var LinechartComponent=function (cfg) {

    var $linechartComponent=ComponentBase(cfg);

    var canvas=document.createElement('canvas');
    canvas.width=cfg.width;
    canvas.height=cfg.height;


    $linechartComponent.append(canvas);

    //添加数据
    for(var i=0;i<cfg.data.length;i++){
        var $dataName=$('<div class="data-name data-name-'+i+'">'+cfg.data[i][0]+'</div>');
        $dataName.css({
            'left':(i+1/2)*(cfg.width/(cfg.data.length+1)),
            'width':cfg.width/(cfg.data.length+1)
        });
        $linechartComponent.append($dataName);
    }

    //绘制网格
    var context=canvas.getContext('2d');
    context.beginPath();
    context.lineWidth=1;
    context.strokeStyle='rgba(50,50,50,.1)';

    var stepX=10;
    var lineNumX=cfg.height/10+1;
    for (var i=0;i<lineNumX;i++){
        context.moveTo(0,stepX*i);
        context.lineTo(canvas.width,stepX*i);
    }

    var dataLen=cfg.data.length;
    var lineNumY=dataLen+2;
    var stepY=cfg.width/(dataLen+1);
    for (var i=0;i<dataLen+2;i++){
        context.moveTo(stepY*i,0);
        context.lineTo(stepY*i,canvas.height);
    }
    context.stroke();


    //绘制数据
    var canvas=document.createElement('canvas');
    canvas.width=cfg.width;
    canvas.height=cfg.height;
    var context=canvas.getContext('2d');
    $linechartComponent.append(canvas);

    function draw(percent) {

        //绘制坐标点
        context.clearRect(0,0,cfg.width,cfg.height);
        context.lineWidth=2;
        context.strokeStyle='rgba(255,0,0,.5)';
        context.fillStyle='rgba(255,0,0,.8)';
        for (var i=0;i<cfg.data.length;i++){
            context.beginPath();
            var x=stepY*(i+1);
            var y=cfg.height*(1-cfg.data[i][1]*percent);
            context.moveTo(x,y);
            context.arc(x,y,5,0,2*Math.PI);
            var text=cfg.data[i][1]*100+'%';
            context.textAlign='center';
            context.font='bold 15px sans-serif';
            context.fillText(text,x,y-10);
            context.fill();
        }



        //绘制连线
        context.beginPath();
        context.moveTo(0,cfg.height);
        for (var i=0;i<cfg.data.length;i++){
            var x=stepY*(i+1);
            var y=cfg.height*(1-cfg.data[i][1]*percent);

            context.lineTo(x,y);
            context.moveTo(x,y);
        }
        context.lineTo(cfg.width,cfg.height);
        context.stroke();


        // 绘制背景
        context.beginPath();
        context.fillStyle='rgba(255,0,0,.2)';
        context.moveTo(0,cfg.height);
        for(var i=0;i<cfg.data.length;i++){
            var x=stepY*(i+1);
            var y=cfg.height*(1-cfg.data[i][1]*percent);

            context.lineTo(x,y);
        }
        context.lineTo(cfg.width,cfg.height);
        context.fill();
    }

    $linechartComponent.on('onload', function () {
        var n=0;
        for (var i=0;i<100;i++){
            console.log(i);
            setTimeout(function () {
                n+=0.01;
                draw(n);
            },i*10);
        }
    });

    $linechartComponent.on('onleave', function () {
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

    return $linechartComponent;
};
var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 650;
var R = 9;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 30;
const endTime = new Date(2016,6,26,20,50,00);
var currentShowTimeSeconds = 0;
var balls = [];
var colors = ["#33b5e5","#09c","#a6c","#93c","#9c0","#690","#fc3","#f80","#f44","#c00"];


window.onload = function()
{

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	context.width = WINDOW_WIDTH;
	context.height = WINDOW_HEIGHT;

	currentShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(
		function(){
			render(context);
			update();
		},
		50
		);
}

function update()
{
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHour = parseInt(nextShowTimeSeconds/3600);
	var nextMin = parseInt((nextShowTimeSeconds-3600*nextHour)/60);
	var nextSec = nextShowTimeSeconds-3600*nextHour-60*nextMin;

	var hour = parseInt(currentShowTimeSeconds/3600);
	var min = parseInt((currentShowTimeSeconds-3600*hour)/60);
	var sec = currentShowTimeSeconds-3600*hour-60*min;

	if(nextSec != sec)
	{
		currentShowTimeSeconds = nextShowTimeSeconds;
		if(parseInt(nextHour/10)!=parseInt(hour/10))
		{
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10));
		}
		if(nextHour-parseInt(nextHour/10)*10!=hour-parseInt(hour/10)*10)
		{
			addBalls(MARGIN_LEFT+16*(R+1),MARGIN_TOP,hour-parseInt(hour/10)*10);
		}

		if(parseInt(nextMin/10)!=parseInt(min/10))
		{
			addBalls(MARGIN_LEFT+2.5*16*(R+1),MARGIN_TOP,parseInt(min/10));
		}
		if(nextMin-parseInt(nextMin/10)*10!=min-parseInt(min/10)*10)
		{
			addBalls(MARGIN_LEFT+3.5*16*(R+1),MARGIN_TOP,min-parseInt(min/10)*10);
		}

		if(parseInt(nextSec/10)!=parseInt(sec/10))
		{
			addBalls(MARGIN_LEFT+5*16*(R+1),MARGIN_TOP,parseInt(sec/10));
		}
		if(nextSec-parseInt(nextSec/10)*10!=sec-parseInt(sec/10)*10)
		{
			addBalls(MARGIN_LEFT+6*16*(R+1),MARGIN_TOP,sec-parseInt(sec/10)*10);
		}

	}

	updateBalls();
}

function updateBalls()
{
	for(var i = 0;i<balls.length;i++)
	{
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT - R)
		{
			balls[i].y = WINDOW_HEIGHT - R;
			balls[i].vy = -0.75*balls[i].vy;
		}
	}

	var cnt = 0;
	for(var i=0;i<balls.length;i++)
	{
		if(balls[i].x+R>=0 && balls[i].x-R<=WINDOW_WIDTH)
		{
			balls[cnt++] = balls[i];
		}
	}

	while(balls.length > cnt)
	{
		balls.pop();
	}
}

function addBalls(xx,yy,n)
{
	for(var i=0;i<digit[n].length;i++)
	{
		for(var j=0;j<digit[n][i].length;j++)
		{
			if(digit[n][i][j]==1)
			{
				var aBall={
					x:xx+j*2*(R+1)+(R+1),
					y:yy+i*2*(R+1)+(R+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*(2+Math.random()*4),
					vy:Math.ceil(-1*(2+Math.random()*4)),
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
		}
	}
}

function getCurrentShowTimeSeconds()
{
	var currentTime = new Date();
	var sec = endTime.getTime() - currentTime.getTime();
	var ret = Math.round(sec/1000);

//	return ret>0?ret:0;

	var ret = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();			//改为时钟效果

    return ret;
}

function render(cxt)
{
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hour = parseInt(currentShowTimeSeconds/3600);
	var min = parseInt((currentShowTimeSeconds-3600*hour)/60);
	var sec = currentShowTimeSeconds-3600*hour-60*min;

	renderDigital(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
	renderDigital(MARGIN_LEFT+16*(R+1),MARGIN_TOP,hour-parseInt(hour/10)*10,cxt);

	renderDigital(MARGIN_LEFT+2*16*(R+1),MARGIN_TOP,10,cxt);

	renderDigital(MARGIN_LEFT+2.5*16*(R+1),MARGIN_TOP,parseInt(min/10),cxt);
	renderDigital(MARGIN_LEFT+3.5*16*(R+1),MARGIN_TOP,min-parseInt(min/10)*10,cxt);

	renderDigital(MARGIN_LEFT+4.5*16*(R+1),MARGIN_TOP,10,cxt);

	renderDigital(MARGIN_LEFT+5*16*(R+1),MARGIN_TOP,parseInt(sec/10),cxt);
	renderDigital(MARGIN_LEFT+6*16*(R+1),MARGIN_TOP,sec-parseInt(sec/10)*10,cxt);


	for(var i = 0;i<balls.length;i++)
	{
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}


}

function renderDigital(x,y,n,cxt)
{
	cxt.fillStyle = "rgb(0,102,153)";

	for(var i=0;i<digit[n].length;i++)
	{
		for(var j=0;j<digit[n][i].length;j++)	
		{
			if(digit[n][i][j]==1)
			{
				cxt.beginPath();
				cxt.arc(x+j*2*(R+1)+(R+1),y+i*2*(R+1)+(R+1),R,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}
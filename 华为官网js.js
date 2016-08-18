/**
 * Created by hhl on 2016/7/6.
 */
(function () {
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oBox.getElementsByTagName('li');
    var aA=oBox.getElementsByTagName('a');
    var autoTimer=null;
    var step=0;
    var interval=2000;
    setTimeout(lazyImg,1000);
    function lazyImg(){
        for(var i=0;i<aImg.length;i++){
            (function (index) {
                var tmpImg=new Image;
                tmpImg.src=aImg[index].getAttribute('realImg');
                tmpImg.onload= function () {
                    aImg[index].src=this.src;
                    tmpImg=null;
                }
            })(i);
        }
    }
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oBoxInner,'left',0);
        }
        step++;
        zhufengAnimate(oBoxInner,{left:-step*1349},500);
        bannerTip();
    }
    function bannerTip(){
        var tmpStep=step>=aLi.length?0:step;
        for(var i=0;i<aLi.length;i++){
            i===tmpStep?utils.addClass(aLi[i],'bg'):utils.removeClass(aLi[i],'bg');
        }
    }
    oBox.onmouseover= function () {
        clearInterval(autoTimer);
        aA[0].style.display=aA[1].style.display='block';
    };
    oBox.onmouseout= function () {
        autoTimer=setInterval(autoMove,interval);
        aA[0].style.display=aA[1].style.display='none';
    };
    handleChange();
    function handleChange(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick= function () {
                step=this.index;
                zhufengAnimate(oBoxInner,{left:-step*1349},500);
                bannerTip();
            }
        }
    }
    aA[1].onclick=autoMove;
    aA[0].onclick= function () {
        if(step<=0){
            step=aDiv.length-1;
            utils.css(oBoxInner,'left',-step*1000);
        }
        step--;
        zhufengAnimate(oBoxInner,{left:-step*1349},500);
        bannerTip();
    }
})();
(function () {
    var outBox=document.getElementById('new');
    var oNew=document.getElementById('new-tips');
    var oInner=document.getElementById('new-Inner');
    var oUl=oNew.getElementsByTagName('ul')[0];
    var aLi=oNew.getElementsByTagName('li');
    var oBtn=document.getElementById('new-btn');
    var aA=oBtn.getElementsByTagName('a');
    var autoTimer=null;
    var step=0;
    var interval=2000;
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aLi.length-1){
            step=0;
            utils.css(oInner,'top',0);
        }
        step++;
        zhufengAnimate(oInner,{top:-step*60},500);
    }
    outBox.onmouseover= function () {
        clearInterval(autoTimer);
    };
    outBox.onmouseout= function () {
        autoTimer=setInterval(autoMove,interval);
    };
    aA[1].onclick=autoMove;
    aA[0].onclick= function () {
        if(step<=0){
            step=aLi.length-1;
            utils.css(oInner,'top',-step*60);
        }
        step--;
        zhufengAnimate(oInner,{top:-step*60},500);
    }
})();

(function () {
    var oFix=document.getElementById('fixed');
    var oFixR=oFix.getElementsByTagName('li');
    var oHid=oFix.getElementsByTagName('div');
    oFixR[0].onmouseover= function () {
        oHid[0].style.display='block';
    };
    oFixR[0].onmouseout= function () {
        oHid[0].style.display='none';
    };
    oFixR[1].onmouseover= function () {
        oHid[1].style.display='block';
    };
    oFixR[1].onmouseout= function () {
        oHid[1].style.display='none';
    };
    oFixR[2].onmouseover= function () {
        oHid[2].style.display='block';
    };
    oFixR[2].onmouseout= function () {
        oHid[2].style.display='none';
    };
    oFixR[3].onmouseover= function () {
        oHid[3].style.display='block';
    };
    oFixR[3].onmouseout= function () {
        oHid[3].style.display='none';
    };
})();

(function () {
    var topBack=document.getElementById('topBack');
    var fixR1=document.getElementById('fixR1');
    var bOk=false;
    var timer=null;
    window.onscroll=getComputedStyle;
    function getComputedStyle(){
        if(bOk){
            clearInterval(timer);
        }
        bOk=true;
        if(utils.win('scrollTop')>=utils.win('clientHeight')){
            fixR1.style.display='block';
        }else{
            fixR1.style.display='none';
        }
    }
    topBack.onclick= function () {
        var target=utils.win('scrollTop');
        var duration=500;
        var interval=30;
        var step=target/duration*interval;
        timer=setInterval(function () {
            var curTop=utils.win('scrollTop');
            if(curTop<=0){
                clearInterval(timer);
                return;
            }
            curTop-=step;
            utils.win('scrollTop',curTop);
            bOk=false;
        },interval)
    }
})();



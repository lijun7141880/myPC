/**
 * Created by hhl on 2016/6/26.
 */
var utils= (function () {
    var flag='getComputedStyle' in window;
    function rnd(n,m){
        n=Number(n);
        m=Number(m);
        if(isNaN(n) || isNaN(m)){
            return Math.random();
        }
        if(n>m){
            tmp=n;
            n=m;
            m=tmp;
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    function listToArray(arg) {
        if(flag){
            return Array.prototype.slice.call(arg)
        }
        var ary=[];
        for(var i=0; i<arg.length; i++){
            ary[ary.length]=arg[i];
        }
        return ary;
    }
    function jsonParse(str) {
        return 'json' in window?json.parse(str):eval('('+str+')');
    }
    function win(attr, value) {
        if(typeof value==='undefined'){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr]=document.body[attr]=value;
    }
    function getCss(curEle, attr) {
        var val,reg;
        if(flag){
            val=getComputedStyle(curEle,false)[attr];
        }else{
            if(attr==='opacity'){
                val=curEle.currentStyle['filter'];
                reg=/^alpha\(opacity[=:](\d+)\)$/i;
                return reg.test(val)?reg.exec(val)[1]/100:1;
            }
            val=curEle.currentStyle[attr];
        }
        reg=/^[+-]?\d+(\.\d+)?(px|pt|rem|em)$/;
        return reg.test(val)?parseFloat(val):val;
    }
    function offset(curEle) {
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var par=curEle.offsetParent;
        while(par){
            if(navigator.userAgent.indexOf('NSIE 8.0')===-1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
        return {left:l,top:t};
    }
    function getByClass(strClass, curEle) {
        curEle=curEle || document;
        if(flag){
            return this.listToArray(curEle.getElementsByClassName(strClass));
        }
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        var nodeList=curEle.getElementsByTagName('*');
        var ary=[];
        for(var i=0;i<nodeList.length;i++){
            var curNode=nodeList[i];
            var bOk=true;
            for(var k=0; k<aryClass.length;k++){
                var curClass=aryClass[k];
                var reg=new RegExp('(^| +)'+curClass+'( +|$)');
                if(!reg.test(curNode.className)){
                    bOk=false;
                    break;
                }
            }
            if(bOk){
                ary.push(curNode);
            }
        }
        return ary;
    }
    function hasClass(curEle, cName) {
        cName=cName.replace(/(^ +)|( +$)/g,'');
        var reg=new RegExp('\\b'+cName+'\\b');
        return reg.test(curEle.className);
    }
    function addClass(curEle,strClass) {
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0;i<aryClass.length;i++){
            if(!this.hasClass(curEle,aryClass[i])){
                curEle.className+=' '+aryClass[i];
            }
        }
    }
    function removeClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0;i<aryClass.length;i++){
            var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)');
            if(reg.test(curEle.className)){
                curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'');
            }
        }
    }
    function setCss(curEle, attr, value) {
        if(attr==='float'){
            curEle.style.styleFloat=value;
            curEle.style.cssFloat=value;
            return;
        }
        if(attr==='opacity'){
            curEle.style.opacity=value;
            curEle.style.filter='alpha(opacity='+value*100+')';
            return;
        }
        var reg=/(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
        if(reg.test(attr)){
            value=parseFloat(value)+'px';
        }
        curEle.style[attr]=value;
    }
    function setGroupCss(curEle,options) {
        for(var attr in options){
            this.setCss(curEle,attr,options[attr])
        }
    }
    function css(curEle) {
        var arg2=arguments[1];//attr
        if(typeof  arg2==='string'){//可能是获取，也可能是设置
            var arg3=arguments[2];//value
            if(typeof  arg3==='undefined'){//arg3（value）不存在
                return this.getCss(curEle,arg2);
            }else{
                this.setCss(curEle,arg2,arg3);
            }
        }
        if(arg2.toString()==='[object Object]'){
            this.setGroupCss(curEle,arg2);
        }
    }
    function getChildren(curEle,tag) {
        /*if(flag){
         return this.listToArray(curEle.children)
         }*/
        var ary = [];
        var nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 1) {
                if (typeof tag !== 'undefined') {
                    if (nodeList[i].tagName.toLowerCase() === tag) {
                        ary.push(nodeList[i]);
                        break;
                    }
                } else {
                    ary.push(nodeList[i]);
                }
            }
        }
        return ary;
    }
    function prev(curEle) {
        if(flag){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre && pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }
    function prevAll(curEle) {
        var pre=this.prev(curEle);
        var ary=[];
        while(pre){
            //ary.push(pre);
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }
    function next(curEle) {
        if(flag){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex && nex.nodeType!==1){
            nex=nex.nextSibling
        }
        return nex;
    }
    function nextAll(curEle) {
        var nex=this.next(curEle);
        var ary=[];
        while(nex){
            //ary.push(nex);
            ary.unshift(nex);
            nex=this.next(nex);
        }
        return ary;
    }
    function sibling(curEle) {
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        var ary=[];
        if(pre) ary.push(pre);
        //pre?ary.push(pre):null;
        if(nex) ary.push(nex);
        //nex?nex.push(nex):null;
        return ary;
    }
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }
    function firstChild(curEle) {
        return this.getChildren(curEle)[0];
    }
    function lastChild(curEle) {
        var aChs=this.getChildren(curEle);
        return aChs[aChs.length-1];
    }
    function index(curEle) {
        return this.prevAll(curEle).length;
    }
    function appendChild(parent,newEle) {
        parent.appendChild(newEle);
    }
    function prependChild(parent, newEle) {
        var first=this.firstChild(parent);
        first?parent.insertBefore(newEle,first):parent.appendChild(newEle);
    }
    function insertBefore(newEle,oldEle) {
        oldEle.parentNode.appendChild(newEle,oldEle);
    }
    function insertAfter(newEle, oldEle) {
        var nex=this.next(oldEle);
        if(nex){
            oldEle.parentNode.insertBefore(newEle,nex);
        }else{
            oldEle.parentNode.appendChild(newEle);
        }
    }
    return {
        //兼容版的求一定范围的随机数n，m
        rnd:rnd,
        //类数组转数组
        listToArray:listToArray,
        //转换成json格式数据
        jsonParse:jsonParse ,
        //获取，设置可视区的宽度和高度
        win:win ,
        //获取当前元素的css样式
        getCss:getCss ,
        //获取当前元素到body的距离
        offset:offset ,
        //通过class名获取当前元素
        getByClass:getByClass ,
        //验证这个元素上是否有某个class名
        hasClass:hasClass ,
        //如果元素身上没有这个class名，我们才添加
        addClass:addClass ,
        //如果元素身上有这个class名，我们删除这个class名
        removeClass:removeClass,
        //设置一个css样式
        setCss:setCss ,
        //设置一组css样式
        setGroupCss:setGroupCss ,
        //获取css，设置一个css，设置一组css样式，三者合一
        css:css ,
        //getChildren:获取当前元素下的所有子元素
        getChildren:getChildren ,
        //prev:上一个哥哥元素节点
        prev:prev ,
        //prevAll:获取当前元素的所有哥哥节点
        prevAll:prevAll ,
        //next：下一个弟弟元素节点
        next:next ,
        //nextAll：获取当前元素的所有弟弟节点
        nextAll:nextAll ,
        //sibling:获取当前元素的相邻节点，上一个哥哥元素节点+下一个弟弟元素节点
        sibling:sibling ,
        //siblings:获取当前元素的所有兄弟节点，所有的哥哥元素节点+所有的弟弟元素节点
        siblings:siblings ,
        //firstChild:当前元素下的第一个子元素
        firstChild:firstChild ,
        //lastChild:当前元素下的最后一个子元素
        lastChild:lastChild ,
        //index:获取当前元素的索引，就是当前元素的哥哥的个数
        index:index ,
        //appendChild:把新元素插入当前容器的最后面
        appendChild:appendChild ,
        //prependChild:把新元素插入到当前容器的最开始
        prependChild:prependChild ,
        //insertBefore:把一个新元素插入到指定元素前面
        insertBefore:insertBefore ,
        //insertAfter:把一个新元素插入到指定元素后面，就是插入到指定元素的弟弟元素前面
        insertAfter:insertAfter
    }
})()

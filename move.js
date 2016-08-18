/**
 * Created by hhl on 2016/7/5.
 */
(function () {
    var zhufengEffect={
        //匀速运动
        Linear: function (t, b, c, d) {
            return c*t/d+b;
        }, //指数衰减的反弹缓动
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        //二次方的缓动
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        //三次方的缓动
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        //四次方的缓动
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        //五次方的缓动
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        //正弦曲线的缓动
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        //超过范围的三次方缓动
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    }
    /**
     * @param curEle 元素对象
     * @param target {}对象
     * @param duration 总时间
     * @param effect 效果
     * @param callback 回调函数
     */
    /*
     *思路：
     * 1.准备Linear公式中的参数值，var begin,change,duration,time
     * 2.通过for(var attr in target)填充begin，change
     * 3.开启一个定时器
     *     1）累加时间time+=10
     *     当停止条件满足时：
     *         1）把物体直接设置到target上
     *         2）关闭定时器
     *         3）判断是否有回调函数，如果有就执行，同时改变this指向
     *         4）return
     *     2)获取当前的最新位置
     *     3）把move输出到外部，让外部接收使用
     */
    function move(curEle,target,duration,effect,callback){//创建一个move函数，参数curEle：当前元素，target：需要设定的距离，是一个对象{}，duration：移动需要的总时间，effect：移动效果，callback：回调函数，可以改变this指向,让当前元素在运动结束后改变效果
        var tmpEffect=zhufengEffect.Linear;//zhufengEffect.Linear代表了tween公式，把zhufengEffect.Linear存到tmpEffect中，以后使用zhufengEffect.Linear时，直接用tmpEffect代替即可，此利用了惰性思想
        var ary=["Linear","Elastic-easeOut","Back-easeOut","Bounce-easeOut","Expo-easeIn"];//定义一个数组，数组中存放了移动效果，当传参数effect时，可以获取ary中的移动效果
        //1.为Linear中的参数做准备
        if(typeof effect==='number'){//（1）如果effect为number类型时
            var str=ary[effect%ary.length];//提取ary中的每一项，因为传的参数可能大于ary的长度，所以用effect%ary.length，可以使ary的索引保持在ary的长度以内
            ary=str.split('-');//ary重新赋值，如果有复合类型的字符串，用‘-’切割开
            tmpEffect=ary.length>=2?zhufengEffect[ary[0]][ary[1]]:zhufengEffect[ary[0]];//判断如果ary中有两个或两个以上的属性，则返回zhufengEffect.ary[0].ary[1],否则只有一个属性，返回zhufengEffect.ary[0]
        }else if(typeof effect==='object'){//（2）如果effect为对象类型时
            tmpEffect=effect.length>=2?zhufengEffect[effect[0]][effect[1]]:zhufengEffect[effect[0]];//判断如果对象中有两个或两个以上的属性，则返回zhufengEffect.effect[0].effect[1],否则只有一个属性，返回zhufengEffect.effect[0]
        }else if(typeof effect==='function'){//（3）如果effect为函数类型时
            callback=effect;//此函数直接赋值为effect
        }
        var begin={};//创建一个开始位置为空对象
        var change={};//创建一个需要移动的位置为空对象
        var time=null;//创建一个时间为空
        for(var attr in target){//遍历target这个对象中的每一项，找到对应的要改变的内容
            begin[attr]=utils.css(curEle,attr);//获取当前的开始距离
            change[attr]=target[attr]-begin[attr];//求出需要移动的距离
        }
        //console.log(change)
        clearInterval(curEle.timer);//小技巧：开启一个定时器前先关闭其他的定时器
            curEle.timer=setInterval(function () {//开启一个定时器
            time+=10;//让时间累加
            if(time>=duration) {//如果累加的时间大于等于总时间时
                utils.css(curEle, target);//此时当前元素的位置为移动的总距离
                clearInterval(curEle.timer);//此时已经到达终点，所以关闭定时器
                //if (typeof callback === 'function') {//如果传了一个参数为回调函数
                //    callback.call(curEle);//改变回调函数中this的指向，让this指向当前元素
                //}
                callback && callback.call(curEle);
                return;//中断程序执行
            }
            for(var attr in target){//遍历target这个对象中的每一项，找到对应的要改变的内容
                var curPos=tmpEffect(time,begin[attr],change[attr],duration);//通过tween公式，获取当前最新的位置
                utils.css(curEle,attr,curPos);//把获取到的最新位置赋值给当前的位置
                }
        },10);//每10ms执行一次函数
    }
    window.zhufengAnimate=move;//把这个自执行函数返回到函数外边，使外界可以使用
})()


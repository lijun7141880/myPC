/**
 * Created by hhl on 2016/8/9.
 */
(function () {
    var right=document.getElementById('right');
    var langBox=document.getElementById('langBox');
    right.onmouseover= function () {
        langBox.style.display='block';
    };
    right.onmouseout= function () {
        langBox.style.display='none';
    }
})();

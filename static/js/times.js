/**
 * Created by 01 on 2015/4/17.
 */

var NowTime = new Date();
var EndTime= new Date(NowTime.getTime()+10*60*1000);  //截止时间：为固定时间
function GetRTime(){
    NowTime = new Date();
    var nMS = EndTime.getTime() - NowTime.getTime();
    if(nMS<="0"){
        NowTime = new Date();
        EndTime= new Date(NowTime.getTime()+10*60*1000);  //截止时间：为固定时间
    }
    var nD = Math.floor(nMS / (1000 * 60 * 60 * 24));
    var nH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
    var nM = Math.floor(nMS / (1000 * 60)) % 60;
    var nS = Math.floor(nMS / 1000) % 60;
    var nSS = Math.floor(nMS /100) % 10;
    if (nD >= 0)
    {
        if(nD<10){ nD = "0" + nD; }
        if(nH<10){ nH = "0" + nH; }
        if(nM<10){ nM = "0" + nM; }
        if(nS<10){ nS = "0" + nS; }
        if(nSS<10){nSS="0"+ nSS; }
        document.getElementById("RemainH").innerHTML = nH;
        document.getElementById("RemainM").innerHTML = nM;
        document.getElementById("RemainS").innerHTML = nS ;
        document.getElementById("RemainSS").innerHTML = nSS ;
    }
    else {
        //document.getElementById("CountMsg").innerHTML = EndTimeMsg + "已过期!";
    }
    setTimeout("GetRTime()", 10);
}
window.onload = function() {
    GetRTime();
};
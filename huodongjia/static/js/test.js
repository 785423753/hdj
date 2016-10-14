/**
 * Created by Administrator on 2016/2/27 0027.
 */

function delRepeat(arr){
    var newArray=new Array();
    var len=arr.length;
    for(var i=0;i<len;i++){
        for(var j=i+1;j<len;j++)
        {
            if(arr[i]==arr[j])
            {
                ++i;
            }
        }
        newArray.push(arr[i]);
    }
    return newArray;
}
var arr=new Array("red","red","1","5","2");
alert(delRepeat(arr));

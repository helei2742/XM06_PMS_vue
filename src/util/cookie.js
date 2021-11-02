//获得coolie 的值

export function cookie(name){

  var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对

  for (var i=0;i<cookieArray.length;i++){

    var arr=cookieArray[i].split("=");       //将名和值分开

    if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值

  }

  return "";

}



/*function delCookie(name)//删除cookie

{

   document.cookie = name+"=;expires="+(new Date(0)).toGMTString();

}*/



export function  getCookie(objName){//获取指定名称的cookie的值

  var arrStr = document.cookie.split("; ");

  for(var i = 0;i < arrStr.length;i ++){

    var temp = arrStr[i].split("=");

    if(temp[0] == objName) return unescape(temp[1]);

  }

}



export function addCookie(objName,objValue,objHours){      //添加cookie

  var str = objName + "=" + escape(objValue);

  if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失

    var date = new Date();

    var ms = objHours*3600*1000;

    date.setTime(date.getTime() + ms);

    str += "; expires=" + date.toGMTString();

  }

  document.cookie = str;

}



export function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值

{

  var Days = 30; //此 cookie 将被保存 30 天

  var exp = new Date();    //new Date("December 31, 9998");

  exp.setTime(exp.getTime() + Days*24*60*60*1000);

  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

}


export function delCookie (name) {
  var exp=new Date();
  console.log('cookie')
  exp.setTime(exp.getTime()-10000);
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()+";path=/";
  }
}

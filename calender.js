
var calender = document.getElementsByClassName('calender')[0];

//全局的方便比较
var $nowDate = new Date(),
    $nowMonth = $nowDate.getMonth() + 1,
    $nowDay = $nowDate.getDate();

//绑定点击事件
function bindEvent(e){
    var Opre = document.getElementsByClassName('pre')[0];
    var Onext = document.getElementsByClassName('next')[0];
    // pre.addEventListener("click", pre);
    // next.addEventListener("click", next);
    Opre.onclick = pre;
    Onext.onclick = next;
    
}

//点击事件对应日期
  

    var turnDate = new Date();
    var obj = {};
    obj.dateObj = turnDate;
    
    function pre(event){
        calender.innerHTML = '';
        // var month = parseInt(nextValue);
        obj.month = month = month - 1 == 0 ? 12 :  month - 1;
        obj.year = year = month  == 12 ? year - 1 : year
        addDate(obj);
    }
   
    function next(event){
        calender.innerHTML = '';
        // var month = parseInt(nextValue);
        obj.month = month = month  + 1 == 13 ? 1 :  month + 1;
        obj.year = year = month  == 1 ? year + 1 : year
        addDate(obj);
    }
    
//添加对应日期的函数
function createDay (li, index, dayNum, nowMonth) {
    for(var i = 0; i < dayNum; i++){
        li[i + index].innerHTML = i + 1;
        if((i + 1) === $nowDay && nowMonth === $nowMonth){
            li[i + index].className = 'red';
        }else if((i + 1) > $nowDay && nowMonth === $nowMonth){
            li[i + index].className = 'blue'; 
        }else if(nowMonth > $nowMonth){
            li[i + index].className = 'blue'; 
        }
    }

}


//闰年判断函数
function isLeapYear (year) {
    if(year % 4 === 0 && year % 100 !== 0){
        return true;
    }else{
        if(year % 400 === 0){
            return true;
        }else{
            return false;
        }
    }
}


//动态生成日期表格，添加日期
function addDate (nowDate) {
    //生成上一月 下一月 当前年月
    var title = document.createElement('div');
    title.className = 'title';
    
    var strDate = '<div class="pre"><span>' + ( (nowDate.month - 1) === 0 ? 12 : nowDate.month - 1 ) + '</span>月</div>\
                   <div class="now"><span>' + nowDate.year + '</span>年<span>' + nowDate.month + '</span>月</div>\
                   <div class="next"><span>' + ( (nowDate.month + 1) === 13 ? 1 : nowDate.month+1 ) + '月</span></div>' 
// console.log(nowDate.month);
    title.innerHTML = strDate;
    calender.appendChild(title);

    //生成星期提示
    var week = document.createElement('div');
    week.className = 'week';
    var weekArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    
    for (var i = 0; i < 7; i++) {
        var wLi = document.createElement('li');
        wLi.innerHTML = weekArr[i];
        if (i === 5 || i === 6){
            wLi.className = 'red';
        }
        week.appendChild(wLi);
    }

    calender.appendChild(week);

    //生成日期表格
    var datebox = document.createElement('div');
    datebox.className = 'datebox';
    for(var i = 0; i < 6; i++) {
        var dUl = document.createElement('ul');

        for(var j = 0; j < 7; j++){
            var dLi = document.createElement('li');
            dUl.appendChild(dLi)
        }
        datebox.appendChild(dUl);
    }
    
    calender.appendChild(datebox);

    var dayNum;

    //根据传入年月获取对应的天数
    if(nowDate.month === 4 || nowDate.month === 6 || nowDate.month === 9 || nowDate.month === 11){
        dayNum = 30;
    }else if(nowDate.month ===2 && isLeapYear(nowDate.year)){//调用判断闰年函数
        dayNum = 29;
    }else if(nowDate.month === 2){
        dayNum = 28;
    }else{
        dayNum = 31;
    }

    var dLiCollection = datebox.getElementsByTagName('li');
    var nowDay = nowDate.dateObj.getDate();
    var nowMonth = nowDate.month;

    //初始化年月日
    nowDate.dateObj.setFullYear(nowDate.year);
    nowDate.dateObj.setMonth(nowDate.month - 1);
    nowDate.dateObj.setDate(1);
    

    //从上面初始化年月里判断当月第一天，然后调用添加日期函数添加到对应周几下面

    switch(nowDate.dateObj.getDay()){
        case 0 :
                createDay(dLiCollection, 6, dayNum, nowMonth);
            break;
        case 1 :
                createDay(dLiCollection, 0, dayNum, nowMonth);
            break;            
        case 2 :
                createDay(dLiCollection, 1, dayNum, nowMonth);
            break;            
        case 3 :
                createDay(dLiCollection, 2, dayNum, nowMonth);
            break;            
        case 4 :
                createDay(dLiCollection, 3, dayNum, nowMonth);
            break;            
        case 5 :
                createDay(dLiCollection, 4, dayNum, nowMonth);
            break;            
        case 6 :
                createDay(dLiCollection, 5, dayNum, nowMonth);
            break;
    }

    bindEvent();
}
    



//组装函数
function init () {
    var nowDate = new Date();
        dataDate = {};

    dataDate.dateObj = nowDate;
    dataDate.year = nowDate.getFullYear();
    dataDate.month = nowDate.getMonth() + 1 ;

    addDate(dataDate);
    var prespan = document.getElementsByClassName('pre')[0].getElementsByTagName('span')[0];
    var nextspan = document.getElementsByClassName('next')[0].getElementsByTagName('span')[0];
    var yearspan = document.getElementsByClassName('now')[0].getElementsByTagName('span')[0];
    var nowspan = document.getElementsByClassName('now')[0].getElementsByTagName('span')[1];
    preValue= prespan.innerText;
    nextValue = nextspan.innerText;
    yearValue = yearspan.innerText;
    nowValue = nowspan.innerText;    
    month = parseInt(nowValue);
    year = parseInt(yearValue);

}
var preValue;
var nextValue;
var yearValue;
var nowValue;
var month;
var year;

init();

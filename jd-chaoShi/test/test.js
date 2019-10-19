// 01 先获取
// var main_warp = $(".main_warp").eq(2);
// var mains = main_warp.children(".main");
var mains = $(".chaoshi_nav_body").children(".item");
var data = [];
for (var i = 1; i < mains.length; i++) {
    var current = mains[i].children[0].children;
    var dataArr = [];
    for (var j = 0; j < current.length; j++) {
        var item = current[j];
        var o = {};
        o.src = item.querySelector("img").src;
        o.title = item.querySelector("a").title;
        o.price = item.querySelector(".p_price").innerText;
        dataArr.push(o);
    }
    data.push(dataArr);
}


    var item_body = mains[i].children(".item_body");
    var dataArr = [];
    for (var j = 0; j < current.length; j++) {
        var item = current[j];
        var o = {};
        o.src = item.querySelector("img").src;
        o.title = item.querySelector("a").title;
        o.price = item.querySelector(".p_price").innerText;
        dataArr.push(o);
    }
    data.push(dataArr);


// step1
    for (var i = 0; i < mains.length; i++) {
        // 001-拿到item_header_title
        var item_header = mains.eq(i).children(".item_header");
        var item_header_title = item_header.children(".item_header_title").text();
        var o={};
        o.title=item_header_title;
        data.push(o);
    }
// step2
    for (var i = 0; i < mains.length; i++) {
        var o={};
        // 001-拿到item_header_title
        var item_header = mains.eq(i).children(".item_header");
        var item_header_title = item_header.children(".item_header_title").text();
        o.title=item_header_title;
        // 002-拿到3*a
        var subli=[];
        var item_header_sublinks = item_header.children(".item_header_sublinks");
        var item_header_a=item_header_sublinks.children("a");
        for(var j=0;j<item_header_a.length;j++){
            subli.push(item_header_a.eq(j).text());
        }
        o.li=subli;
        data.push(o);
    }
// step3
var mains = $(".chaoshi_nav_body").children(".item");
var data = [];
for (var i = 0; i < mains.length; i++) {
    // 001-拿到item_header_title
    var item_header = mains.eq(i).children(".item_header");
    var item_header_title = item_header.children(".item_header_title").text();
    var o={};
    o.title=item_header_title;

    // 002-拿到3*a
    var subli=[];
    var item_header_sublinks = item_header.children(".item_header_sublinks");
    var item_header_a=item_header_sublinks.children("a");
    for(var j=0;j<item_header_a.length;j++){
        subli.push(item_header_a.eq(j).text());
    }
    o.li=subli;

    // [item_body->item_body_wrap->ul[li[title,main[a*8]]]
    // 003-拿到第三级的body->ul->li的标题
    var item_body_ul = mains.eq(i).children(".item_body").children(".item_body_wrapper").children("ul");
    var chaoshi_item=item_body_ul.children("li");
    var subtitle=[];
    var sublist=[];
    for(var n=0; n<chaoshi_item.length; n++){
        var chaoshi_item_title=chaoshi_item.eq(n).children(".chaoshi_nav_sub_title");
        // o.subtitle=chaoshi_item_title;
        subtitle.push(chaoshi_item_title.text());
    
        // 004-拿到第三级的...li 的内容a*8
        var chaoshi_item_body=chaoshi_item.eq(n).children(".chaoshi_nav_sub_main");
        var chaoshi_item_a=chaoshi_item_body.children("a");
        var suboli=[];
        for(var k=1;k<chaoshi_item_a.length;k++){
            suboli.push(chaoshi_item_a.eq(k).text());
        }
        // o.sublist=sublist;
        sublist.push(suboli);
    }
    o.subtitle=subtitle;
    o.sublist=sublist;
    data.push(o);
} 

var mains = $(".chaoshi_nav_body").children(".item");
var data = [];
for (var i = 1; i < mains.length; i++) {
    var current = mains[i].children[0].children;
    var dataArr = [];
    for (var j = 0; j < current.length; j++) {
        var item = current[j];
        var o = {};
        o.src = item.querySelector("img").src;
        o.title = item.querySelector("a").title;
        o.price = item.querySelector(".p_price").innerText;
        dataArr.push(o);
    }
    data.push(dataArr);
}

var imgs=document.querySelectorAll(".csi_img");
var arr=[];
[...imgs].map(ele=>{
    var o={};
    o.src=ele.src;
    o.alt=ele.alt;
    o.title=ele.title;
    arr.push(o);
});
console.log(arr);

var price=document.querySelectorAll(".csi_price");
var pricArr=[];
[...price].map(function(ele){
    var parO={};
    parO.priceA=ele.children[0].innerText;
    parO.priceB=ele.children[1].innerText;
    pricArr.push(parO);
})
console.log(pricArr);



var bigArr=[];

// 获取大图片数据
var bigwrap=$(".chaoshi_category_bd").eq(11);
var bigImg=bigwrap.children(".chaoshi_category_focus").children(".chaoshi_category_focus_pic").children()[0].src;

// 获取大图片里的数据
var bigwrap=$(".chaoshi_category_bd").eq(11);
var emage=bigwrap.children(".chaoshi_category_focus").children(".chaoshi_category_focus_key").children(".chaoshi_category_focus_key_inner").children();
var emgArr=[];
for(var i=0;i<emage.length;i++){
    emgArr.push(emage[i].title);
}




// 拿到各楼层主要数据
var bigwrap=$(".chaoshi_category_bd").eq(11);
var lis=bigwrap.children(".goods").children(".chaoshi_category_ul").children(".J_goods_item");
var oData=[];
for(var i=0;i<lis.length;i++){
    var o={};
    o.imgsrc=lis.eq(i).children(".goods_pic").children(".J_goods_img")[0].src;
    o.alt=lis.eq(i).children(".goods_pic").children(".J_goods_img")[0].alt;
    o.price=lis.eq(i).children(".goods_prices").children(".J_goods_price")[0].innerText;
    oData.push(o);
}


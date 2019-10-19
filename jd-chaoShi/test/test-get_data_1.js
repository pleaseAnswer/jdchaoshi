// mains就是二级列表里的9个div
// div = header + body
// header = header_title[h3] + header_sublinks[p]

var mains = $(".chaoshi_nav_body").children(".item");
// init(9) 

// mains[0]=>[iteam_header[item_header_title,item_header_sublinks[a]],item_body]
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
  
    // 005-拿到第三级的body->ul->div->a
    // var item_body_div = mains.eq(1).children(".item_body").children(".item_body_wrapper").children(".chaoshi_nav_recommend");
    // var chaoshi_recommend_link=item_body_div.children("a");
    // var recommenda=[];
    // for(var k=1;k<chaoshi_recommend_link;k++){
    //     recommenda.push(chaoshi_recommend_link.eq(k).text());
    // }

    data.push(o);
}
// console.log(data);

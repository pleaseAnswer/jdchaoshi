class Manager_one{
    // 页面渲染-三级导航栏+大轮播图
    constructor(data,imagesrc,adimg){
        this.data=data;
        this.imagesrc=imagesrc;
        this.adimg=adimg;
        this.index=0;
        this.oSliderUl=null;
        this.oSliderUlLi=null;
    }
    init(){
        this.render();
        this.oSliderUl=document.querySelector(".chaoshi_carousel_main_wrapper");
        this.oSliderUlLi=document.querySelectorAll(".chaoshi_carousel_item")[0];
        this.oSlider=document.querySelectorAll(".chaoshi_carousel_main")[0];
        this.oSliderNav=document.querySelectorAll(".chaoshi_carousel_nav")[0];
        this.addClick(0);
        this.auto_play();
        this.addClickHandler();
        this.addMouseHandler();
        this.addClickHandlerWithNavItem();
    }
    render(){
        var chaoshi_nav=this.menu_render(this.data);
        var chaoshi_banner_mid=this.lunbo_render(this.imagesrc,this.adimg);
        
        var chaoshi_banner_inner=document.createElement("div");
        chaoshi_banner_inner.classList.add("chaoshi_banner_inner");
        chaoshi_banner_inner.appendChild(chaoshi_nav);
        chaoshi_banner_inner.appendChild(chaoshi_banner_mid);

        var chaoshi_banner_wrapper=document.createElement("div");
        chaoshi_banner_wrapper.classList.add("chaoshi_banner_wrapper");
        chaoshi_banner_wrapper.classList.add("clear_fix");
        chaoshi_banner_wrapper.classList.add("grid_c1");
        chaoshi_banner_wrapper.appendChild(chaoshi_banner_inner);
        var chaoshi_fs_1=document.querySelector("#chaoshi_fs_1");
        chaoshi_fs_1.appendChild(chaoshi_banner_wrapper);
    }
    // 生成三级导航栏
    menu_render(data){
        
        // 生成第二级导航栏的标签
        var item=data.map(function(ele){
            var item_header_title_arrow="<i class='item_header_title_arrow'>&gt;</i>";
            var item_header_title=`<h3 class='item_header_title'>${ele.title}${item_header_title_arrow}</h3>`;

            // 生成二级标签子标题的三个a
            var item_header_sublinks_inner=ele.li.map(function(oitem){
                return `<a href='./goodsList.html' target='_black' class='item_header_sublinks_link' title='${oitem}'>${oitem}</a>`;
            }).join("");
            var item_header_sublinks=`<p class="item_header_sublinks">${item_header_sublinks_inner}</p>`;

            var item_decoration=`<div class='item_decoration'></div>`;
            var item_header=`<div class='item_header'>${item_decoration}${item_header_title}${item_header_sublinks}</div>`;

            // 这里要产生item_body,即第三级导航栏
            // var item_body=body_render(data);
            var chaoshi_nav_sub_item=ele.subtitle.map(function(item,index){
                var chaoshi_nav_sub_title=`<div class="chaoshi_nav_sub_title">${item}</div>`;
                var chaoshi_nav_sub_main_link= ele.sublist[index].map(function(oitem){
                    return `<a href="" target="_blank" class="chaoshi_nav_sub_main_link" title="${oitem}" >${oitem}</a>`;
                }).join("");
                var chaoshi_nav_sub_main=`<div class="chaoshi_nav_sub_main clear_fix">${chaoshi_nav_sub_main_link}</div>`;
                return `<li class="chaoshi_nav_sub_item">${chaoshi_nav_sub_title}${chaoshi_nav_sub_main}</li>`;
            }).join("");
            
            var chaoshi_nav_sub=`<ul class="chaoshi_nav_sub clear_fix">${chaoshi_nav_sub_item}</ul>`;
            var item_body_wrapper=`<div class="item_body_wrapper clear_fix">${chaoshi_nav_sub}</div>`;
            var item_body=`<div class="item_body norecommend">${item_body_wrapper}</div>`;
            return `<div class='item'>${item_header}${item_body}</div>`;
        }).join("");
        
        var bodyer=`<div class='chaoshi_nav_body'>${item}</div>`;
        var header=`<div class="chaoshi_nav_header">京东超市频道分类</div>`;
        var chaoshi_navhtml=`${header}${bodyer}`;
        var chaoshi_nav=document.createElement("div");
        chaoshi_nav.classList.add("chaoshi_nav");
        chaoshi_nav.innerHTML=chaoshi_navhtml;
        return chaoshi_nav;
    }

    lunbo_render(imagesrc,adimg){
        // 生成轮播图的六个图片
        var chaoshi_carousel_items=imagesrc.map(ele=>{
            var chaoshi_carousel_img=`<img src="${ele}" data-lazy-img="done" class="chaoshi_carousel_img" title="" alt="">`
            var chaoshi_carousel_link=`<a href="" target="_blank" class="chaoshi_carousel_link">${chaoshi_carousel_img}</a>`;
            return `<li class="chaoshi_carousel_item">${chaoshi_carousel_link}</li>`;
        }).join("");
        var chaoshi_carousel_main_wrapper=`<ul class="chaoshi_carousel_main_wrapper clear_fix">${chaoshi_carousel_items}</ul>`;
        var chaoshi_carousel_main=`<ul class="chaoshi_carousel_main">${chaoshi_carousel_main_wrapper}</ul>`;
        
        // 生成上下切换的<>
        var chaoshi_carousel_prev=`<a class="chaoshi_carousel_prev">&lt;</a>`;
        var chaoshi_carousel_next=`<a class="chaoshi_carousel_next">&gt;</a>`;
        var chaoshi_carousel_btns=`<div class="chaoshi_carousel_btns ">${chaoshi_carousel_prev}${chaoshi_carousel_next}</div>`;

        // 生成6个轮播切换小条 当前chaoshi_carousel_nav_btn_on
        var chaoshi_carousel_nav_btn="";
        for(let i=0;i<6;i++){
            chaoshi_carousel_nav_btn += `<a class="chaoshi_carousel_nav_btn"></a>`;
        }
        var chaoshi_carousel_nav=`<div class="chaoshi_carousel_nav clear_fix">${chaoshi_carousel_nav_btn}</div>`;

        
        // 把上下切换和轮播图片切换小条包装
        var chaoshi_carousel_extra=`<div class="chaoshi_carousel_extra">${chaoshi_carousel_btns}${chaoshi_carousel_nav}</div>`;

        // 把轮播图和切换图标放在一起
        var chaoshi_carousel=`<div class="chaoshi_carousel">${chaoshi_carousel_main}${chaoshi_carousel_extra}</div>`;

        // 生成轮播下面的两个小广告
        var chaoshi_bottom_items=adimg.map(ele=>{
            var chaoshi_bottom_img=`<img class="chaoshi_bottom_img" src="${ele}" data-lazy-img="done" alt="" title="">`;
            var chaoshi_bottom_link=`<a href="" class="chaoshi_bottom_link" target="_blank">${chaoshi_bottom_img}</a>`;
            return `<li class="chaoshi_bottom_item fl">${chaoshi_bottom_link}</li>`;
        }).join("");
        var chaoshi_bottom=`<ul class="chaoshi_bottom clear_fix">${chaoshi_bottom_items}</ul>`;
        var chaoshi_banner_mid_html=`${chaoshi_carousel}${chaoshi_bottom}`;

        // 把轮播图+切换图标 和 小广告放在一起
        var chaoshi_banner_mid=document.createElement("div");
        chaoshi_banner_mid.classList.add("chaoshi_banner_mid");
        chaoshi_banner_mid.classList.add("fl");
        chaoshi_banner_mid.innerHTML=chaoshi_banner_mid_html;
        return chaoshi_banner_mid;
    }  

    // 点击事件
    addClick(index){
        Array.from(this.oSliderNav.children).forEach(ele=>ele.classList.remove("chaoshi_carousel_nav_btn_on"));
        this.oSliderNav.children[index].classList.add("chaoshi_carousel_nav_btn_on");
    }
    // 播放下一张图片
    next(){
        this.index++;
        this.index = this.index==6?0:this.index;
        this.oSliderUl.style.left=-(this.oSliderUlLi.offsetWidth*this.index)+"px";
        this.addClick(this.index);
    }

    // 播放上一张图片
    prev(){
        this.index--;
        this.index=this.index==-1?5:this.index;
        this.oSliderUl.style.left=-(this.oSliderUlLi.offsetWidth*this.index)+"px";
        this.addClick(this.index);
        Array.from(this.oSliderUlLi).forEach(function(ele,i){
            ele.classList.remove("chaoshi_carousel_item_on");
        })
        this.oSliderUlLi[index].classList.add("chaoshi_carousel_item_on");
    }  

    // 自动轮播
    auto_play(){
        this.oInterval=setInterval(()=>this.next(),1500);
    }

    // 鼠标移入
    addMouseHandler(){
        this.oSlider.onmouseenter=()=>clearInterval(this.oInterval);
        this.oSlider.onmouseleave=()=>this.auto_play();
    }

    // 前进后退操作
    addClickHandler(){
        this.oSliderControl=document.querySelectorAll(".chaoshi_carousel_btns")[0];
        this.oSliderControl.onclick=e=>{            
            e=e||window.event;
            let target=e.target||e.srcElement;
            if(target.className=="chaoshi_carousel_prev"){
                this.prev();
            }else if(target.className=="chaoshi_carousel_next"){
                this.next();
            }
        }
    }

    // 点击跳转操作
    addClickHandlerWithNavItem(){
        Array.from(this.oSliderNav.children).forEach((ele,index)=>{
            ele.onclick=()=>{
                this.addClick(index);
                this.index=index;
                this.oSliderUl.style.left=-(this.oSliderUlLi.offsetWidth*this.index)+"px";
            }
        })
    }
    
}




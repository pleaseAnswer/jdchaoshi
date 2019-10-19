class Manager_two{
    // 页面渲染：大轮播右侧的小布局
    constructor(littleImg){
        this.littleImg=littleImg;
        this.index=0;
    }
    init(){
        this.render();
        this.oSliderNav=document.querySelectorAll(".chaoshi_handy_carousel_nav")[0];
        this.oSliderUl=document.querySelectorAll(".chaoshi_handy_wrapper")[0];
        this.oSliderUlLi=document.querySelectorAll(".chaoshi_handy_carousel_item")[0];
        this.oSlider=document.querySelectorAll(".chaoshi_handy_carousel_main")[0];
        this.oAddHover(0);
        this.oAuto_play();
        this.oAddMouseHandler();
        this.oAddClickHandlerWithNavItem();
    }
    render(){
        var chaoshi_coupon=this.quan_render();
        var chaoshi_handy=this.lunbo_render(this.littleImg);
        this.chaoshi_right=document.createElement("div");
        this.chaoshi_right.classList.add("chaoshi_right");
        this.chaoshi_right.classList.add("fr");
        this.chaoshi_right.innerHTML=chaoshi_coupon;
        this.chaoshi_right.innerHTML+=chaoshi_handy;
        
        var chaoshi_banner_inner=document.querySelectorAll(".chaoshi_banner_inner")[0];
        chaoshi_banner_inner.appendChild(this.chaoshi_right);
    }
    quan_render(){
        return `<div class="chaoshi_coupon">
            <p class="chaoshi_right_tt">每日领券</p>
            <p class="chaoshi_right_tip">总有你想要的</p>
            <div class="chaoshi_coupon_bd">
                <a class="chaoshi_coupon_info" href="" target="_blank">
                    <p class="chaoshi_coupon_info_num1">¥<em>10</em>
                    </p>
                    <p class="chaoshi_coupon_info_num2">满99可用</p>
                    <p class="chaoshi_coupon_info_tip">仅可购买自营清风部分商品</p>
                </a>
                <a class="chaoshi_coupon_more" href="">更多好券</a>
            </div>
        </div>`;
    }
    
    // 生成轮播图
    lunbo_render(data){
        var chaoshi_handy_carousel_mainhtml= data.map(ele=>{
            var chaoshi_handy_carousel_img=`<a href="" class="chaoshi_handy_carousel_link">
            <img src="${ele.src}" title="${ele.title}" alt="${ele.title}" class="chaoshi_handy_carousel_img"></a>`;
            var chaoshi_handy_carousel_enter=`<a class="chaoshi_handy_carousel_enter">进入&gt;</a>`;
            return `<li class="chaoshi_handy_carousel_item">${chaoshi_handy_carousel_img}${chaoshi_handy_carousel_enter}</li>`;
        }).join("");

        var chaoshi_handy_wrapper=`<ul class="chaoshi_handy_wrapper">${chaoshi_handy_carousel_mainhtml}</ul>`
        var chaoshi_handy_carousel_main=`<ul class="chaoshi_handy_carousel_main">${chaoshi_handy_wrapper}</ul>`;

        var chaoshi_handy_carousel_navhtml="";
        for(let i=0;i<5;i++){
            chaoshi_handy_carousel_navhtml+=`<a href="" class="chaoshi_handy_carousel_nav_btn"></a>`;
        }
        var chaoshi_handy_carousel_nav=`<div class="chaoshi_handy_carousel_nav clear_fix">${chaoshi_handy_carousel_navhtml}</div>`;
        var chaoshi_handy_carousel=`<div class="chaoshi_handy_carousel">${chaoshi_handy_carousel_main}${chaoshi_handy_carousel_nav}</div>`;
        var h4=`<h4 class="chaoshi_right_tt"></h4>`;
        var p=`<p class="chaoshi_right_tip">小物件 大用途</p>`;
        return `<div class="chaoshi_handy">${h4}${p}${chaoshi_handy_carousel}</div>`;
    }

    // 点击事件
    oAddHover(index){
        Array.from(this.oSliderNav.children).forEach(ele=>ele.classList.remove("on"));
        // console.log(this.oSliderNav.children[this.index]);
        this.oSliderNav.children[index].classList.add("on");
    }

    // 播放下一张图片
    oNext(){
        this.index++;
        this.index = this.index==5?0:this.index;
        this.oSliderUl.style.left=-(this.oSliderUlLi.offsetWidth*this.index)+"px";
        // if(this.index<5){
        //     this.oSliderUl.style.left=-(200*this.index)+"px";
        // }
        this.oAddHover(this.index);
    }

    // 播放上一张图片
    oPrev(){
        this.index--;
        this.index=this.index==-1?4:this.index;
        this.oSliderUl.style.left=-(this.oSliderUlLi.offsetWidth*this.index)+"px";
        this.oAddHover(this.index);
    }  

    // 自动轮播
    oAuto_play(){
        this.oInterval=setInterval(()=>this.oNext(),1500);
    }

    // 鼠标移入
    oAddMouseHandler(){
        this.oSlider.onmouseenter=()=>clearInterval(this.oInterval);
        this.oSlider.onmouseleave=()=>this.oAuto_play();
    }

    // 点击跳转操作---有bug
    oAddClickHandlerWithNavItem(){
        Array.from(this.oSliderNav.children).forEach((ele,index)=>{
            ele.onclick=()=>{
                this.addHover(index);
                this.index=index;
                this.oSliderUl.style.left=-(this.oSliderUlLi.offsetWidth*this.index)+"px";
            }
        })
    }
}
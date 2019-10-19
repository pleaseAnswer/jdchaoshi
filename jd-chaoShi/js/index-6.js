class Manager_four{
    // 页面渲染-生成十二个楼层
    constructor(data){
        this.data=data;
    }

    init(){
        var containList=this.render(this.data);
        var contain=document.querySelectorAll(".list_container")[0];
        contain.innerHTML+=containList;
        this.louCeng_render(this.data);
        this.oItem=document.querySelectorAll(".chaoshi_lift_item_btn");

        this.addScroll();
        this.oAddMyClick();
    }

    render(data){
        return data.map(ele=>{
            // 头部大标题
            var head=`
            <div class="chaoshi_mod_head grid_c1">
                <h3 class="chaoshi_mod_head_title">${ele.name}</h3>
            </div>`;    

            // 左边大图片
            var bigImg=`
            <a class="chaoshi_category_focus_pic" href="" target="_blank" title="">
                <img src="${ele.bigImg}">
            </a>`;

            // 大图片里的小图标
            var litLiInn=JSON.parse(ele.bigCon).map(item=>{
                return `<a href="" target="_blank" title="${item}">${item}</a>`;
            }).join("");

            var litLi=`<div class="chaoshi_category_focus_key_inner">${litLiInn}</div>`;

            var litLiWrap=`<div class="chaoshi_category_focus_key">${litLi}</div>`;

            // 左部大包装
            var lefImg=`<div class="chaoshi_category_focus">${bigImg}${litLiWrap}</div>`;
            
            // 十个商品
            // 处理数据 字符串->数组
            
            var goods_item=JSON.parse(ele.list).map(item=>{
                var goods_pic=`<a class="goods_pic" href="" target="_blank" title="">
                <img class="J_goods_img goods_img" src="${item.imgsrc}" alt="${item.alt}" title="${item.alt}">
                </a>`;
                var goods_title=`<p class="goods_title">${item.alt}</p>`;
                var goods_pri=`<div class="goods_prices clear_fix">
                    <p class="J_goods_price goods_price" data-price-id="1280261">${item.price}</p>
                </div>`;
                var goods_add=`<a class="J_goods_add goods_add" href="">
                <i class="goods_add_icon"></i>
                <span class="goods_add_txt">加入购物车</span>
            </a>`;
             return `<li class="J_goods_item goods_item">${goods_pic}${goods_title}${goods_pri}${goods_add}</li>`;
        }).join("");
            

            var category_ul=`<ul class="chaoshi_category_ul goods_list">${goods_item}</ul>`;

            var goods=`<div class="goods chaoshi_category_goods clear_fix">${category_ul}</div>`;

            // 把大图片和商品包装
            var category_bd=`<div class="chaoshi_category_bd grid_c1">${lefImg}${goods}</div>`;

            // 把标题和内容包装
            return `<div class="chaoshi_category grid_c1" id="chaoshi_category_${ele.data_id}">${head}${category_bd}</div>`
        }).join("");
        
    }

    louCeng_render(data){
        var oUlHtml=data.map(ele=>{
            return `
            <li class="chaoshi_lift_item"><a href="#chaoshi_category_${ele.data_id}" class="chaoshi_lift_item_btn">${ele.name}</a></li>`;
        }).join("");

        var oLiAdd=`
        <li class="chaoshi_lift_top chaoshi_lift_item_last"><a href="#big_top_nav" class="chaoshi_lift_item_btn" ><i class="chaoshi_lift_top_icon mod_png"></i>回到顶部</a></li>`;

        var oUl=`<ul class="chaoshi_lift_list">${oUlHtml}${oLiAdd}</ul>`;

        var chaoshi_lift=document.createElement("div");
        chaoshi_lift.classList.add("chaoshi_lift");
        chaoshi_lift.setAttribute("id","chaoshi_lift_27");
        chaoshi_lift.innerHTML=oUl;

        document.body.appendChild(chaoshi_lift);
    }

    oAddMyClick(){
        var oItemBig=document.querySelectorAll(".chaoshi_lift")[0];
        this.oItem[0].classList.add("hover");
        var self=this;
        oItemBig.onclick=function(e){
            e=e||window.event;   
            let target=e.target||e.srcElement;
            for(var i=0;i<self.oItem.length;i++){
                self.oItem[i].classList.remove("hover");
            }
            target.classList.add("hover");
        }
    }

    addScroll(){
        var self=this;
        $(document).scroll(function() {
            // console.log("+++", window.scrollY);
            if(window.scrollY<1100){
                $(".chaoshi_lift").css("display","none");
            }else{
                $(".chaoshi_lift").css("display","block");
            }
            if(window.scrollY>7900){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[12].classList.add("hover");
            }else if(window.scrollY>7300){
            console.log("11", window.scrollY);
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[11].classList.add("hover");
            }else if(window.scrollY>6800){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[10].classList.add("hover");
            }else if(window.scrollY>6200){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[9].classList.add("hover");
            }else if(window.scrollY>5600){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[8].classList.add("hover");
            }else if(window.scrollY>5000){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[7].classList.add("hover");
            }else if(window.scrollY>4500){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[6].classList.add("hover");
            }else if(window.scrollY>3900){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[5].classList.add("hover");
            }else if(window.scrollY>3300){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[4].classList.add("hover");
            }else if(window.scrollY>2700){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[3].classList.add("hover");
            }else if(window.scrollY>2100){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[2].classList.add("hover");
            }else if(window.scrollY>1500){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[1].classList.add("hover");
            }else if(window.scrollY>1000){
                Array.from(self.oItem).map(ele=>ele.classList.remove("hover"));     
                self.oItem[0].classList.add("hover");
            }
        })

        
    }

}
$(()=>{
    var o={};
    o.oType=getItem("oType");
    o.imgSrc=getItem("imgSrc");
    o.oPrice=getItem("oPrice");
    o.oTitle=getItem("oTitle");
    o.oDis=getItem("oDis");
    o.oStore=getItem("oStoreName");
    o.oGoodId=getItem("oGoodId");
    render(o);

    // 对cookie中数据做处理
    function getItem(key) {
        let cookieArr = document.cookie.split("; ");
        for (let index = 0; index < cookieArr.length; index++) {
            const element = cookieArr[index].split("=");
            if (key == element[0]) {
                return element[1];
            }
        }
    }
    
    // 页面渲染
    function render(data){
        var html= `
        <div class="imgWrapper">
            <div class="imgBox">
                <img class="litImg" src=${data.imgSrc} alt="">
                <div class="img-mask" style="display:none"></div>
            </div>
            <div class="bigImg_wrapper" style="display:none">
                <img class="bigImg" src=${data.imgSrc} alt="">
            </div>
        </div>
        <div class="message clear_fix">
            <div class="mes_title">${data.oTitle}</div>
            <div class="mes_type"><a>${data.oType}</a>  品质保证，正品速达！！！</div>
            <div class="mes_price-wrap">
                <div class="dt">
                    <span class="p-price">京东价<a>${data.oPrice}</a></span>
                    <div class="mes_com">
                        <p class="comment">累计评价</p>
                        <a class="count J-comm-2540415" href="#none">${data.oDis}</a>
                    </div>
                </div>
            </div>
            <div class="summary-stock">
                <div class="dt">配 送 至</div>
                <div class="ui-area-text-wrapper">
                    <div class="ui-area-text" data-id="19-1601-3633" title="广东 广州市 天河区">广东广州市天河区<b></b></div>
                    <!--小箭头-->
                </div>
            </div>
            <div class="mes_store">${data.oStore}</div>
            <a id="goods_id">${data.oGoodId}</a>
            <a id="InitCartUrl" class="btn-special1 btn-lg">加入购物车</a>
        </div>`;
        var container=document.querySelectorAll(".container")[0];
        container.innerHTML=html;
    }

    // 放大镜
    // 遮罩宽高/小图宽高=可见域宽高/大图宽高
    var imgBox=$(".imgWrapper")[0];
    var minBox=$(".imgBox")[0];
    var minImg=$(".litImg")[0];
    var mask=$(".img-mask")[0];
    var maxBox=$(".bigImg_wrapper")[0];
    var maxImg=$(".bigImg")[0];

    // 小图片盒子绑定鼠标移入事件
    minBox.onmouseenter=function(){
        mask.style.display="block";
        maxBox.style.display="block";
    }

    minBox.onmousemove=function(e){
        // console.log(e.clientY,e.pageY);
        // pageY=client+滚动条
        // 遮罩里图片左边的距离
        var moveX=e.pageX-imgBox.offsetLeft-mask.offsetWidth/2;
        var moveY=e.pageY-imgBox.offsetTop-mask.offsetHeight/2;

        // 遮罩可以运动的最大X/Y
        var maxX=minBox.offsetWidth-mask.offsetWidth;
        var maxY=minBox.offsetHeight-mask.offsetHeight;

        if(moveX>=maxX){
            moveX=maxX;
        }
        if(moveY>=maxY){
            moveY=maxY;
        }

        if(moveX<=0){
            moveX=0;
        }
        if(moveY<=0){
            moveY=0;
        }

        // 大图片可以移动的最大距离
        var biliX=(maxImg.offsetWidth-maxBox.offsetWidth)/maxX;
        var biliY=(maxImg.offsetHeight-maxBox.offsetHeight)/maxY;

        // 遮罩跟随鼠标移动
        mask.style.top=moveY+"px";
        mask.style.left=moveX+"px";

        // 大图片与遮罩方向移动
        maxImg.style.top=-moveY*biliY+"px";
        maxImg.style.left=-moveX*biliX+"px";
    }
    minBox.onmouseleave=function(){
        mask.style.display="none";
        maxBox.style.display="none";
    }

    // InitCartUrl
     /* 实现点击添加商品到购物车的功能 */
     $("#InitCartUrl").on("click", function() {
        /* 获取当前商品的ID */
        
        let good_id = $(this).prev("#goods_id").text();
        
        /* 发送网络请求把当前数据添加到购物车表中 */
        /* 数据库表 cart_id  good_id  num isChecked */
        /* 添加数据： */
        /* 删除数据： */
        /* 更新数据： */
         $.ajax({
            url: "./server/cart.php",
            data: { type: "add", good_id: good_id },
            dataType: "json",
            success: function(response) {
                if (response.status == "success") {
                    $("#shopping-amount").text($("#shopping-amount").text() * 1 + 1);
                }
                window.location.href="./shoppingCar.html";
            }
        });
    })
})



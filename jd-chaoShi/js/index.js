$(()=>{
    // 登录成功后获取用户名返回主页
    // 获取cookie信息
    function getCookie(name){
        var strCookie=document.cookie;
        // console.log(strCookie);
        
        var arrCookie=strCookie.split(";");
        // console.log(arrCookie);

        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            // console.log(arr);
            if(arr[0]=name) return arr[1];
            return "";
        }
    }
    let username;
    var islogin=getCookie("user");
    // console.log(islogin,'[" "]',islogin==undefined);
    if(islogin!=undefined){
        // 连接数据库
        // 查询username
        // 返回username
        $.ajax({
            type: "post",
            url: "./server/index-1.php",
            data: `user=${islogin}`,
            // data:"user=14778864955",
            // dataType: "json",
            success: function (response) {
                var data = JSON.parse(response);
                console.log(data);
                console.log(typeof(data));
                
                console.log(data[0].username);
                username=data[0].username;
                $(".nickname").text(username);
            }
        });
        
        $("#ttbar-login").hide();
        $("#ttbar-login-already").show();
    }else{
        $("#ttbar-login").show();
        $("#ttbar-login-already").hide();
    }


    /* 发请求获取购物车中商品的数量 */
    $.ajax({
        url: "./server/getTotalCount.php",
        dataType: "json",
        success: function({ total }) {
            console.log(total);
            $("#shopping-amount").text(total);
             // 改变购物车下拉框的内容
            if($("#shopping-amount").text()==0){
                console.log("---okok===");
                $(".nogoods").html(`<b></b>购物车中还没有商品，赶紧选购吧！`);
            }else{
                $.ajax({ //获取商品数据
                    data: { type: "get" },
                    url: "./server/cart.php",
                    dataType: "json",
                    success: function(res) {
                        var html="";
                        $(res.data).each((index, ele) => {
                            html+=`
                            <div class="oMygoods" style="height:60px;background:#f9f9f9">
                                <img src=${ele.goods[0].src} style="width:50px;height:50px;float:left;margin-right:10px">
                                <h5 style="width:160px;font-size:12px;line-height:16px;height:50px;text-overflow: ellipsis;overflow: hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;float:left">${ele.goods[0].title}</h5>
                                <p style="float:right">￥${ele.goods[0].price}</p>
                            </div>`;
                        })
                        console.log(html);
                        
                        $(".nogoods").html(html);
                    }
                });
            }
        }
    });

    /* 打开购物车页面 */
    $("#settleup-2014").click(() => window.location.href = "./shoppingCar.html");

    /* 点击切换地址 */ 
    $(".ui-areamini-content-list").on("click",".item",function(){
        console.log("-----okok----");
        
        $(this).children("a").addClass("selected");
        $(this).siblings().children("a").removeClass("selected");
        $(".ui-areamini-text").attr("data-id",$(this).children("a").attr("data-id"));
        $(".ui-areamini-text").attr("title",$(this).children("a").addClass("selected").text());
        $(".ui-areamini-text").text($(this).children("a").addClass("selected").text());
    })

   
})

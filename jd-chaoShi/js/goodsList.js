$(()=>{

    /* type ==0 默认排序  id */
    /* type ==1 升序排列  价格 */
    /* type ==2 降序排列  价格 */
    function getDataWithPage(page,type){
        $.ajax({
            type: "get",
            url: "./server/goodsList.php",
            data: `page=${page}&sortType=${type}`,
            // dataType: "dataType",
            success: data=>{
                renderUI(JSON.parse(data));
                //001 当点击单个商品的时候，把此商品的信息暂存在cookie，
                // 002 商品详情页在cookie获取信息，渲染页面

                $(".item-box").on("click",function(){
                    console.log("----");
                    
                    var imgSrc=$(this).children("img")[0].src;
                    document.cookie=`imgSrc=${imgSrc}`;

                    var oPrice=$(this).children(".price").text();
                    document.cookie=`oPrice=${oPrice}`;

                    var oTitle=$(this).children(".title").text();
                    document.cookie=`oTitle=${oTitle}`;

                    var oDis=$(this).children(".dis").children("a").text();
                    document.cookie=`oDis=${oDis}`;

                    var oStoreName=$(this).children(".storeName").text();
                    document.cookie=`oStoreName=${oStoreName}`;

                    var oStoreType=$(this).parents(".item").children(".barBottom").children(".type").text();
                    document.cookie=`oType=${oStoreType}`;
                    
                    var oGoodId=$(this).parent(".item").children(".barBottom").children("#good_id").text();
                    document.cookie=`oGoodId=${oGoodId}`;

                    window.location.href="./goodsDetails.html";
                })

                /* 实现点击添加商品到购物车的功能 */
                $(".shoppingCar").on("click", function() {

                    /* 获取当前商品的ID */
                    let good_id = $(this).prev("#good_id").text();
                    
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
                        }
                    });
                })
            }
        });
    }

    function renderUI(data){
        let html = data.map((ele) => {
            return `
                <li class="item">
                    <div class="item-box">
                        <img src=${ele.src}>
                        <div class="price">￥${ele.price}</div>
                        <div class="title">${ele.title}</div>
                        <div class="dis"><a>${ele.disCount}</a>条评论</div>
                        <div class="storeName">${ele.shopName}</div>
                    </div>
                    <div class="barBottom">
                        <a class="type">${ele.type}</a>
                        <a id="good_id">${ele.good_id}</a>
                        <a class="shoppingCar"><i></i>购物车</a>
                    </div>
                </li>
            `
        }).join("");
        $(".box-list").html(html);
    }
    
    new Promise(function(resolve,reject){
        $.ajax({
            type: "get",
            url: "./server/goodsCount.php",
            // dataType: "dataType",
            success: function (data) {
                data=JSON.parse(data);
                let res="";
                for(let i=0;i<data.count;i++){
                    res+=`<a href="javascript:;">${i + 1}</a>`;
                }
                // console.log(res);
                
                $("#page").html(res);
                
                $("#page").children().eq(0).addClass("active");
                resolve();
            }
        });
    }).then(function(){
        getDataWithPage(1,0);
    })

    var oType=0;
    $(".typeBtn").on("click",function(){
        getDataWithPage(1,$(this).index());
        oType=$(this).index();
        return oType;
    })
    $("#page").on("click","a",function(){
        getDataWithPage($(this).index()+1,oType);
        $(this).addClass("active").siblings().removeClass("active");
    })     
})
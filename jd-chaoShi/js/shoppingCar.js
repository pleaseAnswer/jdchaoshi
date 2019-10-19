$(() => {
    loadCart();

    function loadCart() {
        $(".cartBox").remove();
        $.ajax({ //获取商品数据
            data: { type: "get" },
            url: "./server/cart.php",
            dataType: "json",
            success: function(res) {
                console.log(res);

                $(res.data).each((index, ele) => {
                    renderUI(ele);
                })
            }
        });
    }


    /* 渲染购物车 */
    function renderUI(data) {
        let tmp = data.goods.map(item => {
            return `
            <ul class="order_lists order_item" gid=${item.good_id}>
                <li class="list_chk">
                  <input type="checkbox" id="checkbox_${item.good_id}" class="son_check">
                  <label for="checkbox_${item.good_id}"></label>
                </li>
                <li class="list_con">
                  <div class="list_img"><a href="./detail.html?product/${item.good_id}"><img src=${item.src} alt=""></a></div>
                  <div class="list_text"><a href="./detail.html?product/${item.good_id}">${item.title}</a></div>
                </li>
                <li class="list_price">
                  <p class="price">￥${item.price}</p>
                </li>
                <li class="list_amount">
                  <div class="amount_box">
                    <a href="javascript:;" class="reduce">-</a>
                    <input type="text" value="${item.num}" class="sum">
                    <a href="javascript:;" class="plus">+</a>
                  </div>
                </li>
                <li class="list_sum">
                  <p class="sum_price" data-price=${item.price}>￥${Math.round(item.price * item.num * 100) / 100}</p>
                </li>
                <li class="list_op">
                  <p class="del"><a class="delBtn">移除商品</a></p>
                </li>
              </ul>`
        }).join('');
       
        let html = `
                <div class="cartBox">
                  <div class="shop_info">
                    <div class="all_check">
                      <input type="checkbox" id="shop_a" class="shopChoice">
                      <label for="shop_a" class="shop"></label>
                    </div>
                    <div class="shop_name">
                      店铺：<a href="">${data.store}</a>
                    </div>
                  </div>
                  <div class="order_content">${tmp}</div>
                </div>`;
        $(html).insertAfter('.cartMain_hd');
    }

    $("body").on("click", "#all", function() {
      
        // $(this).next("label").toggleClass("mark");
        if($(this).next("label").hasClass("mark")){
          $("label").removeClass("mark");
        }else{
          $("label").addClass("mark");
        }
        /* 设置页面中所有的复选框都选中 */
        totalMoney();
    })
    $("body").on("click",".shop",function(){
        $(this).toggleClass("mark");
        $(this).parents(".cartBox").children(".order_content").children(".order_item").children(".list_chk").children("label").toggleClass("mark");
        totalMoney();
    })


    $("body").on("click", ".plus,.reduce", function() {
        /* 更改数量|发送网络请求 */
        let count;
        if (this.className == "plus") {
            count = $(this).prev().val() * 1 + 1;
            $(this).prev().val(count);

            // 当购物车商品的数量发生变化时才会发送更新请求
            let gid = $(this).parents(".order_item").attr("gid");
            updateCartData(this.className, gid);
        } else if(this.className =="reduce" && $(this).next().val()>1){

            // 当购物车商品的数量发生变化时才会发送更新请求
            count = $(this).next().val() * 1 - 1;
            $(this).next().val(count);
            let gid = $(this).parents(".order_item").attr("gid");
            updateCartData(this.className, gid);
            
        }else if(this.className =="reduce" && $(this).next().val()<=1){
          var oFlag=confirm("该商品数量已经不能减少啦，确认删除该商品吗？");
          if(oFlag==true){
            $(this).parents(".order_item").children(".list_op").children(".del").children(".delBtn").trigger("click");
          }else{
            count = $(this).next().val() * 1;
            $(this).next().val(count);
            console.log(count);
            
            let price = $(this).parents(".order_item").find(".sum_price").data().price;
            $(this).parents(".order_item").find(".sum_price").text("￥" + price * count);
          }
          
        }

        let price = $(this).parents(".order_item").find(".sum_price").data().price;
        $(this).parents(".order_item").find(".sum_price").text("￥" + price * count);

        
        totalMoney();

    });

    function updateCartData(flag, good_id) {
        $.ajax({
            url: "./server/cart.php",
            data: {
                type: "update",
                flag,
                good_id
            },
            success: function(response) {

            }
        });
    }

    /* 删除功能 */
    $("body").on("click", ".delBtn", function() {
        console.log("+++");
        let good_id = $(this).parents(".order_item").attr("gid");
        $.ajax({
            url: "./server/cart.php",
            data: { type: "del", good_id },
            dataType: "json",
            success: function(response) {
                console.log(response);
                loadCart();
                $(".piece_num").text(0);
                $(".total_text").text("0.00");
            }
        });
    })

    /* 清空功能 */    
    $("body").on("click", ".list_delall", function() {
      console.log("+++");
      $.ajax({
          url: "./server/cart.php",
          data: { type: "remove"},
          dataType: "json",
          success: function(response) {
              console.log(response);
              loadCart();
              $(".piece_num").text(0);
              $(".total_text").text("0.00");
              $("#all").next("label").removeClass("mark");
          }
      });
  })


    function totalMoney() {
        let total_count = 0;
        let total_price = 0;

        $(".order_item").each((index, ele) => {
          if($(ele).children(".list_chk").children("label").hasClass("mark")){
            var count = $(ele).find(".sum").val() * 1;
            var price = $(ele).find(".sum_price").text().substr(1) * 1;
          }else{
            var count=0;
            var price=0;
          }
            total_count += count;
            total_price += count * price;
        });

        $(".piece_num").text(total_count);
        $(".total_text").text("￥" + total_price.toFixed(2));
    };
})
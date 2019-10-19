$(()=>{
    // 扫码登陆界面-当鼠标移入时，出现两张图片
    $(".qrcode-login").mouseenter(()=>{
        let timeNum=setInterval(() => {
            // console.log($(".qrcode-img").css("left"));
            if($(".qrcode-img").css("left")== "0px"){
                $(".qrcode-help").css("display","block");
            }
            if($(".qrcode-img").css("left")=="0px"){
                clearInterval(timeNum);
            }
        }, 10)
    })
    $(".qrcode-login").mouseleave(()=>{
        $(".qrcode-help").css("display","none");
    })
    
    // 点击账户登录进行切换
    $(".login-tab").click(function(){
       
        $(this).siblings(".login-tab").children("a").removeClass("checked");
        $(this).siblings(".login-tab").children("a").css("outline","none");
        let index=$(this).index();

        $(this).children("a").addClass("checked");
        $(this).children("a").css("outline","rgb(109,109,109) none 0px");
        $(".login").each(()=>{
            $(".login").css("display","none");
        })
        console.log($(".login").eq(index-1));
        
        $(".login").eq(index-1).css("display","block");
    })

    // 生成图形验证码
    let captcha1 = new CaptchaMini({
        fontSize: 30,
        length: 5,
        content: "adshdfsnf234j35uetege5",
        lineNum: 3,
        dotNum: 20
    });
    let imgCode;
    captcha1.draw(document.querySelector('#captcha'), r => {
        console.log("验证码 = " + r);
        imgCode = r;
        // $("#imageCode").val(imgCode);
    });

    $("#loginname").keyup(function(){
        if($("#loginname").val().length == 0){
            $(".item-fore1>.clear-btn").css("display","none"); 
        }else{
            $(".item-fore1>.clear-btn").css("display","block"); 
        }
    })
    $("#nloginpwd").keyup(function(){
        if($("#nloginpwd").val().length == 0){
            $(".item-fore2>.clear-btn").css("display","none"); 
        }else{
            $(".item-fore2>.clear-btn").css("display","block"); 
        }
    })
    $(".clear-btn").click(function(){
        // console.log($(this));
        $(this).siblings(".itxt").val("");
    })
    // 点击登录按钮，验证用户名|手机号在数据库中是否存在，如果不存在则提示消息
    $("#loginsubmit").click(()=>{
        // 发送网络请求
        $.ajax({
            type: "post",
            url: "./server/login-1.php",
            data: `user=${$("#loginname").val()}&password=${$("#nloginpwd").val()}`,
            dataType: "json",
            success: function (response){
                console.log(response.user,typeof(response.user),response.user=="default");
                console.log(response.password,typeof(response.password),response.password=="default");
                
                if(response.status=="success"){
                    $("#entry").css("display","none");
                    $("#canvas").css("display","block");
                }else if(response.user=="default"){
                    // 用户名不存在，则提示--用户名|手机号不存在
                    $(".msg-error").removeClass("hide");
                    $(".msg-error").html("<b></b>账户号不存在");
                    // alert("用户名|手机号不存在")
                }else if(response.password=="default"){
                    // 密码有误
                    $(".msg-error").removeClass("hide");
                    $(".msg-error").html("<b></b>账户与密码不匹配");
                    // alert("账户与密码不匹配");
                }else{
                    $("#entry").css("display","none");
                    $("#canvas").css("display","block");
                    $(".msg-error").addClass("hide");
                    if($("#imageCode").val() == imgCode ){
                        window.location.href = "http://127.0.0.1/jd/jd-chaoShi/index.html";
                        // 新增的保存cookie代码
                        var exp = new Date();
                        exp.setTime(exp.getTime()+60*1000*60*24);//24小时
                        document.cookie="user="+$("#loginname").val()+";expires="+exp.toGMTString();
                        document.cookie="password="+$("#nloginpwd").val()+";expires="+exp.toGMTString();
                        // 新增结束
                    }else if($("#imageCode").val() != imgCode && $("#imageCode").val().length !=0){
                        $("canvas").trigger("click");
                        alert("请输入正确的图形验证码");
                    }
                }
            }
        });
        
    })
    
    // 001验证用户名|手机号在数据库中是否存在，如果不存在则提示消息

    // 002验证用户名|手机号对应的密码是否正确，如果不正确则提示消息
    // 003账户&密码正确，则切换至图形验证码。
    // 004验证图形验证码是否正确，如贵哦不正确则提示消息
})
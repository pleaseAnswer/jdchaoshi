$(()=>{
    let greyhtml="<span class='def'><i class='i-def'></i>验证完成后，你可以使用该手机登录或找回密码</span>";
    let orangehtml="<span class='error'><i class='i-error'></i>格式错误</span>";
    let captcha1 = new CaptchaMini({
        fontSize: 30,
        length: 5,
        content: "adshdfsnf234j35uetege5",
        lineNum: 3,
        dotNum: 20
    });
    let imgCode;

    function getRandom(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min
    }
    let randomNumber;

    // 输入手机号时提示灰色信息，当点击验证按钮的时候，不满足正则，提示橙色信息
    $("#form-phone").keyup(function(){
            $(".form-item-phone > .input-tip").html(greyhtml);                
            // $(".form-item-phone > .input-tip").css("display","block");                        
            $(".form-item-phone > .input-tip").addClass("item-current-i");                        
        // console.log(val); 
    })
// 点击按钮验证，当[.input-tip]的文本是错误时，提示输入手机号
// 验证时，切换号码显示页面，[.form-item]隐藏，出现验证码页面
    $(".form-item-getcode").click(function(){
        let val=$("#form-phone").val().trim();
        if (/^1[3-9]\d{9}$/.test(val)) {
            console.log(val);
            $(".form-item-phone > .input-tip").removeClass("item-current-i");
            $(".form-item-phone .i-status").addClass("item-current-i");
            $(".item-getcode-wrap").removeClass("item-current-wrap");
            $(".item-imagecode-wrap").addClass("item-current-wrap");
        }else{
            $(".form-item-phone > .input-tip").html(orangehtml);                
            $(".form-item-phone > .input-tip").addClass("item-current-i");                        
            $(".form-item-phone .i-status").removeClass("item-current-i");
        }
        console.log(val);
    })


    
    // 调用canva工具，生成图形验证码
    captcha1.draw(document.querySelector('#captcha'), r => {
        console.log("验证码 = " + r);
        imgCode = r;
        // $("#imageCode").val(imgCode);
    });
    // console.log("验证码 = " + imgCode);

    $("#step1-next").on("click",function(){
        // console.log(imgCode);
        // 如果图形验证码通过,切换至短信验证页面[在数据库中查询手机号是都已经被使用]
        if($("#imageCode").val() != imgCode){
            $(".form-item-imagecode > .input-tip").addClass("item-current-i"); 
            return;
        }
        $.ajax({
            type: "post",
            url: "./server/register-1.php",
            data: `phone=${$("#form-phone").val()}`,
            // dataType: "json",
            success: function(response) {
                /* 注册成功： */
                // console.log(response,"ok",typeof response);
                if (response == '"ok"') {
                    console.log("++++");
                    
                } else {
                    /* 注册失败： */
                    alert("该手机号已被注册，请直接登录");
                    window.location.href = "http://127.0.0.1/jd/jd-chaoShi/login.html";
                }
            }
        });
        $(".form-item-imagecode > .input-tip").removeClass("item-current-i"); 
        $(".item-imagecode-wrap").removeClass("item-current-wrap");
        $(".item-phonecode-wrap").addClass("item-current-wrap");
        console.log(typeof($("#phoneCode").val()));
        
        // 如果短信输入框为空，发送请求获取短信验证码；如果短信输入框不为空，但是值不等，提示信息；如果短信验证通过，跳转到步骤2
        if($(".item-phonecode-wrap").hasClass("item-current-wrap") && typeof(randomNumber)=="undefined") {
            randomNumber = getRandom(1000, 9999);
            console.log(randomNumber);
            
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_appid": '91032', //这里需要改成自己的appid
                    "showapi_sign": 'd57b19c8d2d44aef94aee464768a38d8', //这里需要改成自己的应用的密钥secret
                    "mobile": $("#form-phone").val(),
                    "content": `{"name":"顶呱呱","code":${randomNumber},"minute":"3","comName":"钱花花集团"}`,
                    "tNum": "T150606060601",
                },
                success: (result) => console.log(result,randomNumber,typeof(randomNumber))
            });
        }else if($("#phoneCode").val().trim() != randomNumber){
            console.log($("#phoneCode").val().trim());
            alert("请输入正确的验证码！");
        }else{
            // 验证通过时，再跳转到步骤二
            console.log($(".pro-step"));
        
            $(".pro-step").each(function(){
                $(".pro-step").removeClass("cur-step");
            })
            $(".person-pro-step2").addClass("cur-step");
            $("#step1-wrap").css("display","none");
            $("#step2-wrap").css("display","block");
        }
    })
    // 点击重新获取
    
    let oNum=2;
    $("#getPhoneCode").click(function(){
        if(oNum>0){
            oNum--;
            console.log(oNum);
            
            randomNumber = getRandom(1000, 9999);
                console.log(randomNumber);
                
                $.ajax({
                    type: 'post',
                    url: 'http://route.showapi.com/28-1',
                    dataType: 'json',
                    data: {
                        "showapi_appid": '91032', //这里需要改成自己的appid
                        "showapi_sign": 'd57b19c8d2d44aef94aee464768a38d8', //这里需要改成自己的应用的密钥secret
                        "mobile": $("#form-phone").val(),
                        "content": `{"name":"顶呱呱","code":${randomNumber},"minute":"3","comName":"钱花花集团"}`,
                        "tNum": "T150606060601",
                    },
                    success: (result) => console.log(result,randomNumber,typeof(randomNumber))
                });
        }else{
            alert("您今日注册短信发送次数已用完");
        }
    });

    
    // 用户名信息
    $("#form-account").keyup(function() {
        let val = $(this).val().trim();
        if (/^[a-zA-Z0-9]{4,8}$/.test(val)) {
            $("#form-item-account > .i-status").addClass("item-current-i");
            $("#form-item-account+div").children(".def").removeClass("item-current-i");
        } else {
            console.log(val);
            $("#form-item-account > .i-status").removeClass("item-current-i");
            $("#form-item-account+div").children(".def").addClass("item-current-i");
        }
    })
    // 设置密码
    $(".form-item-pwd").keyup(function() {
        let val = $("#form-pwd").val().trim();
        // console.log(val);
        if (/^[a-zA-Z0-9]{6,10}$/.test(val)) {
            // console.log(okk);
            $(".form-item-pwd > .i-status").addClass("item-current-i");
            $(".form-item-pwd + div").children(".def").removeClass("item-current-i");
        } else {
            console.log(val);
            $(".form-item-pwd > .i-status").removeClass("item-current-i");
            $(".form-item-pwd + div").children(".def").addClass("item-current-i");
        }
    })
    // 确认密码
    $("#form-equalTopwd").blur(function() {
        let selfval = $("#form-equalTopwd").val();
        let pwdval = $("#form-pwd").val();
        // console.log(val);
        if (selfval==pwdval && selfval.length!=0) {
            // console.log(okk);
            $(".form-item-sure > .i-status").addClass("item-current-i");
            $(".form-item-sure + div").children(".def").removeClass("item-current-i");
        } else {
            $(".form-item-sure > .i-status").removeClass("item-current-i");
            $(".form-item-sure + div").children(".def").addClass("item-current-i");
        }
        console.log(selfval.length);
    })
    // 点击立即注册按钮
    $("#form-register").click(function(e){
        if(!$("#form-item-account > .i-status").hasClass("item-current-i")){
            alert("请输入用户名");
        }
        if(!$(".form-item-pwd > .i-status").hasClass("item-current-i")){
            alert("请输入密码");
        }
        if(!$(".form-item-sure > .i-status").hasClass("item-current-i") || $("#form-equalTopwd").val().length==0){
            alert("请输入确认密码");
        }
        $(".pro-step").each(function(){
            $(".pro-step").removeClass("cur-step");
        })
        $(".person-pro-step3").addClass("cur-step");
        $("#step2-wrap").css("display","none");
        $("#step3-wrap").css("display","block");  
        $.ajax({
            type: "post",
            url: "./server/register.php",
            data: `username=${$("#form-account").val()}&password=${$("#form-pwd").val()}&phone=${$("#form-phone").val()}`,
            // dataType: "json",
            success: function(response) {
                /* 注册成功： */
                console.log(response);

                if (response == '"ok"') {
                    console.log("++++");
                    
                    /* 跳转到首页 */
                    setTimeout(()=>window.location.href = "http://127.0.0.1/jd/jd-chaoShi/login.html",3000);
                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }
            }
        });
    
        // e.preventDefault()
    });
})


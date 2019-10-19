class Manager_three{
    // 页面渲染-生成限时抢购
    constructor(data){
        this.data=data;
    }
    init(){
        this.render();
        this.timeout();
    }
    render(){
        var seckill_hd=this.xsqg_hd_render();
        var seckill_bd=this.xsqg_bd_render(this.data);
        var grid_c1=document.createElement("div");
        grid_c1.classList.add("grid_c1");
        grid_c1.innerHTML= seckill_hd;
        grid_c1.innerHTML+= seckill_bd;
        var chaoshi_seckill=document.createElement("div");
        chaoshi_seckill.classList.add("chaoshi_seckill");
        chaoshi_seckill.setAttribute("id","chaoshi_seckill_2");
        chaoshi_seckill.appendChild(grid_c1);
        var mod_container=document.querySelectorAll(".mod_container")[0];
        mod_container.appendChild(chaoshi_seckill);
    }

    xsqg_hd_render(){
        var split=`
        <div class="time_split">
            <i class="time_split_dot time_split_top"></i>
            <i class="time_split_dot time_split_bottom"></i>
        </div>`;
        var hour=`
        <div class="time_item time_hour">
            <span class="time_item_txt">00</span>
        </div>`;
        var minute=`
        <div class="time_item time_minute">
            <span class="time_item_txt">00</span>
        </div>`;
        var second=`
        <div class="time_item time_second">
            <span class="time_item_txt">00</span>
        </div>`;
        // 倒计时
        var time_main=`
        <div class="J_chaoshi_seckill_time_main chaoshi_seckill_time_main">
            <div class="time clear_fix">${hour}${split}${minute}${split}${second}</div>
        </div>`;

        var time_tip=`
        <span class="chaoshi_seckill_time_tip">距离本场结束还有</span>`;

        var seckill_time=`
        <div class="J_chaoshi_seckill_time chaoshi_seckill_time">${time_tip}${time_main}</div>`;

        var time_tit=`
        <h3 class="chaoshi_seckill_tit">限时抢购</h3>`;
        
        return `<div class="chaoshi_seckill_hd clear_fix">${time_tit}${seckill_time}</div>`;
    }

    // 生成限时抢购的内容
    xsqg_bd_render(data){
        
        var ulHtml=data.map(ele=>{
            return `
            <li class="chaoshi_seckill_item csi"> 
                <div class="csi_pic"> 
                    <a class="csi_pic_lk" href="//chaoshi.jd.com/qianggou#4927013">
                        <img class="csi_img" src=${ele.src} data-lazy-img="done" alt=${ele.alt} title=${ele.title}>
                        <p class="csi_name">${ele.title}</p>
                    </a>
                </div>  
                <p class="csi_price clearfix">    
                    <span class="csi_price_new">${ele.priceA}</span>    
                    <del class="csi_price_origin">${ele.priceB}</del>  
                </p>
            </li> `;
        }).join("");
        var seckill_list=`<ul class="chaoshi_seckill_list clear_fix">${ulHtml}</ul>`;

        var seckill_more=`<a class="chaoshi_seckill_more" href="" target="_blank" title="宝宝辅食">
            <img src="//img14.360buyimg.com/cms/jfs/t5518/233/1826697980/14915/af601091/59152261N77dff2c1.png" alt="宝宝辅食">
        </a>`;
        return `<div class="chaoshi_seckill_bd clear_fix">${seckill_list}${seckill_more}</div>`;
    }  

    timeout(){
        var oStart = new Date(2019,11,18,11,0);
        function tool(num){
           return num<10? "0"+num:num;
        }
        
        window.onload = setInterval(function(){
            var now = new Date();
            var res = Math.abs(Date.parse(oStart) - Date.parse(now));
            var oSec = tool(parseInt(res/1000%60));
            var oMin = tool(parseInt(res/1000/60%60));
            var oHou = tool(parseInt(res/1000/60/60%24));
            $(".time_item_txt").eq(0).text(oHou);
            $(".time_item_txt").eq(1).text(oMin);
            $(".time_item_txt").eq(2).text(oSec);
        },1000) 
    }
}

var guaguale = new Vue({
    el: '#guaguale',
    data: {
        joinNum: 356,
        chanceNum:1,
        awordTxt:'未中奖',
        isStart:false,
        opt:{}
    },
    created(){
        //将转盘各参数赋值给opt  @param x  奖品个数
        let x = 8;
        this.opt = this.init(x);




    },
    methods:{
        //初始化转盘对象  awordCount：渲染页面的时候下发奖品设置的个数
        init(awordCount){
            let opt = {
                DEG:360, //圆的角度
                awordCount:awordCount, //奖品个数
                sectorCount:4, //转盘分割的扇形数量  sector:扇子 扇形
                sectorDeg:90, //单个扇形的角度
            }
            switch (awordCount){
                case 1:
                    opt.sectorCount = 4;
                    opt.sectorDeg = 90;
                    break;
                case 2:
                    opt.sectorCount = 4;
                    opt.sectorDeg = 90;
                    break;
                case 3:
                    opt.sectorCount = 6;
                    opt.sectorDeg = 60;
                    break;
                case 4:
                    opt.sectorCount = 6;
                    opt.sectorDeg = 60;
                    break;
                case 5:
                    opt.sectorCount = 8;
                    opt.sectorDeg = 45;
                    break;
                case 6:
                    opt.sectorCount = 8;
                    opt.sectorDeg = 45;
                    break;
                case 7:
                    opt.sectorCount = 10;
                    opt.sectorDeg = 36;
                    break;
                case 8:
                    opt.sectorCount = 10;
                    opt.sectorDeg = 36;
                    break;
            }
            return opt;
        },
        //设置旋转停留的角度
        setRotateDeg(currentAword){
            //初始旋转角度转3圈 + 当前奖项旋转角度
            let deg = 1080;
            switch (this.opt.awordCount){
                case 1:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(3);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                    }
                    break;
                case 2:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(3);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                    }
                    break;
                case 3:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(1);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                        case 3:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                    }
                    break;
                case 4:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(1);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                        case 3:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                        case 4:
                            deg += this.getCurrentAwordDeg(5);
                            break;
                    }
                    break;
                case 5:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(1);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(8);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                        case 3:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                        case 4:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                        case 5:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                    }
                    break;
                case 6:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(3);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(8);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                        case 3:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                        case 4:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                        case 5:
                            deg += this.getCurrentAwordDeg(7);
                            break;
                        case 6:
                            deg += this.getCurrentAwordDeg(1);
                            break;
                    }
                    break;
                case 7:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(8);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(10);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                        case 3:
                            deg += this.getCurrentAwordDeg(3);
                            break;
                        case 4:
                            deg += this.getCurrentAwordDeg(5);
                            break;
                        case 5:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                        case 6:
                            deg += this.getCurrentAwordDeg(7);
                            break;
                        case 7:
                            deg += this.getCurrentAwordDeg(9);
                            break;
                    }
                    break;
                case 8:
                    switch (currentAword){
                        case 0:
                            deg += this.getCurrentAwordDeg(4);
                            break;
                        case 1:
                            deg += this.getCurrentAwordDeg(10);
                            break;
                        case 2:
                            deg += this.getCurrentAwordDeg(2);
                            break;
                        case 3:
                            deg += this.getCurrentAwordDeg(3);
                            break;
                        case 4:
                            deg += this.getCurrentAwordDeg(5);
                            break;
                        case 5:
                            deg += this.getCurrentAwordDeg(6);
                            break;
                        case 6:
                            deg += this.getCurrentAwordDeg(7);
                            break;
                        case 7:
                            deg += this.getCurrentAwordDeg(9);
                            break;
                        case 8:
                            deg += this.getCurrentAwordDeg(1);
                            break;
                    }
                    break;
            }

            console.log('anim rotate deg:' + deg);

            //定义新的旋转动画
            let cssText = "@keyframes rotate_aword{" +
                "0%{transform:rotate(0deg);}" +
                "100%{transform:rotate(-" + deg +"deg)}" +
                "}";
            // 获取本页面的样式表
            let cssList = document.styleSheets[2];
            //删除指定位置的动画
            cssList.deleteRule(3);
            //重新添加动画
            cssList.insertRule(cssText);
        },
        //获取当前中奖位置旋转的角度
        getCurrentAwordDeg(num){
            //@param num 根据不同的转盘图，查看当前下发的中奖参数是第几块区域
            let deg = num * this.opt.sectorDeg - (this.opt.sectorDeg / 2);
            return deg;
        },
        //开始游戏
        start(){
            if(this.chanceNum == 0){
                alert('今日机会已用完~');
                return
            }
            if(this.isStart)return;
            this.isStart = true;
            //todo 请求确定用户是否中奖 下发中奖参数：12345678 or 0 （未中奖）
            let currentAword = 1;   //当前用户是否中奖
            this.setRotateDeg(currentAword);
            this.animAword = true; //开始动画
            this.chanceNum = this.chanceNum - 1; //扣除机会
            this.animOver(currentAword);
        },
        //动画结束
        animOver(currentAword){
            let that = this;
            setTimeout(function () {
                let txt = '';
                switch (currentAword){
                    case 0:
                        txt = '很遗憾，您未中奖';
                        break;
                    case 1:
                        txt = '恭喜您，中了 一等奖！';
                        break;
                    case 2:
                        txt = '恭喜您，中了 二等奖！';
                        break;
                    case 3:
                        txt = '恭喜您，中了 三等奖！';
                        break;
                    case 4:
                        txt = '恭喜您，中了 四等奖！';
                        break;
                    case 5:
                        txt = '恭喜您，中了 五等奖！';
                        break;
                    case 6:
                        txt = '恭喜您，中了 6等奖！';
                        break;
                    case 7:
                        txt = '恭喜您，中了 7等奖！';
                        break;
                    case 8:
                        txt = '恭喜您，中了 八等奖！';
                        break;
                }
                alert(txt);
                that.animAword = false;
                that.isStart = false;
            },3500);
        }
    }
});



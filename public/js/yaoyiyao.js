
var chouqian = new Vue({
    el: '#guaguale',
    data: {
        joinNum: 356,
        chanceNum:1,
        awordTxt:'未中奖',
        isStart:false,
        animStart:false,
        opt:{}
    },
    created(){

    },
    methods:{
        start(){
            this.animStart = true;
            setTimeout(function () {
                alert('恭喜你，一等奖')
            },3000)
        }
    }
});


var vm = new Vue({
	el: '#app',
	data: {
		defaultAnimataDelay: 200,
		itemClass: 'option',
		itemSortAttr: 'data-sort',
		prizeIdAttr: 'data-prize-id',
		maxAimateDelay: 500, //最慢速度
		minAimateDelay: 50, //最快速度
		changeAnimateDelay: 150, //变化延迟
		aniIndex: "",   //起始位置
		currCircle: 0, //动画圈数
		turnAroundCount: 5, //转圈总数
		prizeId: prizeId,  //中奖号
		lock: false,//是否锁定
		seqLis: [], //新的九宫格走动数组
		btnEffect: true,//点击效果
		lightEffect: true,//灯的效果
		btnClickNum: 3,//点击次数
	},
	created: function(){
		this.lightShowEffect();
		this.init();
	},
	mounted: function(){
		
	},
	watch: {},
	methods: {
		/*初始化设置*/
		init: function(){
			let _this = this;
			this.aniIndex = 0;
			this.currCircle = 0;
			this.changeAnimateDelay = 150;
			this.seqLis = [];
			let seqLisArr = document.getElementsByClassName(this.itemClass);
			//filter
			for(let i= 0;i<seqLisArr.length;i++){		
				for(let j= 0;j<seqLisArr.length;j++){
					if(seqLisArr[j].getAttribute(_this.itemSortAttr) == i+1){
						_this.seqLis.push(seqLisArr[j]);
					}
				}
			}
		},
		/*
		 动画开始
		 * ===》点击事件===》初始化===》开始动画===>动画中====》动画结束
		 * */
		start: function(){
			let _this = this;
			//是否点击
			if(_this.lock || _this.seqLis.length ==0){
				return false;
			};
			if(_this.btnClickNum > 0){
				_this.btnClickNum = _this.btnClickNum - 1;
			}else{
				alert("已经超过点击次数");
				return false;
			}
			_this.lock = true;
			_this.init();
			_this.btnClickEffect();
			setTimeout(function(){
				_this.turning();
			},_this.changeAnimateDelay);
		},
		/*动画过程*/
		turning: function(){
			let _this = this,
				_itemClassArr = this.seqLis;
				_this.aniIndex++;
				if(_this.aniIndex >= _itemClassArr.length){
					_this.aniIndex = 0;
            		_this.currCircle++;
				}
				_this.countAniDelay();
				if(_this.currCircle == _this.turnAroundCount && _itemClassArr[_this.aniIndex].getAttribute(_this.prizeIdAttr) == _this.prizeId){
					_this.turnEnd();
				}else{
					setTimeout(function(){
						_this.turning();
					},_this.changeAnimateDelay);
				}
		},
		/*计算动画延迟, 计算方法使用calcAniDelay自己定制*/
		countAniDelay: function(){
			let _this = this;
			if(_this.currCircle < Math.max(Math.floor(_this.turnAroundCount * 4 / 5), _this.turnAroundCount - 2)){
	            _this.changeAnimateDelay = Math.max(_this.changeAnimateDelay - 5, _this.minAimateDelay);
	        }else{
	            _this.changeAnimateDelay = Math.min(_this.changeAnimateDelay + _this.aniIndex * 5 * 3, _this.maxAimateDelay);
	        }
		},
		/*动画最终*/
		turnEnd: function(){
			this.lock = false;
			console.log("恭喜获得"+this.prizeId+"等奖");
		},
		/*点击效果*/
		btnClickEffect: function(){
			let _this = this;
			this.btnEffect = false;
			setTimeout(function(){
				_this.btnEffect = true;
			},100);
		},
		/*灯的效果*/
		lightShowEffect: function(){
			let _this = this;
			setInterval(function(){
				_this.lightEffect = !_this.lightEffect;
			},1000);
		}
	},
})
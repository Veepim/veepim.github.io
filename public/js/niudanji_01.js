new Vue({
	el: "#app",
	data: {
		radius: 0, // 圆半径
		frameTick: 15, // 帧间隔
		runBallOver: false,
		isOut: false,
		isLight: false,
		isSplit: false,
		data: [{
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball1-20180627.png",
			"translateXPos": 50,
			"translateYPos": 82,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball2-20180627.png",
			"translateXPos": 90,
			"translateYPos": 64,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball3-20180627.png",
			"translateXPos": 200,
			"translateYPos": 82,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball4-20180627.png",
			"translateXPos": -47,
			"translateYPos": 38,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball5-20180627.png",
			"translateXPos": -200,
			"translateYPos": 90,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball6-20180627.png",
			"translateXPos": 35,
			"translateYPos": 52,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball7-20180627.png",
			"translateXPos": 183,
			"translateYPos": 96,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball8-20180627.png",
			"translateXPos": -200,
			"translateYPos": 82,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball9-20180627.png",
			"translateXPos": -140,
			"translateYPos": 40,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball10-20180627.png",
			"translateXPos": 115,
			"translateYPos": 92,
			"rotate": "36deg"
		}, {
			"imgUrl": "../public/image/niudanji_01/eggBeater-ball11-20180627.png",
			"translateXPos": -112,
			"translateYPos": 91,
			"rotate": "36deg"
		}]
	},
	mounted() {

		this.data.forEach(ball => {
			// 初始化角度、速度、坐标参数
			ball.angle = -Math.random() * (Math.PI - 1) - 0.5,
				ball.speed = -Math.random() * 100 + 800,
				ball.x = ball.translateXPos,
				ball.y = ball.translateYPos,

				this.$set(ball, 'style', {
					transform: `translate( ${ball.translateXPos}%, ${ball.translateYPos}%)`,
				});
		});

	},
	methods: {

		runBall() {
			this.isSplit = false;
			if(this.runBallOver == false) {
				this.data.forEach(ball => {
					// 重置角度、速度、坐标参数
					ball.angle = -Math.random() * (Math.PI - 1) - 0.5,
						ball.speed = -Math.random() * 100 + 800,
						ball.x = ball.translateXPos,
						ball.y = ball.translateYPos,

						this.$set(ball, 'style', {
							transform: `translate( ${ball.translateXPos}%, ${ball.translateYPos}%)`,
						});
				});
				this.runBallOver = true;
				let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				this.radius = w * 0.84 * 0.646 * 0.5 - 20; //半径
				let frameCount = 200; //50次
				let idxTimer = setInterval(() => {
					this.data.forEach(ball => {

						let tempStyle = ball.style;

						let dis = ball.speed * (this.frameTick / 1000.0); //50毫秒走的距离
						if(Math.sqrt(ball.x * ball.x + ball.y * ball.y) >= this.radius) {
							ball.angle = ball.angle + Math.PI - 0.5;
							dis *= 2;

						}
						ball.x = ball.x + dis * Math.cos(ball.angle);
						ball.y = ball.y + dis * Math.sin(ball.angle);

						// 位移
						tempStyle.transform = `translate( ${ball.x}%, ${ball.y}%)`
						this.$set(ball, 'style', tempStyle);

						// 控制速度（先加速后减速）
						ball.speed += frameCount > 0 ? 8 : -5;
					});

					if(frameCount-- < -50) this.finishBall(idxTimer);

				}, this.frameTick); //每间隔50毫秒移动一次
			}

		},
		finishBall(idx) {
			clearInterval(idx);

			let frameCount = 100;
			let idxTimer = setInterval(() => {
				this.data.forEach(ball => {

					let tempStyle = ball.style;
					let dis = 80 * (frameCount / 5.0) * (this.frameTick / 1000);
					ball.angle = this.getAngleBetweenPoint(ball.x, ball.translateXPos, ball.y, ball.translateYPos);

					if(this.getDistanceBetweenPoint(ball.x, ball.translateXPos, ball.y, ball.translateYPos) < 10) {
						return;
					}

					ball.x = ball.x + dis * Math.cos(ball.angle);
					ball.y = ball.y + dis * Math.sin(ball.angle);

					tempStyle.transform = `translate( ${ball.x}%, ${ball.y}%)`

					this.$set(ball, 'style', tempStyle)
				});

				if(frameCount-- < 0) clearInterval(idxTimer);
			}, this.frameTick);
			this.runBallOver = false;
			setTimeout(this.ballOut, 200);
		},
		ballOut() {
			this.isOut = true;
			setTimeout(this.ballOutLight, 1);
		},
		ballOutLight() {
			this.isLight = true;
			setTimeout(this.ballSplit, 1500);
		},
		ballSplit() {
			this.isOut = false;
			this.isSplit = true;
			this.runBallOver = false;
			setTimeout(this.lottryEvent, 500)
		},
		lottryEvent() {
			alert("中奖了！");
			this.isSplit = false;
		},
		// 计算两点之间距离
		getDistanceBetweenPoint(x1, x2, y1, y2) {
			let dx = x2 - x1;
			let dy = y2 - y1;
			return Math.sqrt(dx * dx + dy * dy);
		},
		// 计算两点之间角度
		getAngleBetweenPoint(x1, x2, y1, y2) {
			return Math.atan2(y2 - y1, x2 - x1);
		}
	}
});
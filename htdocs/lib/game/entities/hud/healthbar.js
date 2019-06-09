ig.module(
	"game.entities.hud.healthbar"
)
.requires(
	"impact.entity"
)
.defines(function () {
	EntityHealthbar = EntityHUD.extend({
	
		animSheet: new ig.AnimationSheet("media/entities/ui.png", 21, 21),
		cooldownTimer: new ig.Timer(),
		active: true,
		size: { x: 125, y: 21 },
		pos: { x: 16, y: 16 },
		offset: {x: -12, y: -12},
		zIndex: 10,
			
		init: function (x, y, settings) {
			this.parent(this.pos.x, this.pos.y, settings);
			this.addAnim("active", 0.25, [0, 0, 0, 0]);
			this.addAnim("warning", 1, [1]);
			this.addAnim("critical", 1, [2]);
		},
		
		update: function () {
			if (!this.active && this.cooldownTimer.delta() >= 0) {
				this.active = true;
				this.currentAnim = this.anims.active.rewind();
			}
			
			var percentage = ((ig.game.getPlayer().health / ig.game.getPlayer().maxHealth) * 100);
			
			if (percentage > 50) {
				this.currentAnim = this.anims.active.rewind();
			} else if (percentage > 25) {
				this.currentAnim = this.anims.warning.rewind();
			} else {
				this.currentAnim = this.anims.critical.rewind();
			}
			
			this.parent();
		},
		
		draw: function() {

			var current = ig.game.getPlayer().health;
			var max = ig.game.getPlayer().maxHealth;
			
			var bar = { 
				width: max*2+24,
				height: 24,
				fill: (current*2)+24, 
				x: this.pos.x+16, 
				y: this.pos.y,
				radius: 4
			};
			
			//White Container
			ig.system.context.fillStyle = "rgb(0,0,0)";
			ig.system.context.strokeStyle = "rgb(255,255,255)";
			ig.system.context.lineWidth = 2;
			ig.system.context.beginPath();
			ig.system.context.moveTo((bar.x-2)+ bar.radius,(bar.y-2));
			ig.system.context.lineTo((bar.x-2)+ (bar.width+4) - bar.radius,(bar.y-2));
			ig.system.context.quadraticCurveTo((bar.x-2)+ (bar.width+4),(bar.y-2), (bar.x-2)+ (bar.width+4),(bar.y-2) + bar.radius);
			ig.system.context.lineTo((bar.x-2)+ (bar.width+4),(bar.y-2) + (bar.height+4) - bar.radius);
			ig.system.context.quadraticCurveTo((bar.x-2)+ (bar.width+4),(bar.y-2) + (bar.height+4), (bar.x-2)+ (bar.width+4) - bar.radius,(bar.y-2) + (bar.height+4));
			ig.system.context.lineTo((bar.x-2)+ bar.radius,(bar.y-2) + (bar.height+4));
			ig.system.context.quadraticCurveTo((bar.x-2),(bar.y-2) + (bar.height+4), (bar.x-2),(bar.y-2) + (bar.height+4) - bar.radius);
			ig.system.context.lineTo((bar.x-2),(bar.y-2) + bar.radius);
			ig.system.context.quadraticCurveTo((bar.x-2),(bar.y-2), (bar.x-2)+ bar.radius,(bar.y-2));
			
			ig.system.context.closePath();
			ig.system.context.fill();
			ig.system.context.stroke();        

			//Green bars
			ig.system.context.globalAlpha = 0.5;
			
			ig.system.context.fillStyle = this.getBarColor(max,current);
			ig.system.context.beginPath();
			ig.system.context.rect(bar.x, bar.y, bar.fill, bar.height);
			ig.system.context.closePath();
			ig.system.context.fill();
			
			ig.system.context.beginPath();
			ig.system.context.rect(bar.x, bar.y + bar.height / 10, bar.fill, bar.height * 4/5);
			ig.system.context.closePath();
			ig.system.context.fill();

			ig.system.context.beginPath();
			ig.system.context.rect(bar.x, bar.y + bar.height * 3/10, bar.fill, bar.height *2/ 5);
			ig.system.context.closePath();
			ig.system.context.fill();

			ig.system.context.globalAlpha = 1;

			//heart
			this.currentAnim.draw(this.pos.x+this.offset.x, this.pos.y+this.offset.y);
			
			//this.parent();
		},
		
		getBarColor: function (max, current) {

			var percentage = ((current / max) * 100);

			if (percentage > 50) {
				return "rgb(98, 187, 70)";
			} else if (percentage > 25) {
				return "rgb(246, 139, 31)";
			} else {
				return "rgb(238, 28, 36)";
			}

		},
		onClick: function() {
			//console.log('click');
		}
	});
	
});




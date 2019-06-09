ig.module(
	"game.entities.hud.goldcount"
)
.requires(
	"impact.entity"
)
.defines(function () {
	EntityGoldCount = EntityHUD.extend({
	
		animSheet: new ig.AnimationSheet("media/entities/powerups.png", 16, 16),
		cooldownTimer: new ig.Timer(),
		active: true,
		size: {x: 16, y: 16},
		pos: { x: 0, y: 4 },
		offset: {x: -8, y: 0},
		zIndex: 10,
			
		init: function (x, y, settings) {
			this.pos.x = ig.system.width-this.pos.x;
			this.parent(this.pos.x, this.pos.y, settings);
			this.addAnim("active", 1, [27]);
		},
		
		update: function () {
			if (!this.active && this.cooldownTimer.delta() >= 0) {
				this.active = true;
				this.currentAnim = this.anims.active.rewind();
			}
		},
		
		draw: function() {

			var text = ig.game.getPlayer().gold;
			//White Container
			var font = new ig.Font( 'media/fonts/font.png' );
			font.draw( text, this.pos.x+this.offset.x, this.pos.y, ig.Font.ALIGN.RIGHT );
			
			//coin
			var textWidth = 1;
			if (text > 1) {
				textWidth = 1+Math.floor(Math.log(text)/Math.log(10));
			}

			this.currentAnim.draw(this.pos.x+this.offset.x-(textWidth*8)-18, this.pos.y+1);
			
			//this.parent();
		}
	});
	
});




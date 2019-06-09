ig.module(
	"game.entities.abstract.hud"
)
.requires(
	"impact.entity"
)
.defines(function () {

/*
	Heads Up Display Elements that do not interact with world entities
		- Healthbar
		- Gold Count
		- Weapon/Armor management
		- Inventory
*/
EntityHUD = ig.Entity.extend({

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	size: {x: 16, y: 16}, // Default size.  Override whenever.
	zIndex: -1,
	//clickTimer: new ig.Timer(),
	
	init: function(x,y,settings) {
		//this.clickTimer.set(0.125);
		this.parent(x,y,settings);
	},
	
	affect: function (other) {
		// Affect the player somehow
	},
	
	onClick: function () {
		//do something
	},
	
	update: function(){
		//console.log(this.clickTimer.delta());
		//var reticle = ig.game.getEntitiesByType(EntityReticle)[0];
		/*
		if(this.inFocus()) {
			ig.system.canvas.style.cursor = 'pointer';
			reticle.hide();
			if(this.clickTimer.delta() >= 0) {
				if (ig.input.pressed('shoot')) {
					this.onClick();
					this.clickTimer.set(0.125);
				}
			}
		}
		else {
			reticle.show();
			ig.system.canvas.style.cursor = 'default';
		}
		*/
		this.parent();
	},
	
	inFocus: function() {
		/*
		return (
			
			(this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
			((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
			(this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
			((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
		);
		*/
	},

});

});

ig.module(
	"game.entities.hud.weaponslot"
)
.requires(
	"impact.entity"
)
.defines(function () {
	EntityWeaponSlot = EntityHUD.extend({
	
		animSheet: new ig.AnimationSheet("media/entities/weapons.png", 16, 16),
		cooldownTimer: new ig.Timer(),
		active: true,
        size: { x: 16, y: 16 },
		pos: { x: 0, y: 0 },
		offset: {x: 4, y: 4},
		zIndex: 10,
        placement: { x: 0, y: 0},
			
		init: function (x, y, settings) {
                    
			this.placement.x = this.placement.x+this.offset.x;
			this.placement.y = ig.system.height-this.size.y-this.offset.y;
			this.parent(this.placement.x, this.placement.y, settings);
			
			this.currentWeaponType = ig.game.getPlayer().weapons[ig.game.getPlayer().currentWeapon].type;
			
			//Get the animation frame from the weapon
			this.getAnimationFrame(this.currentWeaponType);
                        
		},
		
		// Load the image from the current weapon entity animation (maybe a better way to do this?)
		getAnimationFrame: function( type ){
			var w = ig.game.spawnEntity( type );
			this.currentAnim = this.addAnim('idle', 1, [w.anims.idle.sequence[0]]);
			w.kill();
		},
		
		update: function () {
                    
			this.pos.x = ig.game.screen.x+this.placement.x;
			this.pos.y = ig.game.screen.y+this.placement.y;
			
			var type = ig.game.getPlayer().weapons[ig.game.getPlayer().currentWeapon].type;
			
			if(this.currentWeaponType!=type) {
				this.getAnimationFrame(type);
				this.currentWeaponType = type;
			}
			
			this.parent();
		},
		
		draw: function() {

			var count = ig.game.getPlayer().weapons[ig.game.getPlayer().currentWeapon].count;
			//White Container
			if(count>0) {
				var font = new ig.Font( 'media/fonts/font.png' );
				font.draw( count, this.placement.x+this.size.x+1, this.placement.y-1, ig.Font.ALIGN.LEFT);
			}

			this.currentAnim.draw(this.placement.x, this.placement.y);
			
			//this.parent();
		},
                
		onClick: function() {
			ig.game.getPlayer().toggleWeapon();    
		}
	});
	
});




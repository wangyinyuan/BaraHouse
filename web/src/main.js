import conf from './constants';
import { k } from './kaboomCtx';

// load sprites
k.loadSprite("spritesheet", "/spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": {
      from: 936,
      to: 939,
      loop: true,
      speed: conf.playerSpeed,
    },
    "idle-side": 975,
    "walk-side": {
      from: 975,
      to: 978,
      loop: true,
      speed: conf.playerSpeed,
    },
    "idle-up": 1014,
    "walk-up": {
      from: 1014,
      to: 1017,
      loop: true,
      speed: conf.playerSpeed,
    }
  }
});

// load map
k.loadSprite("map", "/map.png");
k.setBackground(k.Color.fromHex("#311047"));
 
k.scene("main", async () => {
  const mapData = await fetch("/map.json").then((res) => res.json());
  console.log(mapData);
})

k.go("main");
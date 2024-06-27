import conf from "./constants";
import { k } from "./kaboomCtx";

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
    },
  },
});

// load map
k.loadSprite("map", "/map.png");
k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  const mapData = await fetch("/map.json").then((res) => res.json());
  const layers = mapData.layers;

  const map = k.make([k.sprite("map"), k.pos(0), k.scale(conf.scaleFactor)]);

  const player = k.make([
    k.sprite("spritesheet", {
      anim: "idle-down",
    }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(conf.scaleFactor), {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            // TODO: 创建对话框
          })
        }
      }
    }
  }
});

k.go("main");

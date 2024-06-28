import conf from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue } from "./utils";

const testText =
  "A pixel art cyberpunk-style capybara is sitting in front of a large computer screen, coding. The capybara is facing away from the screen, with its back to the viewer. The screen is prominently displayed in the image, showing lines of code. The capybara has neon-colored fur with blue and purple highlights, glowing cybernetic enhancements, and wears futuristic goggles. The background features a high-tech room with holographic displays and neon lights. The overall atmosphere is dark with vibrant, glowing elements, giving it a distinctive cyberpunk vibe.";

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

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(conf.scaleFactor)]);

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
    k.scale(conf.scaleFactor),
    {
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
            console.log("Creating dialogue...");
            displayDialogue(
              testText,
              () => (player.isInDialogue = false)
            );
          });
        }
      }

      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * conf.scaleFactor,
            (map.pos.y + entity.y) * conf.scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  // player movement
  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);
  });
});

k.go("main");

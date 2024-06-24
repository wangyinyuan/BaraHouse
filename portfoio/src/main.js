import startGame from "kaplay"

const k = startGame()

// 加载场景资源
k.loadSprite("bean", "sprites/bean.png")


k.add([
	k.pos(120, 80),
	k.sprite("bean"),
])

k.onClick(() => k.addKaboom(k.mousePos()))
async function trun(modData) {
  if (!this.animatedSprite || !modData.switchAnimation) return
  const animatedSprite = this.animatedSprite
  let frameKey = { k: 0 }
  const upAnimated = () => {
    animatedSprite.gotoAndStop(Math.round(frameKey.k) % animatedSprite.totalFrames);
  }

  const animatedTicker = new PIXI.ticker.Ticker()
  animatedTicker.start();
  animatedTicker.add(upAnimated)

  await new Promise((resolve, reject) => {
    try {
      TweenLite.to(frameKey, modData.duration / 1000,
        {
          k: animatedSprite.totalFrames * modData.turnsNumber, ease: Power2.easeOut, onComplete: () => {
            resolve(true);
          }
        });
    } catch (error) {
      reject(error)
    }
  }
  )

  animatedTicker.remove(upAnimated);

  animatedTicker.stop();

  animatedSprite.gotoAndStop(0);
  if (modData.autoPlay) {

    animatedSprite.play()
  }
}
function loaderAnim(p) {
  const PIXI = this.PIXI
  const { url, preSp, success, first = true, resolve, reject } = p
  let spritesheets = []
  if (preSp) {
    spritesheets = preSp
  }
  my.downloadFile({
    url: url
  }).then(
    (result) => {
      let fileSystemManager = my.getFileSystemManager()
      fileSystemManager.readFile({
        filePath: result.apFilePath,
        encoding: 'utf-8',
        success: async (result) => {
          const data = JSON.parse(result.data)

          let relUrl = url.substring(0, url.lastIndexOf("/") + 1);

          const baseTexture = PIXI.BaseTexture.from(relUrl + data.meta.image)

          const spritesheet = new PIXI.Spritesheet(baseTexture, data);

          spritesheets.push(spritesheet)

          if (data.meta.related_multi_packs && first) {
            for (let index = 0; index < data.meta.related_multi_packs.length; index++) {
              try {
                await new Promise(
                  (resolve, reject) => {
                    loaderAnim({ url: relUrl + data.meta.related_multi_packs[index], preSp: spritesheets, first: false, resolve, reject })
                  }
                )
              } catch (error) {
                console.log(error)
                return
              }

            }
          }
          if (!first) {
            resolve && resolve(true); return;
          }

          let sprite = []
          for (let index = 0; index < spritesheets.length; index++) {
            spritesheets[index].parse((e) => {
              for (let k in e) {
                sprite.push(e[k])
              }
            })
          }
          success(sprite)
        },
      })
    }
  ).catch((error) => { reject(error) })
}
/**
 * 生成一个3D可旋转模型
 * @param canvas {obj} canvas 对象
 * @param modData {obj} 3D模型数据
 * */
async function solidAniRotatePixi(application, loader, PIXI, modData) {
  console.log(333333333333333)
  console.log(application, loader, modData)
  const animatedContainer = new PIXI.Container()
  application.stage.addChild(animatedContainer)
  console.log(4444444444444)
  animatedContainer.hitArea = new PIXI.Rectangle(0, 0, modData.range.width, modData.range.height);
  // animatedContainer.x = modData.range.left;
  // animatedContainer.y = modData.range.top;
  animatedContainer.interactive = true;
  const loading = new PIXI.Sprite(loader.resources[modData.loadingImg.url] ? loader.resources[modData.loadingImg.url].texture : null);
  animatedContainer.addChild(loading);
  loading.pivot.set(animatedContainer.width / 2, animatedContainer.height / 2)
  loading.x = modData.range.width / 2
  loading.y = modData.range.height / 2
  loaderAnim({
    url: modData.url, success: async (sprite) => {
      loading.destroy()
      const animatedSprite = new PIXI.extras.AnimatedSprite(sprite);
      this.animatedSprite = animatedSprite;
      animatedContainer.addChild(animatedSprite)
      animatedSprite.animationSpeed = modData.animationSpeed / 100
      const animatedSize = animatedSprite.getBounds();
      animatedSprite.pivot = new PIXI.Point(animatedSize.width / 2, animatedSize.height / 2)
      animatedSprite.x = modData.range.width / 2
      animatedSprite.y = modData.range.height / 2
      animatedSprite.scale.set(modData.scale, modData.scale)
      await trun(modData);

      if (modData.tipImg.image.url) {
        const tipImage = new PIXI.Sprite(loader.resources[modData.tipImg.image.url].texture);
        animatedContainer.addChild(tipImage);
        tipImage.x = modData.tipImg.range.left
        tipImage.y = modData.tipImg.range.top
        TweenLite.to(tipImage, 0.6,
          {
            alpha: 0, onComplete: () => {
              tipImage.destroy({ children: true });
            },
            delay: modData.tipImg.showTime / 1000
          });
      }
      let startframeKey
      let tstartX
      let moveframeKey
      animatedContainer.on('touchmove', (e) => {
        const distance = e.data.global.x - tstartX
        if (isNaN(distance)) return

        moveframeKey = startframeKey - Math.floor(distance / 10)
        if (moveframeKey >= 0) {
          moveframeKey = moveframeKey % animatedSprite.totalFrames
        } else {
          moveframeKey = animatedSprite.totalFrames + (moveframeKey + 1) % animatedSprite.totalFrames - 1
        }
        if (moveframeKey != animatedSprite.currentFrame)
          animatedSprite.gotoAndStop(moveframeKey)
      })
      animatedContainer.on('touchstart', (e) => {
        animatedSprite.stop();
        startframeKey = animatedSprite.currentFrame
        tstartX = e.data.global.x
      })
    }
  })
}


export {
  solidAniRotatePixi
}
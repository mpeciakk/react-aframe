import "aframe"
import AFRAME from "aframe"
import {
  Scene,
  Camera,
  Entity,
  Assets,
  VideoSphere,
  Sphere,
  Cylinder,
} from '@belivvr/aframe-react'
import play from "./assets/play.png"
import pause from "./assets/pause.png"
import arrow from "./assets/arrow.png"
import { useLayoutEffect } from "react"

let i = 0
const videos = [{id: "vr2", url: "https://fs.peciak.xyz/vr2.mp4"}, { id: "vr1", url: "https://fs.peciak.xyz/vr1.mp4"}, {id: "pano", url: "https://fs.peciak.xyz/pano.mp4"}]
let currentVideo = videos[i]

const pauseAllVideosExceptCurrent = () => {
  for (const video of videos) {
    if (video !== currentVideo) {
      const videoElement = document.getElementById(video.id) as HTMLVideoElement
      videoElement.pause()
    }
  }
}

const updateVideo = () => {
  currentVideo = videos[i]

  document.getElementById("videosphere")?.setAttribute("src", `#${currentVideo.id}`)
}

const nextVideo = () => {
  i++

  if (i == videos.length) {
    i = 0
  }

  updateVideo()
  pauseAllVideosExceptCurrent()
}

const prevVideo = () => {
  i--

  if (i === -1) {
    i = videos.length - 1
  }

  updateVideo()
  pauseAllVideosExceptCurrent()
}

function App() {
  const mountComponents = () => {
    if (AFRAME.components["click"]) delete AFRAME.components.click

    AFRAME.registerComponent("click", {
      schema: {
        cmd: { default: "default" }
      },
      init() {
        const { cmd } = this.data

        this.el.addEventListener("click", () => {
          if (cmd === "play") {
            const videoElement = document.getElementById(currentVideo.id) as HTMLVideoElement
            videoElement.play()
          }

          if (cmd === "pause") {
            const videoElement = document.getElementById(currentVideo.id) as HTMLVideoElement
            videoElement.pause()
          }

          if (cmd === "next") {
            nextVideo()
          }

          if (cmd === "prev") {
            prevVideo()
          }
        })
      }
    })
  }

  useLayoutEffect(() => {
    mountComponents()
  })

  return (
    <div>
      <Scene>
        <Assets>
          <img id="play" src={play} />
          <img id="pause" src={pause} />
          <img id="arrow" src={arrow} />
          {
            videos.map((v, i) => {
              return <video key={i} id={v.id} src={v.url} loop />
            })
          }
        </Assets>

        <Entity
          primitive
          geometry={{ primitive: "plane", height: 0.5, width: 0.5 }}
          material={{ shader: "flat", src: "#arrow", transparent: true }}
          position={{ x: 1, y: 0, z: -3 }}
          rotation={{ x: -30, y: 0, z: 0 }}
          click={{ cmd: "prev" }}
          data-clickable
        />

        <Entity
          geometry={{ primitive: "plane", height: 0.5, width: 0.5 }}
          material={{ shader: "flat", src: "#play", transparent: true }}
          position={{ x: 0.35, y: 0, z: -3 }}
          rotation={{ x: -30, y: 0, z: 0 }}
          click={{ cmd: "play" }}
          data-clickable
        />

        <Entity
          geometry={{ primitive: "plane", height: 0.5, width: 0.5 }}
          material={{ shader: "flat", src: "#pause", transparent: true }}
          position={{ x: -0.35, y: 0, z: -3 }}
          rotation={{ x: -30, y: 0, z: 0 }}
          click={{ cmd: "pause" }}
          data-clickable
        />

        <Entity
          geometry={{ primitive: "plane", height: 0.5, width: 0.5 }}
          material={{ shader: "flat", src: "#arrow", transparent: true }}
          position={{ x: -1, y: 0, z: -3 }}
          rotation={{ x: -30, y: 0, z: 180 }}
          click={{ cmd: "next" }}
          data-clickable
        />

        <Cylinder
          position={{ x: 0, y: -0.3, z: -3.5 }}
          rotation={{ x: 0, y: 0, z: 90 }}
          height={3}
          radius={0.5}
        />

        <Sphere
          radius={0.5}
          position={{ x: 1.5, y: -0.3, z: -3.5 }}
        />

        <Sphere
          radius={0.5}
          position={{ x: -1.5, y: -0.3, z: -3.5 }}
        />

        <Camera>
          <Entity
            position={{ x: 0, y: 0, z: -1 }}
            geometry={{ primitive: "ring", radiusInner: 0.02, radiusOuter: 0.03 }}
            material={{ color: "red", shader: "flat" }}
            cursor={{ fuse: true }}
            animation__click={{ property: "scale", startEvents: ["click"], easing: "easeInCubic", dur: 150, from: "0.1 0.1 0.1", to: "1 1 1" }}
            animation__fusing={{ property: "scale", startEvents: ["fusing"], easing: "easeInCubic", dur: 1500, from: "1 1 1", to: "0.1 0.1 0.1" }}
            animation__mouseleave={{ property: "scale", startEvents: ["mouseleave"], easing: "easeInCubic", dur: 500, to: "1 1 1" }}
            raycaster={{ objects: "[data-clickable]" }}
          />
        </Camera>

        <VideoSphere id="videosphere" src={`#${currentVideo.id}`} />
      </Scene>
    </div>
  )
}

export default App

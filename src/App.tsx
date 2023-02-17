import "aframe"
import AFRAME from "aframe"
import {
  Scene,
  Box,
  Camera,
  Entity,
  Assets,
  VideoSphere
} from '@belivvr/aframe-react'
import pano from "./assets/pano.mp4"
import play from "./assets/play.png"
import pause from "./assets/pause.png"
import { useState } from "react"

AFRAME.registerComponent("click", {
  schema: {
    cmd: { default: "default" }
  },
  init() {
    const { cmd } = this.data

    this.el.addEventListener("click", () => {
      const video = document.getElementById("pano") as HTMLVideoElement

      if (cmd === "play") {
        video.play()
      }

      if (cmd === "stop") {
        video.pause()
      }
    })
  }
})


function App() {
  const [url, setUrl] = useState<string>(`${pano}#t=0.1`)

  return (
    <div>
      <Scene>
        <Assets>
          <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          <img id="play" src={play} />
          <img id="pause" src={pause} />
          <video id="pano" src={url} loop />
        </Assets>

        <Entity
          geometry={{ primitive: "plane", height: 1, width: 1 }}
          material={{ shader: "flat", src: "#pause", transparent: true }}
          position={{ x: 0.75, y: 0, z: -3 }}
          rotation={{ x: -30, y: 0, z: 0 }}
          click={{ cmd: "stop" }}
          data-clickable
        />


        <Entity
          geometry={{ primitive: "plane", height: 1, width: 1 }}
          material={{ shader: "flat", src: "#play", transparent: true }}
          position={{ x: -0.75, y: 0, z: -3 }}
          rotation={{ x: -30, y: 0, z: 0 }}
          click={{ cmd: "play" }}
          data-clickable
        />

        <Box
          position={{ x: 0, y: -0.3, z: -3.5 }}
          rotation={{ x: -30, y: 0, z: 0 }}
          geometry={{ width: 3, height: 1 }}
          color="#4CC3D9"
        />

        <Box
          position={{ x: -1.7, y: -0.95, z: -3.5 }}
          rotation={{ x: -30, y: 0, z: 60 }}
          geometry={{ width: 2, height: 1 }}
          color="#4CC3D9"
        />

        <Box
          position={{ x: 1.7, y: -0.95, z: -3.5 }}
          rotation={{ x: -30, y: 0, z: -60 }}
          geometry={{ width: 2, height: 1 }}
          color="#4CC3D9"
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

        <VideoSphere src="#pano" />
      </Scene>
    </div>
  )
}

export default App

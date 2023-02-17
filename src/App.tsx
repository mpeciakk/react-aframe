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

AFRAME.registerComponent("click", {
  schema: {
    cmd: { default: "default" }
  },
  init() {
    const { cmd } = this.data

    this.el.addEventListener("click", () => {
      if (cmd === "play") {
        document.getElementById("pano").play()
      }

      if (cmd === "stop") {
        document.getElementById("pano").pause()
      }
    })
  }
})


function App() {
  return (
    <div>
      <Scene>
        <Assets>
          <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          <video id="pano" src={`${pano}#t=0.1`} loop />
        </Assets>

        <Box
          position={{ x: 1, y: 0, z: -3 }}
          rotation={{ x: 0, y: 0, z: 0 }}
          color="#4CC3D9"
          click={{ cmd: "stop" }}
          data-clickable
        />

        <Box
          position={{ x: -1, y: 0, z: -3 }}
          rotation={{ x: 0, y: 0, z: 0 }}
          color="#4CC3D9"
          click={{ cmd: "play" }}
          data-clickable
        />

        <Camera>
          <Entity
            position={{ x: 0, y: 0, z: -1 }}
            geometry={{ primitive: "ring", radiusInner: 0.02, radiusOuter: 0.03 }}
            material={{ color: "black", shader: "flat" }}
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

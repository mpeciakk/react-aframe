import "aframe"
import AFRAME from "aframe"
import {
  Scene,
  Camera,
  Entity,
  Assets,
  VideoSphere,
  Sphere,
  Cylinder
} from '@belivvr/aframe-react'
import pano from "./assets/pano.mp4"
import play from "./assets/play.png"
import pause from "./assets/pause.png"
import arrow from "./assets/arrow.png"
import { useEffect, useState, useRef } from "react"

function App() {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [url, setUrl] = useState<string>(`${pano}#t=0.1`)

  useEffect(() => {
    if (AFRAME.components["click"] != null) return

    AFRAME.registerComponent("click", {
      schema: {
        cmd: { default: "default" }
      },
      init() {
        const { cmd } = this.data

        this.el.addEventListener("click", () => {
          if (cmd === "play") {
            ref.current!.play()
          }

          if (cmd === "pause") {
            ref.current!.pause()
          }
        })
      }
    })
  })

  return (
    <div>
      <Scene>
        <Assets>
          <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
          <img id="play" src={play} />
          <img id="pause" src={pause} />
          <img id="arrow" src={arrow} />
          <video id="pano" src={url} ref={ref} loop />
        </Assets>

        <Entity
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

        <VideoSphere src="#pano" />
      </Scene>
    </div>
  )
}

export default App

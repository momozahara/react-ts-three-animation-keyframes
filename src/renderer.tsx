import React, { useEffect } from "react";

import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function ThreeRenderer() {
  useEffect(() => {
    let mixer: THREE.AnimationMixer;

    const clock = new THREE.Clock();
    const container = document.getElementById("container");

    const stats = Stats();
    stats.dom.id = "stats";
    container?.append(stats.dom);

    const renderer = new THREE.WebGL1Renderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container?.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / (window.innerHeight / 2),
      1,
      100
    );
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      "/LittlestTokyo.glb",
      function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    window.onresize = function () {
      camera.aspect = window.innerWidth / (window.innerHeight / 2);
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight / 2);
    };

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      stats.update();

      renderer.render(scene, camera);
    }
  }, []);

  return <></>;
}

export default ThreeRenderer;

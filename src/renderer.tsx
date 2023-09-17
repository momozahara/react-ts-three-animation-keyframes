import React, { useEffect, useRef } from "react";

import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

interface RendererProps {
  statsHidden?: boolean;
  controlsPan?: boolean;
  controlsDamping?: boolean;
  controlsZoom?: boolean;
}

function ThreeRenderer(props: RendererProps) {
  const statsRef = useRef<Stats>();
  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    const domHeightDivisor = 1;

    const mixer: THREE.AnimationMixer[] = [];

    const clock = new THREE.Clock();
    const container = document.getElementById("container");

    const stats = Stats();
    stats.dom.id = "stats";
    container?.append(stats.dom);

    statsRef.current = stats;

    const renderer = new THREE.WebGL1Renderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight / domHeightDivisor);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container?.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / (window.innerHeight / domHeightDivisor),
      1,
      100,
    );
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.enablePan = props.controlsPan ?? false;
    controls.enableDamping = props.controlsDamping ?? true;
    controls.enableZoom = props.controlsZoom ?? false;

    controlsRef.current = controls;

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

        const _mixer = new THREE.AnimationMixer(model);
        _mixer.clipAction(gltf.animations[0]).play();

        mixer.push(_mixer);
      },
      undefined,
      function (e) {
        console.error(e);
      },
    );
    loader.load(
      "/LittlestTokyo.glb",
      function (gltf) {
        const model = gltf.scene;
        model.position.set(3.5, -0.8, 2);
        model.scale.set(0.001, 0.001, 0.001);
        scene.add(model);

        const _mixer = new THREE.AnimationMixer(model);
        _mixer.clipAction(gltf.animations[0]).play();

        mixer.push(_mixer);
      },
      undefined,
      function (e) {
        console.error(e);
      },
    );

    window.onresize = function () {
      camera.aspect =
        window.innerWidth / (window.innerHeight / domHeightDivisor);
      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight / domHeightDivisor,
      );
    };

    animate();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.forEach((_mixer) => {
        _mixer.update(delta);
      });

      controls.update();

      stats.update();

      renderer.render(scene, camera);
    }
  }, []);

  useEffect(() => {
    if (statsRef?.current) {
      if (props.statsHidden !== undefined) {
        statsRef.current.dom.hidden = props.statsHidden;
      }
    }

    if (controlsRef?.current) {
      if (props.controlsDamping !== undefined) {
        controlsRef.current.enableDamping = props.controlsDamping;
      }
      if (props.controlsPan !== undefined) {
        controlsRef.current.enablePan = props.controlsPan;
      }
      if (props.controlsZoom !== undefined) {
        controlsRef.current.enableZoom = props.controlsZoom;
      }
    }
  }, [
    props.statsHidden,
    props.controlsDamping,
    props.controlsPan,
    props.controlsZoom,
  ]);

  return <></>;
}

export default ThreeRenderer;

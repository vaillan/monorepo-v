/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GlobeDataMin from "apps/webgl/src/assets/globe-data-min.json";
import GeoJson from 'apps/webgl/src/assets/custom.geo.json';
import createGlobe from 'cobe';
// import * as THREE from 'three';
const THREE = require('three');
@Component({
  selector: 'monorepo-v-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  canvas: any = null;
  phi = 0;


  ngOnInit(): void {
    //this.initGlobe();
    this.canvas = document.getElementById('cobe');
    const globe = createGlobe(this.canvas, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.5, 1],
      glowColor: [1, 1, 1],
      offset: [0, 0],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state: any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = this.phi
        this.phi += 0.01
      },
    })
  }

  initGlobe(): void {
    const bgColor = 0xf0f1f2;
    const content: any = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    content.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    //SETUP lights
    let light1 = new THREE.PointLight(0x5a54ff, 0.75);
    light1.position.set(-150, 150, -50);

    let light2 = new THREE.PointLight(0x4158f6, 0.75);
    light2.position.set(-400, 200, 150);

    let light3 = new THREE.PointLight(0x803bff, 0.7);
    light3.position.set(100, 250, -100);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Create a scene
    scene.background = null
    scene.fog = new THREE.FogExp2(bgColor, 0.004);
    scene.add(light1, light2, light3);

    const atmosphereShader = {
      'atmosphere': {
        uniforms: {},
        vertexShader: [
          'varying vec3 vNormal;',
          'void main() {',
          'vNormal = normalize( normalMatrix * normal );',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          '}'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vNormal;',
          'void main() {',
          'float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 6.0 );',
          'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
          '}'
        ].join('\n')
      }
    }

    const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);

    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(atmosphereShader['atmosphere'].uniforms),
      vertexShader: atmosphereShader['atmosphere'].vertexShader,
      fragmentShader: atmosphereShader['atmosphere'].fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atm.scale.set(1.05, 1.05, 1.05);
    scene.add(atm);
    atm.position.set(-.1, .1, 0);

    //setup globe
    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xeeeeee,
      transparent: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    //setup map overlay
    const loader = new THREE.TextureLoader();
    const overlayMaterial = new THREE.MeshBasicMaterial({
      map: loader.load('https://i.imgur.com/JLFp6Ws.png'),
      transparent: true
    });

    const overlaySphereGeometry = new THREE.SphereGeometry(2.003, 64, 64);
    const overlaySphere = new THREE.Mesh(overlaySphereGeometry, overlayMaterial);
    overlaySphere.castShadow = true;
    overlaySphere.receiveShadow = true;
    sphere.add(overlaySphere);

    //set up bezier curves
    let numPoints = 100;
    //        var start = new THREE.Vector3(-5, 0, 20);
    let start = new THREE.Vector3(0, 1.5, 1.3);
    let middle = new THREE.Vector3(.6, .6, 3.2);
    let end = new THREE.Vector3(1.5, -1, .8);

    let curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);

    let tube1 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd965fa,
    });
    tube1.setDrawRange(0, 10000);
    let curveMesh1 = new THREE.Mesh(tube1, tubeMaterial);
    sphere.add(curveMesh1);

    //Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, -5);

    // Setup controls
    const controls: any = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.rotateSpeed = 1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    const animate = () => {
      // sphere.rotation.y *= 0.001;
      sphere.rotation.y += 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    renderer.render(scene, camera);
    animate();

  }
}

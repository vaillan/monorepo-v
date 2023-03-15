/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { Mesh, PerspectiveCamera, Scene, Texture, Vector3, WebGLRenderer } from 'three';
import { geoInterpolate } from 'd3-geo';
import * as THREE from 'three';

@Component({
  selector: 'monorepo-v-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  renderer!: WebGLRenderer;
  scene: Scene;
  camera!: PerspectiveCamera;
  loader: any = null;
  texture: Texture;
  disk: any = null;
  clock: any = null;
  time: number = 0;
  stats = Stats();
  tubes: any[] = [];
  renderCount: number = 0;
  currentGrowing: number = this.tubes.length;

  constructor() {
    let radius = 5;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    const geometry: any = new THREE.SphereGeometry(radius, 200, 200);

    let colors: any = [];
    let color: any = new THREE.Color();
    let q: any = ["rgb(171, 178, 185 )"];

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      color.set(q[THREE.MathUtils.randInt(0, q.length - 1)]);
      color.toArray(colors, i * 3);
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));

    // Material + Loader
    this.loader = new THREE.TextureLoader();
    this.loader.setCrossOrigin("");
    this.texture = this.loader.load("https://1.bp.blogspot.com/-596lbFumbyA/Ukb1cHw21_I/AAAAAAAAK-U/KArMZAjbvyU/s1600/water_4k.png");
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(1, 1);
    this.disk = this.loader.load("https://threejs.org/examples/textures/sprites/circle.png");

    const material = new THREE.ShaderMaterial({
      vertexColors: true,
      uniforms: {
        visibility: {
          value: this.texture,
        },
        shift: {
          value: 0,
        },
        shape: {
          value: this.disk,
        },
        size: {
          value: 0.07,
        },
        scale: {
          value: window.innerHeight / 2,
        },
      },
      vertexShader: `            
        uniform float scale;
        uniform float size;
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          vUv = uv;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( scale / length( mvPosition.xyz )) * (0.3 + sin(uv.y * 3.1415926) * 0.25 );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D visibility;
        uniform float shift;
        uniform sampler2D shape;
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          vec2 uv = vUv;
          uv.x += shift;
          vec4 v = texture2D(visibility, uv);
          if (length(v.rgb) > 1.0) discard;
          gl_FragColor = vec4( vColor, 1.0 );
          vec4 shapeData = texture2D( shape, gl_PointCoord );
          if (shapeData.a < 0.0625) discard;
        }
      `,
      transparent: false,
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);

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

    const atmosphereGeometry = geometry;

    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(atmosphereShader['atmosphere'].uniforms),
      vertexShader: atmosphereShader['atmosphere'].vertexShader,
      fragmentShader: atmosphereShader['atmosphere'].fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atm.scale.set(1.2, 1.2, 1.2);
    this.scene.add(atm);
    atm.position.set(-.1, .1, 0);

    // Additional effects
    this.scene.fog = new THREE.Fog(0x535ef3, 400, 2000);
    let sphereColor = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color: 0x3a228a
    }));

    sphereColor.scale.setScalar(0.999);
    points.add(sphereColor);

    let posiciones = [
      {
        start: { //Paris
          lat: 48.864716,
          lon: 2.349014
        },
        end: { //New York
          lat: 40.730610,
          lon: -73.935242
        }
      },
      {
        start: { //CDMX
          lat: 19.42847,
          lon: -99.12766
        },
        end: { //Tunisian
          lat: 36.806389,
          lon: 10.181667
        }
      },
      {
        start: { //Moose Jaw, SK, Canada
          lat: 50.393333,
          lon: -105.551941
        },
        end: { //Valcourt, QC, Canada
          lat: 45.500000,
          lon: -72.316666
        }
      },
      {
        start: { //Yorkton, SK, Canada
          lat: 51.213890,
          lon: -102.462776
        },
        end: { //Thurso, QC, Canada
          lat: 45.599998,
          lon: -75.250000
        }
      },
      {
        start: { //Dodge City, KS, USA
          lat: 37.753098,
          lon: -100.024872
        },
        end: { //West Des Moines, IA, USA
          lat: 41.579830,
          lon: -93.791328
        }
      },
      {
        start: { // Peabody, MA, USA
          lat: 42.536457,
          lon: -70.985786
        },
        end: { // St Martinville, LA, USA
          lat: 30.124033,
          lon: -91.833435
        }
      },
      {
        start: { //Greenfield, MA, USA
          lat: 42.587334,
          lon: -72.603416
        },
        end: { //Salisbury, MD, USA
          lat: 38.363350,
          lon: -75.605919
        }
      },
      {
        start: { //Newport, KY, USA
          lat: 39.088970,
          lon: -84.500786
        },
        end: { //Valparaiso, IN, USA
          lat: 41.483845,
          lon: -87.063965
        }
      }
    ];

    posiciones.forEach(posicion => {
      const startVector = this.sphericalCoordinates(posicion.start.lat, posicion.start.lon, radius);
      const endVector = this.sphericalCoordinates(posicion.end.lat, posicion.end.lon, radius);
      const curveMinAltitude = 0.5;
      const curveMaxAltitude = radius;
      const altitude = this.clamp(startVector.distanceTo(endVector) * .25, curveMinAltitude, curveMaxAltitude);
      const interpolate = geoInterpolate([posicion.start.lon, posicion.start.lat], [posicion.end.lon, posicion.end.lat]);
      const midCoord1 = interpolate(0.25);
      const midCoord2 = interpolate(0.75);
      const middleVector1 = this.sphericalCoordinates(midCoord1[1], midCoord1[0], radius + altitude);
      const middleVector2 = this.sphericalCoordinates(midCoord2[1], midCoord2[0], radius + altitude);

      //set up bezier curves
      const curve = this.setBizerCurves(startVector, middleVector1, middleVector2, endVector);
      points.add(curve);
    });


  }

  ngAfterViewInit(): void {
    this.content.nativeElement.style.height = "700px";
    this.content.nativeElement.style.maxwidth = "100%";
    this.content.nativeElement.style.alignItems = "center";
    this.canvas.nativeElement.style.overflow = "visible";
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas.nativeElement
    });

    this.renderer.setSize(this.content.nativeElement.offsetWidth, this.content.nativeElement.offsetHeight);
    this.renderer.setPixelRatio(this.content.nativeElement.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);

    //Setup camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.content.nativeElement.offsetWidth / this.content.nativeElement.offsetHeight,
      0.1,
      5000
    );
    this.camera.position.z = 10;
    this.camera.far = 100;
    // this.camera.position.set(0, 0, 10);

    //SETUP lights
    this.setUpLights();

    // Setup controls
    this.setUpControls();

    this.stats.update();

    this.animate();
  }

  animate() {
    if (this.renderCount < 11900) {
      this.renderCount += 80;
      this.renderCount = Math.ceil(this.renderCount / 3) * 3;
      this.GrowTube(this.currentGrowing, this.renderCount);
    } else {
      this.renderCount = 0;
      if (this.currentGrowing >= this.tubes.length - 1) {
        this.currentGrowing = 0;
      } else {
        this.currentGrowing++;
      }
    }

    window.requestAnimationFrame(() => this.animate());

    this.camera.lookAt(this.scene.position);
    // this.scene.rotation.x += 0.0005;
    this.scene.rotation.y += 0.0005;
    // this.scene.rotation.z += 0.0005;
    this.time += this.clock.getDelta()
    this.renderer.render(this.scene, this.camera);
  }

  sphericalCoordinates(latitude: number, longitude: number, radiusEarth: number): Vector3 {
    // let latitude_rad = latitude * Math.PI / 180;
    // let longitude_rad = longitude * Math.PI / 180;
    // let xPos = radiusEarth * Math.cos(latitude_rad) * Math.cos(longitude_rad);
    // let zPos = radiusEarth * Math.cos(latitude_rad) * - Math.sin(longitude_rad);
    // let yPos = radiusEarth * Math.sin(latitude_rad);
    // return new THREE.Vector3(xPos, yPos, zPos);

    const DEGREE_TO_RADIAN = Math.PI / 180;
    const phi = (90 - latitude) * DEGREE_TO_RADIAN;
    const theta = (longitude + 180) * DEGREE_TO_RADIAN;
    return new THREE.Vector3(
      - radiusEarth * Math.sin(phi) * Math.cos(theta),
      radiusEarth * Math.cos(phi),
      radiusEarth * Math.sin(phi) * Math.sin(theta)
    );
  }

  setBizerCurves(startPosition: any, middlePosition1: any, middlePosition2: any, endPosition: any): Mesh {
    let numPoints = 100;
    let start = startPosition;
    let middle1 = middlePosition1;
    let middle2 = middlePosition2
    let end = endPosition;
    // let curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    const curveQuad = new THREE.CubicBezierCurve3(start, middle1, middle2, end);

    let tube: any = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    // let tube: any = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
    this.tubes.push(tube);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd965fa
    });
    tube.setDrawRange(0, 0);
    let curve = new THREE.Mesh(tube, tubeMaterial);
    return curve;
  }

  setUpLights(): void {
    //SETUP lights
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(-800, 2000, 400);
    this.camera.add(light1);

    const light2 = new THREE.DirectionalLight(0x7982f6, 1);
    light2.position.set(-200, 500, 200);
    this.camera.add(light2);

    const light3 = new THREE.PointLight(0x8566cc, 0.5);
    light3.position.set(-200, 500, 200);
    this.camera.add(light3);
  }

  setUpControls(): void {
    const controls: any = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.rotateSpeed = 1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
  }

  GrowTube(index: number, renderCount: number) {
    renderCount = Math.ceil(renderCount / 3) * 3;
    this.tubes[index].setDrawRange(0, renderCount);
    setTimeout(() => {
      if (index > 2) {
        this.tubes[index - 3] ?
          this.tubes[index - 3].setDrawRange(renderCount, 11900) :
          this.tubes[index].setDrawRange(renderCount, 11900);
      } else {
        this.tubes[(this.tubes.length - 3) + index] ?
          this.tubes[(this.tubes.length - 3) + index].setDrawRange(renderCount, 11900) :
          this.tubes[index].setDrawRange(renderCount, 11900);
      }
    }, 3000);
  }

  clamp(num: number, min: number, max: number): number {
    return num <= min ? min : (num >= max ? max : num);
  }

}

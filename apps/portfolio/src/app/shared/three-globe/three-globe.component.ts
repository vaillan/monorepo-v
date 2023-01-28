/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpService } from './../../services/http.service';
import { Component, Input, OnDestroy } from '@angular/core';
import ThreeGlobe from 'three-globe';
import globeData from '../../../assets/json/globe-data.json';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as THREE from 'three';

@Component({
  selector: 'app-three-globe',
  templateUrl: './three-globe.component.html',
  styleUrls: ['./three-globe.component.scss']
})
export class ThreeGlobeComponent implements OnDestroy {
  @Input() height: string = "700px";
  @Input() widht: string = "100%";

  isLoadingResults = false;

  usersDataSource: any;
  locationSDataSource: any;

  constructor(private httpService: HttpService) {
    this.httpService.getGithubGlobeUsers().subscribe(res => {
      this.isLoadingResults = true;
      this.usersDataSource = res;
      this.httpService.getGithubGlobeUsersLocation().subscribe(res => {
        this.locationSDataSource = res;
        this.renderGlobe();
      });
    });

  }

  renderGlobe(): void {
    let mouseX = 0;
    let mouseY = 0;
    const globe: any = document.getElementById("globeViz");

    globe.style.height = this.height;
    globe.style.maxwidth = this.widht;
    globe.style.alignItems = "center";

    let windowHalfX = globe.offsetWidth / 2;
    let windowHalfY = globe.offsetWidth / 2;

    //Setup renderer 
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: (document.getElementById('globe') as any)
    });

    renderer.setSize(globe.offsetWidth, globe.offsetHeight);
    renderer.setPixelRatio(globe.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    //Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      globe.offsetWidth / globe.offsetHeight,
      0.1,
      1000
    );
    camera.aspect = globe.offsetWidth / globe.offsetHeight;
    camera.updateProjectionMatrix();

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(-800, 2000, 400);
    camera.add(light1);

    const light2 = new THREE.DirectionalLight(0x7982f6, 1);
    light2.position.set(-200, 500, 200);
    camera.add(light2);

    const light3 = new THREE.PointLight(0x8566cc, 0.5);
    light3.position.set(-200, 500, 200);
    camera.add(light3);

    camera.position.z = 250;
    camera.position.x = 0;
    camera.position.y = 0;
    
    //Setup scene
    const scene = new THREE.Scene();
    scene.background = null;
    scene.add(camera);
    // Additional effects
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);


    // Setup controls
    const controls: any = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.rotateSpeed = 1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    const onMouseMove = (event: any) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    const onWindowResize = () => {
      camera.aspect = globe.offsetWidth / globe.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(globe.offsetWidth, globe.offsetHeight);
    }

    globe.addEventListener("resize", onWindowResize(), false);
    globe.addEventListener("mousemove", (e: any) => { onMouseMove(e) });

    //Setup sphere
    const sphere = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(globeData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.6)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e: any) => {
        if (
          ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
            e.properties.ISO_A3
          )
        ) {
          return "rgba(255,255,255, 1)";
        } else { return "rgba(255,255,255, 0.7)"; }
      });

    //Setup data user github accounts visualization
    setTimeout(() => {
      sphere.arcsData(this.usersDataSource.users)
        .arcColor((e: any) => {
          return e.status ? "#dab6fc" : "#bc00dd";
        })
        .arcStroke((e: any) => {
          return e.status ? 0.5 : 0.3;
        })
        .arcDashLength(1)
        .arcDashGap(7)
        .arcDashAnimateTime(3000)
        .arcsTransitionDuration(3000)
        .arcDashInitialGap((e: any) => e.order * 1)
        .labelsData(this.locationSDataSource.locations)
        .labelColor(() => "#ffcb21")
        .labelDotOrientation((e: any) => {
          return e.orientation;
        })
        .labelDotRadius(0.5)
        .labelSize((e: any) => e.size)
        .labelText("country")
        .labelResolution(6)
        .labelAltitude(0.07)
        .pointsData(this.locationSDataSource?.locations)
        .pointColor(() => "#82ffee")
        .pointsMerge(true)
        .pointAltitude(0.07)
        .pointRadius(0.1);
      this.isLoadingResults = false;
    });

    const globeMaterial: any = sphere.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.2;
    globeMaterial.shininess = 0.7;

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

    //animating the sphere
    scene.add(sphere);
    controls.update();
    const animate = () => {
      requestAnimationFrame(animate);
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    onWindowResize();
    animate();
  }

  ngOnDestroy() {
    const globeContainer: any = document.getElementById("globeViz");
    const globeCanvas: any = document.getElementById("globe");
    globeContainer.removeChild(globeCanvas);
  }
}

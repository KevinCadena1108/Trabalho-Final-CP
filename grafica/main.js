import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Configuração inicial da cena, câmera e renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiente fraca
const ambientLight = new THREE.AmbientLight(0xffffff, 10.0);
scene.add(ambientLight);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2; // Limita a câmera a não olhar para cima
controls.minDistance = 10; // Distância mínima da câmera em relação ao ponto central da órbita
controls.maxDistance = 160; // Distância máxima da câmera em relação ao ponto central da órbita

// Carregar o palco (.obj com .mtl)
const mtlLoaderPalco = new MTLLoader();
mtlLoaderPalco.load(
    'Modelo3D/palco/stage.mtl',
    function (materials) {
        materials.preload();

        const objLoaderPalco = new OBJLoader();
        objLoaderPalco.setMaterials(materials);
        objLoaderPalco.load(
            'Modelo3D/palco/stage.obj',
            function (obj) {
                obj.position.set(0, -5, 0); // Ajustar posição do palco
                obj.scale.set(10.0, 10.0, 15.0); // Ajustar escala do palco
                obj.rotation.y = Math.PI / 2;
                scene.add(obj);

                // Posicionar a câmera centralizada na frente do palco
                const box = new THREE.Box3().setFromObject(obj);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                camera.position.copy(center);
                camera.position.x += size.z * 0.5; // Ajuste para posicionar mais perto do palco
                camera.position.x += size.x * 2; // Ajuste para posicionar na frente do palco
                camera.position.y += size.y; // Ajuste de altura

                camera.lookAt(center);
                controls.target.copy(center);
                controls.update();
            },
            undefined,
            function (error) {
                console.error('Erro ao carregar o objeto 3D do palco', error);
            }
        );
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar o material .mtl do palco', error);
    }
);

const loader = new GLTFLoader();
loader.load(
  "Modelo3D/hangar/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(0, -120, 0); // Posicione o meio do modelo no centro da cena
    gltf.scene.scale.set(0.03, 0.03, 0.03); // Reduza o tamanho do modelo
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const loader2 = new GLTFLoader();
loader2.load(
  "Modelo3D/floor/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    const floorModel = gltf.scene;

    // Defina a escala original
    floorModel.scale.set(1, 1, 1);

    // Tamanho do tile de chão baseado no tamanho real do modelo
    const boundingBox = new THREE.Box3().setFromObject(floorModel);
    const tileSizeX = boundingBox.max.x - boundingBox.min.x;
    const tileSizeZ = boundingBox.max.z - boundingBox.min.z;

    // Número de tiles em cada direção
    const tilesX = 100;
    const tilesZ = 100;

    // Calcular o deslocamento para centralizar os tiles
    const offsetX = (tilesX / 2) * tileSizeX;
    const offsetZ = (tilesZ / 2) * tileSizeZ;

    for (let i = 0; i < tilesX; i++) {
      for (let j = 0; j < tilesZ; j++) {
        const floorTile = floorModel.clone();
        floorTile.position.set(i * tileSizeX - offsetX, 0, j * tileSizeZ - offsetZ);
        scene.add(floorTile);
      }
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


const loader3 = new GLTFLoader();
loader3.load(
  "Modelo3D/retro_piano/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(-50, 20, -10); // Posicione o meio do modelo no centro da cena
    gltf.scene.scale.set(0.03, 0.03, 0.03); // Reduza o tamanho do modelo
    gltf.scene.rotation.y = Math.PI / 2;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


const loader4 = new GLTFLoader();
loader4.load(
  "Modelo3D/drum/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(30, 15, 60); // Posicione o meio do modelo no centro da cena
    gltf.scene.scale.set(8.0, 8.0, 8.0); // Reduza o tamanho do modelo
    gltf.scene.rotation.y = -Math.PI / 4;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


const loader5 = new GLTFLoader();
loader5.load(
  "Modelo3D/guitar/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(530, 20, -50); // Posicione o meio do modelo no centro da cena
    gltf.scene.scale.set(6.0, 6.0, 6.0); // Reduza o tamanho do modelo
    //gltf.scene.rotation.y = -Math.PI / 4;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//camera.position.z = 10


// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

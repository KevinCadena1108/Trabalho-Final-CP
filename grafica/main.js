import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Define o fundo da cena como branco

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiente fraca
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

// Luz direcional para iluminar o modelo
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2; // Limita a câmera a não olhar para cima
controls.minDistance = 10; // Distância mínima da câmera em relação ao ponto central da órbita
controls.maxDistance = 490; // Distância máxima da câmera em relação ao ponto central da órbita

// Carregar e adicionar chão de madeira
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('Textura/Madeira.jpg'); // Substitua pelo caminho da sua textura de madeira
const floorGeometry = new THREE.PlaneGeometry(500, 500);
const floorMaterial = new THREE.MeshPhongMaterial({ map: woodTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0; // Ajuste a altura do chão
scene.add(floor);

// Adicionar paredes
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 }); // Substitua pela cor ou textura desejada

// Parede traseira
const backWallGeometry = new THREE.PlaneGeometry(500, 300);
const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
backWall.position.set(0, 50, -250);
scene.add(backWall);

// Parede frontal
const frontWallGeometry = new THREE.PlaneGeometry(500, 300);
const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
frontWall.position.set(0, 50, 250);
frontWall.rotation.y = Math.PI;
scene.add(frontWall);

// Parede esquerda
const leftWallGeometry = new THREE.PlaneGeometry(500, 300);
const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
leftWall.position.set(-250, 50, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Parede direita
const rightWallGeometry = new THREE.PlaneGeometry(500, 300);
const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
rightWall.position.set(250, 50, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Adicionar teto
const ceilingGeometry = new THREE.PlaneGeometry(500, 500);
const ceiling = new THREE.Mesh(ceilingGeometry, wallMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 200; // Ajuste a altura do teto
scene.add(ceiling);

let palco;

const mtlLoader = new MTLLoader();
mtlLoader.load(
    'Modelo3D/palco/stage.mtl',
    function (materials) {
        materials.preload();

        // Carregamento do objeto 3D (.obj)
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            'Modelo3D/palco/stage.obj',
            function (obj) {
                palco = obj; // Armazena o palco na variável
                palco.position.set(0, 0, -190); // Ajustar posição
                palco.scale.set(10.0, 10.0, 10.0); // Ajustar escala
                scene.add(palco);
            },
            undefined,
            function (error) {
                console.error('Erro ao carregar o objeto 3D', error);
            }
        );
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar o material .mtl', error);
    }
);

const loader = new GLTFLoader();
loader.load(
  "Modelo3D/retro_piano/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(10, 23, -200); // Posicione o meio do modelo no centro da cena
    gltf.scene.scale.set(0.03, 0.03, 0.03); // Reduza o tamanho do modelo
    scene.add(gltf.scene);

    // Centraliza a câmera no centro do piano e afasta um pouco
    const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    // Afasta a câmera
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 1.5; // Fator de afastamento

    camera.position.set(center.x, center.y, center.z + cameraZ);
    controls.target.copy(center); // Faz a câmera orbitar ao redor do centro do piano
    controls.update();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.set(0, 2, 10); // Ajuste a posição da câmera inicial

const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();

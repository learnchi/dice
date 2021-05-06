window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(500, 500, 500);
  // const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const loader = new THREE.TextureLoader();

  // さいころをここで振る
  const rand = Math.floor(Math.random() * Math.floor(6));
  switch (rand) {
  case 0:
	  var texture = ['dice_1.png','dice_6.png','dice_2.png','dice_5.png','dice_3.png','dice_4.png' ];
	  break;
  case 1:
	  var texture = ['dice_6.png','dice_2.png','dice_5.png','dice_3.png','dice_4.png','dice_1.png' ];
	    break;
  case 2:
	  var texture = ['dice_2.png','dice_5.png','dice_3.png','dice_4.png','dice_1.png','dice_6.png' ];
	    break;
  case 3:
	  var texture = ['dice_5.png','dice_3.png','dice_4.png','dice_1.png','dice_6.png','dice_2.png' ];
	    break;
  case 4:
	  var texture = ['dice_3.png','dice_4.png','dice_1.png','dice_6.png','dice_2.png','dice_5.png' ];
	    break;
  case 5:
	  var texture = ['dice_4.png','dice_1.png','dice_6.png','dice_2.png','dice_5.png','dice_3.png' ];
	    break;
}
  const material = [
      new THREE.MeshPhongMaterial({map: loader.load( texture[0])}),
      new THREE.MeshPhongMaterial({map: loader.load( texture[1])}),
      new THREE.MeshPhongMaterial({map: loader.load( texture[2])}),
      new THREE.MeshPhongMaterial({map: loader.load( texture[3])}),
      new THREE.MeshPhongMaterial({map: loader.load( texture[4])}),
      new THREE.MeshPhongMaterial({map: loader.load( texture[5])})
  ];
  material.transparent = true;
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 1.5; // 光の強さ
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  box.rotation.set(0,0,0);
  rt = 0.5;
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    box.rotation.x += rt;
    box.rotation.y += rt;
    // レンダリング
    renderer.render(scene, camera);
    // console.log(rt + ", "+box.rotation.x + ", " + box.rotation.y+ ", " + box.rotation.z);

    // 回転をだんだん遅くする
    rt -= 0.005;
    if (rt <=0) {
    	box.rotation.set(0,0,0);
    	rt = 0;
    }

  }
}

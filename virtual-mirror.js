// @ts-nocheck

document.addEventListener("DOMContentLoaded", function () {

    var stage = document.getElementById("avatarStage");

    if (!stage || typeof THREE === "undefined") {
        return;
    }

    /* REMOVE ALL OLD RECTANGLES / PLACEHOLDERS / TEXT */
    while (stage.firstChild) {
        stage.removeChild(stage.firstChild);
    }

    /* SCENE */
    var scene = new THREE.Scene();

    scene.background = new THREE.Color(0x080808);

    /* CAMERA */
    var width = stage.clientWidth || 350;
    var height = stage.clientHeight || 550;

    var camera = new THREE.PerspectiveCamera(
        35,
        width / height,
        0.1,
        100
    );

    camera.position.set(0, 1.8, 6);

    /* RENDERER */
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setSize(width, height);

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";

    stage.appendChild(renderer.domElement);

    /* LIGHT */
    var ambient = new THREE.AmbientLight(
        0xffffff,
        2
    );

    scene.add(ambient);

    var light = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    light.position.set(3, 5, 5);

    scene.add(light);

    /* AVATAR */
    var avatar = new THREE.Group();

    scene.add(avatar);

    /* MATERIALS */
    var skin = new THREE.MeshStandardMaterial({
        color: 0xc98f6b
    });

    var shirt = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    var pants = new THREE.MeshStandardMaterial({
        color: 0x222222
    });

    var shoes = new THREE.MeshStandardMaterial({
        color: 0x050505
    });

    var hair = new THREE.MeshStandardMaterial({
        color: 0x17120f
    });

    /* LEGS */
    var leftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.22,
            0.20,
            1.45,
            24
        ),
        pants
    );

    leftLeg.position.set(
        -0.22,
        0.72,
        0
    );

    avatar.add(leftLeg);

    var rightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.22,
            0.20,
            1.45,
            24
        ),
        pants
    );

    rightLeg.position.set(
        0.22,
        0.72,
        0
    );

    avatar.add(rightLeg);

    /* SHOES */
    var leftShoe = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.42,
            0.20,
            0.65
        ),
        shoes
    );

    leftShoe.position.set(
        -0.22,
        -0.03,
        0.12
    );

    avatar.add(leftShoe);

    var rightShoe = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.42,
            0.20,
            0.65
        ),
        shoes
    );

    rightShoe.position.set(
        0.22,
        -0.03,
        0.12
    );

    avatar.add(rightShoe);

    /* BODY */
    var body = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.55,
            0.43,
            1.30,
            24
        ),
        shirt
    );

    body.position.y = 2.05;

    body.scale.z = 0.72;

    avatar.add(body);

    /* NECK */
    var neck = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.16,
            0.17,
            0.28,
            20
        ),
        skin
    );

    neck.position.y = 2.82;

    avatar.add(neck);

    /* HEAD */
    var head = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.43,
            32,
            24
        ),
        skin
    );

    head.position.y = 3.25;

    avatar.add(head);

    /* HAIR */
    var hairPart = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.45,
            32,
            20
        ),
        hair
    );

    hairPart.position.y = 3.38;

    hairPart.scale.y = 0.55;

    avatar.add(hairPart);

    /* LEFT ARM */
    var leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.14,
            0.13,
            1.15,
            20
        ),
        shirt
    );

    leftArm.position.set(
        -0.67,
        2.20,
        0
    );

    leftArm.rotation.z = -0.08;

    avatar.add(leftArm);

    /* RIGHT ARM */
    var rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.14,
            0.13,
            1.15,
            20
        ),
        shirt
    );

    rightArm.position.set(
        0.67,
        2.20,
        0
    );

    rightArm.rotation.z = 0.08;

    avatar.add(rightArm);

    /* HANDS */
    var leftHand = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.16,
            20,
            16
        ),
        skin
    );

    leftHand.position.set(
        -0.70,
        1.62,
        0
    );

    avatar.add(leftHand);

    var rightHand = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.16,
            20,
            16
        ),
        skin
    );

    rightHand.position.set(
        0.70,
        1.62,
        0
    );

    avatar.add(rightHand);

    /* POSITION */
    avatar.position.y = -1.45;

    camera.lookAt(
        0,
        1.5,
        0
    );

    /* DRAG ROTATION */
    var dragging = false;
    var lastX = 0;

    renderer.domElement.addEventListener(
        "pointerdown",
        function (event) {

            dragging = true;

            lastX = event.clientX;

        }
    );

    renderer.domElement.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging) {
                return;
            }

            var movement =
                event.clientX - lastX;

            avatar.rotation.y +=
                movement * 0.012;

            lastX = event.clientX;

        }
    );

    renderer.domElement.addEventListener(
        "pointerup",
        function () {

            dragging = false;

        }
    );

    renderer.domElement.addEventListener(
        "pointercancel",
        function () {

            dragging = false;

        }
    );

    /* RESIZE */
    window.addEventListener(
        "resize",
        function () {

            var w = stage.clientWidth;
            var h = stage.clientHeight;

            if (w <= 0 || h <= 0) {
                return;
            }

            camera.aspect = w / h;

            camera.updateProjectionMatrix();

            renderer.setSize(w, h);

        }
    );

    /* ANIMATION */
    function animate() {

        requestAnimationFrame(animate);

        renderer.render(
            scene,
            camera
        );
    }

    animate();

});
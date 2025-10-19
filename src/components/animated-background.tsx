"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 1;

    // Stars
    const starCount = 10000;
    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 1) * 2000;
      starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Large Distant Stars
    const largeStarCount = 100;
    const largeStarVertices = [];
    for (let i = 0; i < largeStarCount; i++) {
        const x = (Math.random() - 0.5) * 3000;
        const y = (Math.random() - 0.5) * 3000;
        const z = (Math.random() - 1) * 3000;
        largeStarVertices.push(x, y, z);
    }
    const largeStarGeometry = new THREE.BufferGeometry();
    largeStarGeometry.setAttribute('position', new THREE.Float32BufferAttribute(largeStarVertices, 3));
    const largeStarMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.6
    });
    const largeStars = new THREE.Points(largeStarGeometry, largeStarMaterial);
    scene.add(largeStars);


    // Nebula/galaxy effect
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyVertices = [];
    const colors = [];
    const color = new THREE.Color();
    const purple = new THREE.Color(0x9400D3);
    const blue = new THREE.Color(0x7DF9FF);

    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 1500;
        const y = (Math.random() - 0.5) * 1500;
        const z = -Math.random() * 2000;
        galaxyVertices.push(x, y, z);
        
        const mixedColor = Math.random() > 0.5 ? purple : blue;
        color.set(mixedColor);
        colors.push(color.r, color.g, color.b);
    }

    galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
    galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const galaxyMaterial = new THREE.PointsMaterial({ 
        size: 1.5, 
        vertexColors: true, 
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5
    });
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    // Distant Galaxy Clusters
    const galaxyClusters: THREE.Points[] = [];
    const numClusters = 5;
    for(let i = 0; i < numClusters; i++) {
        const clusterGeometry = new THREE.BufferGeometry();
        const clusterVertices = [];
        const clusterColors = [];
        const clusterCenter = new THREE.Vector3(
            (Math.random() - 0.5) * 2500,
            (Math.random() - 0.5) * 2500,
            - (Math.random() * 1000 + 1500)
        );

        for (let j = 0; j < 200; j++) {
            const x = clusterCenter.x + (Math.random() - 0.5) * 100;
            const y = clusterCenter.y + (Math.random() - 0.5) * 100;
            const z = clusterCenter.z + (Math.random() - 0.5) * 100;
            clusterVertices.push(x, y, z);
            const mixedColor = Math.random() > 0.3 ? purple : blue;
            color.set(mixedColor);
            clusterColors.push(color.r, color.g, color.b);
        }

        clusterGeometry.setAttribute('position', new THREE.Float32BufferAttribute(clusterVertices, 3));
        clusterGeometry.setAttribute('color', new THREE.Float32BufferAttribute(clusterColors, 3));
        
        const clusterMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.3
        });
        const cluster = new THREE.Points(clusterGeometry, clusterMaterial);
        cluster.userData.rotationSpeed = (Math.random() - 0.5) * 0.001;
        scene.add(cluster);
        galaxyClusters.push(cluster);
    }
    
    // Shooting Stars
    const shootingStarCount = 5;
    const shootingStars: THREE.Points[] = [];
    for(let i=0; i<shootingStarCount; i++){
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2.5, transparent: true, opacity: 1 });
        const star = new THREE.Points(geometry, material);
        
        star.userData.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          -1
        ).normalize().multiplyScalar(Math.random() * 25 + 25);
        
        const resetStar = () => {
            const z = Math.random() * 500 + 500;
            const y = (Math.random() - 0.5) * window.innerHeight * (z/500);
            const x = (Math.random() - 0.5) * window.innerWidth * (z/500);
            star.position.set(x, y, -z);
        };
        star.userData.reset = resetStar;

        resetStar();
        shootingStars.push(star);
        scene.add(star);
    }


    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0002;
      largeStars.rotation.x -= 0.00005;
      largeStars.rotation.y -= 0.0001;
      galaxy.rotation.y += 0.0003;

      galaxyClusters.forEach(cluster => {
        cluster.rotation.y += cluster.userData.rotationSpeed;
      });
      
      shootingStars.forEach(star => {
          star.position.add(star.userData.velocity);
          if (star.position.z > camera.position.z || Math.abs(star.position.y) > 1000 || Math.abs(star.position.x) > 1000) {
              star.userData.reset();
          }
      });
      
      renderer.render(scene, camera);
    };
    animate();

    const currentMount = mountRef.current;
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default AnimatedBackground;

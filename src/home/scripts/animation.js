const animationContainer = document.getElementById("animation");

const showLoadingAnimation = () => {
  closeAnimation();
  const animation = document.createElement("div");
  for (let i = 0; i < 8; i++) {
    animation.appendChild(document.createElement("div"));
  }
  animation.className = "lds-roller";
  animationContainer.appendChild(animation);
}

const closeAnimation = () => {
  while(animationContainer.lastChild) {
    animationContainer.removeChild(animationContainer.lastChild);
  }
}

export { showLoadingAnimation, closeAnimation };
<template>
    <div class="skeletonBox" :class="{ 'lightTheme' : theme === 'light' }">

    </div>
</template>

<script>
export default {
    props: {
        theme: String
    }
}
</script>

<style scoped>
.skeletonBox {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #0A0E27;
  height: 100%;
  width: 100%;
}

.skeletonBox::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
  background-image: linear-gradient(90deg, rgba(16, 21, 57, 0) 0, rgba(16, 21, 57, 1) 20%, rgba(16, 21, 57, 1) 60%, rgba(16, 21, 57, 0));
  -webkit-animation: shimmer 2s infinite;
          animation: shimmer 2s infinite;
  content: "";
}
@-webkit-keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}
@keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}

.lightTheme {
    background-color: #EAEFF5;
}
.lightTheme::after {
    transform: translateX(-100%);
    background-image: linear-gradient(90deg, rgba(194, 204, 214, 0) 0, rgba(194, 204, 214, 0.2) 20%, rgba(194, 204, 214, 0.5) 60%, rgba(194, 204, 214, 0));
    animation: shimmer 2s infinite;
}
</style>
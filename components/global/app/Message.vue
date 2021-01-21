<template>
    <div v-if="message" class="messageCon" v-on:click="$store.commit('clearMessage')">
        <p class="messageP">{{message}}</p>
    </div>
</template>

<script>
export default {
    computed: {
        message() {
            return this.$store.state.siteFunction.message
        }
    },
    watch: {
        message() {
            setTimeout(() => {
                this.$store.commit('clearMessage')
            }, 6000)
        }
    }
}
</script>

<style scoped>
.messageCon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #2E3135;
    border-radius: 10px;
    padding: 20px;
    animation: slideIn 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    cursor: pointer;
    z-index: 800;
}
.messageP {
    color: #FFF;
    font-size: 14px;
    font-weight: bold;
}

@keyframes slideIn {
  0% {transform: translateY(100px);}
  100% {transform: translateY(0);}
}

@media only screen and (max-width: 600px) {
    .messageCon {left: 20px; text-align: center;}
}
</style>
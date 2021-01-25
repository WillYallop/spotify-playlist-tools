<template>
    <div class="switchCon" v-on:click="$emit('update-boolean', !boolean)" :class="{ 'activeSwitch' : boolean }">
        <div class="innerCiricle"></div>
    </div>
</template>

<script>
export default {
    props: {
       boolean: Boolean 
    }

}
</script>

<style scoped>
.switchCon {
    width: 40px;
    height: 20px;
    background-color: #D7DFE8;
    border-radius: 10px;
    position: relative;
    transition: 0.2s;
    cursor: pointer;
}
.switchCon:hover {
    background-color: #D0D9E2;
}
.switchCon.activeSwitch {
    background-color: var(--accent-2);
}
.switchCon.activeSwitch:hover {
    background-color: var(--accent-2-hover);
}
.innerCiricle {
    height: 16px;
    width: 16px;
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    border-radius: 50%;
    background-color: #FFF;
    transition: left 0.2s;
}
.activeSwitch .innerCiricle {
    left: 22px;
}
</style>
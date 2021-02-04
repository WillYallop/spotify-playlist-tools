<template>
    <div class="compSectTitleCon">
        <h2 class="compSectTitleP">{{title}}</h2>
        <p class="compSectBodyP">{{body}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        body: String
    }
}
</script>

<style scoped>
.compSectTitleCon {
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin: 0 auto 70px;
} 
.compSectTitleP {
    font-size: clamp(30px, 7vw, 40px);
} 
.compSectBodyP {
    margin-top: 10px;
    font-size: 16px;
}
</style>
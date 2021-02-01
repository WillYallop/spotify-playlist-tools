<template>
    <div class="featuresCompCon">
        <!-- Feature List --> 
        <div class="featureListCol">
            <!-- Playlist Manager -->
            <div class="featureCon" v-on:click="selectedFeature = 1" :class="{ 'activeFeatureCon' : selectedFeature === 1 }"> 
                <div class="featureIcon"></div>
                <div class="featureTextarea">
                    <h3 class="featureTitleP">Playlist Manager</h3>
                    <p class="featureBodyP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>
                </div>
                <img v-if="selectedFeature === 1" src="../../../assets/images/frontend/feature1.png" alt="Feature" class="mobileFeatureImg">
            </div>
            <!-- Playlist Monitoring -->
            <div class="featureCon" v-on:click="selectedFeature = 2" :class="{ 'activeFeatureCon' : selectedFeature === 2 }"> 
                <div class="featureIcon"></div>
                <div class="featureTextarea">
                    <h3 class="featureTitleP">Playlist Monitoring</h3>
                    <p class="featureBodyP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>
                </div>
                <img v-if="selectedFeature === 2" src="../../../assets/images/frontend/feature2.png" alt="Feature" class="mobileFeatureImg">
            </div>
            <!-- Track Release Scheduler -->
            <div class="featureCon" v-on:click="selectedFeature = 3" :class="{ 'activeFeatureCon' : selectedFeature === 3 }"> 
                <div class="featureIcon"></div>
                <div class="featureTextarea">
                    <h3 class="featureTitleP">Track Release Scheduler</h3>
                    <p class="featureBodyP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>
                </div>
                <img v-if="selectedFeature === 3" src="../../../assets/images/frontend/feature2.png" alt="Feature" class="mobileFeatureImg">
            </div>
            <!-- Playlist Release Scheduler -->
            <div class="featureCon" v-on:click="selectedFeature = 4" :class="{ 'activeFeatureCon' : selectedFeature === 4 }"> 
                <div class="featureIcon"></div>
                <div class="featureTextarea">
                    <h3 class="featureTitleP">Playlist Release Scheduler</h3>
                    <p class="featureBodyP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>
                </div>
                <img v-if="selectedFeature === 4" src="../../../assets/images/frontend/feature2.png" alt="Feature" class="mobileFeatureImg">
            </div>
        </div>
        <!-- Feature Images -->
        <div class="featureImgCol">
            <img v-if="selectedFeature === 1" src="../../../assets/images/frontend/feature1.png" alt="Feature" class="featureImg">
            <img v-if="selectedFeature === 2" src="../../../assets/images/frontend/feature2.png" alt="Feature" class="featureImg">
            <img v-if="selectedFeature === 3" src="../../../assets/images/frontend/feature2.png" alt="Feature" class="featureImg">
            <img v-if="selectedFeature === 4" src="../../../assets/images/frontend/feature2.png" alt="Feature" class="featureImg">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedFeature: 1
        }
    }
}
</script>

<style scoped>
.featuresCompCon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
} 
/* Feature List Col */
.featureListCol {
    width: calc(50% - 20px);
} 
.featureCon {
    width: 100%;
    margin-bottom: 10px;
    padding: 20px;
    display: flex;
    border-radius: 10px;
    cursor: pointer;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
} 
.featureCon.activeFeatureCon {
    box-shadow: 0px 11px 29px rgba(0, 0, 0, 0.03);
} 
.featureIcon {
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 10px;
    background-color: var(--background-4);
}
.featureCon.activeFeatureCon .featureIcon {
    background-color: var(--accent-1);
}
.featureTextarea {
    width: calc(100% - 60px);
} 
.featureTitleP {
    font-size: 18px;
    font-weight: bold;
} 
.featureBodyP {
    font-size: 16px;
    margin-top: 10px;
}
.mobileFeatureImg {
    width: 100%;
    margin: 20px auto 0;
}
/* Feature Img Col */
.featureImgCol {
    width: calc(50% - 20px);
    display: flex;
    align-items: center;
} 
.featureImg {
    object-fit: cover;
    width: 900px;
}
.mobileFeatureImg {
    display: none;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
    .featureListCol { width: calc(70% - 20px) }
    .featureImgCol { width: calc(30% - 20px);}
}
/* Media Queries */
@media only screen and (max-width: 700px) {
    .featureListCol { width: 100%; }
    .featureImgCol { display: none; }
    .mobileFeatureImg {display: flex;}
}
</style>
<template>
    <div class="testimonialCon" v-swiper:mySwiper="swiperOptions">
        <div class="swiper-wrapper">
            
            <div class="cardCon swiper-slide">
                <a href="https://melodymelon.com/" class="cardHeader melodyMelonBg">
                    <img src="../../../assets/images/frontend/mmLogo.png" alt="Melody Melon testimonial" class="logoImg">
                </a>
                <div class="cardBody">
                    <h3>Melody Melon</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>
                </div>
            </div>

            <div class="cardCon swiper-slide">
                <a href="https://basslinepromotions.com/" class="cardHeader bassBg">
                    <img src="../../../assets/images/frontend/bassLogo.png" alt="Melody Melon testimonial" class="logoImg">
                </a>
                <div class="cardBody">
                    <h3>Bassline Promotions</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>     
                </div>
            </div>

            <div class="cardCon swiper-slide">
                <a class="cardHeader vibeBg">
                    <img src="../../../assets/images/frontend/vibeLegionLogo.png" alt="Melody Melon testimonial" class="logoImg">
                </a>
                <div class="cardBody">
                    <h3>Vibe Legion</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>  
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            swiperOptions: {
                slidesPerView: 'auto',
                loop: false,
            }
        }
    },
    components: { 


    }

}
</script>

<style scoped>
@import 'swiper/dist/css/swiper.css';

.testimonialCon {
    overflow: visible;
}
.cardCon {
    width: 40%;
    background-color: #FFF;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 20px;
    box-shadow: 0px 11px 29px rgba(0, 0, 0, 0.03);
}
.cardHeader {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
} 
.logoImg {
    height: 50px;
}
.melodyMelonBg {background: linear-gradient(328deg, rgba(238,119,82,1) 0%, rgba(231,60,126,1) 100%);} 
.bassBg {background-color: #1ED760;}
.vibeBg {background-color: #101B52;}

.cardBody {
    padding: 20px;
}
.cardBody h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
.cardBody p {
    font-size: 16px;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
    .cardCon {width: 60%;}
}
@media only screen and (max-width: 700px) {
    .cardCon {width: calc(100% - 30px);}
}
</style>
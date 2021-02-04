<template>
    <div class="contactCompCon">
        <div class="conInfoCon">
            <h3 class="contactTitleP">Don't hesitate to get in touch!</h3>
            <p class="contactBodyP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.</p>
            <div class="contactInfoCon">
                <a href="mailTo:hello@playlistengine.com" class="emailLink"><fa class="fas" :icon="['fa', 'envelope']"/>hello@playlistengine.com</a>
                <a href="mailTo:accounts@playlistengine.com" class="emailLink"><fa class="fas" :icon="['fa', 'envelope']"/>accounts@playlistengine.com</a>
            </div>
        </div>
        <div class="conInputCon">
            <ContactFormInputs/>
        </div>
    </div>
</template>

<script>
import ContactFormInputs from '@/components/global/frontend/ContactFormInputs'

export default {
    components: {
        ContactFormInputs

    }
}
</script>

<style scoped>
.contactCompCon {
    display: flex;
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    filter: drop-shadow(0px 11px 29px rgba(0, 0, 0, 0.03));
}
.conInfoCon {
    width: 450px;
    border-right: 1px solid #E7E7E7;
    padding-right: 20px;
}
.contactTitleP {
    font-size: 24px;
    max-width: 250px;
    margin-bottom: 10px;
} 
.contactBodyP {
    font-size: 16px;
} 
.contactInfoCon {
    margin-top: 30px;
}
.emailLink {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    color: #242424;
    margin-bottom: 5px;
}
.emailLink .fas {
    font-size: 20px;
    margin-right: 10px;
    color: var(--accent-1);
}
.emailLink:last-child {
    margin-bottom: 0;
}


.conInputCon {
    padding-left: 20px;
}
</style>
<template>
    <div class="accountsCon"> 

        <div class="accountRow">
            <div class="leftSideCon">
                <img src="https://i.scdn.co/image/ab6775700000ee8521bfa14d467ad794b9dfdaaf" class="accountImg">
                <div class="accountTextarea">
                    <p class="accountNameP">Vibe Legion</p>
                    <p class="accountFollowersP"><span class="boldify">10</span> followers</p>
                </div>
            </div>
            <div class="rightSideCon">
                <div class="accountTypeIconCon">
                    <fa class="fas spoityIcon" :icon="['fab', 'spotify']"/>
                </div>
                <button class="removeAccountBtn"><fa class="fas" :icon="['fa', 'trash']"/></button>
            </div>
        </div>

        <!-- TEMP -->
        <div class="accountRow">
            <div class="leftSideCon">
                <img src="https://i.scdn.co/image/ab6775700000ee8579237c6b8df7daa5b251190c" class="accountImg">
                <div class="accountTextarea">
                    <p class="accountNameP">Melody Melon</p>
                    <p class="accountFollowersP"><span class="boldify">22</span> followers</p>
                </div>
            </div>
            <div class="rightSideCon">
                <div class="accountTypeIconCon">
                    <fa class="fas spoityIcon" :icon="['fab', 'spotify']"/>
                </div>
                <button class="removeAccountBtn"><fa class="fas" :icon="['fa', 'trash']"/></button>
            </div>
        </div>
        <div class="accountRow">
            <div class="leftSideCon">
                <img src="https://i.scdn.co/image/ab6775700000ee8521bfa14d467ad794b9dfdaaf" class="accountImg">
                <div class="accountTextarea">
                    <p class="accountNameP">Vibe Legion</p>
                    <p class="accountFollowersP"><span class="boldify">10</span> followers</p>
                </div>
            </div>
            <div class="rightSideCon">
                <div class="accountTypeIconCon">
                    <fa class="fas appleIcon" :icon="['fab', 'apple']"/>
                </div>
                <button class="removeAccountBtn"><fa class="fas" :icon="['fa', 'trash']"/></button>
            </div>
        </div>
        <!-- TEMP -->

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },

}
</script>

<style scoped>
.accountsCon {
    width: 100%;
}
.accountRow {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid var(--background-1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
}
.accountRow:last-child {
    margin-bottom: 0;
}
.leftSideCon {
    display: flex;
    align-items: center;
}
.accountImg {
    height: 40px;
    width: 40px;
    min-width: 40px;
    object-fit: cover;
    border-radius: 5px;
}
.accountTextarea {
    padding-left: 5px;
}
.accountNameP {
    font-size: 14px;
    font-weight: bold;
    color: var(--title-text);
}
.accountFollowersP {
    font-size: 14px;
    color: var(--body-text);
}
.rightSideCon {
    display: flex;
    align-items: center;
}
.accountTypeIconCon {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.accountTypeIconCon .fas {
    font-size: 20px;
}
.spoityIcon {color: #1DB954;}
.appleIcon {color: #fc3c44;}
.removeAccountBtn {
    height: 30px;
    width: 30px;
    min-width: 30px;
    background-color: var(--background-1);
    transition: 0.2s;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.removeAccountBtn:hover {
    background-color: var(--background-1-hover);
}
.removeAccountBtn .fas {
    font-size: 10px;
    color: var(--title-text);
    transition: 0.2s;
}
.removeAccountBtn:hover .fas {
    color: var(--error-text);
}
</style>
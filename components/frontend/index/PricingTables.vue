<template>
    <div class="pricingTableCon">

        <div class="tableCon" v-on:click="activeTable = 1" :class="{ 'activeTable' : activeTable === 1 }">
            <div class="tableInner">
                <p class="tablePackageNameP">Free Tier</p>
                <p class="packagePriceP">$0<span class="packageRefreshP">/month</span></p>
                <p class="packageInfoP">For those that have a couple of playlists they want to manage.</p>
                <ul class="featureList">
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>10 Actions /month</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Monitor 2 Playlists</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Schedule 5 Track Releases</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Schedule 2 Playlist Releases</li>
                </ul>
                <button class="tableBtn">Choose Plan</button>
            </div>
        </div>

        <div class="tableCon" v-on:click="activeTable = 2" :class="{ 'activeTable' : activeTable === 2 }">
            <div class="tableInner">
                <p class="tablePackageNameP">Premium</p>
                <p class="packagePriceP">$5.99<span class="packageRefreshP">/month</span></p>
                <p class="packageInfoP">For those small business, or independent curators.</p>
                <ul class="featureList">
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Unlimited Actions</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Monitor 20 Playlists</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Schedule 40 Track Releases</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Schedule 20 Playlist Releases</li>
                </ul>
                <button class="tableBtn">Choose Plan</button>
            </div> 
        </div>

        <div class="tableCon" v-on:click="activeTable = 3" :class="{ 'activeTable' : activeTable === 3 }">  
            <div class="tableInner">
                <p class="tablePackageNameP">Business</p>
                <p class="packagePriceP">$99.99<span class="packageRefreshP">/month</span></p>
                <p class="packageInfoP">For those large businesses with hundreds of playlists.</p>
                <ul class="featureList">
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Unlimited Actions</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Monitor Unlimited Playlists</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Schedule Unlimited Track Releases</li>
                    <li class="featureLi"><fa class="fas" :icon="['fa', 'check-circle']"/>Schedule Unlimited Playlist Releases</li>
                </ul>
                <button class="tableBtn">Choose Plan</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTable: 2
        }
    }
}
</script>

<style scoped>
.pricingTableCon {
    width: calc(100% + 20px);
    margin-left: -10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.tableCon {
    width: 33.33%;
    padding: 0 10px;
}
.tableInner {
    filter: drop-shadow(0px 11px 29px rgba(0, 0, 0, 0.03));
    background-color: #FFF;
    width: 100%;
    border-radius: 10px;
    padding: 20px;
}
.activeTable .tableInner {
    background-color: var(--accent-1);
    padding: 40px 20px;
}
.tablePackageNameP {
    font-weight: bold;
    font-size: 18px;
} 
.activeTable .tablePackageNameP {color: #FFF;}
.packagePriceP {
    margin: 10px 0 5px;
    font-size: 40px;
    font-weight: bold;
} 
.activeTable .packagePriceP {color: #FFF;}
.packageRefreshP {
    font-size: 14px;
    color: #707070;
}
.activeTable .packageRefreshP {color: #D6D6D6;}
.packageInfoP {
    max-width: 250px;
    color: #707070;
    font-size: 14px;
}
.activeTable .packageInfoP {color: #FFF;}
.featureList {
    margin: 40px 0;
    padding: 0;
    list-style-type: none;
} 
.featureLi {
    padding: 5px 0;
    font-size: 14px;
}
.activeTable .featureLi  {color: #FFF;}
.featureLi:first-child {padding-top: 0;}
.featureLi:last-child {padding-bottom: 0;}
.featureLi .fas {
    color: #AEAFC5;
    margin-right: 5px;
    font-size: 16px;
}
.activeTable .featureLi .fas {color: #FFF;}

.tableBtn {
    background-color: #FFF;
    border: 2px solid var(--accent-1);
    width: 100%;
    padding: 10px 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    font-size: 14px;
    font-weight: bold;
    color: #2E2E2E;
}
.tableBtn:hover {
    background-color: var(--accent-1-hover);
    border: 2px solid var(--accent-1-hover);
    color: #FFF;
}
.activeTable .tableBtn {
    color: #2E2E2E;
}
.activeTable .tableBtn:hover {
    background-color: #F8F8F8;
    color: #2E2E2E;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
    .pricingTableCon {justify-content: center;}
    
    .tableCon {width: 80%; margin-bottom: 20px;}
    .tableCon:last-child {margin-bottom: 0;}
    .activeTable.tableCon {width: 90%;}
    .activeTable .tableInner {padding: 20px;}

    .tableBtn {max-width: 500px;}
}

@media only screen and (max-width: 500px) {
    .tableCon {width: 90%;}
    .activeTable.tableCon {width: 100%;}
}
</style>
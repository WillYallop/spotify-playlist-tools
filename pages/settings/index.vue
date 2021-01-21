<template>
    <div class="appPageCon">
        <!-- Usage Breakdown -->
        <UsageBreakdown/>
        <!-- Settings Container -->
        <div class="settingsCon appPageWrapper">

            <!-- Connected Accounts -->
            <div class="settingsSectCon">
                <InfoSection/> 
            </div>
            
            <!-- Connected Accounts -->
            <div class="settingsSectCon">
                <div class="settingsSectHeader">
                    <p class="sectTitleP">Connected Accounts</p>
                    <p class="sectSubTitleP">Manage your music platform accounts.</p>
                </div>
                <ConnectedAccontsList/>
            </div>

        </div>
    </div>
</template>

<script>
// Libs
import axios from 'axios'

// Components
import UsageBreakdown from '@/components/global/app/UsageBreakdown'
import InfoSection from '@/components/global/app/settings/InfoSection'
import ConnectedAccontsList from '@/components/global/app/settings/ConnectedAccontsList'

export default {
    layout: 'app',
    data() {
        return {

        }
    },
    components: {
        UsageBreakdown,
        InfoSection,
        ConnectedAccontsList
    },
    methods: {

    }
}
</script>

<style scoped>
.settingsCon {
    margin-top: -40px;
    width: 100%;
    z-index: 10;
    position: relative;
} 
.settingsSectCon {
    background-color: var(--background-2);
    border: 1px solid var(--border);
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
}
.settingsSectCon:last-child {
    margin-bottom: 0;
}
.settingsSectHeader {
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--border);
}
.sectTitleP {
    font-size: 14px;
    font-weight: bold;
    color: var(--title-text);
}
.sectSubTitleP {
    font-size: 14px;
    color: var(--body-text);
}
</style>

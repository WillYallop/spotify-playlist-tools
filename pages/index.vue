<template>
  <div>
    <Banner/>
    <div class="pageWrapper">
      
      <!-- Features Section -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'Our Features'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>
        <Features/>
      </div>

      <!-- -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'Our Pricing'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>

      </div>

      <!-- -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'What are clients have to say'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>

      </div>

      <!-- -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'Want to tell us something?'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>

      </div>

    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/index/Banner'
import CompSectTitle from '@/components/frontend/index/CompSectTitle'
import Features from '@/components/frontend/index/Features'

export default {
  middleware: 'guest-only',
  data() {
    return {

    }
  },
  components: {
    Banner,
    CompSectTitle,
    Features
  }
}
</script>

<style scoped>
.pageWrapper {
  padding: 0 20px;
}
.compSectCon {
  padding: 150px 0;
}
</style>

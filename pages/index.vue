<template>
  <div class="indexCon">
    <Banner/>
    <div class="pageWrapper">
      
      <!-- Features Section -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'Our Features'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>
        <Features/>
      </div>

      <!-- Pricing Section -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'Our Pricing'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>
        <PricingTables/>
      </div>

      <!-- -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'What are clients have to say'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>
        <Testimonials/>
      </div>

      <!-- -->
      <div class="compSectCon">
        <CompSectTitle
        :title="'Want to tell us something?'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim interdum nunc.'"/>
        <ContactForm/>
      </div>

    </div>

    <FrontendFooter/>
  </div>
</template>

<script>
import Banner from '@/components/frontend/index/Banner'
import CompSectTitle from '@/components/frontend/index/CompSectTitle'
import Features from '@/components/frontend/index/Features'
import PricingTables from '@/components/frontend/index/PricingTables'
import Testimonials from '@/components/global/frontend/Testimonials'
import ContactForm from '@/components/frontend/index/ContactForm'
import FrontendFooter from '@/components/global/frontend/FrontendFooter'

export default {
  middleware: 'guest-only',
  data() {
    return {

    }
  },
  components: {
    Banner,
    CompSectTitle,
    Features,
    PricingTables,
    Testimonials,
    ContactForm,
    FrontendFooter
  }
}
</script>

<style scoped>
.indexCon {
  overflow: hidden;
}
.pageWrapper {
  padding: 0 20px;
}
.compSectCon {
  padding:  150px 0 0;
}
</style>

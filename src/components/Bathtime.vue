<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    Gotta send some <a @click="soap">SOAP thru Posterior</a>. Probably best to do that in the bath.
  </div>
</template>

<script>
import Posterior from 'posterior';
import store from 'store2';

export default {
  data() {
    return {};
  },
  methods: {
    soap() {
      console.log('Posterior', Posterior);
      const SoapUI = window.Posterior({
        url: 'http://localhost:8000/api/FoodQuerySoapService',
        method: 'POST',
        json: false,
        headers: {
          'Content-Type': 'text/xml'
        },
        requestData: (params) => {
          return `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:gen="http://ns.esha.com/2013/genesisapi">
  <soap:Header/>
  <soap:Body>
      <gen:NutrientListRequest>
        <!--Optional:-->
        <gen:StartIndex>${params.startIndex}</gen:StartIndex>
        <!--Optional:-->
        <gen:PageSize>${params.pageSize}</gen:PageSize>
      </gen:NutrientListRequest>
  </soap:Body>
</soap:Envelope>`
        }
      });
      return SoapUI().then((val) => {
        console.log(val);
        store('soap', val);
        return val;
      });
    }
  }
}
</script>

<style>
</style>

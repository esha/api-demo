<script>
import Posterior from 'posterior';
import store from 'store2';

const defaultConfig = { rest: false };
const config = store.get('demo.config', defaultConfig);
const GenesisService = Posterior({
    url: config.mock ? 'http://localhost:8000' : 'http://eshademo.cloudapp.net/soap/FoodQueryService.svc',
    json: config.rest,
    headers: config.rest ? {} : {
        'Content-Type': 'text/xml'
    }
});

// Support console REPL w/flag
if (window && document.body.hasAttribute('debug')) {
    window.GenesisService = GenesisService;
    window.store = store;
}

export default {
    // Enables an abstract component in Vue.
    // This property is undocumented and may change at any time,
    // but this component should work without it.
    abstract: true,

    props: ['debug'],

    render() {
        // Without using a wrapper component, we can only render one child component.
        try {
            return this.$slots.default[0];
        } catch (e) {
            throw new Error('GenesisService.vue can only render one, and exactly one child component.');
        }
    },

    mounted() {
        // This needn't be reactive, so it doesn't have to be a data property
        this.GenesisService = GenesisService;
    }
}
</script>

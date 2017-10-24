<template>
<div class="search-box">
    <q-search placeholder="Search foods" autofocus clearable
        v-model="query" @keyup.enter="onEnter" @change="onChange">
        <q-autocomplete @search="search" @selected="onEnter"/>
    </q-search>
    <ul v-if="results.length">
        <li v-for="result in results" :key="result.name">{{result.name}}</li>
    </ul>
</div>
</template>

<<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
    QAutocomplete,
    QSearch
} from 'quasar';
import store from 'store2';

class SearchResult {
    name: string
    constructor(name: string) {
        this.name = name;
    }
}

class FakeResult extends SearchResult {
    static count: number = 0;
    static suffixes: Array<string> = 'One Too Bee For Live Kicks Heaven'.split(' ');
    static suffix(): string {
        return FakeResult.suffixes[FakeResult.count % FakeResult.suffixes.length];
    }
    constructor(name: string) {
        FakeResult.count += 1;
        super(name + ' ' + FakeResult.suffix());
    }
}

function fakeResults(query: string, useStored?: boolean): Array<SearchResult> {
    let fake: Array<SearchResult> = [];
    if (useStored) {
        store.get('queries', []).forEach((query: string) => {
            fake.push(new FakeResult(query + ' ' + FakeResult.suffix()))
        });
    }
    if (fake.length === 0) {
        let count: Number = Math.round(Math.random() * 10);
        for (let i = 0; i < count; i++) {
            fake.push(new FakeResult(query));
        }
    }
    return fake;
}

@Component({
    components: {
        QAutocomplete,
        QSearch
    }
})
export default class Search extends Vue {
    query: string = '';
    results: Array<SearchResult> = [];

    onInput(): void {
        if (this.$props.autocomplete) {
            console.log('Autocomplete ', this.query);
        }
    }

    onChange(): void {
        if (!this.query) {
            this.results = [];
        }
    }

    onEnter(): void {
        let query = this.query;
        if (query) {
            this.search(query);
        }
    }

    search(query: string, done?: Function): void {
        setTimeout(() => {
            if (done) {
                done(fakeResults(query, true).map(function(result) {
                    return {
                        value: result.name,
                        label: result.name
                    };
                }));
            } else {
                this.results = fakeResults(query);
                store.transact('queries', function(queries: Array<String>) {
                    queries.push(query);
                }, []);
            }
        }, 500);
    }
}
</script>

<<style lang="stylus">
    .search-box
        padding-bottom 10px
</style>

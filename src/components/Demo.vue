<template>
  <div class="demo">
    <h4>{{ title }}</h4>
    <div class="console">
        <div class="endpoint">
            <label for="endpoint">Load example code for </label>
            <select v-model="endpoint">
                <option value="ListNutrients">Query - List Nutrients</option>
                <option value="ListAllergens">Query - List Allergens</option>
                <option value="ListUnits">Query - List Units</option>
                <option value="ById">Query - Get Food By Id</option>
                <option value="ByUserCode">Query - Get Food By User Code</option>
                <option value="ByGroup">Query - Find Foods By Group Name</option>
                <option value="ByName">Query - Search Foods By Name</option>
                <option value="ByModifiedDateRange">Query - Search Foods By Date Range</option>
                <option value="Analysis">Query - Get Analysis Of User Food</option>
            </select>
            and
            <button @click="set">Replace</button>
            <button @click="add">Add</button>
        </div>
        <div class="code">
            <label for="code">Code</label>
            <button @click="run">Run This</button>
            <button @click="clear">Reset</button>
            <pre><code>{{ initCode }}</code></pre>
            <textarea v-model="code"></textarea>
        </div>
        <div class="request">
            <label for="request">Request</label>
            <textarea v-model="request"></textarea>
        </div>
        <div class="response">
            <label for="response">Response</label>
            <textarea v-model="response"></textarea>
        </div>
    </div>
    <div id="snippets" hidden>
<textarea id="ListNutrients">
// no parameters
Genesis.Query.Nutrients();
</textarea>
<textarea id="ListAllergens">
// default parameter value
Genesis.Query.Allergens(10);
</textarea>
<textarea id="ListUnits">
// XML string parameter
Genesis.Query.Units(
    '<gen:PageSize>10</gen:PageSize>'
);
</textarea>
<textarea id="ListFoods">
// JSON parameter
Genesis.Query.Foods({
    PageSize: 5,
    FilterByFoodTypes: {
        FoodType: 'Recipe',
    }
});
</textarea>
<textarea id="ById">
Genesis.Query.ById('798422bd-c422-1f6c-1358-ba860e2e8d71');
</textarea>
<textarea id="ByUserCode">
Genesis.Query.ByUserCode(15);
</textarea>
<textarea id="ByGroup">
Genesis.Query.ByGroup('My Recipes');
</textarea>
<textarea id="ByName">
Genesis.Query.ByName('Cha');
</textarea>
<textarea id="ByModifiedDateRange">
Genesis.Query.ByModifiedDateRange({
  Start: {
    'typ:DateTime': '2013-01-01T00:00:00',
    'typ:UtcOffsetInMinutes': -420,
  },
  End: {
    'typ:DateTime': '2015-12-31T23:59:59',
    'typ:UtcOffsetInMinutes': -420,
  },
});
</textarea>
<textarea id="Analysis">
Genesis.Query.Analysis(
`<gen:Quantity Type="Double">1</gen:Quantity>
<gen:UnitId>a7df0af5-001f-0000-7484-751e8eaf05c6</gen:UnitId>
<gen:FoodId>798422bd-c422-1f6c-1358-ba860e2e8d71</gen:FoodId>`);
</textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Client } from 'gersemi';
import * as Posterior from 'posterior';
import store from 'store2';
import * as ts from 'typescript';

const Genesis = new Client('http://localhost:8888/api/', { debug: 'capture' });
(window as any).Genesis = Genesis;
(window as any).store = store;

@Component
export default class Demo extends Vue {
  @Prop({default: 'Genesis API Console'}) public title!: string;

  public endpoint: string = 'ListNutrients';
  public request: string = '';
  public response: string = '';
  public initCode: string =
`// have to use a proxy until we enable CORS support
const Genesis = new Client('http://localhost:8888/api/', { debug: 'capture' });`;
  public code: string = '// Choose an endpoint above';

  constructor() {
    super();
    setTimeout(() => this.set(), 0);
  }
  public set() {
    this.code = this.getSnippet();
  }
  public add() {
    this.code += '\n' + this.getSnippet();
  }
  public run() {
    const code = ts.transpile(this.code);
    const result = eval(code);
    const fn = eval((this.code.match(/Genesis.[a-zA-Z.]+/g) || []).pop() || '') as Posterior.Requester;

    (window as any).result = result;
    (window as any).code = code;
    if (result && typeof result.then === 'function') {
      result.then((res: any) => {
        this.showCapture(fn, res);
      }).catch((e: Error) => {
        this.showCapture(fn);
      });
    }
  }
  public showCapture(fn: Posterior.Requester, res?: any) {
    if ('capture' in fn) {
      const call = (fn as any).capture;
      (window as any).capture = call;
      this.showReq(call);
      this.showRes(call, res);
    }
  }
  public showRes(call: Posterior.Capture, res?: any) {
    let response = call.status + '\n';
    if (call.responseHeaders) {
      for (const header in call.responseHeaders) {
        response += header + ': ' + call.responseHeaders[header] + '\n';
      }
    }
    this.response = response + '\n' + (call.responseBody || res);
  }
  public showReq(call: Posterior.Capture) {
      let request = `${call.method} ${call.url}`;
      if (call.requestHeaders) {
        for (const header in call.requestHeaders) {
          request += '\n' + header + ': ' + call.requestHeaders[header];
        }
      }
      if (call.requestBody) {
        request += '\n\n' + call.requestBody;
      }
      this.request = request;
  }
  public clear() {
    this.code = this.initCode;
  }
  protected getSnippet() {
    const element = document.getElementById(this.endpoint);
    return element ? (element as HTMLTextAreaElement).value : '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo {
    text-align: center;
    margin: 2em;
}
h4 {
    margin-bottom: 0;
}
pre {
  margin: 2px;
}
.console {
    text-align: left;
    display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr 1fr;
}
textarea {
    min-height: 20em;
    width: calc(100% - 10px);
}
.endpoint select {
    width: auto;
}
.endpoint {
    grid-column: 1 / span 2;
    grid-row: 1;
}
.code {
    grid-column: 1 / span 2;
    grid-row: 2;
}
.code textarea {
    min-height: 10em;
}
.request {
    grid-column: 1;
    grid-row: 3;
}
.response {
    grid-column: 2 / span 3;
    grid-row: 3;
}
</style>

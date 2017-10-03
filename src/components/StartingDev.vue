<template>
    <div class='app-startingdev layout-padding'>
    <vue-markdown>

# How to do Development on Hnoss

----

## Overview

Key thing to remember is that **Vue/React** family of web frameworks is **component-oriented**.  Every page is expected to be composed of a nested structure of components.

In **Vue**, each component gets its own **\*.vue** file.  This seems to be Vue best-practice.  There is typically a ROOT component. In Hnoss, the root component is `App.vue`, found in the `src` folder.  For Hnoss, `App.vue` is intended to remain overly simple.  The `App.vue` file currently looks like the following:

```html

&lt;template&gt;
  &lt;!-- Don't drop "q-app" class --&gt;
  &lt;div id="q-app"&gt;
    &lt;router-view /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
/*
 * Root component
 */
export default {}
&lt;/script&gt;

&lt;style&gt;&lt;/style&gt;
```

The key piece is `&lt;router /&gt;`. This comes from the `vue-router` project.  (What exactly does this mean here, by 'project'?  What is this other project?) `vue-router` displays the appropriate componetns for the current path.  (Does "current path" mean url? or file path?)  It determines the appropriate components via the `router.ts` file, which currently looks like the following:

```javascript

import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/Hello.vue'
import DevDoc from '@/DevDoc.vue'
import Error404 from '@/Error404.vue'

Vue.use(VueRouter)

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  routes: [
    { path: '/', component: Hello },
    { path: '/dev', component: DevDoc },
    
    // Always leave this last one
    { path: '*', component: Error404 } // Not found
  ]
})
```

If you're looking for a "starting place" for understanding the app structure, `router.ts` is the place to begin.  It's not at the root level of the project, as `App.vue` and `index.html` both sit lower in the directory tree, but `router.ts` is the file where code starts to move beyond boilerplate.  

Here you can find mappings between paths and components, and recall that components are the main building blocks of each page.  For example, the path `/dev` is mapped to the `DevDoc` component.

We say that "`DevDoc` is the 'root' component for that path."  Anything intended to be displayed when the browser is at that path should be in that component.  It's useful to think of *mapped components* as *pages*.

## Development work

Most of development work will happen by writing and editing the `*.vue` files in the `src/components` folder.  There's also a number of taks that have very straightforward implementations.

- Need a new page: add the mapping to the router.
- Need a new dependency: add the dependency to `package.json` file with `npm install --save &lt;dep&gt;`

### Structure of *.vue files

In the `*.vue` files, there are 3 sections:

1. Template
    - The template must always have a single root node, and whatever Vue-marked HTML you desire. In this case, **Vue-marked** means references to comopnents like `&lt;route-view/&gt;` or **Vue** attributes like `v-for`, and could even be handlebar placeholders for data like `{{ title }}`, or others.
2. Script
    - The script section should generally be **TypeScript**.  This section will provide the data and functions to render and activate the component markup.
3. Style
    - The style section will generally have Stylus language in it.  Stylus is a a dynamic stylesheet language that is compiled into CSS.



    </vue-markdown>
    </div>
</template>

<script>
import vueMarkdown from 'vue-markdown'
export default {
  name: 'app-startingdev',
  data() {
    return {}
  },
  components: {
    vueMarkdown
  }
}
</script>

<style>
</style>

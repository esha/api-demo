<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <h1 id="how-to-do-development-on-hnoss">How to do Development on Hnoss</h1>
<hr />
<h2 id="overview">Overview</h2>
<p>Key thing to remember is that <strong>Vue/React</strong> family of web frameworks is <strong>component-oriented</strong>. Every page is expected to be composed of a nested structure of components.</p>
<p>In <strong>Vue</strong>, each component gets its own <strong>*.vue</strong> file. This seems to be Vue best-practice. There is typically a ROOT component. In Hnoss, the root component is <code>App.vue</code>, found in the <code>src</code> folder. For Hnoss, <code>App.vue</code> is intended to remain overly simple. The <code>App.vue</code> file currently looks like the following:</p>
<div class="sourceCode"><pre class="sourceCode html"><code class="sourceCode html">
<span >&lt;template&gt;</span>
  <span class="co">&lt;!-- Don&#39;t drop &quot;q-app&quot; class --&gt;</span>
  <span class="kw">&lt;div</span><span class="ot"> id=</span><span class="st">&quot;q-app&quot;</span><span class="kw">&gt;</span>
    <span class="kw">&lt;router-view</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/div&gt;</span>
<span class="kw">&lt;/template&gt;</span>

<span class="kw">&lt;script&gt;</span>
<span class="co">/*</span>
<span class="co"> * Root component</span>
<span class="co"> */</span>
<span class="im">export</span> <span class="im">default</span> <span class="op">{}</span>
<span class="kw">&lt;/script&gt;</span>

<span class="kw">&lt;style&gt;&lt;/style&gt;</span></code></pre></div>
<p>The key piece is <code>&lt;router /&gt;</code>. This comes from the <code>vue-router</code> project. (What exactly does this mean here, by 'project'? What is this other project?) <code>vue-router</code> displays the appropriate componetns for the current path. (Does &quot;current path&quot; mean url? or file path?) It determines the appropriate components via the <code>router.ts</code> file, which currently looks like the following:</p>
<div class="sourceCode"><pre class="sourceCode javascript"><code class="sourceCode javascript">
<span class="im">import</span> Vue <span class="im">from</span> <span class="st">&#39;vue&#39;</span>
<span class="im">import</span> VueRouter <span class="im">from</span> <span class="st">&#39;vue-router&#39;</span>
<span class="im">import</span> Hello <span class="im">from</span> <span class="st">&#39;@/Hello.vue&#39;</span>
<span class="im">import</span> DevDoc <span class="im">from</span> <span class="st">&#39;@/DevDoc.vue&#39;</span>
<span class="im">import</span> Error404 <span class="im">from</span> <span class="st">&#39;@/Error404.vue&#39;</span>

<span class="va">Vue</span>.<span class="at">use</span>(VueRouter)

<span class="im">export</span> <span class="im">default</span> <span class="kw">new</span> <span class="at">VueRouter</span>(<span class="op">{</span>
  <span class="co">/*</span>
<span class="co">   * </span><span class="al">NOTE</span><span class="co">! VueRouter &quot;history&quot; mode DOESN&#39;T works for Cordova builds,</span>
<span class="co">   * it is only to be used only for websites.</span>
<span class="co">   *</span>
<span class="co">   * If you decide to go with &quot;history&quot; mode, please also open /config/index.js</span>
<span class="co">   * and set &quot;build.publicPath&quot; to something other than an empty string.</span>
<span class="co">   * Example: &#39;/&#39; instead of current &#39;&#39;</span>
<span class="co">   *</span>
<span class="co">   * If switching back to default &quot;hash&quot; mode, don&#39;t forget to set the</span>
<span class="co">   * build publicPath back to &#39;&#39; so Cordova builds work again.</span>
<span class="co">   */</span>
  <span class="dt">mode</span><span class="op">:</span> <span class="st">&#39;history&#39;</span><span class="op">,</span>
  <span class="dt">routes</span><span class="op">:</span> [
    <span class="op">{</span> <span class="dt">path</span><span class="op">:</span> <span class="st">&#39;/&#39;</span><span class="op">,</span> <span class="dt">component</span><span class="op">:</span> Hello <span class="op">},</span>
    <span class="op">{</span> <span class="dt">path</span><span class="op">:</span> <span class="st">&#39;/dev&#39;</span><span class="op">,</span> <span class="dt">component</span><span class="op">:</span> DevDoc <span class="op">},</span>
    
    <span class="co">// Always leave this last one</span>
    <span class="op">{</span> <span class="dt">path</span><span class="op">:</span> <span class="st">&#39;*&#39;</span><span class="op">,</span> <span class="dt">component</span><span class="op">:</span> Error404 <span class="op">}</span> <span class="co">// Not found</span>
  ]
<span class="op">}</span>)</code></pre></div>
<p>If you're looking for a &quot;starting place&quot; for understanding the app structure, <code>router.ts</code> is the place to begin. It's not at the root level of the project, as <code>App.vue</code> and <code>index.html</code> both sit lower in the directory tree, but <code>router.ts</code> is the file where code starts to move beyond boilerplate.</p>
<p>Here you can find mappings between paths and components, and recall that components are the main building blocks of each page. For example, the path <code>/dev</code> is mapped to the <code>DevDoc</code> component.</p>
<p>We say that &quot;<code>DevDoc</code> is the 'root' component for that path.&quot; Anything intended to be displayed when the browser is at that path should be in that component. It's useful to think of <em>mapped components</em> as <em>pages</em>.</p>
<h2 id="development-work">Development work</h2>
<p>Most of development work will happen by writing and editing the <code>*.vue</code> files in the <code>src/components</code> folder. There's also a number of taks that have very straightforward implementations.</p>
<ul>
<li>Need a new page: add the mapping to the router.</li>
<li>Need a new dependency: add the dependency to <code>package.json</code> file with <code>npm install --save &lt;dep&gt;</code></li>
</ul>
<h3 id="structure-of-.vue-files">Structure of *.vue files</h3>
<p>In the <code>*.vue</code> files, there are 3 sections:</p>
<ol style="list-style-type: decimal">
<li>Template
<ul>
<li>The template must always have a single root node, and whatever Vue-marked HTML you desire. In this case, <strong>Vue-marked</strong> means references to comopnents like <code>&lt;route-view/&gt;</code> or <strong>Vue</strong> attributes like <code>v-for</code>, and could even be handlebar placeholders for data like <code>{{ title }}</code>, or others.</li>
</ul></li>
<li>Script
<ul>
<li>The script section should generally be <strong>TypeScript</strong>. This section will provide the data and functions to render and activate the component markup.</li>
</ul></li>
<li>Style
<ul>
<li>The style section will generally have Stylus language in it. Stylus is a a dynamic stylesheet language that is compiled into CSS.</li>
</ul></li>
</ol>
<h2 id="short-list-of-technologies-used">Short List of Technologies used:</h2>
<p><strong>Main dev technologies:</strong></p>
<ul>
<li>Stylus (<code>.styl</code>)</li>
<li>Vue.js (<code>.vue</code>)</li>
<li>Quasar</li>
<li></li>
</ul>
<p><strong>Underlying technologies:</strong></p>
<ul>
<li>Javacript (<code>.js</code>)</li>
<li>Typescript (<code>.ts</code>)</li>
<li>HTML (<code>.html</code>, <code>.vue</code>)</li>
<li>CSS (<code>.css</code>)</li>
</ul>
<p><strong>For Setup and Build:</strong></p>
<ul>
<li>Node Package Manager (<code>npm</code> cli)</li>
<li>Webpack</li>
<li>Git (<code>.git</code> folder)</li>
<li>Webpack</li>
</ul>
    
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>

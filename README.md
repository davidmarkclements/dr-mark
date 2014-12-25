# Dr Mark

Generates summary docs, <http://redis.io/commands> style,
using repurposed (doctored) markdown

## Install

Install the `dr` executable globally

```sh
sudo npm -g install dr-mark
```

Install locally for use in a project:

```sh
npm install dr-mark --save
```

## Usage

Create a markdown file, structured like so

```markdown

# ITEM1 TITLE
* input1
* input2 
* etc

item1 description

---

# ITEM2 TITLE
* input1
* input2 
* etc

item2 description

```

Titles are marked as H1 titles, inputs (e.g. arguments), 
are listed using bullets, the description stands in it's
own paragraph (note the newline spacing). Note the 
seperator the between item descriptions. 


The HTML generated from this markdown does not conform
to the usual markdown ruleset. The example will generate the 
following HTML output.

```html
 <section id="api">
    <ul>
        <li><span class="method">ITEM1 TITLE <span class="params">input1 input2  etc</span></span><span class="synopsis">item1 description</span></span>
        </li>
        <li><span class="method">ITEM2 TITLE <span class="params">input1 input2  etc</span></span><span class="synopsis">item2 description</span>
        </li>
    </ul>
</section>

```

This allows for an optimum styling control of the content,
neccessary for creating a column based layout of summary
documentation.

## Executable

Convert "doctored markdown" to HTML (wrapped in default
head and footer html)

```sh
dr docs.md > docs.html
```

Supply header and footer HTML

```sh
dr --head header.html --foot footer.html docs.md > docs.html
```

Output suggested/base docs CSS:

```sh
dr --styles
```

## Require

To use dr-mark in a project, 

```js
var dr = require('dr-mark');
var fs = require('fs');
var myMarkdown = fs.readFileSync('./someMarkdown.md')+'';

console.log(dr(myMarkdown))
```

A second argument can be passed to the exported function, 
this is called the `lexicon` parameter, which defines id's
and class names that appear in the generated HTML (allowing
for completely custom CSS). 

The default lexicon is as follows

```js
{
    group: 'api', //id of the <section> wrapping docs
    field: 'method', //class of each item
    inputs: 'params', //class of inputs for each item
    content: 'synopsis' // class of description for each item
}
```




## Client-side

dr-mark is compatible with browserify
```js
var request = require('request');
var dr = require('dr-mark');

request('http://github.com/me/myThing/docs.md', function (err, res, body) {
  console.log(dr(body))
})
```

```sh
browserify mycode.js > bundle.js
```

This allows for (for instance) dynamically generating
doc pages from Readme.md file on github. 


## Linking Items

Any inline markdown elements will be faithfully rendered, 
so to link item titles to pages simply use an inline link.
For clarity's sake it's recommended that links are implemented 
via markdown references. 

```markdown
# [ITEM1 TITLE][]
* input1
* input2 
* etc

item1 description




[ITEM1 TITLE]: /commands/item1
```


## Credits

Developed by David Mark Clements

Sponsored by [nearForm](http://nearform.com)

var marked = require('marked-ast');

module.exports = function (md, lexicon) {  
  var ast = marked.parse(md);
  var beaut = require('js-beautify').html || function(a){return a;};
  lexicon = lexicon || {
    group: 'api', //id of the <section> wrapping docs
    field: 'method', //class of each item
    inputs: 'params', //class of inputs for each item
    content: 'synopsis' // class of description for each item
  }

  function span(lexeme) {
    return lexeme ? '<span class="' + lexicon[lexeme] + '">'  : '<span>';
  }

  span.close = function () { return '</span>'; }

  var output = '<ul><li>' + span('field') + ast.map(function (o) {

    if (o.type === 'hr') return span.close() + '</li><li>' + span('field');

    if (o.type === 'heading') return marked.render(o.text)

    if (o.type === 'list') return ' ' + span('inputs') + o.body
      .map(function (arg) { return marked.render(arg.text) }).join(' ') + span.close()

    if (o.type === 'paragraph') return span.close() + span('content') + marked.render(o.text) + span.close()

  }).join('') + '</li></ul>';

  return beaut('<section id="' + lexicon.group + '">' + output + '</section>');

}
var esadv = {
  attributes: {
    name:       'Bob'
  , estimate:    7
  }

  // Cache of elements
, els: {}

, regs: {
    nonDigits: /\D/
  }

, paths: {
    estimate: {
      'impossible':         { $lte: 0           }
    , 'unreasonably-short': { $lte: 5,  $gt: 0  }
    , 'reasonable':         { $lte: 12, $gt: 5  }
    , 'unreasonably-long':  { $gt:  12          }
    }
  }

, currentPaths: {}

, setters: {
    name: function(){
      return (
        // Cache the element
        esadv.els.name = esadv.els.name || document.getElementById('esadv-name')
      ).value;
    }
  }

, blockers: {
    estimate: function(val){
      return esadv.regs.nonDigits.test( val );
    }
  }

, init: function(){
    esadv.initEvents();
    esadv.initPaths();
  }

, initPaths: function(){
    $('.esadv-path').css('display', 'none');
    esadv.calculatePaths();
  }

, initEvents: function(){
    $('.esadv-in').on('keyup', function(e){
      var attr = e.target.className.match(/esadv-data-\S*/)[0];
      attr = attr.substring( attr.lastIndexOf('-') + 1 );
      if ( attr in esadv.blockers && esadv.blockers[ attr ]( e.target.value ) ) {
        e.target.value = esadv.attributes[ attr ];
        return e.preventDefault();
      }
      console.log("onkeyup", attr, e.target.value)
      esadv.attributes[ attr ] = e.target.value;
      esadv.renderAttr( attr, e.target );
      esadv.calculatePath( attr );
      esadv.renderPath( attr );
    });
  }

, calculatePaths: function(){
    for (var key in esadv.paths) esadv.calculatePath( key );
  }

, calculatePath: function(pathname){
    if ( !(pathname in esadv.paths) ) return;

    var path, passes, value = esadv.attributes[ pathname ];

    for (var key in esadv.paths[ pathname ]){

      path = esadv.paths[ pathname ][ key ];
      passes = true;

      for (var constraint in path){
        console.log("checking constraint", constraint, "against", value, "on path")
        switch (constraint){
          case '$lt':  if ( !(value <  path[ constraint ]) ) passes = false; break;
          case '$lte': if ( !(value <= path[ constraint ]) ) passes = false; break;
          case '$gt':  if ( !(value >  path[ constraint ]) ) passes = false; break;
          case '$gte': if ( !(value >= path[ constraint ]) ) passes = false; break;
          case '$eq':  if ( !(value == path[ constraint ]) ) passes = false; break;
          default: break;
        }
      }

      if (passes) {
        esadv.currentPaths[ pathname ] = key;
        break;
      }
    }
  }

, update: function(){
    for (var key in esadv.attributes){
      if (key in esadv.setters) esadv.attributes[ key ] = esadv.setters[ key ]();
    }
  }

, render: function(){
    for (var key in esadv.attributes) esadv.renderAttr( key );
    for (var key in esadv.paths) esadv.renderPath( key );
  }

, renderPath: function(path){
    if ( !(path in esadv.currentPaths) ) return;
    $('.esadv-path-' + path).css('display', 'none');
    $('.esadv-path-' + path + '-' + esadv.currentPaths[ path ]).css('display', 'inline');
  }

, renderAttr: function(attr, skipEl){
    $( '.esadv-data-' + attr ).each( function(index, el){
      if ( el == skipEl ) return console.log("Skipping");
      console.log("renderattr", attr, el)
      if ( el.tagName == 'INPUT' )
        el.value = esadv.attributes[ attr ];
      else
        el.innerHTML = esadv.attributes[ attr ];
    });
  }
};

(function(){
  $(function(){
    esadv.init();
    esadv.render();
    var editor = ace.edit('editor-1');
    editor.setTheme("ace/theme/github");
    var JavaScriptMode = require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());
  });
})();
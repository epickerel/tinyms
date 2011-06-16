(function($){
"use strict";
//multi select replacement -- no optgroup support!
var widgetname = 'ui-widget-multiselect',
  classwidgetname = ' class="' + widgetname,
  ui_state_active = 'ui-state-active',
  ahref = '<a href="#"',
  selectListItemTemplate = '<li>' + ahref + '>{l}</a></li>',
  create, ddMultilist, populateList;

ddMultilist = function($ul, onChange, $offsetEl){
  var toggle, opening, open, shut;
  $ul.appendTo('body').css('position', 'absolute');
  toggle = function($selectLi) {
    var selected = !$selectLi.hasClass(ui_state_active);
    $selectLi.toggleClass(ui_state_active)
      .data('option').selected = selected;
    onChange();
  };
  $ul.click(function(ev){
    ev.preventDefault();
    var t = ev.target;
    toggle(t.nodeName === 'LI' ? $(t) : $(t).closest('li'));
  });
  $(document).click(function(ev){
    if (!opening) {
      var t = $(ev.target);
      if (t.closest('ul.' + widgetname + '-select').length === 0) {
        $ul.removeClass(ui_state_active);
      }
    } else {
      opening = false;
    }
  });
  open = function(){
    opening = true;
    $ul.css($offsetEl.offset())
      .addClass(ui_state_active);
  };
  shut = function(){
    $ul.removeClass(ui_state_active);
  };
  return {
    open: open,
    shut: shut
  };
};

populateList = function($select, $list){
  var options = $select[0].options, arr = [], i, l;
  for (i=0, l=options.length; i<l; i++) {
    if (options[i].selected) {
      arr.push($(options[i]).text());
    }
  }
  $list.text(arr.join(', '));
};

create = function($select){
  var $outer = $([
      '<div', classwidgetname, '">',
        ahref, classwidgetname, '-add"><span>Add...</span></a>',
        '<ul', classwidgetname, '-select"></ul>',
        '<p', classwidgetname, '-list"></p>',
      '</div>'].join('')),
    $selectUl = $outer.children('ul.' + widgetname + '-select:first'),
    $list = $outer.children('.' + widgetname + '-list:first'),
    $options = $select.children('option'),
    $add = $outer.children('a.' + widgetname + '-add:first'),
    ddml;
  $options.each(function(){
    $( selectListItemTemplate.replace('{l}', this.innerHTML) )
        .data('option', this)
        .appendTo($selectUl);
  });
  $outer.insertBefore($select);
  $select.css({
    position: 'absolute',
    left: '-999em'
  });
  ddml = ddMultilist($selectUl, function(){
    populateList($select, $list);
  }, $add);
  $add.click(function(ev){
    ev.preventDefault();
    ddml.open();
  });
  populateList($select, $list);
};

$.fn.tinyMS = function(){
  this.each(function(){
    create($(this));
  });
  return this;
};

}(window.jQuery));

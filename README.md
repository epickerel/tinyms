tinyMS: tiny multi select
=========================

tinyMS is a super-lightweight (1.3k minified) multiselect enhancement jQuery widget. It preserves but hides the select element, presenting an "Add..." link which pops up the list of items. The user may then select or deselect as many items as they like, then click away from the list to close it. Selected items will be listed adjacent to the add link.

I wrote it because I was frustrated that all the multiple select enhancement widgets I could find were 30k and up.


Example
-------
    <label>People to crank call today:</label>
    <select name="crank_call_list" multiple="multiple">
      <option val="1">Bertie</option>
      <option val="2">Thurston</option>
      <option val="3">Smitty</option>
      <option val="4">Gertrude</option>
    </select>
    <script type="text/javascript">
      jQuery('select[multiple]').tinyMS();
    </script>

To do:
------
* Add option for changing the add link text
* Add basic css
* Create a demo
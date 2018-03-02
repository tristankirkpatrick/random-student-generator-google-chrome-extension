var timecookie = Cookies.get('timeDisplayed');

if (timecookie == 4){
  Cookies.set('timeDisplayed', 4);
}

window.onload = function controller() {

  $('#timeDisplayed').prop('value', parseInt(Cookies.get('timeDisplayed')));

  var imageSetting = Cookies.get('imagesShouldLoad');

  if (imageSetting == "true"){
    $('#imageSetting').prop('checked', true)
  }
  else{
    $('#imageSetting').prop('checked', false)
  }

  $('#imageSetting:checkbox').change(
      function(){
          if ($(this).is(':checked')) {
              console.log('true');
              $('#imageSetting').prop('checked', true)
              Cookies.remove('imagesShouldLoad');
              Cookies.set('imagesShouldLoad', true);
          }
          else {
            console.log('false');
            $('#imageSetting').prop('checked', false)
            Cookies.remove('imagesShouldLoad');
            Cookies.set('imagesShouldLoad', false);
          }
      });

      $('#timeDisplayed').change(
          function(){
            Cookies.remove('timeDisplayed');
            Cookies.set('timeDisplayed', this.value);
            console.log(this.value);
            console.log(Cookies.get('timeDisplayed'));
          });







}

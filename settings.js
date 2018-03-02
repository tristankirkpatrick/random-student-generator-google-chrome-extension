window.onload = function controller() {

  var imageSetting = Cookies.get('imagesShouldLoad');
  console.log(imageSetting);

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


}

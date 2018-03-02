window.onload = function controller() {

swal.close()

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-113130467-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

    $("#nostudents").hide();
    chrome.storage.local.get(['storedClassrooms'], function (courses) {
        $("#content").append("<div id='courseList'></div > ");
        if (courses.storedClassrooms.length > 0) {
            $("#preloader").hide();
            for (i = 0; i < courses.storedClassrooms.length; i++) {
                var course = courses.storedClassrooms[i];
                $("#courseList").append("<a class='waves-effect waves-light btn fullwidth blue classroomid' data='" + course.id + "'> "+ course.name +"</a>");
            }
        } else {
            $("#courseList").append("<h5><span class=grey-text text-darken-2>Select a Classroom</span></h5>");
        }
        loadStudents();
    })
}

function loadStudents() {
    chrome.storage.local.get(['storedClassrooms'], function (courses) {
        $('.classroomid').click(function () {


          chrome.tabs.executeScript({ file: "js/sweetalert2.js" }, function (result) {});
          chrome.tabs.executeScript({ file: "js/jquery-3.2.1.min.js" }, function (result) {});

            var $input = $(this);
            var courseid = $input.attr("data");
            var students;
            var studentlength;
            var classrooms = courses.storedClassrooms.length;

              for (i = 0; i < classrooms; i++) {
                  if(courses.storedClassrooms[i].id == courseid){
                      students = courses.storedClassrooms[i].students.students;
                      if (students == null){
                        chrome.tabs.executeScript({ code: 'swal({type:"error",title:"Oops...",text:"No students were found in this Google Classroom. You can add them via class code or adding each student manually on the Students tab!"});' }, function (result) {
                        });
                        window.close();
                      }
                  }
              }

            var randomNumber = Math.floor(Math.random() * students.length);
            var image;
            var selectedStudent = [students[randomNumber].profile.name.fullName, students[randomNumber].profile.photoUrl];

            var imageSetting = Cookies.get('imagesShouldLoad');
            console.log(imageSetting);

            // If no image exists, assign a user profile generic image
            if (selectedStudent[1].substring(0, 5) == "https") {
                image = `</br><img style="height:210px;border-radius: 50%;" src="https://robohash.org/` + selectedStudent[0] + `.png?bgset=bg1?size=210x210">`;
            } else {
                if (imageSetting == "false") {
                    image = `</br><img style="height:210px;border-radius: 50%;" src="https://robohash.org/` + selectedStudent[0] + `.png?bgset=bg1?size=210x210">`;
                } else {
                    image = `</br><img style="height:210px;border-radius: 50%;" src="https:` + selectedStudent[1] + `">`;
                }
            }

            var timerDuration = Cookies.get('timeDisplayed')*1000;
            console.log(timerDuration);

            // Alert the user of the chosen student
            var randomStudentAlert = "swal({title:'" + selectedStudent[0] + "',html: '" + image + "',timer: " + timerDuration + ",animation: true,showCloseButton: true,onOpen:()=>{swal.showLoading()}}).then((result)=>{if(result.dismiss==='timer'){}})";
            chrome.tabs.executeScript({ code: randomStudentAlert }, function (result) {});
            window.close();
        })
    })
}

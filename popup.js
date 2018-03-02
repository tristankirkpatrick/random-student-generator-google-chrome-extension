window.onload = function controller() {

    $("#nostudents").hide();
    chrome.storage.local.get(['storedClassrooms'], function (courses) {
        $("#content").append("<div id='courseList'></div > ");
        console.log("Amount of data currently in storage: " + courses.storedClassrooms.length);
        if (courses.storedClassrooms.length > 0) {
            $("#preloader").hide();
            for (i = 0; i < courses.storedClassrooms.length; i++) {
                var course = courses.storedClassrooms[i];
                $("#courseList").append("<a class='waves-effect waves-light btn fullwidth blue classroomid' data='" + course.id + "'><i class='material-icons right'>group</i> "+ course.name +"</a>");
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
          window.close();
            var $input = $(this);
            var courseid = $input.attr("data");
            var students;
            var studentlength;
            var classrooms = courses.storedClassrooms.length;

              for (i = 0; i < classrooms; i++) {
                  if(courses.storedClassrooms[i].id == courseid){
                      students = courses.storedClassrooms[i].students.students;
                      if (students == null){
                        console.log("NULL!!!!!!");
                      }
                  }
              }

            var randomNumber = Math.floor(Math.random() * students.length);
            var image;
            var selectedStudent = [students[randomNumber].profile.name.fullName, students[randomNumber].profile.photoUrl];

            var imageSetting = Cookies.get('imagesShouldLoad');

            // If no image exists, assign a user profile generic image
            if (selectedStudent[1].substring(0, 5) == "https") {
                image = `<img style="height:200px;border-radius: 50%;" src="https://public.acloud.guru/assets/profile-no-image.png">`;
            } else {
                if (imageSetting == "false") {
                    image = `<img style="height:200px;border-radius: 50%;" src="https://public.acloud.guru/assets/profile-no-image.png">`;
                } else {
                    image = `<img style="height:200px;border-radius: 50%;" src="https:` + selectedStudent[1] + `">`;
                }
            }

            // Alert the user of the chosen student
            var code = "swal({title:'" + selectedStudent[0] + "',html: '" + image + "',timer:4000,animation: false,customClass: 'animated bounceInLeft',onOpen:()=>{swal.showLoading()}}).then((result)=>{if(result.dismiss==='timer'){}})";

            chrome.tabs.executeScript({ file: "js/sweetalert2.js" }, function (result) {
                chrome.tabs.executeScript({ file: "js/jquery-3.2.1.min.js" }, function (result) {
                    chrome.tabs.executeScript({ code: code }, function (result) {
                    });
                });
            });
        })
    })

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-113130467-2']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}

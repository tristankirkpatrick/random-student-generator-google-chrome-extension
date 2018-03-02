// Set default cookies

Cookies.set('imagesShouldLoad', true);
Cookies.set('timeDisplayed', 4);

auth();

function auth(){
  chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      //Push Manual Authorise Button to UI
    } else {
      //Authorised
      classroomsExist(token);
    }
    return token;
  });
}

function classroomsExist(token) {
  function logBytes(bytes) {
  }
  if (chrome.storage.local.getBytesInUse(['storedClassrooms'], logBytes) == null) {
    saveClassrooms(token);
  }
  else {
    loadClassrooms(token);
  }
}

function loadClassrooms() {
  chrome.storage.local.get('storedClassrooms', function (courses) {
    //push these to UI
  })
}

function saveClassrooms(token) {
  callClassroomsApi(token)
    .then(courses => toLocalStorage(courses));
}

function toLocalStorage(courses) {
  chrome.storage.local.set({ 'storedClassrooms': courses });
}

function callClassroomsApi(token) {

  const options = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return fetch("https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&teacherId=me", options)
    .then(res => res.json())
    .then(({ courses }) => {
      return Promise.all(courses.map((course) => {
        return fetch(`https://classroom.googleapis.com/v1/courses/${course.id}/students`, options)
          .then(res => res.json())
          .then(students => Object.assign({}, course, { students }))
        return courses;
      }))
    })
}

function refreshClassroomData(){
    chrome.storage.local.clear();
    window.close();
}

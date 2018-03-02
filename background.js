auth();

function auth(){
  chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      //Push Manual Authorise Button to UI
    } else {
      //Authorised
      console.log('Token acquired: ' + token +
        ' See chrome://identity-internals for details.');
      classroomsExist(token);
    }
    return token;
  });
}

function classroomsExist(token) {
  function logBytes(bytes) {
    console.log(bytes);
  }
  if (chrome.storage.local.getBytesInUse(['storedClassrooms'], logBytes) == null) {
    console.log("Getting classrooms from the API")
    saveClassrooms(token);
  }
  else {
    console.log("Classrooms are in storage. Get from Storage");
    loadClassrooms(token);
  }
}

function loadClassrooms() {
  chrome.storage.local.get('storedClassrooms', function (courses) {
    //push these to UI
    console.log("Loading classrooms from storage");
    console.log(courses);
  })
}

function saveClassrooms(token) {
  callClassroomsApi(token)
    .then(courses => toLocalStorage(courses));
}

function toLocalStorage(courses) {
  console.log("Saving to storage...");
  chrome.storage.local.set({ 'storedClassrooms': courses });
  console.log("Saved");
  console.log(courses[0].id);
}

function callClassroomsApi(token) {
  console.log("Whilst developing, check these match:");

  console.log(token);
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

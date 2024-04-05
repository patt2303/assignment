let currentPage = 1;
let isLoading = false;

// Function to handle scroll event
window.onscroll = function() {
  if (!isLoading) {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight
    ) {
      currentPage++;
      isLoading = true;
      fetch(
        `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${currentPage}&type=upcoming`
      )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("data2", data);
        const injectableContent2 = data.events
          .map((item) => {
            return `<div class="slider-item">
              <img src="${item.imgUrl}">
              <h3>${item.eventName}</h3>
              <p>${item.cityName}</p>
            </div>`;
          })
          .join("");
        document.getElementById("sliderItems").innerHTML +=
          injectableContent2;
        isLoading = false;
      });
    }
  }
};

// Fetch recommended events on window load
window.onload = function() {
  fetch(
    "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco"
  )
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log("data", data);
    const injectableContent = data.events
      .map((item) => {
        return `<div class="slider-item">
          <img class="customimg" src="${item.imgUrl}" />
          <h3>${item.eventName}</h3>
          <p>${item.cityName}</p>
        </div>`;
      })
      .join("");
    document.getElementById("sliderItems").innerHTML = injectableContent;
  });

  // for upcoming 
  fetch('https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log('data2:', data);
    const injectableContent2 = data.events
      .map((item) => {
        return `<div class="grid-item">
                  <div class="card">
                    <div class="image-container2" style="border-radius: 80px;">
                      <img src=${item.imgUrl}>
                    </div>
                    <div class="card-content">
                      <h3>${item.eventName}</h3>
                      <p>${item.cityName}</p>
                    </div>
                  </div>
                </div>`;
      })
      .join("");
    document.getElementById("injectUpcoming").innerHTML =
      injectableContent2;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


};

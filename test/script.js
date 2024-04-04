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
              <img src="${item.img_url}">
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
          <img src="${item.img_url}">
          <h3>${item.eventName}</h3>
          <p>${item.cityName}</p>
        </div>`;
      })
      .join("");
    document.getElementById("sliderItems").innerHTML = injectableContent;
  });
};

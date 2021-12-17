$(document).ready(function () {
  const _profileDataUrl = "assets/js/profile.json";
  const _alphaDataUrl = "assets/js/alpha.json";
  // callback fetchapi function
  function fetchApi(url, cb) {
    $.getJSON(url, function (data) {
      cb(data);
    });
  }
  // fetch api profile data function
  fetchApi(_profileDataUrl, function (data) {
    profiledata(data);
  });
  // fetch api alpha data
  fetchApi(_alphaDataUrl, function (data) {
    alphadata(data);
  });
  // display profiledata
  function profiledata(data) {
    if (!data.length) {
      $(".hide-container").removeClass("hide");
    } else {
      $(".hide-container").addClass("hide");
    }

    let row = "";
    for (i = 0; i < data.length; i++) {
      row += `<div  class="agent-container">
                      <div  class="agent-image">
                        <a><img src = "  ${data[i].url}  "  alt=" ${data[i].name} "/></a>
                      </div>
                      <div  class="agent-contents">
                        <h3><span>${data[i].name}</span></h3>
                        <p>${data[i].title} </p>
                        <a href="#"> M: ${data[i].m}</a>    
                        <a href="#"> O: ${data[i].o}</a> 
                        <a href="#">${data[i].email}</a>
                    </div> 
                </div>`;
    }
    $("#profile-container").html("").append(row);
  }
  // display Alphadata
  function alphadata(data) {
    let ul = "";
    for (i = 0; i < data.length; i++) {
      ul += ` <li><a href="#" class="alphabet">${data[i]}</a></li>  `;
    }
    $("#nav").html("").append(ul);
  }
  // on keyub function
  $("#myInput").on("keyup", function (event) {
    if ($(event.currentTarget).val() == "") {
      $(".close").hide();
    } else {
      $(".close").show();
    }
    const value = $(event.currentTarget).val();
    fetchApi(_profileDataUrl, function (data) {
      const result = searchData(value, data);
      profiledata(result);
    });
  });
  // Search data function
  function searchData(value, data) {
    value = value.toLowerCase();
    const filteredData = [];
    for (i = 0; i < data.length; i++) {
      let name = data[i].name.toLowerCase();

      if (name.includes(value)) {
        filteredData.push(data[i]);
      }
    }
    return filteredData;
  }
  //  placeholder close and reset button function
  $(".close").on("click",function () {
    fetchApi(_profileDataUrl, function (data) {
      $(".search-input").val("");
      profiledata(data);
      $(".close").hide();
    });
  });

  // on click aplahabet
  $(document).on("click", ".alphabet", function (event) {
    event.preventDefault();
    $(".alphabet").removeClass("alphalist");
    $(event.currentTarget).addClass("alphalist");
    const seachTextValue = $(event.currentTarget).text();
    fetchApi(_profileDataUrl, function (data) {
      const alphaSearchResult = searchInput(seachTextValue, data);
      seachTextValue === "ALL"
        ? profiledata(data)
        : profiledata(alphaSearchResult);
    });
  });
  // search input function
  function searchInput(text, data) {
    const filteredData = [];
    for (i = 0; i < data.length; i++) {
      text = text.toLowerCase();
      let name = data[i].name.toLowerCase().charAt(0);
      if (name === text) {
        filteredData.push(data[i]);
      }
    }
    return filteredData;
  }
});

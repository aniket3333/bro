document.addEventListener("DOMContentLoaded", function () {
  // open the modal
  document.querySelectorAll(".clik").forEach(function (card) {
    card.addEventListener("click", function () {
      $("#orderModal").modal("show");
    });
  });

  // form submission
  document
    .getElementById("orderForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const comments = document.getElementById("comments").value;
      const data = {
        firstname: name,
        middlename: "Doe",
        lastname: "Smith",
        phonenumber1: "123-456-7890",
        phonenumber2: "987-654-3210",
        phonenumber3: "555-555-5555",
        dob: "1990-01-01",
        email: email,
        address: "123 Main St",
        city: "Anytown",
        country: "USA",
        state: "CA",
        message: comments,
      };

      fetch("https://forms.maakeetoo.com/formapi/535", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Code": "7XD9UD02O9M9J8CZRMM5S5PA1",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Failed to submit the order. Please try again later.");
            throw new Error("Request failed");
          }
        })
        .then((data) => {
          alert("Order submitted successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "An error occurred while submitting the order. Please try again later."
          );
        });

      hideOrderModal();
    });

  // slider
  function updatePlan(userCount) {
    var plans = document.querySelectorAll(".card");
    plans.forEach(function (plan, index) {
      if (userCount >= index * 10 && userCount < (index + 1) * 10) {
        plan.classList.add("highlighted");
      } else {
        plan.classList.remove("highlighted");
      }
    });
  }

  var userCountSlider = document.getElementById("userCount");
  var userCountLabel = document.getElementById("userCountLabel");
  userCountSlider.addEventListener("input", function () {
    var userCount = parseInt(userCountSlider.value, 10);
    userCountLabel.textContent = userCount;
    updatePlan(userCount);
  });

  updatePlan(parseInt(userCountSlider.value, 10));
  function showOrderModal() {
    orderModal.style.display = "block";
  }

  function hideOrderModal() {
    orderModal.style.display = "none";
  }

  // lazy loadin concept

  let isFetching = false;

  async function fetchData() {
    debugger;
    try {
      const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/photos`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function displayData(data) {
    const resultsContainer = document.getElementById("results");

    data.forEach((item) => {
      const resultElement = document.createElement("div");
      resultElement.className = "col-md-4";
      resultElement.style.marginBottom = "20px";

      const imgElement = document.createElement("img");
      imgElement.src = item.url;
      resultElement.appendChild(imgElement);
      resultsContainer.appendChild(resultElement);
    });
  }
  function isAtBottom() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const contentHeight = document.documentElement.scrollHeight;
    return windowHeight + scrollY >= contentHeight;
  }

  async function loadMoreData() {
    debugger;
    if (!isFetching) {
      isFetching = true;
      const newData = await fetchData();
      displayData(newData.photos);

      isFetching = false;
    }
  }

  window.addEventListener("scroll", () => {
    if (isAtBottom()) {
      document.getElementById("loading").style.display = "block";
      loadMoreData().then(() => {
        document.getElementById("loading").style.display = "none";
      });
    }
  });

  loadMoreData();
});

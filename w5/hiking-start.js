const imgBasePath = "//byui-cit.github.io/cit261/examples/";
import { hikeList } from './hikes.js';

//on load grab the array and insert it into the page
window.addEventListener("load", () => {
  showHikeList();
});

function showHikeList() {
  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
  renderHikeList(hikeList, hikeListElement);
}

function renderHikeList(hikes, parent) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHike(hike));
  });
}
function renderOneHike(hike) {
  const item = document.createElement("li");

  item.innerHTML = ` <h2>${hike.name}</h2>
        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
        </div>`;

  return item;
}

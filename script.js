const data = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

function fetchTreeData() {
  const apiUrl = "https://example.com/api/services";

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response Eror");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Eror", error);
    });
}

function buildTree(data, parentId, depth) {
  const ul = document.createElement("ul");
  data.services
    .filter((service) => service.head === parentId)
    .sort((a, b) => a.sorthead - b.sorthead)
    .forEach((service) => {
      const li = document.createElement("li");
      li.textContent = `${service.name} (${service.price})`;
      ul.appendChild(li);
      if (service.node === 1) {
        const childUl = buildTree(data, service.id, depth + 1);
        childUl.classList.add("hidden");
        ul.appendChild(childUl);
        li.addEventListener("click", function (event) {
          childUl.classList.toggle("hidden");
          event.stopPropagation();
        });
      }
    });
  return ul;
}

let treeData;
if (data) {
  treeData = Promise.resolve(data);
} else {
  treeData = fetchTreeData();
}

treeData.then((data) => {
  const treeContainer = document.getElementById("tree");
  treeContainer.appendChild(buildTree(data, null, 0));
});

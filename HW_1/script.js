fetch('./musicCollection.json')
  .then(response => response.json())
  .then(data => {
    const musicCollection = {
      albums: data.albums,

      [Symbol.iterator]() {
        let index = 0;
        const albums = this.albums;

        return {
          next() {
            if (index < albums.length) {
              return { value: albums[index++], done: false };
            } else {
              return { done: true };
            }
          }
        };
      }
    };

    const albumList = document.getElementById("album-list");

    for (const album of musicCollection) {
      const li = document.createElement("li");
      li.textContent = `${album.title} - ${album.artist} (${album.year})`;
      albumList.appendChild(li);
      console.log(`${album.title} - ${album.artist} (${album.year})`);
    }
  })
  .catch(error => {
    console.error("Ошибка загрузки музыкальной коллекции:", error);
  });



  fetch('./ordersData.json')
  .then(response => response.json())
  .then(data => {
    // Создаем Map с блюдами и поварами
    const dishToChefMap = new Map(Object.entries(data.dishes));

    // Создаем клиентов как объекты
    const clients = {};
    const clientOrdersMap = new Map();

    data.orders.forEach(order => {
      const clientObj = { name: order.client };
      clients[order.client] = clientObj;
      clientOrdersMap.set(clientObj, order.dishes);
    });

    // Отображаем информацию в консоли
    console.log("=== Заказы и повара ===");
    for (const [client, dishes] of clientOrdersMap.entries()) {
      console.log(`Клиент: ${client.name}`);
      dishes.forEach(dish => {
        const chef = dishToChefMap.get(dish);
        console.log(`  - ${dish} (повар: ${chef})`);
      });
    }

    // Или отобразить в HTML
    const ordersList = document.createElement("div");
    ordersList.innerHTML = "<h2>Заказы клиентов</h2>";

    for (const [client, dishes] of clientOrdersMap.entries()) {
      const section = document.createElement("section");
      const title = document.createElement("h3");
      title.textContent = `Клиент: ${client.name}`;
      section.appendChild(title);

      const ul = document.createElement("ul");
      dishes.forEach(dish => {
        const chef = dishToChefMap.get(dish);
        const li = document.createElement("li");
        li.textContent = `${dish} (повар: ${chef})`;
        ul.appendChild(li);
      });

      section.appendChild(ul);
      ordersList.appendChild(section);
    }

    document.body.appendChild(ordersList);
  })
  .catch(error => {
    console.error("Ошибка загрузки заказов:", error);
  });

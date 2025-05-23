let initialDataLoaded = false;

let data = JSON.stringify([
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    event: "Seminar",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "987-654-3210",
    event: "Webinar",
  },
]);

const addItem = (item) => {
  const tableBody = document.getElementById("tableBody");
  const row = document.createElement("tr");
  const name = document.createElement("td");
  const email = document.createElement("td");
  const phone = document.createElement("td");
  const event = document.createElement("td");
  name.textContent = item.name;
  email.textContent = item.email;
  phone.textContent = item.phone;
  event.textContent = item.event;
  row.appendChild(name);
  row.appendChild(email);
  row.appendChild(phone);
  row.appendChild(event);
  tableBody.appendChild(row);
};

const loadData = () => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const dataArray = JSON.parse(xhr.responseText);

      if (initialDataLoaded) {
        addItem(dataArray[dataArray.length - 1]);
      } else {
        dataArray.forEach((item) => addItem(item));
        initialDataLoaded = true;
      }
    }
  };

  xhr.onerror = () => {
    window.alert("Request failed");
  };

  xhr.open("GET", "data:application/json," + encodeURIComponent(data), true);
  xhr.send();
};

window.onload = () => {
  try {
    loadData();
  } catch (err) {
    window.alert(err);
  }
};

const createItem = () => {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const event = document.getElementById("event").value;
    const dataArray = JSON.parse(data);
    const newItem = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      event: event.trim(),
    };
    validate(newItem);
    dataArray.push(newItem);
    data = JSON.stringify(dataArray);
    loadData();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("event").value = "Workshop";
  } catch (err) {
    window.alert(err);
  }
};

const validate = (newItem) => {
  const { name, email, phone, event } = newItem;

  if (!name) {
    throw new Error("Name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!phone) {
    throw new Error("Phone is required");
  }

  if (!event) {
    throw new Error("Event is required");
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    throw new Error("Name must only contain letters and spaces.");
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new Error("Email must be a valid email address.");
  }

  if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    throw new Error("Phone must be in the format 123-456-7890.");
  }

  if (!["Workshop", "Seminar", "Webinar"].includes(event)) {
    throw new Error(
      "Event must be one of the following: Workshop, Seminar, Webinar"
    );
  }
};

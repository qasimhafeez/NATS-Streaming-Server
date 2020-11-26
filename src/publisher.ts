import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("tickets", "pb_id", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "1",
    account_number: "PK555",
    price: 500,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});

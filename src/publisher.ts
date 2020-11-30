import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("tickets", "pb_id", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  publisher.publish({
    id: "1",
    account_number: "PK555",
    balance: 500,
  });

  // const data = JSON.stringify({
  //   id: "1",
  //   account_number: "PK555",
  //   balance: 500,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});

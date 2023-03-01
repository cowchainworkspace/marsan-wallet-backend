import { Socket } from "socket.io";
import { io } from "../app";
import { PriceDTO } from "../dtos/Price.dto";
import { RoomTypes } from "../types/enums/roomTypes";
import { PriceEvents } from "../types/events/Price.events";

class WsService {
  async subscribe(socket: Socket) {
    console.log("New socket connected to the room", RoomTypes.PRICE);
    socket.join(RoomTypes.PRICE);
  }

  async handlePriceUpdated(price: PriceDTO) {
    try {
      io.to(RoomTypes.PRICE).emit(PriceEvents.PRICE_UPDATED, price);
    } catch (error) {}
  }
}

export const PriceWs = new WsService();

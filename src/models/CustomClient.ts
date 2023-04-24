import { Client, ClientOptions, Collection } from "discord.js"
import { Command } from "./Command";

class CustomClient extends Client {
  commands: Collection<any, any>
  constructor(options:ClientOptions) {
   super(options)
   this.commands = new Collection<string, Command>();
  }
}

export { CustomClient }
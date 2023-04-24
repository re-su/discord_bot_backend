import {client, config} from "./discord-config";
import {apiConfig} from "./api-config";

config();
apiConfig(client);
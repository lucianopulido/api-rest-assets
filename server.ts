import {createExpressServer} from "routing-controllers";
import {Assetcontroller} from "./controller/assetcontroller";

const server = createExpressServer({
    controllers: [Assetcontroller],
    cors: {
        origin: '*',
    }
})

const port = 8080;
server.listen(port, () => {
    console.log('El servidor se esta ejecutando en http://localhost:', port)
});
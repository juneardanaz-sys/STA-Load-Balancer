export default class LoadBalancer {
  // import vite.config;
  
  constructor(servers) {
    // Ejemplo de un servidor:
    // {
    //   id: "server-2",
    //   power: 3,          // Unidades de trabajo por segundo simulado
    //   activeRequest: { id: "P01", payload: "08319462", work: 4 }, // null si está libre
    //   queuedRequests: [{ id: "P02", payload: "74150328", work: 2 }],
    //   activeProgress: 0.25 // Progreso de 0 a 1 (0 si está libre)
    // }
    // Los datos son de solo lectura y se actualizan durante la simulación.
    this.servers = Object.freeze([...servers]);
    this.next=0;
    this.rotation = servers.flatMap((server) => Array(server.power).fill(server.id));
  }

  async onRequestArrival(request, sendToServer) {
    // Ejemplo de la petición que llega:
    // {
    //   id: "request-17",
    //   payload: "08319462", // Datos que envía el cliente
    //   work: 4              // Unidades de trabajo necesarias
    // }
    let servidor = this.servers[0];

    for (const server of this.servers){
        let num_conex_mio = (servidor.activeRequest ? 1:0) + servidor.queuedRequests.length;
        let num_conex_tuyo = (server.activeRequest ? 1:0) + server.queuedRequests.length;
        if(num_conex_tuyo < num_conex_mio){
          servidor = server;
        }
    }
   
  let serverId = servidor.id;

  return sendToServer(serverId);
  }
}

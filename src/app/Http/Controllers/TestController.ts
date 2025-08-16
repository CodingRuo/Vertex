export default class TestController {
    routes() {
        return {
            "/test": {
                GET: this.index.bind(this),
                POST: this.store.bind(this)
            },
            "/test/:id": this.show.bind(this)
        };
    }

    async index(req: Request) {
        return new Response("Hello from TestController! GET /test", {
            headers: { "Content-Type": "text/plain" }
        });
    }

    async store(req: Request) {
        const body = await req.json();
        return Response.json({
            message: "Data received in TestController",
            data: body
        });
    }

    async show(req: Request & { params: { id: string } }) {
        const { id } = req.params;
        return Response.json({
            message: `Showing item ${id} from TestController`
        });
    }
}
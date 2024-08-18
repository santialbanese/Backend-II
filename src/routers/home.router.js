import BaseRouter from "./base.router.js";

export default class HomeRouter extends BaseRouter{ 
    constructor(){
        super();
        this.initialize();
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", this.getTemplateHome);

        router.use((error, req, res, next) => { 
            res.sendError(error);
        })
    }

    getTemplateHome(req, res){
        res.status(200).render({title: "inicio2"})
    }

}
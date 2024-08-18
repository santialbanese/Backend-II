import { Router } from "express";

const router = Router();

const users = [
    {
        username: "Juan",
        password: "1234"
    },
    {
        username: "José",
        password: "4321"
    },
];

const validateSession = (req, res, next) => { 
    if(!req.session?.username){
        return res.status(403).send("Este recurso es privado")
    }
    next();
}

router.get("/", (req, res) => {
    res.status(200).render("login");

    if(!req.session?.username){
        return res.status(200).send("Te damos la bienvenida!")
    }

    if(!req.session.counter){
        req.session.counter = 1;
        return res.status(200).send(`Bienvenido ${req.session.username}`)
    }

    req.session.counter++;
    return res.status(200).send(`${req.session.username} visitaste esta página ${req.session.counter} veces.`)

});

router.get("/", (req, res) => {
    const { username, password } = req.query;
});


router.get("/login", (req, res) => { 
    const {username, password} = req.query;
    const user = users.find((user) => user.username === username && user.password === password);
    if(!user){
        res.status(401).json("usuario o contraseña incorrecta");
    }
    req.session.username = username;
    res.status(200).send("se ha iniciado sesión");
})

router.get("/logout", (req, res) => { 
    req.session.destroy();
    res.status(200).send("se ha cerrado sesión");
})

router.get("/private", validateSession, (req, res) => { 
    res.status(200).send("has accedido a un recurso privado");
})



//cokie
router.post("/", async (req, res) => { 
    const { name, email } = req.body;

    const options = {
        secure: true,
        maxAge: 100000,
        path: "/",
        signed: true
    }

    res.cookie("name", name, options)
    res.cookie("email", email, options)


    res.status(200).send("las cokies se han creado");
})
router.get("/getCokie", async (req, res) => { 
    const {name, email} = req.signedCookies;
    res.status(200).json({name, email});
})
router.get("/delete", async (req, res) => { 
    res.clearCookie("name");
    res.status(200).json(req.signedCookies);
})


export default router;
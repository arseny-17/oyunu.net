import { withSessionRoute } from "../lib/config/withSession"

const VALID_EMAIL = "admin";
const VALID_PASSWORD = "12345";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            req.session.user = {
                username: "admin",
                isAdmin: true
            };
            await req.session.save();
            res.send({ ok: true });
        }
        return res.status(403).send("Not authorized");
    }
    return res.status(404).send("Not allowed method");
}
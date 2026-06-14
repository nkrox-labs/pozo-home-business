import { Router, type IRouter } from "express";
import healthRouter from "./health";
import quotesRouter from "./quotes";
import servicesRouter from "./services";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/quotes", quotesRouter);
router.use("/services", servicesRouter);
router.use("/admin", adminRouter);

export default router;

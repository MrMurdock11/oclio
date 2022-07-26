import { Request } from "express";

import { User } from "../../models/user";

export type RequestWithUser = {
	user: User;
} & Request;

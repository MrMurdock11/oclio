import { Request } from "express";

import { User } from "../../core/models";

export type RequestWithUser = {
	user: User;
} & Request;

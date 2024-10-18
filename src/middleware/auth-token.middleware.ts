import { FirebaseService } from "./../services/firebase.service";
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Response } from "express";
import AuthRequest from "src/types/Request";

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(protected firebaseAdmin: FirebaseService) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const tokenString = req.headers["authorization"]?.split(" ")[1];

    if (tokenString) {
      try {
        req.user = await this.firebaseAdmin.parseToken(tokenString);
        next();
      } catch (error) {
        console.log("error-authTokenMiddleware: ", error);
        throw new UnauthorizedException("Invalid token");
      }
    } else {
      throw new UnauthorizedException("Token is required");
    }
  }
}

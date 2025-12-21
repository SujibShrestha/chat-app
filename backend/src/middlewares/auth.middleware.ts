import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, type IUser } from "../models/user.model.js";

interface AuthRequest extends Request {
  user?: IUser;
}
interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

const verify = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if(!token){
        return res.status(401).json({message:"token is missing"})
      }

      //Verify Token
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload ;
console.log(decoded);
        //GEt user based on token
      req.user = await User.findById(
        decoded.id
      ).select("-password")

      next();
    } catch (error) {
         res.status(401).json({ message: "Not authorized, token failed" });
    }
  }else{
    res.status(401).json({ message: "Not authorized, no token" });
  }
 
};

export default verify
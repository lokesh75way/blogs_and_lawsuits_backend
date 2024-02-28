import { AccessControl } from "accesscontrol";
import { NextFunction, Request, Response } from "express";

import Admin, { AdminRole } from "../schema/Admin";
import Permission from "../schema/Permission";

const ac = new AccessControl();

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query: any = req.query || req.user;
  // @ts-ignore
  const role = req.user.role;
  const method = req["method"];
  const url = req.baseUrl.replace("/api", "");

  if (role === AdminRole.ADMIN) {
    next();
    return;
  }

  const data = await Permission.findOne({
    where: {
      role: role,
      endPoint: url,
      method: method,
    },
  });

  const endPoint = data?.endPoint; // for dynamic from db
  //   const endPoint = url;

  if (data && role && role === AdminRole.STAFF) {
    const access = ac.grant(AdminRole.STAFF);
    if (method == "GET") {
      ac.grant(AdminRole.STAFF).readAny(endPoint);
      const permission = ac.can(role).readAny(url);
      if (permission.granted) {
        next();
      } else {
        res.status(403).send();
      }
    }
    if (method == "POST") {
      ac.grant(AdminRole.STAFF).createOwn(endPoint);
      const permission = ac.can(role).createOwn(url);
      if (permission.granted) {
        next();
      } else {
        res.status(403).send();
      }
    }
    if (method == "PUT") {
      ac.grant(AdminRole.STAFF).updateAny(endPoint);
      const permission = ac.can(role).updateAny(url);
      if (permission.granted) {
        next();
      } else {
        res.status(403).send();
      }
    }
    if (method == "DELETE") {
      ac.grant(AdminRole.STAFF).deleteAny(endPoint);
      const permission = ac.can(role).deleteAny(url);
      if (permission.granted) {
        next();
      } else {
        res.status(403).send();
      }
    }
    if (method == "PATCH") {
      ac.grant(AdminRole.STAFF).update(endPoint);
      const permission = ac.can(role).update(url);
      if (permission.granted) {
        next();
      } else {
        res.status(403).send();
      }
    }
    return false;
  } else {
    res.status(401).send({
      success: false,
      message: "Unauthorize access",
    });
  }
};

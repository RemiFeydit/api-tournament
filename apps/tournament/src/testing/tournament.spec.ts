import { app } from "../app";
import * as request from "supertest";
import {
  generateName,
  generateError,
} from "../../../../tools/generators/utils";

const sendRequest = async (
  type: string,
  code: number,
  route: string,
  send?: any
) => {
  switch (type) {
    case "post":
      return await request(app).post(route).send(send).expect(code);
    case "get":
      return await request(app).get(route).expect(code);
  }
};

describe("/tournament endpoint", () => {
  describe("[POST] when creating a tournament", () => {
    it("should return the correct id", async () => {
      const randomName = generateName();
      const { body } = await sendRequest(
        "post",
        201,
        "/api/tournaments",
        randomName
      );
      expect(body.id).not.toBeUndefined();
    });

    it("should have stored the tournament", async () => {
      const randomName = generateName();
      const { body } = await sendRequest(
        "post",
        201,
        "/api/tournaments",
        randomName
      );
      const get = await sendRequest("get", 200, `/api/tournaments/${body.id}`);
      expect(get.body.name).toEqual(randomName.name);
    });

    it("send empty string return error 400", async () => {
      const generateEmptyString = generateName("");
      const { body } = await sendRequest(
        "post",
        400,
        "/api/tournaments",
        generateEmptyString
      );
      expect(body).toEqual({ error: "le champ nom est manquant ou vide" });
    });

    it("send two send request return 400", async () => {
      const randomName = generateName();
      await sendRequest("post", 201, "/api/tournaments", randomName);
      const { body } = await sendRequest(
        "post",
        400,
        "/api/tournaments",
        randomName
      );
      expect(body).toEqual(generateError("le nom est déjà pris"));
    });
  });
});

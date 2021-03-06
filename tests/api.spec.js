import supertest from "supertest";
import { expect } from "chai";
import { app } from "../lib/server";

describe("MakeMeMonster API", () => {
  const testAppInstance = supertest(app);
  it("responds to GET /api/ping", done => {
    testAppInstance.get("/api/ping").expect(200, done);
  });

  it("returns a monster to POST /api/battle", done => {
    testAppInstance
      .post("/api/battle")
      .send({
        player: {
          id: "12345",
          attack: 100,
          defense: 122,
          level: 50,
          healthPoints: 250
        }
      })
      .expect(res => {
        expect(res.body).to.have.keys([
          "attack",
          "defense",
          "element",
          "healthPoints",
          "id",
          "image",
          "level",
          "name",
          "type"
        ]);
      })
      .expect(200, done);
  });
  it("returns a 400 to POST /api/battle if invalid player provided", done => {
    testAppInstance
      .post("/api/battle")
      .send({
        player: {
          attack: "100",
          defense: 122,
          level: 50,
          healthPoints: 250
        }
      })
      .expect(400, done);
  });
});

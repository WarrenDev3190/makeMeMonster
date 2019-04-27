import { expect } from "chai";
import MakeMeMonster from "../lib/make-me-monster";

describe("MakeMeMonster Module", () => {
  let testPlayer = {
    id: "12345",
    attack: 123,
    defense: 234,
    level: 345
  };
  it("can return the index of a random monster", () => {
    expect(MakeMeMonster.getRandomMonsterIndex()).to.be.lte(
      MakeMeMonster.monsters.length
    );
  });
  it("can validate player data", () => {
    expect(MakeMeMonster.isValidPlayer(testPlayer)).to.be.true;
  });
  it("returns a random monster when given a valid player", () => {
    expect(MakeMeMonster).to.respondTo("getRandomMonster");
    let testMonster = MakeMeMonster.getRandomMonster(testPlayer);
    expect(testMonster).to.have.keys([
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
  });
  it("throws an error when invalid player data is provided", () => {
    expect(() => {
      MakeMeMonster.getRandomMonster({
        name: "1231",
        attack: "434A"
      });
    }).to.throw(Error);
  });
});

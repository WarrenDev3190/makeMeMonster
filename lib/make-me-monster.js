import monsters from './monsters.json';

const MakeMeMonster = {
  monsters,
  registery: {},
  hasActiveBattle(playerId) {
    return !!this.registery[playerId];
  },
  getRandomMonsterIndex() {
    return Math.floor(Math.random() * this.monsters.length);
  },
  getRandomMonster(player) {
    if (this.isValidPlayer(player)) {
      const randomIndex = this.getRandomMonsterIndex();
      const randomMonster = this.monsters[randomIndex];
      this.register(player, randomMonster);
      return randomMonster;
    }
    throw Error('Invalid Player provided');
  },
  isValidPlayer(player) {
    const identifier = ['id'];
    const numericalProperties = ['attack', 'defense', 'level'];
    const playerProperties = [...identifier, ...numericalProperties];
    return (
      Object.keys(player).every(key => playerProperties.indexOf(key) !== -1)
      && numericalProperties.every(prop => typeof player[prop] === 'number')
    );
  },
  register(player, monster) {
    this.registery[player.id] = {
      player,
      monster,
    };
  },
  playerAction() {},
};

export default MakeMeMonster;

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
  rollDie(range) {
    const maxInt = range || 20;
    return Math.floor(Math.random() * maxInt);
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
    const numericalProperties = ['attack', 'defense', 'level', 'healthPoints'];
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
  battle(playerId) {
    if (!this.hasActiveBattle(playerId)) throw Error({ message: 'No active battles found 🤷‍' });
    const { player, monster } = this.registery[playerId];
    const damageDealtByPlayer = this.calculateDamage(player, monster);
    const damageDealtByMonster = this.calculateDamage(monster, player);
    return this.calculateUpdate({
      player: {
        ...player,
        healthPoints: player.healthPoints - damageDealtByMonster,
      },
      monster: {
        ...monster,
        healthPoints: monster.healthPoints - damageDealtByPlayer,
      },
    });
  },
  calculateDamage(attacker, defender) {
    const attackerRoll = this.rollDie(20 + attacker.level);
    const defenderRoll = this.rollDie(20 + defender.level);
    const damageToSubtract = (attacker.attack + attackerRoll) - (defender.defense + defenderRoll);
    return damageToSubtract > 0 ? damageToSubtract : 0;
  },
  calculateUpdate({ player, monster }) {
    if (player.healthPoints < 0 && monster.healthPoints < 0) {
      this.registery[player.id] = { player, monster };
      return {
        player,
        monster,
        message: '☠️ SUDDEN DEATH, BOTH DEFEATED ☠️',
      };
    } if (player.healthPoints < 0) {
      this.registery[player.id] = { player, monster };
      return {
        player,
        monster,
        message: '☠️ Player defeated...',
      };
    } if (monster.healthPoints < 0) {
      this.registery[player.id] = { player, monster };
      return {
        player,
        monster,
        message: '☠️ Monster defeated...',
      };
    }
    this.registery[player.id] = { player, monster };
    return {
      player,
      monster,
      message: '⚔️ THE BATTLE CONTINUES!!! ⚔️',
    };
  },
};

export default MakeMeMonster;

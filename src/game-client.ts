import EventEmitter from 'events';
import { GameStateMachine } from './game-states/game-state-machine';
import { Game } from './game';
import { PlayersManager } from './players-manager';
import { QuestsManager } from './quests-manager';
import { GameMetaData } from './game-meta-data';
import { PreparationState } from './game-states/preparation-state';
import { IGameClientApi } from './interfaces/game-client-api';
import { GameConfig } from './types/game-config';
import { GameSerialized } from './types/game-serialized';
import { RoleId } from './enums/role-id';
import { GameEvent } from './enums/game-event';
import { IIdentifiable } from './interfaces/identifiable';

const defaultConfig: GameConfig = {
  stateTransitionWaitTimes: {
    afterTeamProposition: 5000,
    afterTeamVoting: 7500,
    afterQuestVoting: 7500,
  },
};

export class GameClient implements IGameClientApi, IIdentifiable {
  private game: Game;

  constructor(config: GameConfig = defaultConfig) {
    this.game = new Game(
      new PlayersManager(),
      new QuestsManager(),
      new GameMetaData(),
      new GameStateMachine(config.stateTransitionWaitTimes),
      new PreparationState(),
      new EventEmitter(),
    );
  }

  getId() {
    return this.game.getMetaData().getId();
  }

  on(event: GameEvent, cb: () => void) {
    this.game.on(event, cb);
  }

  off(event: GameEvent, cb: () => void) {
    this.game.off(event, cb);
  }

  addPlayer(username: string) {
    this.game.addPlayer(username);
  }

  start(roleIds: RoleId[] = []) {
    this.game.start(roleIds);
  }

  submitTeam(leaderUsername: string) {
    this.game.submitTeam(leaderUsername);
  }

  voteForQuest(username: string, voteValue: boolean) {
    this.game.voteForQuest(username, voteValue);
  }

  voteForTeam(username: string, voteValue: boolean) {
    this.game.voteForTeam(username, voteValue);
  }

  toggleTeammateProposition(leaderUsername: string, username: string) {
    this.game.toggleTeammateProposition(leaderUsername, username);
  }

  toggleVictimProposition(assassinsUsername: string, victimsUsername: string) {
    this.game.toggleVictimProposition(assassinsUsername, victimsUsername);
  }

  assassinate(assassinsUsername: string) {
    this.game.assassinate(assassinsUsername);
  }

  serialize(forUsername: string): GameSerialized {
    return this.game.serialize(forUsername);
  }
}

import { Tournament } from "../api/api-model";

export class TournamentRepository {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }

  public tournamentExist(tournamentName: string): Boolean {
    for (let [, value] of this.tournaments) {
      if (value.name == tournamentName) {
        return true;
      }
    }
    return false;
  }

  // public deleteTournament(tournamentId: string): void {
  //   this.tournaments.delete(tournamentId);
  // }
}

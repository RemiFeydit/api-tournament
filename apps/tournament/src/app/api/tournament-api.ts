import { Request, Response } from "express";
import { TournamentRepository } from "../repository/tournament-repository";
import { TournamentToAdd } from "./api-model";
import { v4 as uuidv4 } from "uuid";

const tournamentRepository = new TournamentRepository();

export const postTournament = (req: Request, res: Response) => {
  const tournamentToAdd: TournamentToAdd = req.body;
  if (!tournamentToAdd.name || tournamentToAdd.name == "") {
    res.status(400);
    res.send({ error: "le champ nom est manquant ou vide" });
  } else {
    const tournament = {
      id: uuidv4(),
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    };
    tournamentRepository.saveTournament(tournament);

    res.status(201);
    res.send({ id: tournament.id });
  }
};

export const getTournament = (req: Request, res: Response) => {
  const id = req.params["id"];

  const tournament = tournamentRepository.getTournament(id);

  res.status(200);
  res.send(tournament);
};

// export const deleteTournament = (req: Request, res: Response) => {
//   const id = req.params["id"];

//   const tournament = tournamentRepository.deleteTournament(id);

//   res.status(200);
//   res.send({ id: id });
// };

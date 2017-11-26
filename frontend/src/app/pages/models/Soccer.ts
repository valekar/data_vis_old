export class Team{
    id:number;
    team_api_id:number;
    team_fifa_api_id:number;
    team_long_name:string;
    team_short_name:string;
}

export class TeamData{
    data:Array<Team>;
}

export class Match{
    team_name:string;
    total_matches:string;
    season:string;
    home:number;
    away:number;
    total_home_team_goals:number;
    total_away_team_goals:number;
    win:number;
    loss:number;
    draw:number;
}

export class MatchData{
    data:Array<Match>
}
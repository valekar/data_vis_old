import { Component, OnInit } from '@angular/core';
import {BarService} from '../../services/bar.service';
import {Team,TeamData,Match} from '../../../models/Soccer';

@Component({
  selector: 'bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
  providers:[BarService]
})
export class BarGraphComponent implements OnInit {

  teamList:Array<Team>;
  selectedTeam:number;
  constructor(private barService:BarService) { }

  ngOnInit() {
    this.barService.getAllTeams().subscribe((res:TeamData)=>{
      this.teamList = res.data;
    });
  }

  teamSelection(){
    //console.log(this.selectedTeam);
    this.barService.getMatch(this.selectedTeam).subscribe((res:Match)=>{
      console.log(res);
    });
  }

}

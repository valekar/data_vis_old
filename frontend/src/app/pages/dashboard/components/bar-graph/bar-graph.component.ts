import { Component, OnInit, ElementRef, ViewChildren, Renderer2, AfterViewInit, QueryList, ViewChild } from '@angular/core';
import { BarService } from '../../services/bar.service';
import { Team, TeamData, Match, MatchData } from '../../../models/Soccer';
import * as d3 from 'd3/index';
import { Element } from '@angular/compiler';
import { ElementDef } from '@angular/core/src/view';
import { Selection } from 'd3-selection';

@Component({
  selector: 'bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
  providers: [BarService]
})
export class BarGraphComponent implements OnInit, AfterViewInit {


  teamList: Array<Team>;
  selectedTeam: number;
  matches: Array<Match>;
  host: any;
  svg: any;
  @ViewChild('myBarGraph') myBarGraph: ElementRef;

  constructor(private barService: BarService, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.barService.getAllTeams().subscribe((res: TeamData) => {
      this.teamList = res.data;
    });
  }

  ngAfterViewInit(): void {

  }


  teamSelection() {
    //console.log(this.selectedTeam);
    this.barService.getMatch(this.selectedTeam).subscribe((res: MatchData) => {
      console.log(res);
      this.matches = res.data;
      this.host = d3.select(this.myBarGraph.nativeElement);
      //console.log(this.renderer.parentNode);
      this.buildSVG(this.matches);
    });
  }

  buildSVG(matches: Array<Match>): void {
    //    //this.host.html('');
    //  // console.log(this.host);
    //   this.svg = this.renderer.createElement('svg');
    //   this.renderer.setAttribute(this.svg,'xmlns',"http://www.w3.org/1999/xlink");
    //   this.renderer.setAttribute(this.svg,'width','600');
    //   this.renderer.setAttribute(this.svg,'height','400');
    //   this.renderer.setAttribute(this.svg,'background-color','blue');
    //   this.renderer.appendChild(this.host,this.svg);

    let margin = { top: 20, right: 20, bottom: 20, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    let rectWidth = 60;

    this.host.html('');
    this.svg = this.host.append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    let matchesLength = matches.length;

    if(matchesLength == 1){
      width = width/7;
    }
    else if(matchesLength == 2){
      width = width/6;
    }
    else if(matchesLength == 3){
      width = width/5;
    }
    else if(matchesLength == 4){
      width = width/4;
    }
    else if(matchesLength == 5){
      width = width/3;
    }
    else if(matchesLength == 6){
      width = width/2;
    }
    else if(matchesLength == 7){
      width = width/1;
    }
    
      
    // set the ranges
    let x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    let y = d3.scaleLinear()
      .range([height, 0]);

    // Scale the range of the data in the domains
    x.domain(matches.map((d) => { return d.season; }));
    y.domain([0, d3.max(matches, (d) => { return +d.total_matches; })]);

    // append the rectangles for the bar chart
    this.svg.selectAll(".bar")
      .data(matches)
      .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", (d) => { return x(d.season); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.total_matches); })
      .attr("height", function (d) { return height - y(d.total_matches); });

    // add the x Axis
    this.svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    this.svg.append("g")
      .call(d3.axisLeft(y));

      this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2)-2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Total Matches");  
  }

}

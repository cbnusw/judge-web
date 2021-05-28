import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IContest } from '../../../models/contest';
import { IScore, IScoreBoard } from '../../../models/score-board';
import { ContestService } from '../../../services/apis/contest.service';
import { ScoreService } from '../../../services/apis/score.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'sw-score-board-page',
  templateUrl: './score-board-page.component.html',
  styleUrls: ['./score-board-page.component.scss']
})
export class ScoreBoardPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  scoreboards: IScoreBoard[] = [];
  contest: IContest;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private socketService: SocketService,
              private scoreService: ScoreService,
              private contestService: ContestService) {
  }

  getPenalty(score: IScore): number {
    return score.time + score.time * 20;
  }

  getScoreboards(id: string): void {
    if (id) {
      this.scoreService.getContestScoreBoards(id).subscribe(res => {
        const boards = res.data.map(b => {
          b.score = b.scores.reduce((acc, cur) => {
            if (cur.right) {
              acc++;
            }
            return acc;
          }, 0);

          b.penalty = b.scores.reduce((acc, cur) => {
            acc += cur.time;
            acc += cur.tries * 20;
            return acc;
          }, 0);

          return b;
        });

        boards.sort((b1, b2) => {
          if (b1.score === b2.score) {
            return b1.penalty - b2.penalty;
          } else {
            return b2.score - b1.score;
          }
        });

        this.scoreboards = boards;
      });
    }
  }

  getContest(id: string): void {
    if (id) {
      this.contestService.getContest(id).subscribe(res => this.contest = res.data);
    }
  }

  moveListPage(): void {
    this.router.navigate(['/contest', this.contest._id, 'problems']);
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.pipe(
      map(params => params.contest),
    ).subscribe(
      id => {
        this.getScoreboards(id);
        this.getContest(id);
      }
    );

    this.subscription.add(
      this.socketService.message$.subscribe(() => this.scoreService.getContestScoreBoards((this.contest || {})._id))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

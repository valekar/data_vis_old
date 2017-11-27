import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match.component';

import { ThemeModule } from '../../@theme/theme.module';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [MatchComponent]
})
export class MatchModule { }

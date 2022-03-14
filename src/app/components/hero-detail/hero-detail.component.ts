import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  isNewHero = false;

  @Input() hero?: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.heroService.getHero(id).subscribe((data) => {
        if (data) {
          this.isNewHero = false;
          this.hero = data;
        }
      });
    } else {
      this.isNewHero = true;
      this.hero = { id: "", name: "", power: "", alterEgo: "" }
    }

    // this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      if (this.isNewHero) {
        this.heroService.addHero(this.hero).subscribe(data => {
          console.log(data);
          this.goBack();
        });
      } else{
        this.heroService.updateHero(this.hero).subscribe(data => {
          console.log(data);
          this.goBack();
        });
      }

    }
    // if (this.hero) {
    //   this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    // }
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    // this.heroService.addHero(this.model as Hero).subscribe((hero) => {
    //   this.insertedHero.emit(hero);
    // })
  }

  newHero() {
    this.hero = { id: '42', name: '', power: '' };
  }

}

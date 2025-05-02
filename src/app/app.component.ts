import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as anime from 'animejs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('box') box!: ElementRef;
  title = 'cicdapp';

  ngAfterViewInit() {
    const [$path1, $path2] = anime.utils.$('polygon');

    function animateRandomPoints() {
      // Update the points attribute on #path-2
      anime.utils.set($path2, { points: generatePoints() });
      // Morph the points of #path-1 into #path-2
      anime.animate($path1, {
        points: anime.svg.morphTo($path2),
        ease: 'inOutCirc',
        duration: 500,
        onComplete: animateRandomPoints
      });
    }

    // Start the animation
    animateRandomPoints();

    // A function to generate random points on #path-2 on each iteration
    // For demo purpose only
    function generatePoints() {
      const total = anime.utils.random(4, 64);
      const r1 = anime.utils.random(4, 56);
      const r2 = 56;
      const isOdd = (n: number) => n % 2;
      let points = '';
      for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
        const r = isOdd(i) ? r1 : r2;
        const a = (2 * Math.PI * i / l) - Math.PI / 2;
        const x = 152 + anime.utils.round(r * Math.cos(a), 0);
        const y = 56 + anime.utils.round(r * Math.sin(a), 0);
        points += `${x},${y} `;
      }
      return points;
    }
  }
}

import {NgOptimizedImage} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <section role="main"> 
          <section class="carousel-content">
              
              <figure class="slider-img">
                    <figcaption>Lo Hobbit</figcaption>
                    <a>
                        <img ngSrc="./../../assets/slider-img/slide1.jpg" alt="Lo Hobbit" title="Lo Hobbit"
                            height="400" width="1700" priority="high"
                        >
                    </a>
              </figure>

              <figure class="slider-img">
                  <figcaption>The Avengers - Endgame</figcaption>
                    <a>
                        <img ngSrc="./../../assets/slider-img/slide2.jpg" alt="Avengers" title="Avengers"
                            height="400" width="1700" priority="high"
                        >
                    </a>
              </figure>

              <figure class="slider-img">
                  <figcaption>Transformers - Rise of the Beasts</figcaption>
                  <a>
                    <img ngSrc="./../../assets/slider-img/slide3.jpg" alt="Transformers" title="Transformers"
                        height="400" width="1700" priority="high"
                    >
                </a>
              </figure>

              <figure class="slider-img">
                  <figcaption>Your Name.</figcaption>
                  <a>
                    <img ngSrc="./../../assets/slider-img/slide4.jpg" alt="Your Name." title="Your Name."
                        height="400" width="1700" priority="high"
                    >
                </a>
              </figure>

              <figure class="slider-img">
                  <figcaption>Venom - La furia di Carnage</figcaption>
                  <a>
                    <img ngSrc="./../../assets/slider-img/slide5.jpg" alt="Venom" title="Venom"
                        height="400" width="1700" priority="high"
                    >
                </a>
              </figure>

          </section>
    </section>
  `,
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

}

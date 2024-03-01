import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  template: `
    <section role="main"> 
          <section class="carousel-content">
              
              <figure class="slider-img">
                  <figcaption>Lo Hobbit</figcaption>
                  <a><img src="./../../assets/slider-img/slide1.jpg" alt="Lo Hobbit" title="Lo Hobbit"></a>
              </figure>

              <figure class="slider-img">
                  <figcaption>The Avengers - Endgame</figcaption>
                  <a><img src="./../../assets/slider-img/slide2.jpg" alt="Avengers" title="Avengers"></a>
              </figure>

              <figure class="slider-img">
                  <figcaption>Transformers - Rise of the Beasts</figcaption>
                  <a><img src="./../../assets/slider-img/slide3.jpg" alt="Transformers" title="Transformers"></a>
              </figure>

              <figure class="slider-img">
                  <figcaption>Your Name.</figcaption>
                  <a><img src="./../../assets/slider-img/slide4.jpg" alt="Your Name." title="Your Name."></a>
              </figure>

              <figure class="slider-img">
                  <figcaption>Venom - La furia di Carnage</figcaption>
                  <a><img src="./../../assets/slider-img/slide5.jpg" alt="Venom" title="Venom"></a>
              </figure>

          </section>
    </section>
  `,
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

}

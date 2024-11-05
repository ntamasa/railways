import View from "./view.js";

class DescriptionView extends View {
  _parentElement = document.querySelector("main");

  _btnArr = document.querySelectorAll(".move-btn");

  constructor() {
    super();
  }

  addHandlerRender(handler) {
    this._btnArr.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const currShown = this._parentElement.dataset.show;

        this._parentElement.dataset.show =
          currShown === "description" ? "menu" : "description";
        const newPage = this._parentElement.dataset.show;
        handler(newPage);
      })
    );
  }

  _generateMarkup() {
    return `<aside class="description-box">
        <article class="intro">
          <h2>Bemutatás</h2>
          <p>
            Nekeresdországban Nevenincs király szeretne egy körvasutat építeni,
            amely bejárja a birodalmának minden szegletét. A feladat
            megvalósítása Furfangra, az udvari tanácsosra vár, akinek a munkáját
            nehezíti a királyság változatos tája.
          </p>
          <p>
            Segítsünk Furfangnak megtervezni a királyság vasúthálózatához
            tartozó térképet!
          </p>
        </article>
        <article class="game">
          <h2>A játék menete</h2>
          <p>
            A játék különböző méretű négyzetrácsos hálón játszódhat, ahol a
            célunk az, hogy egy <em>összefüggő körvasútvonalat</em> alkossunk
            úgy, hogy minden olyan helyre eljusson a vonat, ahova lehetséges.
          </p>
          <p>
            A játéknak akkor van <em>vége</em>, amikor a játékos a megadott
            szabályokat betartva elkészíti a feladvány
            <em>helyes</em> megoldását.
          </p>
        </article>
        <article class="tiles-box">
          <h2>Mezők</h2>
          <div class="tiles">
            <div class="tile">
              <img
                src="src/pics/tiles/empty.png"
                alt="Üres mező"
                class="tile-img"
              />
              <p class="tile-type">Üres mező</p>
              <p class="tile-description">
                Ebben a cellában a vasútvonal a belépési irányon kívül maradék
                <strong>három irányba</strong> tud haladni.
              </p>
            </div>
            <div class="tile">
              <img
                src="src/pics/tiles/bridge.png"
                alt="Híd mező"
                class="tile-img"
              />
              <p class="tile-type">Híd mező</p>
              <p class="tile-description">
                Ezen a mezőn a vasútvonalat csak a híd által megadott
                <strong>egyenes írányban</strong> lehet megépíteni.
              </p>
            </div>
            <div class="tile">
              <img
                src="src/pics/tiles/mountain.png"
                alt="Hegy mező"
                class="tile-img"
              />
              <p class="tile-type">Hegy mező</p>
              <p class="tile-description">
                Ezeken a mezőkön a sziklák a cellának két szomszédos kijáratát
                lezárják, így csak <strong>90°-ban elfordulva</strong> lehet
                továbbhaladni.
              </p>
            </div>
            <div class="tile">
              <img
                src="src/pics/tiles/oasis.png"
                alt="Oázis mező"
                class="tile-img"
              />
              <p class="tile-type">Oázis mező</p>
              <p class="tile-description">
                Erre a cellára <strong>nem lehet</strong> vasutat építeni.
              </p>
            </div>
          </div>
        </article>
      </aside>
      `;
  }
}

export default new DescriptionView();

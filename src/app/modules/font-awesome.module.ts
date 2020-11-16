import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule as FaModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const icons = {
  faFacebookF,
  faGoogle,
  faGithub,
  faTwitter,
};

@NgModule({
  imports: [FaModule],
  exports: [FaModule],
})
export class FontAwesomeModule {
  constructor(private library: FaIconLibrary) {
    library.addIconPacks(icons);
  }
}
